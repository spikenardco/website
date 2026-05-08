# Spikenard — Brand & Developer Guide

---

## 1. The Name

**Spikenard** (νάρδος) — A precious aromatic oil from the Himalayas, mentioned in the Bible when Mary of Bethany anointed Jesus' feet (John 12:3). It represents something precious poured out in worship — worthy of the King.

**Pronunciation:** SPIKE-nard

**Tagline:**
- "Built with intention."
- "Crafted, not assembled."

**Origin story (for About pages, READMEs, etc.):**

> Spikenard is a collective of builders who believe software should be crafted with care and shared generously.
>
> The name comes from the costly oil poured out by Mary in the Gospels — an act of devotion marked by intention, beauty, and sacrifice. Its fragrance filled the room.
>
> We carry that same philosophy into our work: build carefully, refine relentlessly, and create things worthy of being shared.
>
> Inspired by the craftsmen of Exodus 31, we see engineering as both technical and creative work — thoughtful systems shaped by wisdom, patience, and attention to detail.

---

## 1.1 GitHub Handle — Naming Decision

> **Status: DECIDED** — `spikenardco` is the chosen GitHub handle.
> The org and brand should be treated as a single identity: **Spikenard**.

### Decision: `spikenardco`

**Chosen handle:** `spikenardco`
**Display name:** Spikenard
**GitHub:** `github.com/spikenardco`
**Primary and only required domain:** `spikenard.dev`

All public references should use `spikenard.dev` as the canonical website URL. No alternate domain strategy is needed.

---

## 2. Brand Identity

### Who Spikenard Is

spikenard is a builder collective — part open-source workshop, part product studio, part learning community. We build developer tools and platforms, rebuild tutorials in modern frameworks, create products (free and paid), and share what we learn.

### Brand Personality

| Trait | What it means | What it doesn't mean |
|-------|--------------|---------------------|
| **Intentional** | Every decision is deliberate | Not slow or overthought |
| **Warm** | Approachable, human, inviting | Not casual or unserious |
| **Quiet confidence** | The work speaks for itself | Not loud, flashy, or performative |
| **Refined** | Polished and considered | Not pretentious or exclusive |
| **Generous** | Open-source first, knowledge shared | Not naive or unprofessional |

### Brand Voice

- **Write like a senior dev talking to a peer.** Clear, direct, no filler.
- **Be warm, not corporate.** "We built this because we needed it" > "Our solution leverages..."
- **Show, don't boast.** Ship the work. Let people discover the quality.
- **Short sentences. Simple words.** If a word has a simpler synonym, use it.

**Examples:**

```
Good: "spikenard is a collective of builders. We make tools, share code, and learn in public."
Bad:  "spikenard is a cutting-edge innovation hub leveraging modern paradigms to deliver solutions."

Good: "This started as a weekend project. Now it handles 10k requests/sec."
Bad:  "Our enterprise-grade platform provides unparalleled scalability."
```

---

## 3. Color System

The palette is rooted in natural earth tones — clay, sand, warm stone. It communicates craftsmanship, warmth, and quiet sophistication without being cold or sterile.

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Clay** | `#B08968` | 176, 137, 104 | Primary brand color. Buttons, links, active states, logo |
| **Umber** | `#3E2C20` | 62, 44, 32 | Dark backgrounds, headings, primary text on light |
| **Sand** | `#DDB892` | 221, 184, 146 | Secondary highlights, hover states, accent borders |
| **Linen** | `#F5EDE4` | 245, 237, 228 | Light backgrounds, cards, surface areas |
| **Parchment** | `#FDFAF6` | 253, 250, 246 | Page background (lightest) |

### Neutral Scale (Warm-toned)

