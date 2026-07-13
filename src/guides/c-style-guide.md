---
title: C Style Guide
description: Coding conventions for all C code — systems utilities, hardware interfaces, and educational projects.
---

# C Style Guide

Coding conventions for all C code — systems utilities, hardware interfaces, and educational projects.

**Formatter:** `clang-format` — commit a `.clang-format` config to the repo and run before every commit.
**Compiler flags:** `-Wall -Wextra -Wpedantic` always. `-Werror` in CI.
**Standard:** C11 or later.

---

## Formatting

### Brace Style

K&R style — opening brace on the same line. Always use braces, even for single-line bodies.

```c
if (count > 0) {
    process(count);
} else {
    handle_empty();
}

for (int i = 0; i < n; i++) {
    items[i] = 0;
}

while (is_running) {
    poll_events();
}
```

### Indentation

4 spaces. No tabs.

### Pointer Declarations

Attach `*` to the variable name, not the type:

```c
char *name;         // Good
char* name;         // Bad
char *a, *b;        // Good — clear that both are pointers
```

### Line Length

No hard limit. Break long lines at logical points (after commas, before operators).

---

## Naming Conventions

| Identifier | Convention | Example |
|---|---|---|
| Files | snake_case | `user_service.c`, `user_service.h` |
| Variables | snake_case | `buffer_size`, `user_name` |
| Booleans | snake_case with `is_`/`has_`/`should_` | `is_connected`, `has_data` |
| Functions | snake_case with module prefix | `user_create()`, `config_load()` |
| Constants & macros | SCREAMING_SNAKE_CASE | `MAX_BUFFER_SIZE`, `DEFAULT_PORT` |
| Types (`typedef` structs) | PascalCase | `User`, `Config`, `TokenKind` |
| Enum values | SCREAMING_SNAKE_CASE with type prefix | `STATUS_PENDING`, `STATUS_ACTIVE` |
| Static (file-local) functions | snake_case (no prefix needed) | `parse_line()`, `validate()` |

### Module Prefixes

C has no namespaces. Prefix public functions and types with the module name:

```c
// user module
User *user_create(const char *name, const char *email);
void user_destroy(User *user);
int user_validate(const User *user);

// config module
Config *config_load(const char *path);
void config_free(Config *config);
const char *config_get(const Config *config, const char *key);
```

### Types

```c
typedef struct {
    char *name;
    char *email;
    int age;
    bool is_active;
} User;

typedef enum {
    STATUS_PENDING,
    STATUS_ACTIVE,
    STATUS_INACTIVE,
} UserStatus;
```

---

## Code Organization

### Include Order

Five groups, separated by blank lines:

1. Corresponding header (for `.c` files)
2. Standard library headers
3. System/platform headers
4. Third-party headers
5. Project headers

```c
#include "user.h"

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <unistd.h>
#include <sys/socket.h>

#include "config.h"
#include "utils.h"
```

### Header Files

Every header uses include guards:

```c
#ifndef MYPROJECT_USER_H
#define MYPROJECT_USER_H

#include <stdbool.h>

typedef struct { ... } User;

User *user_create(const char *name, const char *email);
void user_destroy(User *user);
int user_validate(const User *user);

#endif /* MYPROJECT_USER_H */
```

### File Structure

**Header files** (`.h`):
1. Include guard
2. Includes
3. Type definitions
4. Function declarations

**Source files** (`.c`):
1. Corresponding header include
2. Other includes
3. Static (file-local) constants
4. Static (file-local) function declarations
5. Public function implementations
6. Static function implementations

### Visibility

Use `static` for everything that doesn't need to be visible outside the file:

```c
// Only visible within this file
static int parse_line(const char *line, Token *out);
static const int INTERNAL_BUFFER_SIZE = 256;
```

---

## Documentation

Document public APIs in header files. Use `/* */` block comments for function docs, `//` for inline comments.

### Function Documentation

```c
/**
 * Creates a new user with the given name and email.
 *
 * The caller is responsible for freeing the returned User
 * with user_destroy().
 *
 * Returns NULL if allocation fails or if name/email is NULL.
 */
User *user_create(const char *name, const char *email);
```

### Inline Comments

Explain **why**, not what:

```c
// Retry with exponential backoff to avoid thundering herd
for (int i = 0; i < MAX_RETRIES; i++) {
    sleep(1 << i);
    if (try_connect(host, port) == 0) {
        break;
    }
}
```

---

## Memory Management

