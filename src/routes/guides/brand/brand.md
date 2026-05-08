---
title: 'Brand Guide'
excerpt: 'Company-grade Spikenard brand standards covering strategy, messaging, voice, visual identity, and governance.'
---

## Purpose

This page is a curated summary of Spikenard brand standards for fast day-to-day usage.

It intentionally borrows heavily from the canonical source:

- `spikenard-brand-guide.md` (repo root)

When conflicts exist, treat the root guide as source of truth.

## 1. Brand Foundation

### Name and Meaning

**Spikenard** — an ancient aromatic spice, precious and rare.  
Pronunciation: **SPIKE-nard**.

The name represents craft and excellence: work that is careful, useful, and durable.

### Official Naming

- Display name: **Spikenard**
- Domain: **spikenard.dev**
- GitHub org: **spikenardco**
- Social/display fallback: **Spikenard**

Use **Spikenard** for display everywhere.

### Positioning Statement

**Spikenard builds developer-first products, open tools, and technical content with high standards of craft, practical utility, and long-term maintainability.**

### Mission

Build tools and systems that make developers faster and more confident.

### Vision

Become a trusted studio brand where teams expect thoughtful products and clear engineering communication.

### Brand Promise

If Spikenard ships it, it should feel intentional, usable, and technically credible.

## 2. Audience and Market

### Primary Audiences

- Product engineers and founders building quickly with small teams.
- Technical teams adopting modern stacks and developer tools.
- Open-source contributors and maintainers.

### Secondary Audiences

- Engineering leaders evaluating build-vs-buy decisions.
- Technical writers, educators, and content creators in dev ecosystems.

### Category and Competitive Frame

Spikenard competes in the overlap of:

- Developer tools
- Product studio execution
- Technical education/content

Differentiation: shipping quality + clear explanations + practical outcomes.

## 3. Messaging Architecture

### Core Message Pillars

1. **Craft over noise**: deliberate product and design decisions.
2. **Built in public**: transparent process, examples, and open artifacts.
3. **Developer respect**: clear docs, sane defaults, no marketing fluff.
4. **Durable systems**: maintainable foundations over short-lived hacks.

### Supporting Proof Patterns

- Real implementation details and architecture notes.
- Open repos, release notes, and migration guidance.
- Performance, reliability, or DX improvements with clear before/after.

### Value Proposition by Audience

- For builders: launch faster with fewer dead ends.
- For teams: reduce rework through coherent systems.
- For communities: learn from production-grade examples.

### Tagline Directions

- Built with intention.
- Crafted, not assembled.
- The work speaks.
- Glory in the details.

Use one tagline per page or campaign. Never stack multiple taglines together.

## 4. Voice and Tone System

### Voice Attributes

- **Clear**: direct language, no jargon for show.
- **Warm**: human and approachable, not robotic.
- **Confident**: specific and grounded, never boastful.
- **Technical**: accurate and implementation-aware.

### Writing Rules

- Write like a senior dev talking to a peer.
- Prefer short sentences and concrete words.
- Use active voice and show decisions with reasoning.
- Replace hype with proof.

### Tone by Context

- Docs: calm, exact, step-by-step.
- Landing pages: concise, benefit-led, still factual.
- Release notes: transparent, specific, no puffery.
- Error/incident comms: accountable, time-bound, clear next steps.

### Do / Don’t Examples

- Do: “We replaced the queue worker to cut p95 latency from 820ms to 260ms.”
- Don’t: “Massive performance gains across our platform.”
- Do: “Use this if your team needs predictable deploys and simple rollbacks.”
- Don’t: “Best-in-class DevOps experience.”

## 5. Verbal Identity Standards

### Naming and Capitalization

- Product names: clear and descriptive.
- Features: sentence case.
- Headings: title case for marketing pages, sentence case for docs if clearer.
- Avoid excessive acronyms; define on first use.

### Terminology Preferences

- Prefer: build, ship, maintain, measure, iterate.
- Avoid: leverage, synergy, revolutionary, seamless (unless proven with context).

### Inclusive and Accessible Language

- Avoid idioms that may not translate globally.
- Use direct instructions and readable sentence structure.
- Keep reading complexity moderate for non-native English audiences.

## 6. Visual Identity

### Color Palette

Primary brand colors:

