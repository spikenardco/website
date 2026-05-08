# Spikenard Website

The marketing and content site for [Spikenard](https://github.com/spikenardco), built with SvelteKit and Tailwind CSS v4.

## Tech stack

- **Framework** — SvelteKit (Svelte 5) with static adapter
- **Styling** — Tailwind CSS v4 with Typography and Forms plugins
- **Icons** — Iconify (Lucide + MDI sets) via `@iconify/tailwind4`
- **Content** — MDsveX for Markdown-based blog posts and job listings
- **Language** — TypeScript

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/projects` | Project showcase |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/open-source` | Open source work |
| `/careers` | Job listings |
| `/careers/[slug]` | Individual job posting |

## Navigation

- **Desktop** — sticky top bar with inline links (Projects, Blog, Open Source) and GitHub icon
- **Mobile** — floating action button (bottom-right) that reveals pill-shaped nav links on tap; auto-hides on scroll-down, reappears on scroll-up

## Developing

```sh
npm install
npm run dev
```

## Building

```sh
npm run build
npm run preview   # preview the production build locally
```

## Type checking

```sh
npm run check
```

## Domain notes

Spikenard uses `spikenard.dev` as the primary domain.
