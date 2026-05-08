---
title: 'Introducing Buzzline'
date: '2026-03-25'
excerpt: 'Buzzline is a developer-friendly SMS gateway built for Sierra Leone. Reliable delivery, transparent pricing, and an API that makes sense.'
tags: ['Product']
authors: ['Team']
draft: true
---

We're building Buzzline — an SMS gateway and messaging API designed specifically for Sierra Leone's market.

If you've ever tried to send transactional SMS in West Africa through one of the global aggregators, you know the pain: unreliable delivery, opaque pricing, and APIs that feel like they were designed by committee. Buzzline is our answer to that.

## Why SMS, why now

In Sierra Leone, SMS is still the most reliable way to reach people. Not everyone has a smartphone. Not everyone has consistent data. But almost everyone has a phone that receives text messages.

Businesses that depend on reaching their customers — fintechs sending OTPs, e-commerce platforms confirming orders, banks pushing transaction alerts — need SMS that works. And "works" means delivered, quickly, with proof.

The existing options are either international aggregators (expensive, with servers far from the region) or direct carrier integration (complex, undocumented, and fragile). We wanted to build the layer in between: a clean API that handles the complexity of carrier routing so developers don't have to.

## What Buzzline does

At its core, Buzzline is a REST API. You authenticate with an API key, send a POST request with a phone number and message body, and we handle the rest — queuing, carrier routing, delivery tracking, and status callbacks.

The system is built around a few principles:

**Reliability first.** Messages go through a buffered queue with retry logic. If a carrier is temporarily unavailable, messages are retried with backoff rather than dropped silently. Every message has a status trail: pending, queued, sent, delivered, or failed.

**Transparent pricing.** No hidden fees, no surprise charges. You see the per-message cost upfront, and usage is tracked in real time. We're starting with prepaid wallets so you never get a surprise bill.

**Developer experience.** The API follows REST conventions that feel familiar. JSON in, JSON out. Consistent error codes. Idempotency keys for safe retries. We're building the API we wish we had when integrating SMS into our own projects.

## The technical stack

Buzzline is built with Go. We chose it for the same reasons we've discussed in [choosing boring technology](/blog/choosing-boring-technology): it's reliable, it's fast, and the concurrency model maps naturally to a message queue system.

The stack:
- **Go** with Chi router for the HTTP API
- **PostgreSQL** for message persistence, user accounts, and billing
- **sqlc** for type-safe database queries
- **JWT** authentication with API key support
- A carrier adapter interface that lets us swap between aggregators and direct carrier connections without changing the API surface

The architecture is intentionally simple. Messages flow from the API into a queue, a pool of workers picks them up and dispatches them through the appropriate carrier adapter, and delivery receipts flow back in to update message status. No Kafka, no microservices. Just a well-structured Go application.

## Carrier integration

We're starting with a third-party aggregator for carrier connectivity while we establish direct relationships with carriers like Orange SL. This is a deliberate choice — we'd rather ship with reliable delivery through an aggregator than delay launch waiting for direct carrier integration.

The adapter interface means we can add direct carrier connections transparently. When we establish a direct SMPP link, messages will route through it automatically. Existing API consumers won't need to change anything.

## Who it's for

Our initial focus is on three segments:

1. **Fintechs and mobile money companies** sending OTPs, transaction alerts, and balance notifications. High volume, high stakes — every failed delivery is a frustrated customer.

2. **E-commerce and delivery platforms** that need order confirmations and delivery updates. Customers expect to know where their package is.

3. **Developers and startups** building apps that need verification codes or notifications. If you're building something in Sierra Leone, SMS should be a one-afternoon integration, not a one-month project.

## Pricing

We're keeping the pricing model straightforward:

- A **free tier** with 100 messages so you can test without commitment
- **Paid plans** starting at 500 SLE/month with included message bundles
- **Per-message overage** at tiered rates that decrease with volume
- **Enterprise pricing** for high-volume customers who need custom terms

We make money on the spread between what we charge and what the carrier charges us. As we move to direct carrier integration, our margins improve — and we plan to pass some of that savings on as lower prices. The goal is to be the most cost-effective option in the market while maintaining quality.

## What's next

Buzzline is in active development. The core API — authentication, message sending, delivery tracking — is functional. We're currently working on webhook callbacks for delivery receipts, rate limiting per API key, and usage analytics.

We're looking for early customers who want to try the API and give us honest feedback. If you're building something in Sierra Leone that needs SMS, [reach out](https://github.com/spikenardco).

We're building Buzzline because we needed it ourselves — and because we think the region deserves a messaging API that takes developer experience as seriously as delivery reliability.
