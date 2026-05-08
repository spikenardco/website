---
title: 'flags.zig: Security Patch for Argument Injection'
date: '2026-02-24'
excerpt: 'A minor security fix for flags.zig addressing an edge case where unsanitized input could be passed through to subcommand handlers.'
tags: ['Changelog']
authors: ['Team']
draft: true
---

Quick update on flags.zig — we patched an edge case where unsanitized user input in quoted arguments could slip through the parser and reach subcommand handlers unescaped.

## What happened

When a flag value contained embedded shell metacharacters inside nested quotes, the parser would pass the raw value to the handler without stripping the outer quoting layer. In most use cases this is harmless, but if a downstream handler passes flag values to `std.process.exec`, it could allow unintended command execution.

## The fix

The parser now normalizes all quoted values before dispatching to handlers. Nested quotes are collapsed, and shell metacharacters are escaped by default. If you need raw values, use the new `.raw()` accessor on the flag result.

```zig
const val = result.flag("input").raw(); // unescaped
const safe = result.flag("input").value(); // normalized (default)
```

## Who's affected

Anyone using flags.zig `< 0.4.1` who passes flag values directly to process execution. Update with:

```bash
zig fetch --save "https://github.com/spikenardco/flags.zig/archive/v0.4.1.tar.gz"
```

If you're just reading flag values for config or display, you're fine.
