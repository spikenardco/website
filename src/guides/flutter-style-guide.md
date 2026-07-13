---
title: Flutter Style Guide
description: Coding conventions for all Flutter and Dart code.
---

# Flutter Style Guide

Coding conventions for all Flutter and Dart code. Flutter is our cross-platform mobile framework. Dart is the language it runs on. The rules below cover both.

**Formatter:** `dart format` — run before every commit. Non-negotiable.
**Analyzer:** `dart analyze` in CI. Zero warnings policy.

---

## Formatting

`dart format` handles all formatting decisions.

- **Indentation:** 2 spaces (enforced by the formatter).
- **Line length:** 80 characters (formatter default).
- **Trailing commas:** Always add trailing commas in multi-line argument lists, collections, and parameters. This gives better diffs and lets the formatter break lines properly.

```dart
// With trailing comma — formatter breaks it nicely
const UserCard({
  super.key,
  required this.user,
  required this.onTap,
});

// Without trailing comma — formatter keeps it on one line (often too long)
const UserCard({super.key, required this.user, required this.onTap});
```

---

## Naming Conventions

| Identifier | Convention | Example |
|---|---|---|
| Files & directories | snake_case | `user_service.dart`, `home_screen.dart` |
| Test files | snake_case with `_test` suffix | `user_service_test.dart` |
| Variables & parameters | camelCase | `userData`, `retryCount` |
| Functions & methods | camelCase | `getUserProfile()`, `validateEmail()` |
| Booleans | camelCase with `is`/`has`/`should` prefix | `isLoading`, `hasPermission` |
| Constants | lowerCamelCase | `defaultTimeout`, `maxRetryCount` |
| Classes | PascalCase | `UserService`, `HomeScreen` |
| Enums (type) | PascalCase | `OrderStatus` |
| Enum values | camelCase | `OrderStatus.pending` |
| Private members | `_` prefix | `_client`, `_parseResponse()` |
| Named parameters | camelCase | `required String userId` |
| Type parameters | single uppercase letter or PascalCase | `T`, `E`, `ItemType` |

### Files & Directories

```
lib/
  core/
    config.dart
    constants.dart
  features/
    auth/
      auth_service.dart
      auth_screen.dart
      widgets/
        login_form.dart
  models/
    user.dart
    order.dart
test/
  features/
    auth/
      auth_service_test.dart
```

### Enums

PascalCase for the type, camelCase for values:

```dart
enum OrderStatus {
  pending,
  processing,
  completed,
  cancelled;

  bool get isTerminal => this == completed || this == cancelled;
}
```

---

## Code Organization

### Import Order

Five groups, separated by blank lines:

1. Dart SDK
2. Flutter SDK
3. Third-party packages
4. Project packages (absolute)
5. Relative imports

```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

import 'package:myapp/core/config.dart';
import 'package:myapp/features/auth/auth_service.dart';

import 'widgets/user_card.dart';
```

### Class Structure

Organize class members in this order:

1. Static constants and fields
2. Instance fields
3. Constructors
4. `build` method (widgets)
5. Public methods
6. Private methods

```dart
class UserService {
  static const _baseUrl = 'https://api.example.com';

  final http.Client _client;
  final String _apiKey;

  UserService(this._client, this._apiKey);

  Future<User> getUser(String id) async {
    final response = await _client.get(
      Uri.parse('$_baseUrl/users/$id'),
      headers: _buildHeaders(),
    );
    return _parseUser(response);
  }

  Map<String, String> _buildHeaders() {
    return {'Authorization': 'Bearer $_apiKey'};
  }

  User _parseUser(http.Response response) {
    return User.fromJson(jsonDecode(response.body));
  }
}
```

---

## Documentation

Use `///` for documentation comments on public APIs. Use `//` for inline comments.

### Classes

```dart
/// A service that handles user authentication and session management.
///
/// Provides methods for login, logout, and token refresh.
/// Tokens are automatically persisted to secure storage.
class AuthService {
  // ...
}
```

### Functions

```dart
/// Fetches a user by [userId] from the API.
///
/// Returns `null` if the user does not exist.
/// Throws [HttpException] if the request fails.
Future<User?> fetchUser(String userId) async {
  // ...
}
```

Reference parameters and types with square brackets: `[userId]`, `[User]`, `[HttpException]`.

### Inline Comments

Explain **why**, not what:

```dart
// Use exponential backoff to avoid overwhelming the server after an outage
await Future.delayed(Duration(seconds: 1 << attempt));
```

