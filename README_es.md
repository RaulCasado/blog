# Blog Personal y Portafolio

Este es mi blog personal y portafolio, construido con [Astro](https://astro.build/). Está diseñado para ser rápido, centrado en el contenido y fácil de mantener.

## ✨ Características

-   ✅ Estilo minimalista (¡personalízalo a tu gusto!)
-   ✅ Rendimiento 100/100 en Lighthouse
-   ✅ Optimizado para SEO con URLs canónicas y datos OpenGraph
-   ✅ Soporte para mapas del sitio
-   ✅ Soporte para fuentes RSS
-   ✅ Soporte para Markdown y MDX
-   ✅ Preparado para internacionalización (i18n) en inglés y español.

## 🚀 Estructura del Proyecto

Dentro de tu proyecto Astro, verás las siguientes carpetas y archivos:

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

Astro busca archivos `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta basada en su nombre de archivo.

El directorio `src/content/` contiene "colecciones" de documentos relacionados en Markdown y MDX. Usa `getCollection()` para recuperar publicaciones de `src/content/blog/`.

Cualquier recurso estático, como imágenes, puede colocarse en el directorio `public/`.

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando          | Acción                                         |
| :--------------- | :--------------------------------------------- |
| `pnpm install`   | Instala las dependencias                       |
| `pnpm dev`       | Inicia el servidor de desarrollo local en `localhost:4321` |
| `pnpm build`     | Construye tu sitio de producción en `./dist/`  |
| `pnpm preview`   | Previsualiza tu construcción localmente, antes de desplegar |
| `pnpm astro ...` | Ejecuta comandos CLI como `astro add`, `astro check` |

## 👀 ¿Quieres aprender más?

Consulta la [documentación de Astro](https://docs.astro.build) o únete al [servidor de Discord de Astro](https://astro.build/chat).

## Crédito

Este tema está basado en el [Bear Blog](https://github.com/HermanMartinus/bearblog/).