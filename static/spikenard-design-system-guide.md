---
title: 'Design System Guide'
excerpt: 'Comprehensive, project-agnostic design system standards for tokens, components, accessibility, implementation, and governance.'
---

## Scope

This guide defines the future cross-product design system baseline for products built in this repository.

The system is intentionally core-first and project-tailorable:

- Core tokens and component contracts remain project-agnostic
- Projects can apply approved skin overrides without fragmenting APIs
- No brand-locked visual assumptions
- No one-off visual exceptions without documented approval

The system covers four layers:

1. Foundations: tokenized visual primitives
2. Patterns: interaction and layout standards
3. Components: reusable UI contracts
4. Governance: ownership, versioning, and rollout rules

## Principles

1. Token First
All visual values must come from tokens before they appear in utilities or component code.

2. Semantic Before Primitive
Components should consume semantic tokens (intent/role) rather than raw primitive tokens.

3. Accessibility as a Release Gate
Contrast, focus, keyboard support, and reduced motion are mandatory.

4. Consistency Over Personal Preference
Shared patterns win unless a documented product requirement conflicts.

5. Stable Evolution
Deprecate gradually with migration notes and explicit versioning.

## Architecture

### Token Hierarchy

1. Primitive tokens
Raw values for color, type scale, spacing, radius, shadow, duration.
Example: `color-neutral-700`, `space-4`, `radius-md`.

2. Semantic tokens
Role-based aliases that define intent.
Example: `color-text-default`, `color-surface-muted`, `color-border-strong`.

3. Component tokens
Specific contract values for a component.
Example: `button-primary-bg`, `input-focus-ring`.

4. Context tokens
Scoped overrides for theme, brand skin, campaign mode, or high-contrast mode.

### Naming Rules

- Use clear noun-role format.
- Avoid visual descriptions in semantic token names (`blue-500` is primitive, not semantic).
- Include state for interactive tokens (`*-hover`, `*-active`, `*-disabled`).
- Use the same token names across all products unless versioned.

## Foundations

### Color System (Project-Agnostic)

Define colors by role, not by brand metaphor.

#### Primitive Palettes

- Neutral scale: `neutral-0` to `neutral-1000`
- Accent scale: `accent-50` to `accent-900`
- State scales: `success-*`, `warning-*`, `danger-*`, `info-*`

#### Required Semantic Color Tokens

- Text:
  - `color-text-default`
  - `color-text-muted`
  - `color-text-subtle`
  - `color-text-inverse`
  - `color-text-link`

- Surface:
  - `color-surface-canvas`
  - `color-surface-default`
  - `color-surface-muted`
  - `color-surface-raised`
  - `color-surface-overlay`
  - `color-surface-inverse`

- Border:
  - `color-border-default`
  - `color-border-muted`
  - `color-border-strong`
  - `color-border-focus`

- Interactive:
  - `color-action-primary-bg`
  - `color-action-primary-fg`
  - `color-action-primary-hover`
  - `color-action-secondary-bg`
  - `color-action-secondary-fg`

- Feedback:
  - `color-feedback-success-*`
  - `color-feedback-warning-*`
  - `color-feedback-danger-*`
  - `color-feedback-info-*`

#### Color Usage Rules

- Body text must use semantic text tokens only.
- One primary accent per view; secondary accents are optional and constrained.
- State colors communicate meaning, not decoration.
- Never encode information with color alone.
- New brand skins may override context tokens, not component contracts.

### Typography

#### Type Roles

- `display`: hero statements only
- `heading`: section and page hierarchy
- `title`: card and module headers
- `body`: default reading content
- `label`: form labels and control text
- `meta`: timestamps, helper text, minor metadata
- `code`: inline and block code

#### Standards

- Minimum body size: `16px`
- Comfortable line length target: `60ch` to `75ch`
- Heading styles map to semantic type tokens, not per-page ad hoc classes
- Use weight and size to define hierarchy before using color
- Avoid all-caps for long UI labels

### Spacing

Use a consistent scale (4-based or 8-based) and enforce it globally.

Recommended token set:

- `space-0, 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24`

Usage conventions:

- Internal component padding should be size-tiered and predictable.
- Sibling spacing inside a component must be consistent.
- Vertical rhythm should be stable within a page template.
- No arbitrary spacing values in component markup.

### Layout and Breakpoints

Define canonical breakpoints and container widths as tokens.

- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Containers:
  - `container-narrow` for prose
  - `container-default` for app screens
  - `container-wide` for dashboard or dense data views

Rules:

- Keep templates responsive from mobile-first layouts.
- Avoid breakpoint-specific rewrites when scale adjustments suffice.
- Preserve minimum tap target sizes on all breakpoints.

### Radius, Border, and Elevation

#### Radius

- `radius-xs`, `sm`, `md`, `lg`, `xl`, `full`
- Map radius by component role, not preference.

#### Border

- Border token strength should be semantic: muted/default/strong/focus.
- Prefer border + subtle elevation before heavy shadows.

#### Elevation

- `shadow-0` through `shadow-4` (or equivalent)
- Elevation should communicate hierarchy and interactivity.
- Use overlays for modal/backdrop separation, not excessive blur.

### Motion

Define motion tokens for duration and easing:

- Durations: `motion-fast`, `motion-base`, `motion-slow`
- Easing: `motion-ease-standard`, `motion-ease-emphasized`

Rules:

- Motion should explain state change, not decorate.
- Reduced-motion mode must preserve all core interactions.
- Avoid parallax or long decorative transitions in product surfaces.

## Component Contracts

Every reusable component spec must include:

