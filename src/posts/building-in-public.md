---
title: Building in Public
date: '2026-01-15'
excerpt: "We open-source everything from the first commit. Not because it's trendy — because public code stays honest."
tags: ['Philosophy', 'Open Source']
authors: ['Team']
draft: false
---

Every Spikenard project starts as a public repository. Not after it's polished. Not after the README is perfect. The first commit is public. The ugly scaffolding is public. The commit messages that say "fix the thing" are public.

This makes some people uncomfortable. We think that's the point.

## Private code rots

We've all seen it. A private repo that starts clean, then slowly accumulates shortcuts, TODO comments, and "temporary" workarounds that last three years. Nobody's watching, so nobody cares.

Public code doesn't rot the same way. When your code is visible, you write it differently. Not because you're performing — because you know someone might actually read it. That slight pressure is enough to keep things honest.

## The ego problem

The biggest barrier to building in public isn't technical. It's ego. Nobody wants to push code that's half-finished, or a commit that breaks the build, or a design decision they'll reverse in two weeks.

We got over it by accepting a simple truth: *every codebase looks like that*. The difference is whether you pretend it doesn't. Our commit history is full of false starts and reversed decisions. That's not failure — that's the actual process of building software.

## What we've gained

Since going public-by-default, three things happened:

**Better documentation.** When you know someone outside your team might read the code, you write better READMEs, clearer function names, and more useful comments. Not because documentation is fun, but because public code without docs is useless.

**Unexpected contributions.** Our [flags.zig](https://github.com/spikenardco/flags.zig) library got its best error messages from a contributor we'd never met. They opened an issue describing a confusing error they hit, then submitted a PR that fixed it. That wouldn't have happened with a private repo.

**Accountability.** When our work is visible, we can't quietly abandon a project. If we said we'd build something, there's a public record. That's kept us focused on finishing what we start instead of chasing new ideas every week.

## The exception

We're not absolutists. API keys, deployment configs, and anything security-sensitive stays private. Building in public doesn't mean being careless — it means defaulting to open and making a deliberate choice when something needs to be closed.

## Try it

If you've never built in public, start with your next side project. Push the first commit before it's ready. Write the README before you write the code. You'll feel exposed for about a day. After that, you'll wonder why you ever built any other way.
