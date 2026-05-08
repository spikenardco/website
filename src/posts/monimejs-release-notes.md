---
title: 'monimejs: Changelog'
date: '2026-02-27'
excerpt: 'Release notes for monimejs, including breaking changes and migration steps.'
tags: ['Changelog']
authors: ['Team']
draft: false
---

This page tracks notable monimejs changes. Each release includes a short summary first, followed by concrete changes and migration notes.

1. Update the package to latest:
   ```bash
   npm install monimejs@latest
   ```

2. Simple initialization:
   ```js
   const client = new MonimeClient({
     spaceId: 'spc-your-space-id',
     accessToken: 'your-access-token',
     timeout: 30_000, // optional timeout in milliseconds
   });
   ```


## 2026-02-27 _(v0.0.3)_

This release changes how the package is authored internally. The SDK source moved from TypeScript to JavaScript with JSDoc typing, while preserving the public developer experience for TypeScript users.
> **[check the PR here](https://github.com/spikenardco/monimejs/pull/11)**

#### Added

- No new public API surface was added in this release

#### Changed

- Internal codebase migrated from TypeScript to JavaScript + JSDoc
- Build and type generation are now maintained in `index.d.ts` file

#### Error Handling

- No error-handling behavior changes in this release

#### What's Removed

- removed the changeset packages _(we hardly used them)_
- removed the `dts-bundle-generator` package

### Migration Guide

- No migration steps are necessary for users

## 2026-01-15

This is the initial public release of `monimejs`.

### Added

- `MonimeClient` class-based client initialization with a single options
- Core payment modules including payment code creation, payment lookup, and financial transaction operations

### Changed

- Not necessary for this release. This was the first public version.

### Error Handling

`monimejs` throws SDK error types. API failures from Monime are exposed via `MonimeApiError`, including Monime-provided error details.

```javascript
import { MonimeClient, MonimeApiError, MonimeValidationError, MonimeNetworkError, MonimeTimeoutError } from "monimejs";

const client = new MonimeClient({
  spaceId: "spc-your-space-id",
  accessToken: "your-access-token",
});

try {
  const { result } = await client.paymentCode.create({
    name: "Order #1234",
    amount: { currency: "SLE", value: 1000 },
  });
} catch (err) {
  if (err instanceof MonimeValidationError) {
    console.log("Validation failed:", err.issues);
  } else if (err instanceof MonimeApiError) {
    // Monime API response details are available here
    console.log("API error:", err.code, err.reason);
    if (err.isRetryable) {
      // safe to retry
    }
  } else if (err instanceof MonimeNetworkError) {
    console.log("Network error:", err.cause);
  } else if (err instanceof MonimeTimeoutError) {
    console.log("Request timed out:", err.timeout, err.url);
  }
}
```
> Catch typed SDK errors (`MonimeApiError`, `MonimeValidationError`, `MonimeNetworkError`, `MonimeTimeoutError`) when handling failures.

### What's Removed

- Not necessary for this release. This was the first public version.

### Migration Guide

- Not necessary for this release. This was the first public version.
