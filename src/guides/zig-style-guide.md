---
title: Zig Style Guide
description: Coding conventions for all Zig code — CLI tools, libraries, and performance-critical utilities.
---

# Zig Style Guide

Coding conventions for all Zig code — CLI tools, libraries, and performance-critical utilities.

**Formatter:** `zig fmt` — run before every commit. Non-negotiable.

---

## Formatting

`zig fmt` handles all formatting. No configuration, no debate.

- **Indentation:** 4 spaces (enforced by `zig fmt`).
- **Line length:** No hard limit. Break long lines at logical boundaries.
- **Braces:** Opening brace on the same line.

```zig
fn process_data(allocator: Allocator, input: []const u8) ![]u8 {
    const result = try allocator.alloc(u8, input.len);
    errdefer allocator.free(result);

    @memcpy(result, input);
    return result;
}
```

---

## Naming Conventions

We use snake_case for everything except types and error values. This differs from the Zig standard library convention (which uses camelCase for functions) — we prefer snake_case for consistency across our entire stack.

| Identifier | Convention | Example |
|---|---|---|
| Files & directories | snake_case | `arg_parser.zig`, `string_utils.zig` |
| Variables | snake_case | `buffer_size`, `retry_count` |
| Constants | snake_case | `default_timeout`, `max_buffer` |
| Compile-time config | SCREAMING_SNAKE_CASE | `MAX_CONNECTIONS`, `DEBUG_MODE` |
| Functions | snake_case | `parse_arguments()`, `get_user_input()` |
| Types (structs, enums, unions) | PascalCase | `Config`, `TokenKind`, `Value` |
| Type parameters | PascalCase | `comptime T: type` |
| Error set values | PascalCase | `error.FileNotFound` |
| Enum fields | snake_case | `TokenKind.string_literal` |

### Types

```zig
const TokenKind = enum {
    identifier,
    string_literal,
    number_literal,
    open_paren,
    close_paren,
    eof,
};

const Config = struct {
    verbose: bool = false,
    output_path: ?[]const u8 = null,
    max_retries: u32 = 3,
};
```

### Error Sets

```zig
const ConfigError = error{
    FileNotFound,
    InvalidFormat,
    MissingField,
    PermissionDenied,
};
```

---

## Code Organization

### Imports

Group standard library imports first, then project-local imports. Alias long namespaces:

```zig
const std = @import("std");
const mem = std.mem;
const fs = std.fs;
const Allocator = mem.Allocator;
const ArrayList = std.ArrayList;

const config = @import("config.zig");
const parser = @import("parser.zig");
const Token = parser.Token;
```

### File Structure

Organize within a file:

1. Imports and aliases
2. Public types and constants
3. Public functions
4. Private helpers
5. Tests (`test` blocks at the bottom)

---

## Documentation

Use `///` for doc comments on public declarations. Use `//` for inline comments.

### Public Functions

```zig
/// Parses command-line arguments into a Config struct.
///
/// Caller owns the returned Config and must free any allocated
/// memory using the provided allocator.
pub fn parse_arguments(allocator: Allocator, args: []const []const u8) !Config {
    // ...
}
```

### Inline Comments

Explain **why**, not what:

```zig
// Skip the program name — first arg is always the executable path
const actual_args = args[1..];
```

---

## Memory Management

This is the most important section for Zig. Every allocation must be accounted for.

### Pair Allocations with `defer`

```zig
const data = try allocator.alloc(u8, 1024);
defer allocator.free(data);

// data is guaranteed to be freed when this scope exits
```

### Use `errdefer` for Error Paths

Clean up partially-constructed state if an error occurs later:

```zig
fn create_buffer(allocator: Allocator, size: usize) !Buffer {
    const data = try allocator.alloc(u8, size);
    errdefer allocator.free(data);

    const header = try allocator.create(Header);
    errdefer allocator.destroy(header);

    try init_buffer(header, data);
    return Buffer{ .header = header, .data = data };
}
```

### Accept Allocators as Parameters

Never use global allocators. Pass allocators through function parameters:

```zig
// Good — caller controls allocation
pub fn process_data(allocator: Allocator, input: []const u8) ![]u8 {
    // ...
}

// Bad — hidden global state
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
fn process_data(input: []const u8) ![]u8 {
    // uses global allocator
}
```

### Ownership Rules

- The function that allocates is responsible for documenting who owns the result.
- If a function returns allocated memory, document that the caller must free it.
- Use `defer` immediately after every allocation to make ownership visible.

---

## Error Handling

### Return Errors, Don't Panic

```zig
fn read_config(path: []const u8) !Config {
    const file = fs.cwd().openFile(path, .{}) catch |err| {
        return err;
    };
    defer file.close();
    // ...
}
```

### `try` for Propagation

Use `try` to propagate errors up the call stack without extra boilerplate:

```zig
fn load_settings(allocator: Allocator) !Settings {
    const raw = try read_file(allocator, "settings.json");
    defer allocator.free(raw);

    return try parse_settings(raw);
}
```

### `catch` for Recovery

Use `catch` when you can handle the error locally:

```zig
const config = load_config(allocator) catch |err| {
    std.log.warn("Failed to load config: {}, using defaults", .{err});
    return Config{};
};
```

---

## Testing

Write tests alongside the code using `test` blocks. They compile and run with `zig test`.

```zig
const expect = std.testing.expect;
const expectError = std.testing.expectError;

test "parse_arguments returns config for valid args" {
    const allocator = std.testing.allocator;
    const args = &[_][]const u8{ "program", "--verbose", "--output", "out.txt" };

    const config = try parse_arguments(allocator, args);
    try expect(config.verbose);
    try expect(mem.eql(u8, config.output_path.?, "out.txt"));
}

test "parse_arguments fails for missing required arg" {
    const allocator = std.testing.allocator;
    const args = &[_][]const u8{"program"};

    try expectError(error.MissingField, parse_arguments(allocator, args));
}
```

Use `std.testing.allocator` in tests — it detects memory leaks automatically.

---

## Best Practices

- **Slices over pointers.** Prefer `[]const u8` over `[*]const u8` when you know the length.

- **`comptime` for compile-time work.** Use it for generic programming and compile-time validation, but don't overuse it. Clarity beats cleverness:
  ```zig
  fn max(comptime T: type, a: T, b: T) T {
      return if (a > b) a else b;
  }
  ```

- **Tagged unions** for state machines and variant types:
  ```zig
  const Value = union(enum) {
      integer: i64,
      float: f64,
      string: []const u8,
      boolean: bool,
      nil,
  };
  ```

- **Sentinel-terminated slices** when interfacing with C:
  ```zig
  const c_string: [:0]const u8 = "hello";
  ```

- **Use `defer` liberally.** Open a file → `defer file.close()`. Allocate → `defer allocator.free()`. Lock a mutex → `defer mutex.unlock()`.

- **Avoid `@panic` in library code.** Return errors and let the caller decide how to handle them.

- **Keep functions small.** If a function is longer than a screenful, split it.
