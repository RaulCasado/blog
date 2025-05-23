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



# Let's Implement Translations for Your Site! 🚀

I can see you're interested in adding multi-language support to your website. This is a great feature to make your site more accessible to different audiences. Based on the information in your README, let's implement the i18n functionality using astro-i18n.

## Step 1: Install astro-i18n

First, let's install the astro-i18n package:

```bash
npm install astro-i18n
```

## Step 2: Configure Astro

Let's update your astro.config.mjs file:

````javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import i18n from 'astro-i18n';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(), 
    sitemap(),
    i18n({
      defaultLocale: 'es',
      locales: ['es', 'en'],
      routingStrategy: 'prefix-other-locales',
    })
  ],
});
````

## Step 3: Create Translation Files

Next, let's create the translation files structure:

````javascript
{
  "global": {
    "site_title": "Raúl Casado",
    "home": "Inicio",
    "blog": "Blog",
    "about": "Sobre Mí",
    "portfolio": "Portfolio",
    "cv": "CV"
  },
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
  },
  "about": {
    "title": "Sobre Mí",
    "intro": "Hola, soy Raúl Casado 👋",
    "description": "Un apasionado Desarrollador Web 🖥️ con experiencia en proyectos creativos y en continuo aprendizaje en 42. Me encuentro en busca de una oportunidad que me haga crecer profesionalmente junto a la empresa.",
    "metrics": {
      "available": "Disponible",
      "forProjects": "Para nuevos proyectos",
      "hours": "+500",
      "studyHours": "Horas de estudio",
      "projects": "+10",
      "projectsCompleted": "Proyectos"
    },
    "philosophy": {
      "title": "Mi Enfoque",
      "content": "Creo que el mejor código es aquel que resuelve problemas de forma elegante y mantenible. Me esfuerzo por crear soluciones que sean tan intuitivas para los usuarios como para otros desarrolladores que trabajen con mi código. Mi experiencia trabajando en equipo en proyectos de 42 me ha enseñado la importancia de la comunicación clara y la documentación efectiva."
    },
    "personal": {
      "title": "Cuando no estoy programando",
      "content": "Cuando no estoy programando, me gusta desconectar disfrutando de películas, series y videojuegos. Además de entretenerme, muchas veces me inspiran a crear cosas nuevas. Por ejemplo, después de jugar a Pokémon Guesser donde tienes que adivinar el Pokémon a partir de su silueta, decidí desarrollar un juego similar, pero con diferentes pistas como el peso, los colores o la sombra del Pokémon. Me encanta ver cómo otras personas diseñan sus sitios web o aplicaciones, y eso me motiva a seguir aprendiendo y experimentando con mis propias ideas."
    }
  },
  "theme": {
    "switch": "Cambiar tema"
  }
}
````

````javascript
{
  "global": {
    "site_title": "Raúl Casado",
    "home": "Home",
    "blog": "Blog",
    "about": "About Me",
    "portfolio": "Portfolio",
    "cv": "CV"
  },
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
  },
  "about": {
    "title": "About Me",
    "intro": "Hello, I'm Raúl Casado 👋",
    "description": "A passionate Web Developer 🖥️ with experience in creative projects and continuous learning at 42. I'm looking for an opportunity to grow professionally alongside a company.",
    "metrics": {
      "available": "Available",
      "forProjects": "For new projects",
      "hours": "+500",
      "studyHours": "Study hours",
      "projects": "+10",
      "projectsCompleted": "Projects"
    },
    "philosophy": {
      "title": "My Approach",
      "content": "I believe the best code is one that solves problems elegantly and maintainably. I strive to create solutions that are intuitive for both users and other developers working with my code. My experience working in teams on projects at 42 has taught me the importance of clear communication and effective documentation."
    },
    "personal": {
      "title": "When I'm not coding",
      "content": "When I'm not programming, I like to disconnect by enjoying movies, series, and video games. Besides entertaining me, they often inspire me to create new things. For example, after playing Pokémon Guesser where you have to guess the Pokémon from its silhouette, I decided to develop a similar game, but with different clues like weight, colors, or the Pokémon's shadow. I love seeing how other people design their websites or applications, and that motivates me to keep learning and experimenting with my own ideas."
    }
  },
  "theme": {
    "switch": "Switch theme"
  }
}
````

