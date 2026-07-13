---
title: JavaScript Style Guide
description: Coding conventions for all JavaScript and TypeScript code — frontend, backend, and tooling.
---

# JavaScript Style Guide

Coding conventions for all JavaScript and TypeScript code — frontend, backend, and tooling.

**Formatter:** [Biome](https://biomejs.dev/) — handles both formatting and linting. Run before every commit.
**Modules:** ES Modules only. No CommonJS in new code.
**TypeScript:** Optional. When used, enable `"strict": true`. Drop it if the types add noise instead of clarity.

---

## Formatting

- **Indentation:** Tabs.
- **Semicolons:** No semicolons — Biome enforces this.
- **Quotes:** Double quotes for strings.
- **Trailing commas:** Always, in multi-line structures (arrays, objects, function parameters).
- **Line length:** Let Biome handle wrapping. Aim for readability, not a hard character limit.
- **Braces:** Always use braces for `if`, `for`, `while`, even for single-line bodies.

```js
// Good
if (is_valid) {
	process(data)
}

// Bad
if (is_valid) process(data)
```

---

## Naming Conventions

| Identifier | Convention | Example |
|---|---|---|
| Files & directories | kebab-case | `user-service.js`, `api-client.ts` |
| Variables | snake_case | `user_data`, `retry_count` |
| Functions | snake_case | `get_user()`, `validate_input()` |
| Library exports (public API) | camelCase | `export function getUser()` |
| Booleans | snake_case with `is_`/`has_`/`should_` prefix | `is_loading`, `has_access` |
| Constants (module-level) | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| Constants (local) | snake_case | `const user_name = "alice"` |
| Classes | PascalCase | `UserService`, `OrderController` |
| Type aliases / Interfaces (TS) | PascalCase | `UserProfile`, `ApiResponse` |
| Enum members (TS) | PascalCase | `OrderStatus.Pending` |
| Event handlers | snake_case with `handle_` prefix | `handle_click()`, `handle_submit()` |
| Private/internal | snake_case with `_` prefix | `_parse_response()` |

### Files & Directories

```
user-service.js       # modules
data-fetcher.ts       # TypeScript variant
config.js             # configuration
config/index.js       # config directory
__tests__/            # test directories (colocated or separate)
user-service.test.js  # test files
```

### Variables & Functions

```js
const user_data = await fetch_user(user_id)
const is_authenticated = check_auth(token)
let retry_count = 0

function get_user_profile(user_id) {
	const cached_result = cache.get(user_id)
	if (cached_result) {
		return cached_result
	}
	return fetch_from_api(user_id)
}
```

Use verbs for functions that perform actions: `get_`, `set_`, `create_`, `delete_`, `validate_`, `handle_`, `fetch_`, `parse_`, `format_`.

### Library Exports (camelCase Exception)

When building a library or SDK that external consumers will use, exported public API functions use camelCase. This matches the conventions consumers expect from the JS ecosystem. Internal code within the library still uses snake_case.

```js
// lib/index.js — public API (camelCase for consumers)
export function getUser(user_id) {
	return fetch_user_from_db(user_id)
}

export function createSession(user_id, options) {
	const validated_options = validate_options(options)
	return build_session(user_id, validated_options)
}

// lib/internal/db.js — internal code (snake_case as usual)
export function fetch_user_from_db(user_id) {
	const query_result = db.query("SELECT * FROM users WHERE id = ?", [user_id])
	return format_user(query_result)
}
```

This only applies to the **exported surface area** of libraries and SDKs. Application code, internal modules, APIs, frontends, and scripts all use snake_case everywhere.

### Classes

```js
class UserService {
	constructor(api_client) {
		this.api_client = api_client
	}

	async get_user(user_id) {
		return this.api_client.get(`/users/${user_id}`)
	}
}
```

---

## Code Organization

### Import Order

Group imports in this order, separated by blank lines:

1. Node.js built-ins (prefixed with `node:`)
2. Third-party packages
3. Internal/project modules (aliases like `$lib`, `@/`, etc.)
4. Relative imports

```js
import fs from "node:fs"
import path from "node:path"

import { Hono } from "hono"
import { cors } from "hono/cors"

import { db } from "$lib/server/db"
import { validate_token } from "$lib/server/auth"

import { format_date } from "./utils.js"
import config from "./config.js"
```

### File Structure

Organize files in this order:

1. Imports
2. Constants and configuration
3. Type definitions (TypeScript)
4. Main logic (functions, classes, exports)

```js
// 1. Imports
import { db } from "$lib/server/db"

// 2. Constants
const MAX_PAGE_SIZE = 100
const DEFAULT_PAGE_SIZE = 20

// 3. Main logic
export function get_users(page = 1, limit = DEFAULT_PAGE_SIZE) {
	const safe_limit = Math.min(limit, MAX_PAGE_SIZE)
	return db.select().from(users).limit(safe_limit).offset((page - 1) * safe_limit)
}
```

---

## Documentation

Use JSDoc to document exported functions, complex logic, and module purpose. Don't document the obvious.

### Function Documentation

```js
/**
 * Fetches a user by ID from the database.
 * @param {string} user_id - The unique user identifier.
 * @returns {Promise<Object|null>} The user object, or null if not found.
 */
async function get_user(user_id) {
	// ...
}
```

### Constants

```js
/** Maximum number of retry attempts for failed API requests. */
const MAX_RETRIES = 3
```

### Inline Comments

Use sparingly. Explain **why**, not what:

```js
// Offset by 1 because the API uses 1-based pagination
const api_page = page + 1
```

> Reference: [JSDoc documentation](https://jsdoc.app/)

---

## Error Handling

### Async/Await

Always use `try`/`catch` with async operations. Never let promises reject silently.

```js
async function fetch_user(user_id) {
	try {
		const response = await api.get(`/users/${user_id}`)
		return response.data
	} catch (error) {
		if (error.status === 404) {
			return null
		}
		throw error
	}
}
```

### Custom Errors

For APIs and services, define clear error types:

```js
class NotFoundError extends Error {
	constructor(resource, id) {
		super(`${resource} not found: ${id}`)
		this.name = "NotFoundError"
		this.status = 404
	}
}
```

### Guard Clauses

Return early for invalid states. Don't nest deeply.

```js
// Good — early return
function process_order(order) {
	if (!order) {
		throw new Error("Order is required")
	}
	if (order.status !== "pending") {
		return
	}
	// main logic here
}

// Bad — deeply nested
function process_order(order) {
	if (order) {
		if (order.status === "pending") {
			// main logic buried in nesting
		}
	}
}
```

---

## Testing

**Runner:** [Vitest](https://vitest.dev/)

### File Naming

Test files mirror the source file with a `.test.js` or `.test.ts` suffix:
`user-service.js` → `user-service.test.js`

### Structure

Use `describe` blocks to group related tests. Use `it` for individual test cases. Test names should read as sentences.

```js
import { describe, it, expect } from "vitest"
import { validate_email } from "./validate-email.js"

describe("validate_email", () => {
	it("accepts a valid email address", () => {
		expect(validate_email("user@example.com")).toBe(true)
	})

	it("rejects a string without an @ sign", () => {
		expect(validate_email("invalid")).toBe(false)
	})

	it("rejects an empty string", () => {
		expect(validate_email("")).toBe(false)
	})
})
```

---

## Best Practices

- **`const` by default.** Use `let` only when reassignment is necessary. Never use `var`.

- **Strict equality.** Always use `===` and `!==`.

- **Template literals** over string concatenation:
  ```js
  const message = `Hello, ${user_name}. You have ${count} notifications.`
  ```

- **Destructuring** for cleaner access to object properties:
  ```js
  const { name, email, role } = user
  ```

- **Optional chaining and nullish coalescing:**
  ```js
  const city = user?.address?.city ?? "Unknown"
  ```

- **Small, single-responsibility functions.** If a function does more than one thing, split it.

- **Default exports** only for modules that export a single thing. Prefer named exports otherwise:
  ```js
  // Good — named exports for multiple things
  export function get_user() { ... }
  export function create_user() { ... }

  // Fine — single default export
  export default class UserService { ... }
  ```

- **No magic numbers.** Extract unnamed values into named constants:
  ```js
  // Bad
  if (password.length < 8) { ... }

  // Good
  const MIN_PASSWORD_LENGTH = 8
  if (password.length < MIN_PASSWORD_LENGTH) { ... }
  ```

- **Array methods** over manual loops when the intent is clear:
  ```js
  const active_users = users.filter(u => u.is_active)
  const names = users.map(u => u.name)
  const total = items.reduce((sum, item) => sum + item.price, 0)
  ```
