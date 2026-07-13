---
title: Svelte Style Guide
description: Coding conventions for all Svelte 5 and SvelteKit code.
---

# Svelte Style Guide

Coding conventions for all Svelte 5 and SvelteKit code.

**Framework:** SvelteKit with Svelte 5 (runes). No legacy `$:` syntax or `export let` props.
**Styling:** Tailwind CSS v4 by default.
**Formatter:** [Biome](https://biomejs.dev/) for JS/TS within `<script>` blocks.

---

## Formatting

- **Indentation:** Tabs — in `<script>`, markup, and `<style>` blocks.
- **Quotes:** Double quotes in markup attributes, double quotes in JS.
- **Self-closing tags:** Use for void elements and components without children: `<img />`, `<Spinner />`.
- **Attribute line-breaking:** Single attribute on one line. Multiple attributes — one per line:

```svelte
<!-- Single attribute — one line -->
<Button disabled>Save</Button>

<!-- Multiple attributes — break them -->
<button
	class="btn btn-primary"
	disabled={!is_valid}
	onclick={handle_submit}
>
	Submit
</button>
```

---

## Naming Conventions

| Identifier | Convention | Example |
|---|---|---|
| Component files | kebab-case (default) or PascalCase | `user-card.svelte`, `UserCard.svelte` |
| Route files | SvelteKit convention | `+page.svelte`, `+layout.svelte`, `+server.js` |
| Module/utility files | kebab-case | `api-client.js`, `format-date.js` |
| Directories | kebab-case | `$lib/components`, `$lib/utils` |
| Variables & functions | snake_case | `user_data`, `fetch_users()` |
| Library exports (public API) | camelCase | `export function getUser()` |
| Booleans | snake_case with `is_`/`has_`/`should_` | `is_loading`, `has_error` |
| Constants (module-level) | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_URL` |
| Props | snake_case | `user_name`, `is_disabled` |
| Event handlers | snake_case with `handle_` prefix | `handle_click()`, `handle_submit()` |
| Snippet names | snake_case | `{#snippet user_row(user)}` |
| CSS classes (custom) | kebab-case (Tailwind handles most) | `.card-header`, `.nav-link` |

### Component Files

kebab-case is the default for component filenames. PascalCase is also accepted.

```
user-card.svelte      # default — kebab-case
UserCard.svelte       # also fine — PascalCase
nav-bar.svelte
error-message.svelte
```

Pick one convention per project and stick with it.

Naming follows the [JavaScript Style Guide](/guides/js-style-guide) for everything inside `<script>` blocks — including the camelCase exception for library/package exports.

---

## Component Structure

Every `.svelte` file follows this order:

1. `<script module>` (only if needed — rare)
2. `<script>`
3. Markup (HTML)
4. `<style>` (only when Tailwind alone isn't enough)

### Script Block Ordering

Within `<script>`, organize in this order:

1. Imports
2. Props (`$props()`)
3. State (`$state()`)
4. Derived values (`$derived()`)
5. Effects (`$effect()`)
6. Functions and event handlers

```svelte
<script>
	import { goto } from "$app/navigation"
	import { toast } from "svelte-sonner"
	import { Button } from "$lib/components"
	import { update_user } from "$lib/api/users"

	let { user, on_save } = $props()

	let is_editing = $state(false)
	let form_data = $state({ name: user.name, email: user.email })

	let is_valid = $derived(form_data.name.length > 0 && form_data.email.includes("@"))

	$effect(() => {
		document.title = `${user.name} — Profile`
	})

	async function handle_submit() {
		await update_user(user.id, form_data)
		on_save(form_data)
		is_editing = false
		toast.success("Profile updated")
	}
</script>

<form onsubmit|preventDefault={handle_submit}>
	{#if is_editing}
		<input bind:value={form_data.name} placeholder="Name" />
		<input bind:value={form_data.email} placeholder="Email" />
		<Button disabled={!is_valid}>Save</Button>
	{:else}
		<p>{user.name}</p>
		<p>{user.email}</p>
		<Button onclick={() => is_editing = true}>Edit</Button>
	{/if}
</form>
```

---

## Code Organization

### Import Order

Within `<script>`, group imports in this order:

1. Svelte and SvelteKit (`svelte`, `svelte/*`, `$app/*`)
2. Third-party packages
3. Internal `$lib` imports
4. Relative imports

```svelte
<script>
	import { onMount } from "svelte"
	import { goto } from "$app/navigation"
	import { page } from "$app/state"

	import { toast } from "svelte-sonner"

	import { Button, Modal } from "$lib/components"
	import { get_users } from "$lib/api/users"

	import UserCard from "./user-card.svelte"
</script>
```

### Path Aliases

Use `$lib` for shared imports. Never use deep relative paths:

```js
// Good
import { db } from "$lib/server/db"
import { Button } from "$lib/components"

// Bad
import { db } from "../../../server/db"
```

### Component Colocation

**Colocate components in the route that uses them.** Only move a component to `$lib/components` when it's reused across multiple routes.

```
src/
  lib/
    components/         → Only truly shared components (Button, Modal, Spinner, etc.)
    server/             → Server-only utilities (db, auth, etc.)
    utils/              → Shared utility functions
    types/              → TypeScript type definitions
  routes/
    +layout.svelte
    +page.svelte
    dashboard/
      +page.svelte
      +page.server.js
      stats-card.svelte       → Used only in dashboard — lives here
      activity-feed.svelte    → Used only in dashboard — lives here
    blog/
      +page.svelte
      [slug]/
        +page.svelte
        +page.server.js
        share-button.svelte   → Used only in blog post — lives here
```

**Rules:**
- A component used in one route lives next to that route's `+page.svelte`.
- A component used in 2-3 sibling routes can live in their shared parent route directory.
- A component used across unrelated routes belongs in `$lib/components`.
- Don't preemptively move things to `$lib`. Start colocated, promote to shared only when reuse demands it.

---

## Runes

Use Svelte 5 runes for all reactivity. No legacy syntax.

### `$state` — Reactive State

```svelte
<script>
	let count = $state(0)
	let items = $state([])
	let form = $state({ name: "", email: "" })
</script>
```

### `$derived` — Computed Values

Use for any value calculated from other reactive state:

```svelte
<script>
	let search = $state("")
	let items = $state(["apple", "banana", "cherry"])

	let filtered = $derived(items.filter(i => i.includes(search)))
	let count = $derived(filtered.length)
	let has_results = $derived(count > 0)
</script>
```

### `$effect` — Side Effects

Use sparingly. Only for side effects — DOM manipulation, external API calls, subscriptions.

```svelte
<script>
	let query = $state("")

	// Good — side effect (updating the document title)
	$effect(() => {
		document.title = query ? `Search: ${query}` : "Home"
	})
</script>
```

**Never use `$effect` to synchronize state.** If you're setting a `$state` variable inside an `$effect`, you almost certainly want `$derived` instead.

```svelte
<script>
	let items = $state([])

	// Bad — using $effect to sync state
	let count = $state(0)
	$effect(() => {
		count = items.length
	})

	// Good — derived value
	let count = $derived(items.length)
</script>
```

### `$props` — Component Props

```svelte
<script>
	let {
		title,
		items = [],
		on_select,
		is_disabled = false,
		children,
	} = $props()
</script>
```

---

## Markup Conventions

### Attribute Ordering

1. `class`
2. Bind directives
3. Dynamic attributes
4. Event handlers

### Conditional Rendering

```svelte
{#if is_loading}
	<Spinner />
{:else if error}
	<ErrorMessage message={error} />
{:else}
	<UserList users={users} />
{/if}
```

### Lists

Always provide a key when items can change order or be removed:

```svelte
{#each users as user (user.id)}
	<UserCard {user} />
{/each}
```

### Snippets

Use `{#snippet}` for reusable markup within a component. Prefer snippets over extracting tiny single-use child components:

```svelte
{#snippet user_row(user)}
	<div class="flex items-center gap-2">
		<img src={user.avatar} alt="" class="size-8 rounded-full" />
		<span>{user.name}</span>
		<span class="text-gray-500">{user.email}</span>
	</div>
{/snippet}

{#each users as user (user.id)}
	{@render user_row(user)}
{/each}
```

---

## Styling

Tailwind CSS is the default. Use utility classes in markup.

### When to Use `<style>`

Only when Tailwind can't express what you need — complex selectors, CSS grid layouts, or animations that are cleaner in CSS:

```svelte
<style>
	.grid-layout {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}
</style>
```

Svelte scopes `<style>` blocks automatically. No BEM or naming methodology needed.

### Rules

- No inline `style=""` attributes.
- No global CSS outside `app.css`.
- Use CSS transitions and animations before reaching for Motion.

---

## Data Loading

Use SvelteKit's `load` functions for data fetching. Not `$effect`. Not `onMount`.

### Server-Side Loading

```js
// +page.server.js
export async function load({ params, locals }) {
	const user = await db.select().from(users).where(eq(users.id, params.id))

	if (!user) {
		error(404, "User not found")
	}

	return { user }
}
```

### Accessing Loaded Data

```svelte
<!-- +page.svelte -->
<script>
	let { data } = $props()
</script>

<h1>{data.user.name}</h1>
```

---

## Best Practices

- **Keep components small.** If a component exceeds ~150 lines, split it into smaller components. Colocate the extracted components in the same route directory — don't move them to `$lib` unless they're reused elsewhere.

- **Transitions and animations** — use Svelte's built-in `transition:` and `animate:` directives before reaching for external libraries:
  ```svelte
  <script>
  	import { fade, slide } from "svelte/transition"
  </script>

  {#if is_visible}
  	<div transition:fade={{ duration: 200 }}>Content</div>
  {/if}
  ```

- **TypeScript in components** — use `<script lang="ts">` only when it adds clarity (complex props, shared types). Not required by default.

- **Form handling** — use SvelteKit's form actions for progressive enhancement:
  ```svelte
  <form method="POST" use:enhance>
  	<input name="email" />
  	<button>Subscribe</button>
  </form>
  ```

- **No unnecessary `onMount`.** If you need data, use a `load` function. If you need to run code after the component mounts (e.g., third-party library init), then `onMount` is fine.

- **Avoid deep component nesting.** If a component renders a component that renders a component that renders the actual content — flatten it.
