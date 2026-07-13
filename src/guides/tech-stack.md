---
title: Tech Stack
description: The technologies, tools, and conventions we use across all Spikenard projects.
---

# Tech Stack

What we use across Spikenard projects: backend services, web apps, mobile apps, open-source libraries, and internal tooling.

---

## How we pick things

- **Simple before clever.** Fewer moving parts means fewer things break.
- **Fast by default.** We pick tools that are performant out of the box, not ones that need heroic optimization later.
- **Types when they help.** Compilers and type checkers catch bugs before users do. But if types make code harder to read, simplify or drop them.
- **Fast feedback loops.** Readable errors, minimal boilerplate, quick iteration. If a tool slows us down daily, we replace it.
- **Boring over trendy.** Battle-tested over hype. New tools earn their place by solving a problem nothing else can.

> TypeScript is optional in any codebase (frontend or backend). When used, it should add clarity, not ceremony.

---

## Languages

### Go

**Role:** Primary backend language

Go is our default for backend services, APIs, CLI tools, and anything that needs concurrency. Here's why:

- **Concurrency.** Goroutines and channels make concurrent code straightforward. No callback hell, no complex async runtimes.
- **Fast compilation.** Go compiles to a single static binary in seconds. No dependency resolution at deploy time, no runtime to install.
- **Standard library.** HTTP servers, JSON handling, cryptography, testing. We rarely need third-party packages for common tasks.
- **Simplicity.** One way to format code (`gofmt`), one way to handle errors (explicit returns), one way to structure projects. Less debate, more shipping.
- **Deployment.** A single binary with no runtime dependencies. Copy it to a server and run it.

See our [Go Style Guide](/guides/go-style-guide) for naming conventions, project layout, error handling, and coding standards.

**When we use it:** REST APIs, background workers, CLI tools, data pipelines, microservices.

### JavaScript / TypeScript

**Role:** Web frontend, Node.js backend services, scripting

We use JavaScript for all frontend code (via SvelteKit) and selectively on the backend when the Node.js ecosystem offers a clear advantage.

- **TypeScript** is optional but encouraged for larger codebases. Strict mode when we use it (`"strict": true` in `tsconfig.json`).
- **ES Modules** only. No CommonJS in new code.
- **Node.js** is our default runtime for JS/TS backend services. Bun and Deno are on our radar for projects that would benefit, but Node stays standard until the team agrees otherwise.

See our [JavaScript Style Guide](/guides/js-style-guide) for naming conventions, import structure, and coding standards.

**When we use it:** Web frontends, Node.js APIs, SDK development, scripting, build tooling.

### Dart

**Role:** Mobile application development

Dart is used through Flutter for cross-platform mobile apps. Strong typing, ahead-of-time compilation, and a reactive UI framework in one package.

See our [Flutter Style Guide](/guides/flutter-style-guide) for naming conventions, widget conventions, and coding standards.

**When we use it:** Android and iOS applications.

---

## Experimental and systems-level languages

These show up for specific use cases: open-source projects, CLI tools, systems-level work. They complement the core stack where a different tool fits better.

### Zig

Low-level systems language with manual memory management, no hidden control flow, and excellent C interoperability. We use it for CLI tools and performance-critical utilities where Go's GC or runtime overhead is undesirable.

See our [Zig Style Guide](/guides/zig-style-guide) for naming conventions, memory management patterns, and coding standards.