- Clay: `#B08968`
- Umber: `#3E2C20`
- Sand: `#DDB892`
- Linen: `#F5EDE4`
- Parchment: `#FDFAF6`

Accent/support:

- Rust: `#C07040`
- Sage: `#7D8B75`
- Stone Blue: `#6B7B8D`
- Ember: `#B85C38`

Rules:

- Keep neutrals warm.
- Avoid pure black and sterile cool grays.
- Reserve accents for meaningful state or emphasis.

### Typography

- Primary sans: **DM Sans** (self-hosted preferred).
- Code font: **JetBrains Mono** (or equivalent self-hosted mono).
- Body length target: around `65ch` for long-form readability.
- Heading weight: mostly 600, 700 used sparingly.

### Imagery and Illustration Direction

- Prefer product screenshots, architecture visuals, and real artifacts.
- If using photography, choose natural light, warm tones, and authentic environments.
- Avoid over-staged stock imagery and abstract “innovation” visuals.

### Iconography

- Use one coherent icon family (for example Lucide) per product surface.
- Keep stroke weight and corner style consistent.
- Icons support content; they should not carry primary meaning alone.

## 7. Logo Guidance

### Primary Mark

Wordmark-first identity: **spikenard**.

### Favicon / Avatar

Use a compact monogram (for example `s`) that remains legible at small sizes.

## 8. UI and Product Experience Principles

- Let content breathe with generous spacing.
- Warm, not sterile: soft radii and warm shadows.
- Quiet confidence: subtle motion only where feedback is needed.
- Precision in states: clear hover, focus, active, disabled, and loading behavior.

## 9. Brand Governance

### Source of Truth

`spikenard-brand-guide.md` in repo root remains canonical when conflicts exist.

### Curation Policy

- This guide should stay concise and operational.
- Prefer summarizing stable standards, not copying historical/monitoring details.
- Pull new messaging/voice/visual ideas from the root guide during scheduled updates.

### Ownership

- Brand strategy: founders/leadership.
- Voice and editorial quality: content/design owners.
- Implementation fidelity: engineering/design system owners.

### Review Workflow

1. Draft
2. Brand review (voice + visuals)
3. Technical review (accuracy + implementation)
4. Publish
5. Quarterly audit of top pages/assets

### Quality Checklist

- Is the message specific and useful?
- Is tone warm and technically credible?
- Do visuals and UI follow palette/type rules?
- Are claims backed by evidence or examples?
- Is the page readable on mobile and desktop?

## 10. Practical Templates

### About Blurb (Short)

Spikenard is a builder collective creating developer tools, products, and technical content with a focus on craft, clarity, and long-term maintainability.

### Product Intro (Short)

Built by Spikenard, this product helps teams ship faster with practical workflows, clear defaults, and engineering-first documentation.

### Release Note Intro

This release improves reliability and developer flow. Below are the changes, why they matter, and any migration steps.

## 11. Writing Standards

Use this section as the default writing baseline for blog posts, changelogs, docs, and product copy.

### Voice Principles

- Write like a senior engineer talking to a peer.
- Lead with facts, then context, then tradeoffs.
- Prefer plain words over corporate phrasing.
- Show evidence with examples, commands, or diffs.
- Avoid hype language and vague superlatives.

### Global Rules

- Use short paragraphs and informative headings.
- State dates explicitly (`YYYY-MM-DD`) for releases and incidents.
- Use active voice and concrete subjects.
- Name exact API/class/function names when relevant.
- Include migration notes whenever behavior changes.
- If a section is not applicable, say so explicitly.

### Changelog Order

Each release entry should follow one consistent order:

1. Summary paragraph (what changed and why)
2. `Added`
3. `Changed`
4. `Error Handling` (or equivalent behavior section)
5. `What's Removed`
6. `Migration Guide`

If a section does not apply, include a short note, for example: "Not necessary for this release."

### Docs and README Rules

- Start with quickstart before deep explanation.
- Keep setup commands copy-paste ready.
- Document error cases, not only happy paths.
- Use explicit compatibility notes (runtime, framework, SDK versions).
- Include troubleshooting for common failures.

### Do / Don't

- Do: "v2 removes X" over "major changes were made."
- Do: Anchor statements to dates, versions, and names.
- Don't: Leave placeholders (`TODO`, `TBD`) in published content.
- Don't: Hide breaking changes below feature lists.