---

## Flutter Widget Conventions

### Widget Structure

```dart
class UserCard extends StatelessWidget {
  final User user;
  final VoidCallback onTap;

  const UserCard({
    super.key,
    required this.user,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                user.name,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 4),
              Text(user.email),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Rules

- **`const` constructors** wherever possible. Mark widgets `const` if all fields are final and the constructor allows it.
- **Named parameters** for any widget with more than one argument.
- **Keep `build` methods lean.** If a section of the widget tree is complex, extract it into a private method or a separate widget.
- **Composition over inheritance.** Don't extend `StatelessWidget` subclasses to add behavior — compose them.
- **`StatelessWidget` by default.** Only use `StatefulWidget` when you need local mutable state that can't be managed by a state management solution.

### Extracting Widgets

If your `build` method has more than ~3 levels of nesting, extract subtrees:

```dart
// Good — extracted into a method
@override
Widget build(BuildContext context) {
  return Column(
    children: [
      _buildHeader(),
      _buildContent(),
      _buildActions(),
    ],
  );
}

Widget _buildHeader() {
  return Row(
    children: [
      CircleAvatar(backgroundImage: NetworkImage(user.avatar)),
      const SizedBox(width: 12),
      Text(user.name),
    ],
  );
}
```

---

## Error Handling

### Async Operations

Use `try`/`catch` for operations that can fail. Be specific about what you catch:

```dart
Future<User?> getUser(String id) async {
  try {
    final response = await _client.get(Uri.parse('$_baseUrl/users/$id'));
    if (response.statusCode == 404) return null;
    return User.fromJson(jsonDecode(response.body));
  } on http.ClientException catch (e) {
    throw ApiException('Failed to fetch user: $e');
  }
}
```

### Null Safety

Use Dart's null safety. Avoid the `!` bang operator unless the value is guaranteed non-null by construction:

```dart
// Good — null-aware operators
final name = user?.name ?? 'Unknown';
final count = items?.length ?? 0;

// Acceptable — guaranteed non-null after a null check
if (user != null) {
  print(user.name); // safe, flow analysis knows it's non-null
}

// Bad — dangerous
final name = user!.name; // crashes if null
```

---

## Testing

**Runner:** `flutter test` (built-in)

### Structure

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:myapp/features/auth/auth_service.dart';

void main() {
  group('AuthService', () {
    late AuthService service;

    setUp(() {
      service = AuthService(MockClient());
    });

    test('returns user for valid credentials', () async {
      final user = await service.login('user@test.com', 'password');
      expect(user, isNotNull);
      expect(user!.email, equals('user@test.com'));
    });

    test('returns null for invalid credentials', () async {
      final user = await service.login('wrong@test.com', 'wrong');
      expect(user, isNull);
    });
  });
}
```

### Widget Tests

```dart
testWidgets('UserCard displays name and email', (tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: UserCard(
        user: User(name: 'Alice', email: 'alice@test.com'),
        onTap: () {},
      ),
    ),
  );

  expect(find.text('Alice'), findsOneWidget);
  expect(find.text('alice@test.com'), findsOneWidget);
});
```

---

## Best Practices

- **`final` by default.** Only use `var` when the variable will be reassigned. Never use `dynamic` unless interfacing with untyped data.

- **`async`/`await`** over raw `Future.then()` chains.

- **Pattern matching** (Dart 3+) for exhaustive switches:
  ```dart
  final label = switch (status) {
    OrderStatus.pending => 'Pending',
    OrderStatus.processing => 'In Progress',
    OrderStatus.completed => 'Done',
    OrderStatus.cancelled => 'Cancelled',
  };
  ```

- **Records and destructuring** for returning multiple values:
  ```dart
  (String name, int age) parseUser(Map<String, dynamic> data) {
    return (data['name'] as String, data['age'] as int);
  }
  ```

- **Sealed classes** for representing a finite set of subtypes:
  ```dart
  sealed class Result<T> {}
  class Success<T> extends Result<T> { final T data; Success(this.data); }
  class Failure<T> extends Result<T> { final String error; Failure(this.error); }
  ```

- **String interpolation** over concatenation:
  ```dart
  final message = 'Hello, ${user.name}. You have $count notifications.';
  ```

- **Collection literals** over constructors:
  ```dart
  // Good
  final items = <String>[];
  final map = <String, int>{};

  // Bad
  final items = List<String>();
  final map = Map<String, int>();
  ```