**Current use:** Open-source CLI tools ([flags.zig](https://github.com/spikenardco/flags.zig), [tip](https://github.com/spikenardco/tip)).

### C

Direct hardware manipulation, low-level systems work, interfacing with existing C libraries. Mostly educational and experimental right now.

See our [C Style Guide](/guides/c-style-guide) for naming conventions, memory management, and coding standards.

### Python

Rapid prototyping, scripting, data analysis, and automation where development speed matters more than runtime performance.

See our [Python Style Guide](/guides/python-style-guide) for naming conventions, docstrings, and coding standards.

---

## Frameworks and libraries

### Backend

| Tool | Role | Notes |
|------|------|-------|
| **[Hono](https://hono.dev/)** | Web framework (Node.js) | Default for all JS/TS backend services. Fast, minimal, runs on Node.js, Deno, Bun, and Cloudflare Workers. |
| **[Drizzle ORM](https://orm.drizzle.team/)** | ORM (Node.js) | Lightweight, type-safe ORM for TypeScript. SQL-like query builder, no overhead. |
| **[Chi](https://github.com/go-chi/chi)** | HTTP router (Go) | Built on `net/http`. Composable middleware, stdlib-compatible. |
| **[sqlc](https://sqlc.dev/)** | Type-safe SQL (Go) | Generates Go code from SQL queries. Write SQL, get type-safe functions. |
| **[Goose](https://github.com/pressly/goose)** | Database migrations (Go) | SQL-based migration tool. Version-controlled files, up/down support. |
| **[PocketBase](https://pocketbase.io/)** | Backend-as-a-service | Single-file Go binary with embedded SQLite, REST API, auth, and real-time subscriptions. Used when a project needs a backend fast without building one from scratch. |

**Why Hono over Express:** Hono supports Web Standard APIs, has built-in middleware for common patterns (CORS, auth, validation), and benchmarks faster than Express. It also runs on edge platforms without modification.

**Why Drizzle over Prisma:** Drizzle's query builder mirrors SQL syntax, so you're never guessing what query gets generated. It's lighter (no separate engine binary), faster at runtime, and gives you full control. Schema in TypeScript, migrations in plain SQL.

**Why Chi:** It's `net/http` with better routing. Chi adds URL parameters, middleware chaining, and route grouping while staying compatible with the standard library. No framework lock-in.

**Why sqlc + Goose:** We write raw SQL, not ORM abstractions. sqlc compiles SQL queries into type-safe Go functions at build time. Goose handles migrations as plain `.sql` files, keeping schema changes version-controlled and reviewable.

### Web Frontend

| Tool | Role | Notes |
|------|------|-------|
| **[SvelteKit](https://svelte.dev/)** | Full-stack web framework | Built on Svelte 5. Handles routing, SSR, static generation, and API endpoints. |
| **[Svelte 5](https://svelte.dev/)** | UI component framework | Runes-based reactivity (`$state`, `$derived`, `$effect`). Compiles to vanilla JS. |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first CSS | CSS-based config (no `tailwind.config.js`). Typography and Forms plugins. |
| **[MDsveX](https://mdsvex.pngwn.io/)** | Markdown in Svelte | `.md` and `.svx` files as Svelte components. Used for blog posts and docs. |
| **[Iconify](https://iconify.design/)** | Icon system | Lucide and MDI icon sets via `@iconify/tailwind4`. Tree-shakeable. |
| **CSS transitions/animations** | Animation | Default for all motion. Transitions, keyframes, `prefers-reduced-motion`. |
| **[Motion](https://motion.dev/)** | Animation (when needed) | Only when CSS isn't enough: complex sequencing, spring physics, gesture-driven. |

**Why SvelteKit:** Smaller bundle sizes than React/Next.js, less boilerplate, built-in file-based routing, and first-class static site generation. Svelte 5's runes give fine-grained reactivity without the complexity of React hooks or Vue's composition API.

See our [Svelte Style Guide](/guides/svelte-style-guide) for component conventions, runes usage, and coding standards.

**Adapter strategy:** `@sveltejs/adapter-static` for marketing sites and content-heavy projects. For dynamic apps, we evaluate `adapter-node` or `adapter-auto` based on deployment target.

### Mobile

| Tool | Role | Notes |
|------|------|-------|
| **[Flutter](https://flutter.dev/)** | Cross-platform mobile | Single codebase for Android and iOS. Native performance. |
| **[React Native](https://reactnative.dev/)** | Cross-platform mobile | JavaScript-based. Used when the project already has a React/JS-heavy team. |
| **Dart** | Language | Comes with Flutter. AOT for production, JIT for hot reload during development. |

**Flutter vs React Native:** Flutter is our default for greenfield mobile projects. It gives full control over rendering and ships consistent UI across platforms. React Native makes sense when sharing code with an existing JS/TS web codebase, or when the team knows React better. Both work, the decision is per-project.

---

## Databases

### PostgreSQL

**Role:** Primary relational database for production services

Any application that needs relational data, transactions, full-text search, or JSON storage gets PostgreSQL by default.

- **Extensions we use:** `pgcrypto` (UUIDs, hashing), `pg_trgm` (fuzzy text search)
- **Connection pooling:** PgBouncer or built-in pool management depending on deployment
- **Migrations:** Version-controlled SQL files, applied sequentially

### SQLite

**Role:** Embedded database, used when it lets us move faster

SQLite shows up when spinning up a full database server would slow us down. Prototypes, CLI tools, local-first apps, single-user services, testing. Anywhere a file-based database keeps things simple.

- **WAL mode** enabled by default for better concurrent read performance
- **Single-file deployment.** The database is just a file, which simplifies backups and distribution.
- **Zero infrastructure.** No server to provision, no connection strings to manage, no process to monitor.

### When to use which

| Scenario | Choice |
|----------|--------|
| Multi-user web application | PostgreSQL |
| CLI tool with persistent state | SQLite |
| Mobile app local storage | SQLite |
| Service with complex queries/joins | PostgreSQL |
| Prototype, need to move fast | SQLite |
| High write concurrency | PostgreSQL |

---

## Infrastructure and deployment

### Hosting and platforms

| Service | Use Case |
|---------|----------|
| **Hetzner** | VPS servers. Our default for new backend infrastructure. Reliable, affordable, straightforward. |
| **AWS** | VPS and cloud services. Used when we need specific AWS features (S3, RDS, Lambda, etc.) or when a project requires it. |
| **Vercel** | Static sites, SvelteKit apps with edge functions. |
| **Cloudflare Pages** | Optional. Static sites, edge-deployed applications. We use it when it fits, not as a default. |
| **[Cloudflare R2](https://www.cloudflare.com/r2/)** | Object storage for media: images, uploads, CDN delivery. Our default for media storage and serving. |

**Hetzner** is where most new backend infrastructure starts. Simple VPS, predictable pricing, good performance for the cost. We reach for AWS when a project needs managed services like RDS, Lambda, or S3, or when the client has existing AWS infrastructure.

**Docker** appears when it helps: multi-service environments, reproducible builds, or when the deployment target requires containers. We don't containerize for the sake of it. A single Go binary deployed directly to a server is often simpler and works fine.

### Static sites

Marketing sites, blogs, and documentation get statically generated at build time using SvelteKit's static adapter. No server to manage, pages served from CDN edge nodes, near-instant load times, zero runtime cost.

### Backend services

Go services compile to a single binary and deploy directly to a server or via Docker when the environment calls for it. No runtime dependencies, no package managers on the server.

We use **Caddy** as the web server and reverse proxy in front of backend services. It handles TLS certificates automatically (Let's Encrypt), reverse proxying, and static file serving. No nginx. Caddy's config is simpler, HTTPS works out of the box, and it stays out of your way.

---

## Development tools

### Version control

- **Git.** All code lives in Git. Every project, no exceptions.
- **GitHub** (primary) and **tangled.sh** (under consideration as an alternative). GitHub handles code hosting, issues, pull requests, CI/CD via GitHub Actions. We're evaluating tangled.sh as a possible alternative for some projects.
- **Branch strategy.** `main` is always deployable. Feature branches are short-lived. PRs require review before merge.

### Code quality

| Tool | Purpose |
|------|---------|
| **[Biome](https://biomejs.dev/)** | JS/TS/Svelte formatting and linting. Default for all JS/TS projects. |
| **`gofmt` / `goimports`** | Go code formatting |
| **`go vet` / `staticcheck`** | Go static analysis |
| **`svelte-check`** | Svelte component type checking |
| **[Ruff](https://docs.astral.sh/ruff/)** | Python formatting and linting |
| **`dart format` / `dart analyze`** | Dart code formatting and static analysis |
| **`zig fmt`** | Zig code formatting |
| **`clang-format`** | C code formatting |

**Why Biome:** One tool for formatting and linting. Replaces Prettier + ESLint with a single dependency, one config file, and faster execution.

### Package management

| Ecosystem | Tool | Notes |
|-----------|------|-------|
| **Go** | `go mod` | Built-in module system |
| **JavaScript** | `npm` | Default for all JS/TS projects. Lockfile committed. pnpm, yarn, bun are fine when the team agrees. |
| **Dart** | `pub` | Flutter's built-in package manager |
| **Python** | `uv` | Default package manager and virtual environment tool. Faster than pip. |
| **Zig** | `build.zig.zon` | Built-in package manager via the build system |
| **C** | Manual / system | No standard package manager. Vendor dependencies or use system packages. |

### Editor setup

We don't mandate a specific editor. The team uses VS Code, Zed, and Neovim. Recommended setup:

- Format on save enabled
- Svelte language server (`svelte.svelte-vscode` for VS Code)
- Go language server (`gopls`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss` for VS Code)
- Biome as the default formatter/linter for JS/TS

---

## Testing

### Strategy

- **Unit tests.** Test individual functions and modules in isolation. Every bug fix gets a regression test.
- **Integration tests.** Test API endpoints, database queries, and service interactions end-to-end.
- **Type checking.** TypeScript strict mode and `svelte-check` catch a category of bugs before tests even run.

### Tools

| Language | Test Runner | Notes |
|----------|-------------|-------|
| **Go** | `go test` | Built-in. Table-driven tests are the default pattern. |
| **JavaScript** | `vitest` | Fast, Vite-native test runner. Compatible with Jest API. |
| **Svelte** | `@testing-library/svelte` | Component testing when needed. Prefer E2E for UI behavior. |
| **Dart** | `flutter test` | Built-in. Widget tests and unit tests. |
| **Python** | `pytest` | Default test runner. Use fixtures for setup/teardown. |
| **Zig** | `zig test` | Built-in. `test` blocks alongside source code. `std.testing.allocator` detects leaks. |
| **C** | `assert` / [Unity](https://github.com/ThrowTheSwitch/Unity) | No built-in framework. Simple assertion macros or Unity for structured tests. |

### What we test

- Business logic (always)
- API endpoints (always)
- Database queries (for anything complex)
- UI components (selectively; prefer E2E for user flows)
- Utility functions (when behavior isn't obvious from the code)

### What we don't test

- Framework boilerplate (routing config, layout files)
- Simple getters/setters with no logic
- Third-party library behavior

---

## CI/CD

### GitHub Actions

All projects use GitHub Actions for CI. A typical pipeline:

1. **Lint** - Format check, lint rules
2. **Type check** - `svelte-check`, `tsc`, or `go vet`
3. **Test** - Unit and integration tests
4. **Build** - Compile and verify the build succeeds
5. **Deploy** - Automatic deployment on `main` (for applicable projects)

### Deployment triggers

| Event | Action |
|-------|--------|
| Push to `main` | Deploy to production |
| Pull request | Run lint + test + build (no deploy) |
| Tag (`v*`) | Optional. Create a release and build artifacts when you're ready to ship one. |

---

## Decision records

When we add or change a core technology, we document why. Here are the active decisions:

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Backend language | Go | Speed, simplicity, single-binary deploys, excellent concurrency |
| Go router | Chi | Idiomatic, stdlib-compatible, composable middleware, no framework lock-in |
| Go SQL | sqlc + Goose | Type-safe SQL generation, plain SQL migrations, no ORM |
| Backend framework (Node.js) | Hono | Faster than Express, Web Standards API, edge-compatible, minimal |
| Frontend framework | SvelteKit + Svelte 5 | Small bundles, good DX, compiled reactivity, file-based routing |
| Mobile framework | Flutter (default), React Native | Flutter for greenfield, React Native when JS ecosystem sharing matters |
| Primary database | PostgreSQL | Reliable, feature-rich, excellent ecosystem, free |
| Embedded database | SQLite | Zero-config, single-file, used when it lets us move faster |
| VPS servers | Hetzner (default), AWS | Hetzner for most new infra, AWS when we need managed services |
| Media storage | Cloudflare R2 | Object storage with CDN delivery. Our default for images and uploads |
| ORM (Node.js) | Drizzle | SQL-like, lightweight, no engine binary |
| CLI tools | Go + Zig | Go for most, Zig for performance-critical or zero-dependency tools |
| CSS approach | Tailwind CSS v4 | Utility-first, design token integration, no CSS naming debates |
| JS/TS tooling | Biome | One tool for formatting and linting. Replaces Prettier + ESLint |
| Icons | Iconify (Lucide + MDI only) | Consistent stroke-based icons, tree-shakeable, one system across projects |
| Animation | CSS (default), Motion (when needed) | CSS for almost everything. Motion only for complex sequences or physics |
| TypeScript | Optional | Adds value in large codebases, adds friction in small ones. Developer's choice. |

---

*This is a living document. When we adopt a new tool or change an existing choice, update this page and add a decision record explaining why.*
