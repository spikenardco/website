---
title: The Case for Zero Dependencies
date: '2025-12-18'
excerpt: "Every dependency is a decision someone else made on your behalf. We think you should make fewer of those decisions unconsciously."
tags: ['Philosophy', 'Engineering']
authors: ['Team']
draft: true
---

When we shipped [monimejs](https://github.com/spikenardco/monimejs), our Monime payment SDK, it had zero runtime dependencies. No axios. No node-fetch. No lodash. Just our code and the platform APIs.

This wasn't an accident. It was a deliberate constraint, and it made the library better.

## The real cost of dependencies

A dependency isn't just a line in `package.json`. It's:

- **A supply chain risk.** Every package you install is code you're trusting to run in your application. The `event-stream` incident, the `colors.js` sabotage, the `ua-parser-js` malware — these aren't theoretical risks. They happened to packages with millions of weekly downloads.
- **A maintenance burden.** Dependencies release updates. Some are security patches you need to apply. Some are breaking changes you need to migrate. Some are both. The more dependencies you have, the more time you spend keeping up.
- **An opinion you're inheriting.** When you install axios, you're accepting its opinion about how HTTP requests should work — interceptors, transforms, default headers. Maybe those opinions align with yours. Maybe they don't. Either way, you're locked in.

## What we used instead

For monimejs, every feature came from the platform:

**HTTP requests:** `fetch()`. It's built into Node 18+, Deno, Bun, and every browser. It's standardized, well-documented, and sufficient for everything we needed. We didn't need axios's interceptors — we wrote a 20-line wrapper that handles retries and timeouts.

**Data validation:** TypeScript's type system at compile time, plus a handful of runtime checks (under 50 lines). We didn't need Zod or Yup — our validation surface is small and well-defined.

**Utilities:** JavaScript has `structuredClone`, `crypto.randomUUID`, `AbortController`, `URL`, and `URLSearchParams` built in. Five years ago, you needed polyfills and utility libraries for these. Today, they're standard.

## When to add a dependency

Zero dependencies isn't always the right call. We'd add one when:

1. **The problem is genuinely hard.** Cryptography, date math with timezones, image processing — these are domains where getting it wrong has real consequences. Use a well-maintained library.
2. **The code would be substantial.** If implementing it yourself means 500+ lines of tricky logic, a dependency that's been battle-tested by thousands of users is the better choice.
3. **The library is stable and well-maintained.** A dependency with a clear maintainer, regular releases, and a changelog you can follow is worth the trade-off.

The key word is *deliberate*. Every dependency should be a conscious choice with a clear reason, not a habit.

## The monimejs result

monimejs installs in under a second. It adds nothing to your `node_modules` except itself. When there's a security advisory, there's exactly one place to look — our code. When a user reports a bug, we don't have to figure out whether it's in our code or in a transitive dependency four levels deep.

The constraint forced us to write better code. Without axios, we had to understand `fetch` deeply — its edge cases, its error handling, its streaming behavior. Without lodash, we had to think about whether we actually needed `_.get` or whether optional chaining (`?.`) was enough (it was).

## Try the constraint

Next time you reach for `npm install`, ask: *can I do this with what's already here?* You'll be surprised how often the answer is yes. And when it's no, you'll have a much clearer understanding of why you actually need that package.