## Step 4: Create a Language Switcher Component

Now, let's create a language switcher component:

````astro
---
import { l, getLocale } from "astro-i18n";

const currentLocale = getLocale();
---

<div class="language-switcher">
  <a href={l('/', {}, 'es')} class:list={[{ active: currentLocale === 'es' }]}>ES</a>
  <span class="divider">|</span>
  <a href={l('/', {}, 'en')} class:list={[{ active: currentLocale === 'en' }]}>EN</a>
</div>

<style>
  .language-switcher {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .language-switcher a {
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    font-weight: 500;
    padding: 0.25rem;
    font-size: 0.875rem;
    transition: color 0.2s ease;
  }
  
  .language-switcher a.active {
    color: hsl(var(--primary));
    font-weight: 600;
  }
  
  .language-switcher a:hover {
    color: hsl(var(--primary));
  }
  
  .divider {
    color: hsl(var(--muted-foreground));
    font-size: 0.875rem;
  }
</style>
````

## Step 5: Update Header Component to Include Language Switcher

Let's modify your Header component to include the language switcher:

````astro
---
import HeaderLink from './HeaderLink.astro';
import { SITE_TITLE } from '../consts';
import ThemeSwitcher from './ThemeSwitcher.astro';
import LanguageSwitcher from './LanguageSwitcher.astro';
import { t } from "astro-i18n";
---

<header>
  <nav>
    <h2><a href="/">{SITE_TITLE}</a></h2>
    <div class="internal-links">
      <HeaderLink href="/">{t('global.home')}</HeaderLink>
      <HeaderLink href="/blog">{t('global.blog')}</HeaderLink>
      <HeaderLink href="/about">{t('global.about')}</HeaderLink>
      <HeaderLink href="/portfolio">{t('global.portfolio')}</HeaderLink>
      <HeaderLink href="/cv">{t('global.cv')}</HeaderLink>
    </div>
    <div class="social-links">
      <LanguageSwitcher />
      <a href="https://www.linkedin.com/in/raul-casado/" target="_blank">
        <span class="sr-only">Follow me on LinkedIn</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" class="linkedin">
          <path d="M20.447 19.727v-5.301c0-2.74-1.47-4.02-3.427-4.02-1.582 0-2.288.863-2.685 1.47v-1.26h-2.972c.039.846 0 9.011 0 9.011h2.972v-5.032c0-.267.02-.534.1-.724.222-.534.726-1.088 1.571-1.088 1.107 0 1.55.843 1.55 2.081v4.763h2.9zM8.26 9.517h-.001c.996 0 1.617-.66 1.617-1.496-.019-.85-.621-1.497-1.6-1.497-.976 0-1.615.647-1.615 1.497 0 .836.62 1.496 1.58 1.496h.019zM9.744 19.95v-8.999H6.755v8.999h2.989z"/>
        </svg>
      </a>
      <a href="https://github.com/raulc967" target="_blank">
        <span class="sr-only">Go to my GitHub</span>
        <svg viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" class="github">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="currentColor"></path>
        </svg>
      </a>
      <ThemeSwitcher />
    </div>
  </nav>
</header>

<style>
  /* Your existing styles */
</style>
````

## Step 6: Update the ThemeSwitcher to Use Translations

Let's update your ThemeSwitcher to use translations:

````astro
// filepath: /home/raul/Escritorio/web-freelance/my-theme/src/components/ThemeSwitcher.astro
---
import { t } from "astro-i18n";
---

<div class="theme-switcher">
  <button id="theme-toggle" aria-label={t('theme.switch')}>
    <!-- Sun icon for dark mode (shown when in dark mode) -->
    <svg xmlns="http://www.w3.org/2000/svg" id="sun-icon" class="icon sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    
    <!-- Moon icon for light mode (shown when in light mode) -->
    <svg xmlns="http://www.w3.org/2000/svg" id="moon-icon" class="icon moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>
</div>

<script>
  // Your existing theme switching script
</script>

<style>
  /* Your existing styles */
</style>
````

## Step 7: Update About Page to Use Translations

Now, let's update your "About" page to use translations:

````astro
home/raul/Escritorio/web-freelance/my-theme/src/pages/about.astro
---
import StandardPageLayout from '../layouts/StandardPageLayout.astro';
import { t } from "astro-i18n";
---

<StandardPageLayout
	title={t('about.title')}
	description="Raúl Casado - Desarrollador Web"
>
	<div class="about-container">
		<div class="about-personal-intro">
  			<h2>{t('about.intro')}</h2>
  			<p class="about-description">
   				{t('about.description')}
  			</p>
		</div>

		<div class="about-metrics">
			<div class="about-metrics-grid">
				<div class="about-metric-item">
					<div class="about-metric-value">{t('about.metrics.available')}</div>
					<div class="about-metric-label">{t('about.metrics.forProjects')}</div>
				</div>
				<div class="about-metric-item">
					<div class="about-metric-value">{t('about.metrics.hours')}</div>
					<div class="about-metric-label">{t('about.metrics.studyHours')}</div>
				</div>
				<div class="about-metric-item">
					<div class="about-metric-value">{t('about.metrics.projects')}</div>
					<div class="about-metric-label">{t('about.metrics.projectsCompleted')}</div>
				</div>
			</div>
		</div>

		<!-- Rest of your about page with translations -->
		<div class="about-philosophy">
  			<h3>{t('about.philosophy.title')}</h3>
  			<p class="about-description">
    			{t('about.philosophy.content')}
  			</p>
		</div>
		
		<div class="about-personal-section">
  			<h3>{t('about.personal.title')}</h3>
			<p class="about-description">
				{t('about.personal.content')}
  			</p>
		</div>
		
		<!-- Your existing tech badges section -->
	</div>
</StandardPageLayout>

<style>
  /* Your existing styles */
</style>
````

## Step 8: Create Localized Version of CV Page

Similarly, update your CV page:

````astro
---
import StandardPageLayout from '../layouts/StandardPageLayout.astro';
import { t } from "astro-i18n";
---

<StandardPageLayout
	title={t('cv.title')}
	description={t('cv.subtitle')}
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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        {t('cv.downloadBtn')}
      </button>
    </div>
    
    <!-- Rest of your CV content with translations -->
  </div>
</StandardPageLayout>

<style>
  /* Your existing styles */
</style>
````

## Step 9: Create Localized Version of Blog Index Page

Let's update your blog index page:

````astro
---
import { getCollection } from 'astro:content';
import FormattedDate from '../../components/FormattedDate.astro';
import StandardPageLayout from '../../layouts/StandardPageLayout.astro';
import { t, getLocale } from "astro-i18n";

const locale = getLocale();
const posts = (await getCollection('blog'))
  .sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());

