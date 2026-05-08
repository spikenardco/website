# Blog Post Template

How to write and publish a blog post on the Spikenard site.

## Quick start

1. Create a new `.md` file in `src/posts/`
2. Name it with a URL-friendly slug: `your-post-title.md` (lowercase, hyphens, no spaces)
3. Add the required frontmatter (see below)
4. Write your content in markdown
5. Run `npm run dev` and visit `/blog` to preview
6. The post appears automatically — no config changes needed

## Frontmatter (required)

Every post must start with this YAML block:

```yaml
---
title: 'Your post title'
date: 'YYYY-MM-DD'
excerpt: 'A one-to-two sentence summary shown on the blog listing page.'
tags: ['Category']
authors: ['Author Name']
draft: false
---
```

| Field         | Type    | Description                                                  |
| ------------- | ------- | ------------------------------------------------------------ |
| `title`       | string  | The full post title. Displayed on the post page and listing. |
| `date`        | string  | ISO 8601 date (`2026-03-15`). Controls sort order.           |
| `excerpt`     | string  | 1-2 sentences. Shown on `/blog` and in the `<meta>` tag.    |
| `tags`        | array   | List of tags, e.g. `['Product', 'Engineering']`. Used for filtering. |
| `authors`     | array   | List of author names. Empty defaults to "Team".             |
| `draft`       | boolean | Set to `true` to exclude from production.                    |

## File naming

The filename becomes the URL slug:

```
src/posts/why-we-chose-zig.md  →  /blog/why-we-chose-zig
src/posts/building-in-public.md  →  /blog/building-in-public
```

Rules:
- Lowercase only
- Hyphens between words (no underscores or spaces)
- Keep it short but descriptive
- No dates in the filename (the date is in the frontmatter)

## Writing style

**Voice:** First-person plural ("we"). We write as a team, not individuals.

**Tone:** Technical but accessible. Honest about trade-offs. No hype, no hand-waving. Write like you're explaining something to a smart colleague.

**Length:** Aim for 800-1,200 words (4-8 min reads). Long enough to say something useful, short enough to respect the reader's time.

**Structure:** Use a consistent pattern:

1. **Hook** — Open with the problem or context (1-2 paragraphs)
2. **Sections** — Break the body into 3-6 sections with `##` headings
3. **Close** — End with a takeaway, a call to action, or a forward-looking statement

**Headings:** Use `##` for sections. Avoid `###` unless truly needed. Headings should be scannable — a reader should understand the post's arc just by reading the headings.

## Formatting

**Code blocks:** Use fenced code blocks with language hints:

````markdown
```zig
const x = comptime parse(input);
```
````

**Links:** Use relative paths for internal links:

```markdown
[building in public](/blog/building-in-public)
[our projects](/projects)
```

Use full URLs for external links:

```markdown
[flags.zig on GitHub](https://github.com/spikenardco/flags.zig)
```

**Emphasis:** Use bold (`**text**`) for key phrases. Use italics sparingly. Never use ALL CAPS for emphasis.

**Lists:** Use numbered lists for sequences/steps, bullet lists for unordered items.

## What to avoid

- Jargon without context — define terms or link to explanations
- Clickbait titles — say what the post is actually about
- Empty sections — don't include headings with no content
- Walls of text — break things up with headings, code, and short paragraphs
- Emojis — we don't use them in blog posts

## Example post skeleton

```markdown
---
title: 'What we learned building X'
date: '2026-04-01'
excerpt: 'A brief summary of the key lessons from building X with Y technology.'
tags: ['Engineering']
---

Opening paragraph that sets the context. What problem were we solving?
Why does the reader care?

## The challenge

Describe the problem in more detail. What did we try first?

## What we chose

Explain the approach. Include code examples if relevant.

## What surprised us

Honest reflections. What worked? What didn't?

## What we'd do differently

Hindsight. Lessons for next time.

## Takeaway

One-paragraph summary. Link to the project or related posts.
```

## How it works (technical)

- Posts are processed by [mdsvex](https://mdsvex.pngwn.io) (markdown + Svelte preprocessor)
- `src/lib/posts.ts` uses `import.meta.glob` to discover all `.md` files in `src/posts/`
- Posts are sorted by `date` (newest first) on the `/blog` listing page
- Each post is rendered as a Svelte component at `/blog/[slug]`
- The site is statically generated — posts are built at compile time, not runtime