Every gray has warmth. Never use pure gray (#808080) or pure black (#000000).

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-950` | `#1C1612` | Near-black. Dark mode backgrounds |
| `neutral-900` | `#2A231C` | Dark mode surfaces |
| `neutral-800` | `#4A3F35` | Primary text (dark mode) |
| `neutral-700` | `#5E5245` | Headings on light backgrounds |
| `neutral-600` | `#7A6E62` | Body text |
| `neutral-500` | `#968A7E` | Secondary text, placeholders |
| `neutral-400` | `#AEA498` | Muted text, icons |
| `neutral-300` | `#CCC4B8` | Borders, dividers |
| `neutral-200` | `#E0D8CE` | Subtle backgrounds, hover states |
| `neutral-100` | `#F0ECE6` | Card backgrounds, surfaces |
| `neutral-50`  | `#F9F6F2` | Page background alternative |

### Accent Colors

Use sparingly. These support the core palette for functional states.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Rust** | `#C07040` | 192, 112, 64 | CTAs, important actions, warm emphasis |
| **Sage** | `#7D8B75` | 125, 139, 117 | Success states, positive feedback, natural accent |
| **Stone Blue** | `#6B7B8D` | 107, 123, 141 | Info states, links in dark mode, cool contrast |
| **Ember** | `#B85C38` | 184, 92, 56 | Error states, destructive actions, warnings |

### Dark Mode

Invert the surface hierarchy, keep the warmth. Never go full black.

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Page bg | `#FDFAF6` Parchment | `#1C1612` neutral-950 |
| Surface/Card | `#F0ECE6` neutral-100 | `#2A231C` neutral-900 |
| Border | `#CCC4B8` neutral-300 | `#4A3F35` neutral-800 |
| Primary text | `#3E2C20` Umber | `#F0ECE6` neutral-100 |
| Secondary text | `#7A6E62` neutral-600 | `#968A7E` neutral-500 |
| Brand accent | `#B08968` Clay | `#DDB892` Sand |

---

## 4. Typography

### Font Recommendations

**Primary — Headings:**
Choose ONE:
- **Inter** — Clean, modern, widely used in dev tools. Free. Safe choice.
- **DM Sans** — Geometric, warm, slightly more personality. Free. Recommended.
- **Outfit** — Modern, friendly, excellent weight range. Free.
- **Satoshi** — Premium feel, geometric, distinctive. Free (Fontshare).

**Secondary — Body:**
- Use the same font as headings at regular weight, OR
- **Source Serif 4** — Warm serif for long-form content (blog posts, docs). Pairs beautifully with any of the above sans-serifs.

**Monospace — Code:**
- **JetBrains Mono** — Ligatures, excellent readability. Free.
- **Berkeley Mono** — Premium, beautiful. Paid.
- **Geist Mono** — Clean, modern. Free (Vercel).

### Type Scale

Use a modular scale based on `1rem = 16px` with a ratio of `1.25` (Major Third):

```
xs:   0.64rem  (10.24px) — Fine print, labels
sm:   0.8rem   (12.8px)  — Captions, metadata
base: 1rem     (16px)    — Body text
lg:   1.25rem  (20px)    — Large body, subheadings
xl:   1.563rem (25px)    — Section headings (h3)
2xl:  1.953rem (31.25px) — Page headings (h2)
3xl:  2.441rem (39px)    — Hero headings (h1)
4xl:  3.052rem (48.8px)  — Display text
```

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, descriptions |
| 500 | Medium | Subheadings, emphasis |
| 600 | Semibold | Headings, buttons |
| 700 | Bold | Hero text, strong emphasis (use sparingly) |

---

## 5. Design Principles

### 5.1 "Let it breathe"

Generous whitespace. Content should never feel cramped. When in doubt, add more space.

```
Spacing scale (rem):
0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 3 | 4 | 6 | 8 | 12
```

- Section padding: `4rem–6rem` vertical minimum
- Card padding: `1.5rem–2rem`
- Paragraph max-width: `65ch` (optimal reading length)

### 5.2 "Warm, not sterile"

- Rounded corners: `0.5rem` (8px) for cards, `0.375rem` (6px) for buttons, `0.25rem` (4px) for inputs
- Never use sharp corners (0px radius)
- Never use overly round (999px pill shapes) except for tags/badges
- Shadows should be warm-tinted, not pure black:

```css
/* Light mode shadows */
--shadow-sm: 0 1px 2px rgba(62, 44, 32, 0.05);
--shadow-md: 0 4px 12px rgba(62, 44, 32, 0.08);
--shadow-lg: 0 12px 32px rgba(62, 44, 32, 0.12);
```

### 5.3 "Quiet confidence"

- No gratuitous animations. Transitions should be subtle (150–200ms ease).
- No gradients on backgrounds — use flat, solid colors.
- If something moves, it should have a reason (feedback, state change, drawing attention).
- Hover states: subtle shift (background lightens/darkens), not dramatic transforms.

### 5.4 "Craft in the details"

- Consistent icon style (recommend: Lucide, Phosphor, or Tabler icons — all stroke-based, clean)
- Favicon and Open Graph images should always be up to date
- Loading states should feel considered, not lazy (skeleton screens > spinners)
- Micro-interactions on form inputs: gentle border color transition on focus

---

## 6. Logo Direction

### Concept

The logo should be a **wordmark** ("spikenard" styled as the logo). A monogram ("s") can serve as a compact mark for favicons and avatars.

### Principles

- **Lowercase.** `spikenard` not `SPIKENARD` or `Spikenard` in the wordmark. Lowercase feels approachable and modern.
- **Custom letterforms or a refined geometric sans.** The "s" can have a distinctive rhythm.

### Logo Colors

| Context | Color |
|---------|-------|
| On light backgrounds | `#3E2C20` Umber |
| On dark backgrounds | `#F5EDE4` Linen |
| Brand color variant | `#B08968` Clay |
| Monochrome/print | Pure black or pure white |

### Clear Space

Maintain a minimum clear space around the logo equal to the height of the "d" in the wordmark on all sides.

---

## 7. Developer Implementation Guide

### 7.1 Tech Stack Recommendations

For a brand like spikenard Labs, these align with the values of craft, performance, and modern tooling:

| Layer | Recommendation | Why |
|-------|---------------|-----|
| Framework | **SvelteKit** | Fast, minimal JS, great DX |
| Styling | **Tailwind CSS v4** | Utility-first, design tokens map perfectly |
| Fonts | **Fontsource** or self-hosted | No Google Fonts latency/privacy |
| Icons | **Lucide** or **MDI** for brands | Clean, consistent, tree-shakeable |
| Animation | **CSS transitions only** | No JS animation libraries needed |
| Deployment | **Vercel** or **Cloudflare Pages** | Fast, free tier, global CDN |

### 7.2 Tailwind CSS Configuration

```js
// tailwind.config.js (v4 uses CSS-based config, but this shows the token mapping)
export default {
  theme: {
    extend: {
      colors: {
        // Brand
        clay:      '#B08968',
        umber:     '#3E2C20',
        sand:      '#DDB892',
        linen:     '#F5EDE4',
        parchment: '#FDFAF6',
        rust:      '#C07040',
        sage:      '#7D8B75',
        'stone-blue': '#6B7B8D',
        ember:     '#B85C38',

        // Warm neutrals (replace default grays)
        neutral: {
          50:  '#F9F6F2',
          100: '#F0ECE6',
          200: '#E0D8CE',
          300: '#CCC4B8',
          400: '#AEA498',
          500: '#968A7E',
          600: '#7A6E62',
          700: '#5E5245',
          800: '#4A3F35',
          900: '#2A231C',
          950: '#1C1612',
        },
      },

      fontFamily: {
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },

      boxShadow: {
        sm: '0 1px 2px rgba(62, 44, 32, 0.05)',
        DEFAULT: '0 4px 12px rgba(62, 44, 32, 0.08)',
        lg: '0 12px 32px rgba(62, 44, 32, 0.12)',
      },

      maxWidth: {
        prose: '65ch',
      },
    },
  },
}
```

### 7.3 Tailwind CSS v4 (CSS-based config)

```css
/* app.css */
@import 'tailwindcss';

@theme {
  /* Brand Colors */
  --color-clay: #B08968;
  --color-umber: #3E2C20;
  --color-sand: #DDB892;
  --color-linen: #F5EDE4;
  --color-parchment: #FDFAF6;
  --color-rust: #C07040;
  --color-sage: #7D8B75;
  --color-stone-blue: #6B7B8D;
  --color-ember: #B85C38;

  /* Warm Neutrals */
  --color-neutral-50:  #F9F6F2;
  --color-neutral-100: #F0ECE6;
  --color-neutral-200: #E0D8CE;
  --color-neutral-300: #CCC4B8;
  --color-neutral-400: #AEA498;
  --color-neutral-500: #968A7E;
  --color-neutral-600: #7A6E62;
  --color-neutral-700: #5E5245;
  --color-neutral-800: #4A3F35;
  --color-neutral-900: #2A231C;
  --color-neutral-950: #1C1612;

  /* Typography */
  --font-sans:  'DM Sans', system-ui, sans-serif;
  --font-serif: 'Source Serif 4', Georgia, serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;

  /* Shadows (warm-tinted) */
  --shadow-sm: 0 1px 2px rgba(62, 44, 32, 0.05);
  --shadow-md: 0 4px 12px rgba(62, 44, 32, 0.08);
  --shadow-lg: 0 12px 32px rgba(62, 44, 32, 0.12);

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}
```

### 7.4 CSS Custom Properties (framework-agnostic)

```css
:root {
  /* Brand */
  --spikenard-clay:      #B08968;
  --spikenard-umber:     #3E2C20;
  --spikenard-sand:      #DDB892;
  --spikenard-linen:     #F5EDE4;
  --spikenard-parchment: #FDFAF6;
  --spikenard-rust:      #C07040;
  --spikenard-sage:      #7D8B75;
  --spikenard-stone-blue:#6B7B8D;
  --spikenard-ember:     #B85C38;

  /* Semantic tokens */
  --color-bg:         var(--spikenard-parchment);
  --color-surface:    var(--spikenard-linen);
  --color-border:     #CCC4B8;
  --color-text:       var(--spikenard-umber);
  --color-text-muted: #7A6E62;
  --color-accent:     var(--spikenard-clay);
  --color-accent-hover: #96744C;
  --color-cta:        var(--spikenard-rust);
}

[data-theme="dark"] {
  --color-bg:         #1C1612;
  --color-surface:    #2A231C;
  --color-border:     #4A3F35;
  --color-text:       #F0ECE6;
  --color-text-muted: #968A7E;
  --color-accent:     var(--spikenard-sand);
  --color-accent-hover: #E8C8A0;
  --color-cta:        #D4844C;
}
```

---

## 8. Website Structure

### Recommended Pages

```
/                  — Home (hero + featured projects + value prop)
/projects          — All projects/tools (grid layout)
/projects/[slug]   — Individual project page
/about             — Origin story, team, values
/blog              — Posts, tutorials, build logs (optional)
/open-source       — OSS contributions, philosophy
```

### Home Page Sections

1. **Hero** — Name + tagline + one CTA. No clutter. Let the whitespace set the tone.
2. **Featured work** — 3–4 highlighted projects. Cards with name, one-line desc, tech tags.
3. **What we do** — Short copy: tools, platforms, open-source, rebuilt tutorials.
4. **Values/philosophy** — 3 pillars (e.g., "Crafted with care," "Open by default," "Built to last").
5. **Footer** — GitHub link, socials, "Built by Spikenard" tagline.

### Page Layout Rules

- Max content width: `1200px` (75rem)
- Prose/text max width: `65ch`
- Side padding: `1.5rem` (mobile), `3rem` (desktop)
- Section spacing: `6rem` (mobile), `8rem` (desktop)

---

## 9. Assets & Social

### GitHub Organization

- **Handle:** `spikenardco`
- **Display name:** Spikenard
- **URL:** `github.com/spikenardco`
- **Bio:** "Crafted, not assembled. Open-source tools and platforms."
- **Avatar:** Monogram mark (stylized `s`) on `#3E2C20` background in `#F5EDE4`

### Open Graph / Social Cards

- **Dimensions:** 1200x630px
- **Background:** `#3E2C20` (Umber)
- **Text:** `#F5EDE4` (Linen)
- **Accent line or mark:** `#B08968` (Clay)
- **Font:** Same as site headings (DM Sans or chosen font)
- Keep it minimal: logo/name + page title. No busy patterns.

### Favicon

- **Format:** SVG preferred (with PNG fallback at 32x32, 192x192, 512x512)
- **Design:** Monogram `d` or `dl` — Umber on transparent, or Clay on Umber for dark contexts

---

## 10. Do's and Don'ts

### Do

- Use generous whitespace
- Keep the warm neutral palette — every surface should feel warm
- Use Clay (`#B08968`) as the signature color — it should be recognizable
- Write concise, human copy
- Self-host fonts for performance
- Test contrast ratios (WCAG AA minimum: 4.5:1 for text)

### Don't

- Use pure black (`#000`) or pure white (`#FFF`) — always use the warm variants
- Use more than 2 accent colors on a single page
- Add animations that don't serve a purpose
- Use stock photos — illustrations, code snippets, or nothing
- Use ALL CAPS for body text (headings only, sparingly)
- Add gradients to the browns — they'll look muddy

---

## 11. Accessibility Checklist

| Check | Target |
|-------|--------|
| Text contrast on Parchment bg | Umber `#3E2C20` on `#FDFAF6` = **14.8:1** (AAA) |
| Text contrast on Linen bg | Umber on `#F5EDE4` = **12.1:1** (AAA) |
| Clay on Parchment (links) | `#B08968` on `#FDFAF6` = **4.1:1** (use on large text, or darken for small) |
| Clay on Umber (dark mode) | `#B08968` on `#3E2C20` = **3.6:1** (use Sand `#DDB892` instead = **6.8:1**) |
| Focus indicators | Always visible, 2px outline in Clay |
| Keyboard navigation | All interactive elements reachable via Tab |
| Reduced motion | Respect `prefers-reduced-motion` — disable transitions |

> **Note:** Clay on light backgrounds may not pass WCAG AA for small text (needs 4.5:1). For small body links, use a darkened variant `#8B6E4E` which hits **5.6:1** on Parchment.

---

## 12. Quick Reference — Color Palette

```
BRAND
  Clay ━━━━━━━━━━  #B08968  ▓▓▓▓▓  Primary brand color
  Sand ━━━━━━━━━━  #DDB892  ▓▓▓▓▓  Secondary / highlight
  Umber ━━━━━━━━━  #3E2C20  ▓▓▓▓▓  Dark anchor
  Linen ━━━━━━━━━  #F5EDE4  ▓▓▓▓▓  Light surface
  Parchment ━━━━━  #FDFAF6  ▓▓▓▓▓  Page background

ACCENTS
  Rust ━━━━━━━━━━  #C07040  ▓▓▓▓▓  CTA / warm emphasis
  Sage ━━━━━━━━━━  #7D8B75  ▓▓▓▓▓  Success / natural
  Stone Blue ━━━━  #6B7B8D  ▓▓▓▓▓  Info / cool contrast
  Ember ━━━━━━━━━  #B85C38  ▓▓▓▓▓  Error / warning

NEUTRALS (warm)
  50 ━━  #F9F6F2    300 ━━  #CCC4B8    700 ━━  #5E5245
  100 ━  #F0ECE6    400 ━━  #AEA498    800 ━━  #4A3F35
  200 ━  #E0D8CE    500 ━━  #968A7E    900 ━━  #2A231C
                    600 ━━  #7A6E62    950 ━━  #1C1612
```

---

*This guide is a living document. Update it as the brand evolves.*
