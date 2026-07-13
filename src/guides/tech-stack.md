---
title: Tech Stack
description: The technologies, tools, and conventions we use across all Spikenard projects.
---

# Tech Stack

This document outlines the technologies, tools, and conventions we use across all Spikenard projects — backend services, web applications, mobile apps, open-source libraries, and internal tooling.

---

## Philosophy

We choose technology the same way we write code: deliberately.

- **Simplicity over cleverness** — Fewer moving parts means fewer things break. We reach for the simplest tool that solves the problem well.
- **Performance by default** — We pick languages and frameworks that are fast out of the box, not ones that require heroic optimization later.
- **Strong typing where it matters** — Type systems catch bugs before users do. We lean on compilers and type checkers as first-line defenses.
- **Developer ergonomics** — Fast feedback loops, readable error messages, and minimal boilerplate. If a tool slows us down daily, we replace it.
- **Boring technology** — We prefer battle-tested tools over the latest hype. New technology earns its place by solving a problem nothing else can.

> TypeScript is optional in any codebase (frontend or backend). When used, it should add clarity — not ceremony. If types are making the code harder to read, simplify them or drop them.

---

## Languages

### Go

**Role:** Primary backend language

Go is our default choice for backend services, APIs, CLI tools, and anything that needs to handle concurrency well. We chose it for:

- **Concurrency model** — Goroutines and channels make concurrent code straightforward to write and reason about. No callback hell, no complex async runtimes.
- **Fast compilation** — Go compiles to a single static binary in seconds. No dependency resolution at deploy time, no runtime to install on the server.
- **Standard library** — Go's standard library covers HTTP servers, JSON handling, cryptography, testing, and more. We rarely need third-party packages for common tasks.
- **Simplicity** — One way to format code (`gofmt`), one way to handle errors (explicit returns), one way to structure projects. Less debate, more shipping.
- **Deployment** — A single binary with no runtime dependencies. Copy it to a server and run it. Works with Docker, systemd, or bare metal.

See our [Go Style Guide](/guides/go-style-guide) for naming conventions, project layout, error handling, and coding standards.

**When we use it:** REST APIs, background workers, CLI tools, data pipelines, microservices.

### JavaScript / TypeScript

**Role:** Web frontend, Node.js backend services, scripting

JavaScript is the language of the web. We use it for all frontend code (via SvelteKit) and selectively on the backend when the Node.js ecosystem offers a clear advantage.

- **TypeScript** is optional but encouraged for larger codebases. We use strict mode when we use it (`"strict": true` in `tsconfig.json`).
- **ES Modules** only — no CommonJS in new code. All imports use `import`/`export` syntax.
- **Node.js** is our default runtime for JS/TS backend services. Alternatives like **Bun** and **Deno** are on our radar and open for exploration when a project would benefit from them, but Node remains the standard until the team agrees otherwise.

See our [JavaScript Style Guide](/guides/js-style-guide) for naming conventions, import structure, and coding standards.

**When we use it:** Web frontends, Node.js APIs, SDK development, scripting, build tooling.

### Dart

**Role:** Mobile application development

Dart is used exclusively through Flutter for cross-platform mobile apps. It provides strong typing, ahead-of-time compilation, and a reactive UI framework in a single package.

See our [Flutter Style Guide](/guides/flutter-style-guide) for naming conventions, widget conventions, and coding standards.

**When we use it:** Android and iOS applications.

---

## Experimental & Systems-Level Languages

These languages are used for specific use cases — open-source projects, CLI tools, and systems-level work. They complement the core stack where a different tool is a better fit.

### Zig

Low-level systems language with manual memory management, no hidden control flow, and excellent C interoperability. We use it for CLI tools and performance-critical utilities where Go's garbage collector or runtime overhead is undesirable.

See our [Zig Style Guide](/guides/zig-style-guide) for naming conventions, memory management patterns, and coding standards.

