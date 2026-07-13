---
title: 'The art of the README'
date: '2026-03-18'
excerpt: 'A README is the front door to your project. We have a simple framework for writing ones that actually help people.'
tags: ['Open Source', 'Engineering']
authors: ['Team']
draft: true
---

You can tell a lot about a project by its README. Not the code quality. The care. A good README says: we respect your time, and we've thought about what you need to know. A bad one says: figure it out yourself.

We've open-sourced enough projects now to have opinions about this. Here's how we approach it.

## The 30-second rule

Someone lands on your repository. They have 30 seconds of attention. In that window, your README needs to answer three questions:

1. **What is this?** One sentence. Not a paragraph, not a mission statement. One clear sentence.
2. **Why would I use it?** The problem it solves or the value it provides. Again, keep it tight.
3. **How do I start?** An install command and a minimal usage example.

If your README answers those three questions above the fold, you've done 80% of the work. Everything else is a bonus.

## Show, don't describe

The biggest mistake we see in READMEs is describing what the code does instead of showing it. "This library provides a type-safe, performant, extensible framework for..." — nobody reads that. They skim it and bounce.

What works is a code example. Three to five lines showing the most common use case. When we wrote the README for flags.zig, we put a working example before any explanation:

```zig
const flags = comptime Flags(union(enum) {
    verbose: bool,
    output: []const u8,
});
const result = flags.parse(std.os.argv[1..]);
```

That tells you more about the library than any paragraph could. If the example looks like what you need, you keep reading. If it doesn't, you move on. Either way, nobody's time is wasted.

## Structure that scales

For small projects (a single-purpose library, a CLI tool), we use a flat structure:

- **One-line description** — what it is
- **Install** — how to get it
- **Usage** — the common case, with code
- **API** — if applicable, the full reference
- **License** — always

For larger projects, we add sections as needed: configuration, contributing guidelines, architecture overview. But we never add sections preemptively. A README should grow with the project, not ahead of it.

The worst READMEs are the ones generated from templates with empty sections. "## Contributing: TODO" tells people you didn't finish. It's worse than having no section at all.

## Write it first

We mentioned this in [From Side Project to Shipped](/blog/from-side-project-to-shipped), but it bears repeating: write the README before writing the code. Or at least, write the usage section.

When you write the example code before the implementation, you're designing the API from the user's perspective. You'll catch awkward interfaces, confusing naming, and unnecessary complexity before you've written a single line of real code.

It's the cheapest form of user testing that exists.

## Keep it honest

Don't oversell. If your project is experimental, say so. If it's missing features, list them. If there are known bugs, acknowledge them.

People appreciate honesty in a README. It builds trust. "This library handles X well but doesn't yet support Y" is infinitely more useful than pretending Y doesn't exist.

Our READMEs include a "Status" line for early-stage projects. Something like: "Early development. API may change. Not recommended for production use." It takes five seconds to add and saves everyone headaches.

## A README is a product

We think of READMEs as products in their own right. They have users (developers evaluating your project), a job to be done (help them decide and get started), and a quality bar (clear, honest, and complete).

When we evaluate other people's open-source projects, the README is the first thing we look at — before the code, before the tests, before the issues. It's the front door. Make it count.
