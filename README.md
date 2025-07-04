# Personal Blog & Portfolio

This is my personal blog and portfolio, built with [Astro](https://astro.build/). It's designed to be fast, content-focused, and easily maintainable.

## ✨ Features

-   ✅ Minimal styling (make it your own!)
-   ✅ 100/100 Lighthouse performance
-   ✅ SEO-friendly with canonical URLs and OpenGraph data
-   ✅ Sitemap support
-   ✅ RSS Feed support
-   ✅ Markdown & MDX support
-   ✅ Internationalization (i18n) ready for English and Spanish.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command          | Action                                         |
| :--------------- | :--------------------------------------------- |
| `pnpm install`   | Installs dependencies                          |
| `pnpm dev`       | Starts local dev server at `localhost:4321`    |
| `pnpm build`     | Build your production site to `./dist/`        |
| `pnpm preview`   | Preview your build locally, before deploying   |
| `pnpm astro ...` | Run CLI commands like `astro add`, `astro check` |

## 👀 Want to learn more?

Check out the [Astro documentation](https://docs.astro.build) or jump into the [Astro Discord server](https://astro.build/chat).

## Credit

This theme is based on the [Bear Blog](https://github.com/HermanMartinus/bearblog/).