**Current use:** Open-source CLI tools ([flags.zig](https://github.com/spikenardco/flags.zig), [tip](https://github.com/spikenardco/tip)).

### C

Used for direct hardware manipulation, understanding low-level systems, and interfacing with existing C libraries. Primarily educational and experimental.

See our [C Style Guide](/guides/c-style-guide) for naming conventions, memory management, and coding standards.

### Python

Used for rapid prototyping, scripting, data analysis, and automation tasks where development speed matters more than runtime performance.

See our [Python Style Guide](/guides/python-style-guide) for naming conventions, docstrings, and coding standards.

---

## Frameworks & Libraries

### Backend

| Tool | Role | Notes |
|------|------|-------|
| **[Hono](https://hono.dev/)** | Web framework (Node.js) | Ultra-fast, minimal, runs on Node.js, Deno, Bun, and Cloudflare Workers. Used for REST APIs and lightweight services. |
| **[Drizzle ORM](https://orm.drizzle.team/)** | ORM (Node.js) | Lightweight, type-safe ORM for TypeScript. SQL-like query builder with zero overhead. Default ORM for all JS/TS backend projects. |
| **[Chi](https://github.com/go-chi/chi)** | HTTP router (Go) | Lightweight, idiomatic Go router built on `net/http`. Composable middleware, stdlib-compatible, no magic. |
| **[sqlc](https://sqlc.dev/)** | Type-safe SQL (Go) | Generates Go code from SQL queries. Write SQL, get type-safe functions — no ORM, no reflection. |
| **[Goose](https://github.com/pressly/goose)** | Database migrations (Go) | SQL-based migration tool. Version-controlled migration files, up/down support, embeddable in Go binaries. |

**Why Hono over Express:** Hono is built for modern runtimes, supports Web Standard APIs, has built-in middleware for common patterns (CORS, auth, validation), and benchmarks significantly faster than Express. It also runs on edge platforms without modification.

**Why Drizzle over Prisma:** Drizzle is closer to SQL — its query builder mirrors SQL syntax, so you're never guessing what query gets generated. It's lighter (no separate engine binary), faster at runtime, and gives you full control. Schema is defined in TypeScript, migrations are plain SQL.

**Why Chi:** It's just `net/http` with better routing. Chi doesn't reinvent Go's HTTP stack — it extends it with URL parameters, middleware chaining, and route grouping while staying fully compatible with the standard library. No framework lock-in.

**Why sqlc + Goose:** We write raw SQL, not ORM abstractions. sqlc compiles SQL queries into type-safe Go functions at build time — you get the full power of SQL with compile-time safety. Goose handles migrations as plain `.sql` files, keeping schema changes version-controlled and reviewable.

### Web Frontend

| Tool | Role | Notes |
|------|------|-------|
| **[SvelteKit](https://svelte.dev/)** | Full-stack web framework | Built on Svelte 5. Handles routing, SSR, static generation, and API endpoints in one framework. |
| **[Svelte 5](https://svelte.dev/)** | UI component framework | Runes-based reactivity (`$state`, `$derived`, `$effect`). Compiles to vanilla JS with no virtual DOM. |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first CSS | CSS-based configuration (no `tailwind.config.js`). Used with the Typography and Forms plugins. |
| **[MDsveX](https://mdsvex.pngwn.io/)** | Markdown in Svelte | Allows `.md` and `.svx` files as Svelte components. Used for blog posts, documentation, and content pages. |
| **[Iconify](https://iconify.design/)** | Icon system | Our icon solution. We use only **Lucide** and **MDI** icon sets via `@iconify/tailwind4`. Tree-shakeable — only ships icons actually used. No other icon libraries. |
| **CSS transitions/animations** | Animation | CSS is the default for all motion. Transitions, keyframes, and `prefers-reduced-motion` support. |
| **[Motion](https://motion.dev/)** | Animation (when needed) | Reached for only when CSS alone isn't enough — complex sequencing, spring physics, or gesture-driven animations. Not a default dependency. |

**Why SvelteKit:** Smaller bundle sizes than React/Next.js, less boilerplate, built-in file-based routing, and first-class support for static site generation. Svelte 5's runes provide fine-grained reactivity without the complexity of React hooks or Vue's composition API.

See our [Svelte Style Guide](/guides/svelte-style-guide) for component conventions, runes usage, and coding standards.

**Adapter strategy:** We use `@sveltejs/adapter-static` for marketing sites and content-heavy projects. For dynamic applications, we evaluate `adapter-node` or `adapter-auto` based on deployment target.

### Mobile

| Tool | Role | Notes |
|------|------|-------|
| **[Flutter](https://flutter.dev/)** | Cross-platform mobile | Single codebase for Android and iOS. Native performance with expressive, customizable UI. |
| **[React Native](https://reactnative.dev/)** | Cross-platform mobile | JavaScript-based mobile framework. Used when the project already has a React/JS-heavy team or needs tight integration with the JS ecosystem. |
| **Dart** | Language | Comes with Flutter. AOT compilation for production, JIT for hot reload during development. |

**Flutter vs React Native:** Flutter is our default for greenfield mobile projects — it gives full control over rendering and ships a consistent UI across platforms. React Native is the choice when a project benefits from sharing code with an existing JS/TS web codebase, or when the team is more experienced with the React ecosystem. Both are valid — the decision is made per-project.

---

## Databases

### PostgreSQL

**Role:** Primary relational database for production services

Used for any application that needs relational data, transactions, full-text search, or JSON storage. PostgreSQL is the default database choice unless there's a strong reason to use something else.

- **Extensions we use:** `pgcrypto` (UUIDs, hashing), `pg_trgm` (fuzzy text search)
- **Connection pooling:** PgBouncer or built-in pool management depending on the deployment
- **Migrations:** Managed through version-controlled SQL files, applied sequentially

### SQLite

**Role:** Embedded database — used when it lets us move faster

SQLite is the choice when spinning up a full database server would slow us down. Prototypes, CLI tools, local-first apps, single-user services, testing — anywhere a file-based database keeps things simple and lets us ship sooner.

- **WAL mode** enabled by default for better concurrent read performance
- **Single-file deployment** — the database is just a file, which simplifies backups and distribution
- **Zero infrastructure** — no server to provision, no connection strings to manage, no process to monitor

### When to use which

| Scenario | Choice |
|----------|--------|
| Multi-user web application | PostgreSQL |
| CLI tool with persistent state | SQLite |
| Mobile app local storage | SQLite |
| Service with complex queries/joins | PostgreSQL |
| Prototype — need to move fast | SQLite |
| High write concurrency | PostgreSQL |

---

## Infrastructure & Deployment

### Hosting & Platforms

| Service | Use Case |
|---------|----------|
| **AWS (Lightsail by default)** | Backend services, databases, storage, compute — our primary cloud provider |
| **Vercel** | Static sites, SvelteKit apps with edge functions |
| **Cloudflare Pages** | Static sites, edge-deployed applications |
| **[Cloudinary](https://cloudinary.com/)** | Image and media management — uploads, transforms, CDN delivery. Our current default for media, though we evaluate alternatives as needs evolve. |

**AWS Lightsail** is our default for backend infrastructure — simple, predictable pricing for instances, databases, and storage. We reach for other AWS services (EC2, RDS, S3, etc.) only when a project's requirements outgrow what Lightsail offers.

**Docker** is used when necessary — multi-service environments, reproducible builds, or when the deployment target requires containers. We don't containerize for the sake of it. A single Go binary deployed directly to a server is often simpler and sufficient.

We evaluate hosting per-project. The criteria: reliability, cost at scale, and no unnecessary complexity.

### Static Sites

Marketing sites, blogs, and documentation are statically generated at build time using SvelteKit's static adapter. This means:

- No server to manage
- Pages served from CDN edge nodes globally
- Near-instant load times
- Zero runtime cost

### Backend Services

Go services are compiled to a single binary and deployed directly to a server or via Docker when the environment calls for it. No runtime dependencies, no package managers on the server.

---

## Development Tools

### Version Control

- **Git** — All code lives in Git. Every project, no exceptions.
- **GitHub** — Code hosting, issues, pull requests, CI/CD via GitHub Actions.
- **Branch strategy** — `main` is always deployable. Feature branches are short-lived. PRs require review before merge.

### Code Quality

| Tool | Purpose |
|------|---------|
| **[Biome](https://biomejs.dev/)** | JavaScript/TypeScript/Svelte formatting and linting (default for all JS/TS projects) |
| **`gofmt` / `goimports`** | Go code formatting (runs automatically) |
| **`go vet` / `staticcheck`** | Go static analysis |
| **`svelte-check`** | Svelte component type checking |
| **[Ruff](https://docs.astral.sh/ruff/)** | Python formatting and linting (replaces Black, isort, flake8) |
| **`dart format` / `dart analyze`** | Dart code formatting and static analysis |
| **`zig fmt`** | Zig code formatting |
| **`clang-format`** | C code formatting (commit `.clang-format` config to repo) |

**Why Biome:** Single tool for both formatting and linting — replaces Prettier + ESLint with one dependency, one config file, and significantly faster execution. Biome is the default for all new JS/TS projects.

### Package Management

| Ecosystem | Tool | Notes |
|-----------|------|-------|
| **Go** | `go mod` | Built-in module system. No external package manager. |
| **JavaScript** | `npm` | Default for all JS/TS projects. Lockfile (`package-lock.json`) committed. Alternatives (pnpm, yarn, bun) are fine when the team agrees or the project requires it. |
| **Dart** | `pub` | Flutter's built-in package manager. |
| **Python** | `uv` | Default package manager and virtual environment tool. Faster than pip, handles resolution and venvs in one tool. |
| **Zig** | `build.zig.zon` | Built-in package manager via the build system. |
| **C** | Manual / system | No standard package manager. Vendor dependencies or use system packages. |

### Editor Setup

We don't mandate a specific editor. The team uses **VS Code**, **Zed**, and **Neovim**. Recommended setup:

- Format on save enabled
- Svelte language server (`svelte.svelte-vscode` for VS Code)
- Go language server (`gopls`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss` for VS Code)
- Biome as the default formatter/linter for JS/TS

---

## Testing

### Strategy

- **Unit tests** — Test individual functions and modules in isolation. Every bug fix includes a regression test.
- **Integration tests** — Test API endpoints, database queries, and service interactions end-to-end.
- **Type checking** — TypeScript strict mode and `svelte-check` catch a category of bugs before tests even run.

### Tools

| Language | Test Runner | Notes |
|----------|-------------|-------|
| **Go** | `go test` | Built-in. No external framework needed. Table-driven tests are the default pattern. |
| **JavaScript** | `vitest` | Fast, Vite-native test runner. Compatible with Jest API. |
| **Svelte** | `@testing-library/svelte` | Component testing when needed. Prefer end-to-end tests for UI behavior. |
| **Dart** | `flutter test` | Built-in. Widget tests and unit tests. |
| **Python** | `pytest` | Default test runner. Use fixtures for setup/teardown. |
| **Zig** | `zig test` | Built-in. `test` blocks alongside source code. `std.testing.allocator` detects leaks. |
| **C** | `assert` / [Unity](https://github.com/ThrowTheSwitch/Unity) | No built-in framework. Simple assertion macros or Unity for structured tests. |

### What we test

- Business logic — always
- API endpoints — always
- Database queries — for anything complex
- UI components — selectively (prefer E2E for user flows)
- Utility functions — when behavior isn't obvious from the code

### What we don't test

- Framework boilerplate (routing config, layout files)
- Simple getters/setters with no logic
- Third-party library behavior

---

## CI/CD

### GitHub Actions

All projects use GitHub Actions for continuous integration. A typical pipeline:

1. **Lint** — Format check, lint rules
2. **Type check** — `svelte-check`, `tsc`, or `go vet`
3. **Test** — Unit and integration tests
4. **Build** — Compile and verify the build succeeds
5. **Deploy** — Automatic deployment on `main` (for applicable projects)

### Deployment Triggers

| Event | Action |
|-------|--------|
| Push to `main` | Deploy to production |
| Pull request | Run lint + test + build (no deploy) |
| Tag (`v*`) | Create release, build artifacts |

---

## Decision Records

When we add or change a core technology, we document why. Here are the active decisions:

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Backend language | Go | Speed, simplicity, single-binary deploys, excellent concurrency |
| Go router | Chi | Idiomatic, stdlib-compatible, composable middleware, no framework lock-in |
| Go SQL | sqlc + Goose | Type-safe SQL generation, plain SQL migrations — no ORM |
| Backend framework (Node.js) | Hono | Faster than Express, Web Standards API, edge-compatible, minimal |
| Frontend framework | SvelteKit + Svelte 5 | Smallest bundles, best DX, compiled reactivity, file-based routing |
| Mobile framework | Flutter (default), React Native | Flutter for greenfield, React Native when JS ecosystem sharing matters |
| Primary database | PostgreSQL | Reliable, feature-rich, excellent ecosystem, free |
| Embedded database | SQLite | Zero-config, single-file — used when it lets us move faster |
| Cloud provider | AWS (Lightsail default) | Simple, predictable pricing; full AWS when needed |
| Media management | Cloudinary | Image/video transforms, CDN delivery, generous free tier |
| ORM (Node.js) | Drizzle | SQL-like, lightweight, no engine binary — replaces Prisma |
| CLI tools | Go + Zig | Go for most, Zig for performance-critical or zero-dependency tools |
| CSS approach | Tailwind CSS v4 | Utility-first, design token integration, no CSS naming debates |
| JS/TS tooling | Biome | Single tool for formatting + linting, fast, replaces Prettier + ESLint |
| Icons | Iconify (Lucide + MDI only) | Consistent stroke-based icons, tree-shakeable, one system across all projects |
| Animation | CSS (default), Motion (when needed) | CSS for almost everything; Motion only for complex sequences or physics |
| TypeScript | Optional | Adds value in large codebases, adds friction in small ones. Developer's choice. |

---

*This is a living document. When we adopt a new tool or change an existing choice, update this guide and add a decision record explaining why.*
