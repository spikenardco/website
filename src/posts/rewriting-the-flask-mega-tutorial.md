---
title: Rewriting the Flask Mega-Tutorial in Go and SvelteKit
date: '2026-02-10'
excerpt: "Miguel Grinberg's Flask Mega-Tutorial is one of the best learning resources in web development. We rebuilt it from scratch with a modern stack to see what changed — and what didn't."
tags: ['Engineering']
authors: ['Team']
draft: true
---

Miguel Grinberg's [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) is one of the best learning resources in web development. It walks you through building a complete blog application: authentication, database migrations, email, deployment, all in Flask. It's been helping developers learn for over a decade.

We rebuilt it. Not because the original is bad (it's not, it's excellent), but because we wanted to see how the same concepts translate to a 2026 stack: **SvelteKit** on the frontend, **Go** with **chi** on the backend, and **SQLite** with **sqlx** for persistence.

## What stayed the same

More than we expected. The fundamental architecture — routes, templates, models, forms, authentication — maps almost 1:1. Flask's route decorators become chi's route handlers. Jinja2 templates become Svelte components. SQLAlchemy models become sqlx structs with SQL queries.

The tutorial's *teaching structure* also held up perfectly. Miguel's approach of building incrementally — start with "hello world", add users, add posts, add followers — works regardless of the tech stack. Good pedagogy transcends frameworks.

## What changed

**The frontend-backend split.** Flask serves HTML directly. Our version has a clear API boundary — the Go backend serves JSON, SvelteKit consumes it. This adds complexity (CORS, token management, separate dev servers) but it reflects how most production apps are built today.

**Reactivity.** The biggest upgrade. In Flask, every interaction is a full page reload. In SvelteKit, navigation is instant, forms update without refreshing, and the UI feels like an application rather than a document. This is where the modern stack makes the biggest difference.

**Type safety end-to-end.** Go structs define the API shape. TypeScript interfaces on the SvelteKit side match them. When we change a field in the Go struct, the TypeScript compiler catches every place that needs updating. Flask with Python doesn't give you this — you find mismatches at runtime.

**Database simplicity.** The original uses SQLAlchemy, which is powerful but heavy. We went with raw SQL queries through sqlx and SQLite. No ORM, no migration framework beyond simple SQL files. It's less magical but far easier to debug — you see exactly what query hits the database.

## What we'd do differently

We over-engineered the auth system initially. JWT tokens with refresh rotation, when a simple session cookie would have been fine for a blog. The original tutorial's session-based auth was the right call — we just didn't trust it because "everyone uses JWTs now." Lesson learned: match the complexity to the problem.

We also should have started with SvelteKit's form actions instead of building a REST API from scratch. SvelteKit's progressive enhancement model handles forms beautifully, and we would have had a working app faster.

## Was it worth it?

Yes, but not for the reason we expected. The value wasn't in the final product — it's a blog app, there are thousands of those. The value was in the *comparison*. Seeing the same concepts expressed in two different stacks made us better at both. We now reach for Flask when we want to prototype fast, and for Go + SvelteKit when we want type safety and performance.

If you're learning web development, start with the original Flask Mega-Tutorial. It's still one of the best resources out there. Then look at our rewrite to see how those same concepts look in a modern stack.
