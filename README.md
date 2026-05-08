# sagasvision

Personal blog by Celia Sagastume on adaptive optics, AR, and the science of seeing.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Project structure

```
/
├── public/                    Static assets (favicon, og-image, etc.)
├── src/
│   ├── components/            Astro components (Navigation, Footer, BaseHead, ...)
│   ├── content/posts/         Blog posts as Markdown / MDX
│   ├── images/blog/           Images referenced from posts
│   ├── layouts/               BaseLayout + BlogLayout
│   ├── pages/                 Routes (index, posts/[slug], tags, rss.xml, 404)
│   ├── styles/global.css      Tailwind v4 entry + theme tokens
│   └── content.config.ts      Frontmatter schema for posts
├── astro.config.mjs
└── package.json
```

## Writing a post

Drop a Markdown or MDX file into `src/content/posts/`. Frontmatter schema:

```yaml
---
pubDate: 2026-05-08
author: Celia Sagastume
title: "Post title"
description: "One-sentence summary used on the index card and in RSS."
image:
  url: "/src/images/blog/your-image.jpeg"
  alt: "Alt text"
tags: ["adaptive-optics", "ar"]
---
```

Filename becomes the URL slug (`/posts/<filename-without-extension>`). All listed tags automatically generate `/tags/<tag>` index pages.

Drafts: any file whose name starts with `_` is ignored by the content loader (see `content.config.ts`).

## Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server                       |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |

## Customization notes

- Site URL lives in `astro.config.mjs` (`site: 'https://sagasvision.com'`).
- SEO defaults (title, description, OG image) are in `src/components/BaseHead.astro`.
- Color tokens (`--color-base-*`) and fonts are in `src/styles/global.css`.

---

Originally bootstrapped from the Lexington Themes "microblog" Astro starter, then rebranded.