- Purpose and when to use
- Anatomy (named slots/regions)
- Variants and sizes
- States (default, hover, focus-visible, active, disabled, loading, invalid where relevant)
- Accessibility contract
- Content guidance
- Do/Do Not usage examples

### Buttons

- Variants: `primary`, `secondary`, `tertiary`, `ghost`, `destructive`
- Sizes: `sm`, `md`, `lg`
- Rules:
  - One primary action per action group
  - Disabled state must reduce affordance and block interaction
  - Loading state keeps width stable and announces progress

### Inputs and Form Controls

- Inputs require visible labels (or equivalent accessible name).
- Helper text should prevent errors before they occur.
- Error messages must be specific and actionable.
- Required fields need both semantic and visual indicators.
- Validation timing must be documented per form flow.

### Navigation

- Active location must be visible without hover.
- Keyboard and screen-reader navigation order must remain logical.
- Mobile navigation must preserve focus visibility and trap behavior only when needed.

### Cards and List Items

- Use cards for grouped meaning, not as generic wrappers.
- Card action affordances must be clear (whole-card click vs internal actions).
- Keep paddings and density consistent within a grid.

### Feedback Patterns

- Inline validation for local field errors
- Banners for persistent context-level information
- Toasts for non-blocking status updates
- Modals for high-friction, decision-critical workflows

## Interaction and State Standards

Interactive components must define:

- Focus-visible behavior with contrast-compliant ring and offset
- Pointer and keyboard parity (same outcomes regardless of input method)
- Disabled semantics (`disabled`/`aria-disabled`) and styles
- Busy/loading semantics (`aria-busy`/announced status) where relevant
- Empty, error, and success states for data-dependent UI

## Accessibility Requirements

All production UI must meet these minimums:

- WCAG AA contrast for text and essential controls
- Keyboard accessibility with no focus traps (except intentional modal traps)
- Visible focus indicators on every interactive element
- Semantic HTML first; ARIA only when native semantics are insufficient
- Motion alternatives for `prefers-reduced-motion`
- Clear labels, error associations, and status announcements for forms

Accessibility failures block release.

## Content and Language Rules

- Use direct, plain language for controls and error states.
- Button labels should start with strong verbs (`Save`, `Publish`, `Send`).
- Avoid vague CTAs (`Click here`, `Continue` without context).
- Error copy should include cause and next action when possible.
- Time, date, and number formatting should follow locale-aware formatting policies.

## Theming and Brand Skins

Default model:

- One shared core system
- Optional skin layers via context token overrides

### Project Tailoring Model

Projects may tailor presentation without breaking the shared core:

- Tailor:
  - Accent and tonal expression through context tokens
  - Typographic family choices (within readability and accessibility constraints)
  - Density presets (compact/default/comfortable) when contracts are preserved
- Do not tailor:
  - Component behavior contracts
  - Core state semantics
  - Accessibility requirements

Allowed overrides:

- Accent palette
- Select semantic surface/text/border tokens
- Optional typography family tokens (if accessibility and density remain valid)

Not allowed without system-level review:

- Component API fragmentation by product
- Unversioned token forks
- Per-page one-off visual systems in core product surfaces

## Implementation Rules (Svelte + Tailwind v4)

1. Tokens are defined centrally in `@theme`.
2. Components map utilities to semantic token values.
3. No raw hex values in component markup.
4. Repeated utility strings should be abstracted into primitives or reusable components.
5. If a new visual value is needed repeatedly, add/approve a token first.

### Example Token Mapping

```css
@theme {
  --color-neutral-0: #ffffff;
  --color-neutral-1000: #111111;

  --color-text-default: var(--color-neutral-900);
  --color-surface-default: var(--color-neutral-0);
  --color-border-default: color-mix(in oklab, var(--color-neutral-900) 16%, transparent);
}
```

### Example Component Policy

```svelte
<button
  class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium
  bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)]
  hover:bg-[var(--color-action-primary-hover)]
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]
  disabled:opacity-50 disabled:pointer-events-none"
>
  Save
</button>
```

## Governance

### Roles

- Design System Maintainers: own token architecture and component contracts
- Product Teams: adopt, propose improvements, and report friction
- Reviewers: enforce consistency and block unapproved deviations

### Change Process

1. Propose change with rationale, impacted scope, and migration plan
2. Validate accessibility and regression risk
3. Approve and version (`major`, `minor`, `patch`)
4. Publish migration notes with before/after examples

### Versioning Policy

- `major`: breaking token renames, removed variants, API contract changes
- `minor`: additive tokens, new variants, new components
- `patch`: bug fixes, documentation clarification, non-breaking polish

## Quality Gates

Minimum required checks for any system-affecting change:

- Type/lint checks pass
- Visual regression review for changed components/states
- Accessibility checks for keyboard, focus, and contrast
- Responsive validation for mobile and desktop
- Smoke test for supported themes/brand skins

## Migration Strategy

1. Audit current UI for repeated patterns and token drift.
2. Map legacy values to primitive and semantic tokens.
3. Refactor shared components first, then page-level usage.
4. Provide temporary compatibility aliases only when necessary.
5. Remove deprecated tokens/components after usage reaches zero.

## Anti-Patterns

- Raw color values in component markup
- Multiple primary actions in one local context
- Inconsistent spacing/radius across equivalent components
- Decorative motion disconnected from user intent
- Component props that expose implementation-only styling internals
- Token additions without documentation and governance review

## Definition of Done

A design system change is complete only when:

- Tokens/components are implemented and documented
- Accessibility and responsive behavior are verified
- Migration notes are published (if existing usage is affected)
- Deprecated paths are tracked with a removal timeline
