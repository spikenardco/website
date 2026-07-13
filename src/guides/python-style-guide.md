---
title: Python Style Guide
description: Coding conventions for all Python code — scripts, automation, data pipelines, and prototypes.
---

# Python Style Guide

Coding conventions for all Python code — scripts, automation, data pipelines, and prototypes.

**Formatter/Linter:** [Ruff](https://docs.astral.sh/ruff/) — replaces Black, isort, and flake8 in a single tool. Run before every commit.
**Version:** Python 3.11+ (use modern syntax).

---

## Formatting

Ruff handles all formatting. Configure it once and don't override it per-file.

- **Indentation:** 4 spaces.
- **Line length:** 88 characters (Ruff/Black default).
- **Quotes:** Double quotes for strings.
- **Trailing commas:** Always in multi-line structures.

```python
# Ruff formats this automatically
user = {
    "name": "Alice",
    "email": "alice@example.com",
    "roles": ["admin", "editor"],
}
```

---

## Naming Conventions

| Identifier | Convention | Example |
|---|---|---|
| Files & directories | snake_case | `user_service.py`, `utils/` |
| Test files | snake_case with `test_` prefix | `test_user_service.py` |
| Variables | snake_case | `user_data`, `retry_count` |
| Functions | snake_case | `get_user()`, `validate_input()` |
| Booleans | snake_case with `is_`/`has_`/`should_` | `is_valid`, `has_access` |
| Constants (module-level) | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| Classes | PascalCase | `UserService`, `OrderProcessor` |
| Private members | `_` prefix | `_parse_response()`, `_cache` |
| Type variables | PascalCase | `T`, `ItemType` |

---

## Code Organization

### Import Order

Three groups, separated by blank lines (Ruff enforces this):

1. Standard library
2. Third-party packages
3. Local/project imports

```python
import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

from config import settings
from utils.helpers import format_date
```

### Rules

- Absolute imports over relative imports.
- No wildcard imports (`from module import *`).
- One import per line for top-level modules. Grouped imports from the same package are fine:
  ```python
  from datetime import datetime, timedelta
  ```

### File Structure

Organize files in this order:

1. Module docstring
2. Imports
3. Constants
4. Type definitions / data classes
5. Functions / classes
6. `if __name__ == "__main__":` block (scripts only)

```python
"""Utility functions for date formatting and timezone conversion."""

from datetime import datetime, timezone

DEFAULT_FORMAT = "%Y-%m-%d %H:%M:%S"
UTC = timezone.utc


def format_date(dt: datetime, fmt: str = DEFAULT_FORMAT) -> str:
    """Formats a datetime object as a string."""
    return dt.strftime(fmt)


def now_utc() -> datetime:
    """Returns the current UTC time."""
    return datetime.now(UTC)
```

---

## Documentation

Use docstrings to document modules, classes, and public functions. Follow **Google-style** docstrings.

### Functions

```python
def fetch_user(user_id: str, include_orders: bool = False) -> dict:
    """Fetches user data from the API.

    Args:
        user_id: The unique identifier of the user.
        include_orders: Whether to include the user's order history.

    Returns:
        A dictionary containing the user's profile data.

    Raises:
        NotFoundError: If the user does not exist.
        ApiError: If the API request fails.
    """
```

### Classes

```python
class OrderProcessor:
    """Processes incoming orders and dispatches them to fulfillment.

    Handles validation, payment verification, and inventory checks
    before marking an order as confirmed.

    Attributes:
        db: Database connection instance.
        max_retries: Maximum retry attempts for failed operations.
    """

    def __init__(self, db: Database, max_retries: int = 3):
        self.db = db
        self.max_retries = max_retries
```

### Modules

Every module with non-obvious purpose gets a docstring at the top:

```python
"""CLI tool for migrating user data between database versions.

Usage:
    python migrate_users.py --source old.db --target new.db
"""
```

### Inline Comments

Explain **why**, not what:

```python
# Cap at 100 to stay within the API provider's rate limit
page_size = min(requested_size, 100)
```

---

## Type Hints

Use type hints for all function signatures. Optional for local variables where the type is obvious.

### Modern Syntax (3.11+)

```python
def get_user(user_id: str) -> User | None:
    ...

def process_items(items: list[str], limit: int = 10) -> list[dict]:
    ...

def merge_configs(*configs: dict[str, str]) -> dict[str, str]:
    ...
```

Use `str | None` (not `Optional[str]`), `list[str]` (not `List[str]`), `dict[str, int]` (not `Dict[str, int]`).

Use `typing` only for complex types that can't be expressed with built-ins:

```python
from typing import TypeAlias, Callable

Handler: TypeAlias = Callable[[Request], Response]
```

---

## Error Handling

### Be Specific

Catch specific exceptions. Never use bare `except`:

```python
# Good
try:
    data = fetch_data(url)
except requests.Timeout:
    logger.warning(f"Request timed out: {url}")
    return None
except requests.RequestException as e:
    logger.error(f"Request failed: {e}")
    raise

# Bad
try:
    data = fetch_data(url)
except:
    pass
```

### Custom Exceptions

Define clear, specific exception types for your domain:

```python
class AppError(Exception):
    """Base exception for application errors."""

class NotFoundError(AppError):
    """Raised when a requested resource does not exist."""

class ValidationError(AppError):
    """Raised when input validation fails."""
```

### Guard Clauses

Return or raise early instead of nesting deeply:

```python
# Good
def process_order(order: Order) -> None:
    if order is None:
        raise ValueError("Order is required")
    if order.status != "pending":
        return
    # main logic here

# Bad
def process_order(order: Order) -> None:
    if order is not None:
        if order.status == "pending":
            # main logic buried in nesting
            ...
```

---

## Testing

**Runner:** `pytest`

### File Naming

Test files use the `test_` prefix: `user_service.py` → `test_user_service.py`

### Structure

```python
import pytest
from myapp.services import UserService, NotFoundError


class TestUserService:
    def setup_method(self):
        self.service = UserService(db=MockDB())

    def test_get_user_returns_user_for_valid_id(self):
        user = self.service.get_user("123")
        assert user is not None
        assert user.id == "123"

    def test_get_user_raises_not_found_for_invalid_id(self):
        with pytest.raises(NotFoundError):
            self.service.get_user("nonexistent")

    def test_create_user_stores_and_returns_user(self):
        user = self.service.create_user(name="Alice", email="alice@test.com")
        assert user.name == "Alice"
        assert user.email == "alice@test.com"
```

### Fixtures

Use `pytest` fixtures for shared setup:

```python
@pytest.fixture
def db():
    database = create_test_db()
    yield database
    database.close()

@pytest.fixture
def service(db):
    return UserService(db=db)

def test_get_user(service):
    user = service.get_user("123")
    assert user.name == "Alice"
```

---

## Best Practices

- **f-strings** for string formatting:
  ```python
  message = f"User {user.name} created at {user.created_at}"
  ```

- **`pathlib.Path`** over `os.path`:
  ```python
  config_path = Path("config") / "settings.json"
  content = config_path.read_text()
  ```

- **Context managers** for resource handling:
  ```python
  with open("data.json") as f:
      data = json.load(f)
  ```

- **Comprehensions** when readable. Loops when not:
  ```python
  # Good — clear
  names = [user.name for user in users if user.is_active]

  # Bad — unreadable
  result = {k: [x.val for x in v if x.ok] for k, v in groups.items() if v}
  ```

- **Data classes** for structured data:
  ```python
  from dataclasses import dataclass

  @dataclass
  class User:
      id: str
      name: str
      email: str
      is_active: bool = True
  ```

- **`uv`** for package management and virtual environments. Never install packages globally.

- **`if __name__ == "__main__":`** for scripts that should also be importable:
  ```python
  def main():
      ...

  if __name__ == "__main__":
      main()
  ```

- **No mutable default arguments:**
  ```python
  # Good
  def process(items: list[str] | None = None) -> None:
      items = items or []

  # Bad — shared mutable default
  def process(items: list[str] = []) -> None:
      ...
  ```
