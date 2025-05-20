# Astro Starter Kit: Blog

```sh
pnpm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).


Collecting workspace informationBased on your website structure, I can suggest a straightforward approach to implement translation functionality in your Astro site.

## Option 1: Use i18n Integration with Astro

Astro has an official internationalization integration called `astro-i18n` that works well for this purpose:

1. **Install the integration:**

```bash
npm install astro-i18n
```

2. **Configure it in your astro.config.mjs:**

````typescript
import { defineConfig } from 'astro/config';
import i18n from 'astro-i18n';

// https://astro.build/config
export default defineConfig({
  integrations: [
    i18n({
      defaultLocale: 'es',
      locales: ['es', 'en'],
      routingStrategy: 'prefix-other-locales',
    })
  ],
});
````

3. **Create translation files** in a new directory:

```
src/
  i18n/
    es.json
    en.json
```

4. **Add your translations** to these files:

````json
{
  "cv": {
    "title": "Curriculum Vitae",
    "subtitle": "Mi experiencia profesional, habilidades y educación",
    "downloadBtn": "Descargar CV",
    "personalInfo": "Información Personal",
    "workExperience": "Experiencia Laboral",
    "education": "Educación",
    "skills": "Habilidades",
    "technicalSkills": "Habilidades Técnicas",
    "languages": "Idiomas",
    "availability": "Disponibilidad"
  }
}
````

````json
{
  "cv": {
    "title": "Curriculum Vitae",
    "subtitle": "My professional experience, skills, and education",
    "downloadBtn": "Download CV",
    "personalInfo": "Personal Information",
    "workExperience": "Work Experience",
    "education": "Education",
    "skills": "Skills",
    "technicalSkills": "Technical Skills",
    "languages": "Languages",
    "availability": "Availability"
  }
}
````

5. **Add a language switcher component:**

```astro
---
import { l, getLocale } from "astro-i18n";

const currentLocale = getLocale();
---

<div class="language-switcher">
  <a href={l('/cv', {}, 'es')} class={currentLocale === 'es' ? 'active' : ''}>ES</a>
  <span class="divider">|</span>
  <a href={l('/cv', {}, 'en')} class={currentLocale === 'en' ? 'active' : ''}>EN</a>
</div>

<style>
  .language-switcher {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }
  
  .language-switcher a {
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    font-weight: 500;
    padding: 0.25rem;
  }
  
  .language-switcher a.active {
    color: hsl(var(--primary));
    font-weight: 600;
  }
  
  .divider {
    color: hsl(var(--muted-foreground));
  }
  
  .language-switcher a:hover {
    color: hsl(var(--primary));
  }
</style>
```

6. **Add the language switcher** to your header or any preferred location:

```astro
---
import HeaderLink from './HeaderLink.astro';
import { SITE_TITLE } from '../consts';
import LanguageSwitcher from './LanguageSwitcher.astro';
---

<header>
  <nav>
    <h2><a href="/">{SITE_TITLE}</a></h2>
    <div class="internal-links">
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/blog">Blog</HeaderLink>
      <HeaderLink href="/about">About</HeaderLink>
      <HeaderLink href="/portfolio">Portfolio</HeaderLink>
      <HeaderLink href="/cv">CV</HeaderLink>
    </div>
    <div class="social-links">
      <LanguageSwitcher />
      <!-- Your existing social links -->
    </div>
  </nav>
</header>
```

7. **Use translations in your files:**

```astro
---
import Layout from '../layouts/BlogPost.astro';
import { t } from "astro-i18n";
---

<Layout
  title={t('cv.title')}
  description={t('cv.subtitle')}
  pubDate={new Date('August 08 2021')}
  heroImage="/blog-placeholder-about.jpg"
>
  <div class="cv-container">
    <div class="cv-header">
      <div class="cv-header-content">
        <h1>{t('cv.title')}</h1>
        <p class="cv-subtitle">
          {t('cv.subtitle')}
        </p>
      </div>
      <button class="cv-download-btn">
        <!-- icon -->
        {t('cv.downloadBtn')}
      </button>
    </div>
    <!-- Rest of your content -->
  </div>
</Layout>
```

## Option 2: Simpler Approach with Context

If you prefer a simpler solution without needing to install an integration:

1. **Create a language context store:**

```typescript
import { atom } from 'nanostores';

export const language = atom<'es' | 'en'>('es');

export const translations = {
  es: {
    cv: {
      title: "Curriculum Vitae",
      subtitle: "Mi experiencia profesional, habilidades y educación",
      // Add all your translations here
    }
  },
  en: {
    cv: {
      title: "Curriculum Vitae",
      subtitle: "My professional experience, skills, and education",
      // Add all your translations here
    }
  }
};

export function t(key: string): string {
  const currentLang = language.get();
  const keys = key.split('.');
  let result = translations[currentLang];
  
  for (const k of keys) {
    if (result[k] === undefined) return key;
    result = result[k];
  }
  
  return result;
}
```

2. **Create a language switcher component:**

```astro
---
import { language } from '../store/language';
---

<div class="language-switcher">
  <button 
    class="lang-btn" 
    data-lang="es" 
    id="es-btn">ES</button>
  <span class="divider">|</span>
  <button 
    class="lang-btn" 
    data-lang="en" 
    id="en-btn">EN</button>
</div>

<script>
  import { language } from '../store/language';
  
  // Initialize buttons based on current language
  const currentLang = localStorage.getItem('language') || 'es';
  language.set(currentLang);
  
  updateActiveButton(currentLang);
  
  // Set up event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      language.set(lang);
      localStorage.setItem('language', lang);
      updateActiveButton(lang);
      window.location.reload();
    });
  });
  
  function updateActiveButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
</script>

<style>
  .language-switcher {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .lang-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    padding: 0.25rem;
  }
  
  .lang-btn.active {
    color: hsl(var(--primary));
    font-weight: 600;
  }
  
  .divider {
    color: hsl(var(--muted-foreground));
  }
  
  .lang-btn:hover {
    color: hsl(var(--primary));
  }
</style>
```

3. **Add the language store initialization to your main layout:**

```astro
<script>
  import { language } from '../store/language';
  
  // Initialize language from localStorage or default to Spanish
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    language.set(savedLang);
  }
</script>
```

This approach is simpler but requires you to manage the translation strings and language state manually. The Astro i18n integration (Option 1) offers a more robust solution with routing support and better organization of translations.

Would you like me to provide more details on either of these approaches?

Similar code found with 1 license type