The most critical aspect of C code. Every `malloc` needs a `free`. Every resource needs cleanup.

### Pair Allocations with Frees

```c
char *buffer = malloc(size);
if (buffer == NULL) {
    return -1;
}
// ... use buffer ...
free(buffer);
buffer = NULL;
```

### Check Every Allocation

Never assume `malloc` succeeds:

```c
User *user = malloc(sizeof(User));
if (user == NULL) {
    fprintf(stderr, "allocation failed\n");
    return NULL;
}
```

### Resource Management Naming

Use consistent naming pairs for lifecycle functions:

```c
// Heap-allocated — caller must call _destroy
User *user_create(const char *name);
void user_destroy(User *user);

// Stack-friendly — initializes/cleans up existing memory
int config_init(Config *config, const char *path);
void config_cleanup(Config *config);
```

### Null After Free

Set pointers to `NULL` after freeing to prevent use-after-free:

```c
free(user->name);
user->name = NULL;
free(user);
user = NULL;
```

### Goto for Cleanup

For functions with multiple resources, `goto` is the idiomatic cleanup pattern in C:

```c
int process_file(const char *path) {
    int result = -1;
    FILE *file = NULL;
    char *buffer = NULL;

    file = fopen(path, "r");
    if (file == NULL) {
        goto cleanup;
    }

    buffer = malloc(BUFFER_SIZE);
    if (buffer == NULL) {
        goto cleanup;
    }

    // ... main logic ...
    result = 0;

cleanup:
    free(buffer);
    if (file != NULL) {
        fclose(file);
    }
    return result;
}
```

---

## Error Handling

C has no exceptions. Use return values consistently.

### Return Value Conventions

- Functions returning pointers: return `NULL` on failure.
- Functions returning integers: return `0` for success, `-1` (or a negative error code) for failure.
- Use `errno` when interfacing with the standard library.

```c
User *user_create(const char *name) {
    if (name == NULL) {
        return NULL;
    }

    User *user = malloc(sizeof(User));
    if (user == NULL) {
        return NULL;
    }

    user->name = strdup(name);
    if (user->name == NULL) {
        free(user);
        return NULL;
    }

    return user;
}
```

### Error Codes

For complex APIs, define an error enum:

```c
typedef enum {
    ERR_OK = 0,
    ERR_NULL_ARG,
    ERR_ALLOC,
    ERR_NOT_FOUND,
    ERR_INVALID_FORMAT,
} ErrorCode;

ErrorCode config_load(Config *config, const char *path);
```

---

## Testing

No built-in test framework. Use a minimal library like [Unity](https://github.com/ThrowTheSwitch/Unity) or simple assertion macros.

### Simple Test Pattern

```c
#include <assert.h>
#include <string.h>
#include "user.h"

void test_user_create(void) {
    User *user = user_create("Alice", "alice@test.com");
    assert(user != NULL);
    assert(strcmp(user->name, "Alice") == 0);
    assert(strcmp(user->email, "alice@test.com") == 0);
    user_destroy(user);
}

void test_user_create_null_name(void) {
    User *user = user_create(NULL, "alice@test.com");
    assert(user == NULL);
}

int main(void) {
    test_user_create();
    test_user_create_null_name();
    printf("All tests passed\n");
    return 0;
}
```

---

## Best Practices

- **`const` everywhere.** Mark parameters, pointers, and locals as `const` whenever they don't need to be modified:
  ```c
  int user_validate(const User *user);
  const char *config_get(const Config *config, const char *key);
  ```

- **`size_t`** for sizes, lengths, and array indices.

- **`stdbool.h`** for `bool`, `true`, `false`.

- **`stdint.h`** types (`uint8_t`, `int32_t`, `uint64_t`) when the exact size matters.

- **No global mutable state.** Pass state through function parameters. Use `static` for file-local constants.

- **Keep functions short** — under 40 lines is ideal. If it's long, split it.

- **Avoid magic numbers.** Define constants with `#define` or `static const`:
  ```c
  #define MAX_USERNAME_LENGTH 64
  static const int DEFAULT_PORT = 8080;
  ```

- **Use `sizeof` on the variable, not the type:**
  ```c
  // Good — stays correct if the type changes
  User *user = malloc(sizeof(*user));

  // Fragile — must update if User is renamed
  User *user = malloc(sizeof(User));
  ```

- **Compile with multiple compilers** when possible (GCC and Clang) to catch different classes of warnings.
