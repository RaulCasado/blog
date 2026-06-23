# Raúl Casado — Personal Blog & Portfolio

Personal blog and portfolio built with [Astro](https://astro.build/). The site is focused on bilingual technical writing, project visibility, performance, accessibility, RSS, sitemap, and a maintainable content workflow.

[Leer en Español](README_es.md)

## Features

- Bilingual routes for English and Spanish.
- Blog powered by Astro content collections, Markdown and MDX.
- RSS feed, sitemap, canonical URLs and Open Graph metadata.
- Optimized images through Astro assets from `src/assets` when images are part of the build pipeline.
- Reproducible browser, Lighthouse and security audits.
- Netlify-ready static build.

## Project structure

```text
├── public/              # Public static files and stable URLs
├── src/
│   ├── assets/          # Images processed by Astro
│   ├── components/
│   ├── content/         # Blog posts
│   ├── layouts/
│   └── pages/
├── scripts/             # Audit automation
├── tests/               # Playwright checks
├── astro.config.mjs
├── package.json
└── playwright.config.ts
```

## Commands

All commands use pnpm:

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the local dev server |
| `pnpm build` | Build the production site into `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm audit:security` | Run production and high-severity dependency audits |
| `pnpm audit:browser` | Run Playwright browser checks |
| `pnpm audit:lighthouse` | Generate Lighthouse reports for selected routes |
| `pnpm audit` | Run build, security, browser and Lighthouse checks |

## Auditing notes

Lighthouse results are route-specific, not a blanket permanent `100/100` claim. Audit artifacts are written to `.audit/` and ignored by Git.

## Credit

The original theme started from [Bear Blog](https://github.com/HermanMartinus/bearblog/) and has since been adapted for this portfolio.