// Filter posts by locale if needed
const localePosts = posts.filter(post => 
  !post.data.locale || post.data.locale === locale || post.data.locale === 'all'
);
---

<StandardPageLayout
  title="Blog"
  description="Latest articles on web development, technology, and my projects"
>
  <section class="blog-index-container">
    <h1>Blog</h1>
    
    <!-- Featured post -->
    <!-- Your existing featured post markup with translations if needed -->
    
    <!-- Regular posts -->
    <!-- Your existing posts list with translations if needed -->
  </section>
</StandardPageLayout>

<style>
  /* Your existing styles */
</style>
````

## Step 10: Configure Blog Posts for Localization

For blog posts, you might want to add a `locale` property to the frontmatter:

```markdown
---
title: 'Multithreading'
description: 'Una exploración filosófica del problema de los filósofos comensales y conceptos de programación concurrente'
pubDate: 'May 13 2025'
heroImage: '/philo.webp'
heroImageAlt: 'Una ilustración conceptual de cinco filósofos sentados alrededor de una mesa'
locale: 'es' // Add this line to specify the language
---

# Content in Spanish
```

You can create duplicate files for different languages or filter posts based on locale.

## What This Gives You

This implementation provides:

1. A language switcher in your header
2. Translations for navigation and common elements
3. Translated content for static pages like About and CV
4. Support for language-specific blog posts
5. URL prefixing for non-default languages (e.g., /en/about for English)

You can extend the translations as needed for other parts of your site. The beauty of this approach is that you maintain a single codebase while supporting multiple languages.

Would you like me to explain any part of this implementation in more detail?

Similar code found with 2 license types