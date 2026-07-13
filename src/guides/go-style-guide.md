---
title: Go Style Guide
description: Coding conventions for all Go code — APIs, CLI tools, background workers, and libraries.
---

# Go Style Guide

Coding conventions for all Go code — APIs, CLI tools, background workers, and libraries.

**Formatter:** `gofmt` + `goimports` — non-negotiable. Code that doesn't pass `gofmt` doesn't get committed.
**Linters:** `go vet` + `staticcheck` in CI.

---

## Formatting

`gofmt` handles all formatting decisions. There is nothing to configure and nothing to debate.

- **Indentation:** Tabs (enforced by `gofmt`).
- **Braces:** Opening brace on the same line (enforced by the compiler).
- **Line length:** No hard limit. Break long lines at logical points (after commas, before operators).

```go
// gofmt handles this. Don't fight it.
if err != nil {
	return fmt.Errorf("fetch user %s: %w", id, err)
}
```

---

## Naming Conventions

| Identifier | Convention | Example |
|---|---|---|
| Files | snake_case | `user_service.go`, `order_handler.go` |
| Test files | snake_case with `_test` suffix | `user_service_test.go` |
| Packages | short, lowercase, single-word | `user`, `auth`, `config` |
| Exported functions/types | PascalCase | `GetUser()`, `UserService` |
| Unexported functions/types | camelCase | `validateInput()`, `userCache` |
| Local variables | camelCase | `userData`, `retryCount` |
| Exported constants | PascalCase | `MaxRetries`, `DefaultTimeout` |
| Unexported constants | camelCase | `maxRetries`, `defaultTimeout` |
| Booleans | natural-reading prefix | `isReady`, `hasPermission`, `shouldRetry` |
| Interfaces (single-method) | method name + `-er` | `Reader`, `Writer`, `Closer` |
| Acronyms | all-caps in PascalCase | `UserID`, `HTTPClient`, `ParseJSON` |
| Receiver variables | short (1-2 letter) | `func (s *Server)`, `func (u *User)` |

### Packages

Name packages after what they **provide**, not what they contain:

```
// Good
user/       → package user
auth/       → package auth
postgres/   → package postgres

// Bad — vague grab-bag names
util/
common/
helpers/
```

### Interfaces

Single-method interfaces: method name + `-er` suffix.
Multi-method interfaces: descriptive noun.

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}

type UserStore interface {
	GetUser(ctx context.Context, id string) (*User, error)
	CreateUser(ctx context.Context, u *User) error
	DeleteUser(ctx context.Context, id string) error
}
```

### Structs

Group fields logically. Exported fields first, then unexported.

```go
type Server struct {
	Addr    string
	Handler http.Handler

	logger *slog.Logger
	db     *sql.DB
}
```

---

## Code Organization

### Import Order

Three groups, separated by blank lines:

1. Standard library
2. Third-party packages
3. Internal project packages

```go
import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/spikenardco/myproject/internal/config"
	"github.com/spikenardco/myproject/internal/handlers"
)
```

`goimports` manages this automatically. Run it on save.

### Project Layout

```
cmd/
  server/           → main.go for the API server
  worker/           → main.go for background workers
internal/
  handlers/         → HTTP handlers (request/response only)
  service/          → Business logic (no HTTP awareness)
  store/            → Database access (queries, transactions)
  middleware/       → HTTP middleware
  model/            → Domain types and structs
