# Raúl Casado — Blog personal y portfolio

Blog personal y portfolio construido con [Astro](https://astro.build/). La web está pensada para escritura técnica bilingüe, visibilidad de proyectos, rendimiento, accesibilidad, RSS, sitemap y un flujo de contenido mantenible.

## Características

- Rutas bilingües en español e inglés.
- Blog basado en colecciones de contenido de Astro, Markdown y MDX.
- RSS, sitemap, URLs canónicas y metadatos Open Graph.
- Imágenes optimizadas mediante assets de Astro desde `src/assets` cuando forman parte del pipeline de build.
- Auditorías reproducibles de navegador, Lighthouse y seguridad.
- Build estático preparado para Netlify.

## Estructura del proyecto

```text
├── public/              # Archivos públicos y URLs estables
├── src/
│   ├── assets/          # Imágenes procesadas por Astro
│   ├── components/
│   ├── content/         # Posts del blog
│   ├── layouts/
│   └── pages/
├── scripts/             # Automatización de auditoría
├── tests/               # Checks con Playwright
├── astro.config.mjs
├── package.json
└── playwright.config.ts
```

## Comandos

Todos los comandos usan pnpm:

| Comando | Acción |
| :-- | :-- |
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Inicia el servidor de desarrollo local |
| `pnpm build` | Construye la web de producción en `./dist/` |
| `pnpm preview` | Previsualiza el build de producción en local |
| `pnpm audit:security` | Ejecuta auditorías de dependencias de producción y severidad alta |
| `pnpm audit:browser` | Ejecuta checks de navegador con Playwright |
| `pnpm audit:lighthouse` | Genera informes Lighthouse para rutas seleccionadas |
| `pnpm audit` | Ejecuta build, seguridad, navegador y Lighthouse |

## Notas de auditoría

Los resultados de Lighthouse son específicos por ruta, no una promesa global y permanente de `100/100`. Los artefactos de auditoría se guardan en `.audit/` y se ignoran en Git.

## Crédito

El tema original partía de [Bear Blog](https://github.com/HermanMartinus/bearblog/) y se ha adaptado para este portfolio.
