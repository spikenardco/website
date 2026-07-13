---
title: Why We Chose Zig for Our CLI Tools
date: '2026-02-20'
excerpt: "We needed a language that gave us control without ceremony. Zig turned out to be exactly that — and building flags.zig proved it."
tags: ['Engineering']
authors: ['Team']
draft: true
---

When we started building **flags.zig**, we had a simple goal: a command-line argument parser that was type-safe, had zero runtime overhead, and didn't pull in half the internet as dependencies.

We'd used Rust's clap before. It's excellent, arguably the gold standard for CLI parsing. But clap is a big dependency. For a small tool, you're adding megabytes of compile time for something that should be trivial. We wanted that level of ergonomics in something leaner.

## Why not Rust, Go, or C?

**Rust** was the obvious choice. We like Rust. But the compile times for even small CLI tools were frustrating during development, and the borrow checker — while valuable — felt like overhead for programs that parse args, do a thing, and exit. Lifetimes matter less when your program lives for 200 milliseconds.

**Go** compiles fast and the tooling is great, but Go's type system doesn't let you express "parse these flags into this struct at compile time." You end up with runtime reflection and string-based lookups. The `flag` package works but it's verbose and error-prone.

**C** would give us the control we wanted, but we'd spend more time managing memory than building features. In 2026, we don't think that trade-off makes sense for new tools.

## What Zig gives us

Zig's comptime is the killer feature. In flags.zig, you define your CLI interface as a struct:

```zig
const Args = struct {
    name: []const u8 = "world",
    age: u32 = 25,
    verbose: bool = false,
};
```

The parser reads this struct *at compile time*, generates the parsing code, and gives you back a typed result. No reflection. No code generation step. No macros. Just the type system doing what type systems should do.

If you add a field to the struct and forget to handle it, the compiler tells you. If you pass the wrong type, the compiler tells you. The entire parser is about 800 lines of Zig with zero external dependencies.

## The TigerBeetle influence

We took direct inspiration from TigerBeetle's internal flags implementation. Their approach showed us that Zig's comptime could replace what clap does with procedural macros — but without the complexity. We expanded on their pattern by adding subcommand support via `union(enum)`, slice parsing for repeated flags, and better error messages.

## What we learned

Building flags.zig taught us that the right tool for a job isn't always the most popular one. Zig has a smaller ecosystem than Rust or Go, but for systems-level CLI tools, its comptime model produces code that's both more correct and more readable than the alternatives.

We're now using Zig for **tip** (our password manager) as well. The same principles apply — when your tool handles sensitive data, you want a language where you can reason about every allocation and every byte.

If you're building CLI tools and haven't tried Zig, give it a look. The documentation is sparse and the community is small, but the language itself is well-designed.