pkg/                → Public library code (importable by others)
migrations/         → SQL migration files (Goose)
```

**Rules:**
- `internal/` is for private code. Nothing outside the module can import it.
- `handlers/` only deals with HTTP — parsing requests, writing responses. Business logic lives in `service/`.
- `store/` owns all database access. No SQL leaks into handlers or services.
- `cmd/` contains only `main.go` files — bootstrap and wiring, no logic.

### File Structure

Organize within a file:

1. Package declaration and imports
2. Constants and package-level variables
3. Types (structs, interfaces)
4. Constructor functions (`New...`)
5. Methods
6. Helper/private functions

---

## Documentation

Comments explain **why**, not what. The code explains what.

### Package Comments

Every package has a comment. Put it in `doc.go` or the primary file:

```go
// Package auth provides authentication and authorization
// middleware for HTTP services.
package auth
```

### Exported Functions

Every exported function gets a comment starting with the function name:

```go
// GetUser retrieves a user by their unique identifier.
// Returns ErrNotFound if no user exists with the given ID.
func GetUser(ctx context.Context, id string) (*User, error) {
	// ...
}
```

### Inline Comments

Explain **why** something is done, not what:

```go
// Rate limit to 100 req/s to stay within the provider's free tier
limiter := rate.NewLimiter(100, 10)
```

---

## Error Handling

Errors are values. Handle them explicitly. Never ignore them.

### The Basics

```go
user, err := store.GetUser(ctx, id)
if err != nil {
	return fmt.Errorf("get user %s: %w", id, err)
}
```

Never do this:

```go
user, _ := store.GetUser(ctx, id) // Bad — silent failure
```

### Error Wrapping

Use `fmt.Errorf` with `%w` to add context while preserving the original error. The message should describe the action that failed, not restate the error:

```go
// Good — describes what failed
return fmt.Errorf("create order for user %s: %w", userID, err)

// Bad — restates the error
return fmt.Errorf("error: %w", err)
```

### Sentinel Errors

Define package-level errors for known failure conditions:

```go
var (
	ErrNotFound   = errors.New("not found")
	ErrForbidden  = errors.New("forbidden")
	ErrConflict   = errors.New("conflict")
)
```

Check with `errors.Is`:

```go
if errors.Is(err, store.ErrNotFound) {
	http.Error(w, "user not found", http.StatusNotFound)
	return
}
```

### Panics

Never panic for runtime errors. Reserve `panic` for programmer bugs — invariants that should be impossible to violate. If you're unsure, return an error.

---

## Testing

**Runner:** `go test` (built-in)

### Table-Driven Tests

The default pattern for all Go tests:

```go
func TestValidateEmail(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  bool
	}{
		{"valid email", "user@example.com", true},
		{"missing @", "invalid", false},
		{"empty string", "", false},
		{"multiple @", "a@b@c.com", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := ValidateEmail(tt.input)
			if got != tt.want {
				t.Errorf("ValidateEmail(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}
```

### Test Helpers

Use `t.Helper()` for test utility functions so failures report the correct line:

```go
func assertNoError(t *testing.T, err error) {
	t.Helper()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}
```

### Test File Placement

Tests live alongside the code: `user.go` → `user_test.go` in the same package.

---

## Best Practices

- **`context.Context` first.** Always pass it as the first parameter to functions that do I/O:
  ```go
  func GetUser(ctx context.Context, id string) (*User, error)
  ```

- **Struct literals with field names.** Never use positional arguments:
  ```go
  // Good
  user := User{Name: "Alice", Email: "alice@example.com"}

  // Bad
  user := User{"Alice", "alice@example.com"}
  ```

- **Accept interfaces, return structs.** Functions should accept the narrowest interface they need and return concrete types:
  ```go
  func NewServer(store UserStore, logger *slog.Logger) *Server
  ```

- **Small interfaces.** Prefer many small interfaces over few large ones. A function that only reads shouldn't require a full read-write interface.

- **`defer` for cleanup.** Close files, unlock mutexes, and release resources with `defer` immediately after acquiring them:
  ```go
  f, err := os.Open(path)
  if err != nil {
  	return err
  }
  defer f.Close()
  ```

- **No `init()` functions.** They hide execution order and make testing harder. Wire dependencies explicitly in `main`.

- **Avoid package-level mutable state.** Pass dependencies through function parameters or struct fields.

- **Keep functions short.** If a function needs a comment to explain a section, that section should be its own function.
