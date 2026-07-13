---
title: Why We Built Our Own Password Manager
date: '2026-01-05'
excerpt: "We didn't build tip because existing password managers are bad. We built it because we wanted to understand every line between our passwords and the outside world."
tags: ['Engineering']
authors: ['Team']
draft: true
---

This is going to sound reckless: we built our own password manager. In Zig. From scratch.

Before you close the tab, we know. "Don't roll your own crypto" is the first commandment of security engineering, and for good reason. Most homegrown security tools are disasters waiting to happen. But tip isn't a general-purpose password manager competing with 1Password. It's a personal tool built to solve a specific problem, and building it taught us more about security than any blog post ever could.

## The problem with trust

Every password manager asks you to trust them. Trust their encryption. Trust their server architecture. Trust that their browser extension isn't leaking data. Trust that the intern who pushed code last Friday didn't introduce a vulnerability.

For most people, that trust is reasonable. Established password managers have security audits, bug bounties, and teams dedicated to getting this right. We use them ourselves for team credentials.

But for personal use, we wanted something different: a tool where we could read every line of code between our master password and the encrypted output. Not because we don't trust 1Password, because we wanted to *understand* the system protecting our data.

## Why Zig

The same reasons we chose Zig for [flags.zig](/blog/why-we-chose-zig). Manual memory management matters when you're handling secrets — you want to zero out sensitive data immediately after use, not wait for a garbage collector to maybe get around to it.

Zig's `@memset` and explicit allocators let us control exactly when and how sensitive data exists in memory. When tip is done with your master password, that memory is zeroed. Not freed. Zeroed. In Go or JavaScript, you're hoping the runtime does this for you. It usually doesn't.

## What tip actually does

tip is deliberately simple. It's a CLI tool that:

- Takes a master password and a service name
- Derives a unique password using Argon2id
- Copies it to the clipboard
- Zeros the memory and exits

No database. No sync. No browser extension. No cloud. Your passwords aren't stored anywhere — they're derived deterministically from your master password and the service name. Same inputs, same output, every time.

This is a significant trade-off. You can't store arbitrary passwords (like ones a website generates for you). You can't attach notes or credit card numbers. For those, use a traditional password manager.

## What we learned

**Crypto is well-documented but poorly explained.** The algorithms are all public. Argon2, AES-GCM, HKDF — the specs are free to read. But going from "here's the spec" to "here's working code" requires understanding dozens of implicit assumptions that specs don't spell out. Nonce generation, key derivation parameters, output encoding — every step has a way to be subtly wrong.

**Memory safety isn't just about crashes.** In most applications, a use-after-free is a bug that causes a crash. In a password manager, a use-after-free can leak secrets. The stakes change your entire approach to code review.

**Simple tools are hard to get wrong.** tip does very little, which means there's very little surface area for bugs. The entire codebase is under 500 lines. We can audit it in an afternoon. Try doing that with any commercial password manager.

## Should you build one?

Probably not for production use. But as a learning exercise? Absolutely. Building tip taught us more about applied cryptography than any course or textbook. You don't really understand encryption until you've had to decide between AES-GCM and XChaCha20-Poly1305 for a real use case, not a homework problem.

Just don't use your homegrown password manager for your bank account. That's what the professionals are for.
