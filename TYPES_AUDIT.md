# Auditoría de Tipados (`any`) y Arquitectura de Tipos — Blog

> **Modo:** revisión e informe. **No se ha modificado ni creado ningún archivo de código.** Este documento es el entregable previo a la refactorización.
> **Stack:** Astro 7.0.0 · TypeScript (`astro/tsconfigs/strict` + `strictNullChecks`) · build limpio (0 errores / 0 warnings).
> **Fecha:** 2026-06-25

---

## 0. TL;DR

| Métrica | Valor |
|---|---|
| `any` **explícitos** (grep) | **3** — todos en `BlogIndexContent.astro` (bloque `<script>`) |
| `any` **implícitos** (`ts(7006)`) | **9** — en 4 componentes (límite inferior, ver §1.3) |
| Ficheros a tocar | **5** (`BlogIndexContent`, `FilterProject`, `TagFilter`, `ThemeSwitcher`, `blog-search.json.ts`) |
| Veredicto de arquitectura | **Híbrido**: `Props` locales (ya es la convención del repo) + un único `src/types.ts` SOLO para contratos que cruzan frontera (`SearchItem`, `Project`, `Lang`) |
| ¿Es esto un problema de rendimiento de Astro 7? | **No.** Los tipos se borran en compilación; `import type` se elimina antes de Rolldown. Decisión 100% de mantenibilidad. |

---

## 1. Auditoría de `any`

### Metodología y aviso sobre el tooling ⚠️

- **`any` explícitos:** `grep` sobre `**/*.{ts,tsx,astro}`. Fiable y completo.
- **`any` implícitos:** se intentó `npx -y @astrojs/check@latest`. **El checker standalone es INCOMPATIBLE con el compilador Rust de Astro 7**: marca CSS válido dentro de `<style>` (`display: block;`) como `'}' expected`, generando **~340 falsos positivos** (códigos `ts(1005)`, `ts(1381)`, `ts(1109)`, `ts(2304)`, `ts(2657)`). **Esos 362 errores NO son deuda real.**
- De ese ruido se extrajeron únicamente los **9 `ts(7006)` ("Parameter implicitly has an 'any' type")**, que sí son fiables porque el checker analiza el frontmatter/script *antes* de ahogarse en el `<style>`.
- **El gate autoritativo sigue siendo `pnpm build`** (pasa limpio), no `astro check`, hasta que exista una versión de `@astrojs/check` compatible con Astro 7 (ver §4).

### 1.1 `any` EXPLÍCITOS (3) — todos en el `<script>` de `BlogIndexContent.astro`

| # | Archivo:línea | Fragmento actual | Tipo propuesto |
|---|---|---|---|
| 1 | `src/components/pages/BlogIndexContent.astro:151` | `let fuse: any = null;` | `let fuse: Fuse<SearchItem> \| null = null;` |
| 2 | `src/components/pages/BlogIndexContent.astro:184` | `function buildCard(item: any) {` | `function buildCard(item: SearchItem) {` |
| 3 | `src/components/pages/BlogIndexContent.astro:224` | `function renderResults(matches: any[]) {` | `function renderResults(matches: FuseResult<SearchItem>[]) {` |

`fuse.js` v7 exporta sus tipos:
```ts
import Fuse, { type FuseResult } from 'fuse.js';
```
> `fuse.search(term)` devuelve `FuseResult<SearchItem>[]`, y cada `m.item` es un `SearchItem` (línea 236), lo que encadena los tres tipos sin esfuerzo.

### 1.2 `any` IMPLÍCITOS (9) — `ts(7006)`

| # | Archivo:línea | Parámetro | Causa raíz | Tipo propuesto |
|---|---|---|---|---|
| 1 | `BlogIndexContent.astro:9` | `getReadingTime(post)` | `Astro.props` sin tipar | `post: CollectionEntry<'blog'>` |
| 2 | `BlogIndexContent.astro:16` | `postUrl = (post) =>` | idem | `post: CollectionEntry<'blog'>` |
| 3 | `BlogIndexContent.astro:17` | `pageUrl = (n) =>` | idem | `n: number` |
| 4 | `BlogIndexContent.astro:56` | `posts.map((post) =>` | `posts` es `any[]` | *se infiere solo* al tipar `Props.posts` |
| 5 | `BlogIndexContent.astro:84` | `tags.map((tag) =>` | `tags` es `any[]` | *se infiere solo* (`string`) |
| 6 | `FilterProject.astro:8` | `.map(project =>` | `allProjects` es `any[]` | *se infiere* al tipar `Props.allProjects: Project[]` |
| 7 | `FilterProject.astro:9` | `.filter(lang =>` | idem ⚠️ además **shadowing** del `lang` exterior | *se infiere* (`string \| null`); **renombrar** a `l`/`language` |
| 8 | `TagFilter.astro:27` | `tags.map((tag) =>` | `tags` es `any[]` | *se infiere* (`string`) al tipar `Props.tags: string[]` |
| 9 | `ThemeSwitcher.astro:31` | `applyTheme = (theme) =>` (en `<script>`) | función sin anotar | `theme: Theme` (`'light' \| 'dark'`) |

**Patrón clave:** 7 de los 9 implícitos **desaparecen arreglando la raíz** (tipar `Astro.props` con una `interface Props`), no anotando cada callback. Solo `pageUrl(n)`, `getReadingTime(post)`, `postUrl(post)` (helpers standalone) y `applyTheme(theme)` (script) necesitan anotación directa.

### 1.3 Aviso de cobertura (límite inferior)

El checker abortó el análisis de tipos al llegar al `<style>` de **cada** `.astro`. Por tanto, los 9 `ts(7006)` son los que alcanzó a emitir antes de romperse: **podría haber implícitos adicionales** en regiones no analizadas. La lista es un **mínimo garantizado**, no exhaustivo. Cobertura real solo se logrará con el tooling de §4.

### 1.4 Fuera de alcance (no es `any`, anotado para no perderlo)

- `tests/browser-audit.spec.ts:68` → `ts(2339)` `naturalWidth`/`complete` no existen en `HTMLElement`. Es un cast faltante (`as HTMLImageElement`), **no** `any`, y es fichero de test. Anotar para una pasada futura de los tests; no entra en esta refactorización.

---

## 2. Tipos propuestos

### 2.1 Centralizados → `src/types.ts` (SOLO contratos que cruzan frontera)

```ts
// src/types.ts
import type { languages } from './i18n/ui';

/** Idiomas soportados, derivado de la fuente de verdad i18n. */
export type Lang = keyof typeof languages; // 'en' | 'es'

/**
 * Contrato del índice de búsqueda.
 * PRODUCTOR: src/pages/[lang]/blog-search.json.ts (serializa a JSON)
 * CONSUMIDOR: <script> de BlogIndexContent.astro (fetch + Fuse)
 * Cruza una frontera de serialización => debe vivir en un único sitio.
 */
export interface SearchItem {
  title: string;
  description: string;
  tags: string[];
  url: string;
  pubDate: string;   // ISO 8601 (post.data.pubDate.toISOString())
  excerpt: string;
}

/**
 * Proyecto de portfolio.
 * Compartido por [...page].astro -> PortfolioPageContent -> FilterProject (3 ficheros).
 * NOTA: confirmar la forma completa en el origen de los datos ([...page].astro).
 * Campo confirmado usado por FilterProject: `language`.
 */
export interface Project {
  language: string | null;
  // ...resto de campos a confirmar en el origen
}
```

### 2.2 Locales (mantener en cada componente — es la convención existente)

`Astro.props` se tipa con `interface Props` **en el propio componente**. Esto ya lo hacen 9 componentes del repo (`BaseHead`, `ContactCTA`, `BlogPost`, `StandardPageLayout`, `SocialShare`, `FormattedDate`, `TableOfContents`, `HeaderLink`, `blog/[...slug]`). Los que tienen `any` son justamente los que **se saltaron** la convención.

```ts
// BlogIndexContent.astro (frontmatter)
import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../../types';
import type { useTranslations } from '../../i18n/utils';

interface Props {
  lang: Lang;
  posts: CollectionEntry<'blog'>[];
  allTags: string[];
  t: ReturnType<typeof useTranslations>;
  currentPage?: number;
  totalPages?: number;
}
const { lang, posts, allTags, t, currentPage = 1, totalPages = 1 } = Astro.props;
```

```ts
// FilterProject.astro
import type { Lang, Project } from '../types';
interface Props { lang: Lang; allProjects: Project[]; }
```

```ts
// TagFilter.astro
import type { Lang } from '../types';
interface Props { tags: string[]; selectedTags?: string[]; lang: Lang; }
```

```ts
// ThemeSwitcher.astro (<script>) — Theme se usa SOLO aquí => local, no centralizar
type Theme = 'light' | 'dark';
const applyTheme = (theme: Theme) => { /* ... */ };
```

### 2.3 Cerrar el contrato en el productor

```ts
// src/pages/[lang]/blog-search.json.ts
import type { SearchItem } from '../../types';
const index: SearchItem[] = posts.map((post) => ({ /* ... */ }));
```
Así el compilador garantiza que productor y consumidor **no se desincronicen** nunca.

---

## 3. Debate de arquitectura: ¿`types.ts` central o tipos locales?

**Veredicto: HÍBRIDO, con sesgo fuerte a LOCAL.** Ni Opción A pura ni Opción B pura.

| Categoría de tipo | Dónde | Por qué |
|---|---|---|
| `Props` de cada componente | **Local** (`interface Props` en el `.astro`) | Es ya la convención idiomática del repo (9 componentes). No remar contra la corriente de Astro. |
| Tipos nativos de Astro (`CollectionEntry<'blog'>`, `HTMLAttributes`) | **Importar de su origen** (`astro:content`, `astro/types`) | Re-exportarlos en un fichero central crea *drift* y duplicación. La fuente de verdad es Astro. |
| `Theme` (solo ThemeSwitcher) | **Local** | Un único consumidor. Centralizar = ruido. |
| `SearchItem`, `Project`, `Lang` | **Central** (`src/types.ts`) | Cruzan frontera (serialización JSON / múltiples ficheros). DRY donde de verdad importa: aquí un desajuste = bug en runtime. |

**Por qué `src/types.ts` (fichero único) y no `src/types/blog.ts` (carpeta):** con solo 3 tipos compartidos en un proyecto de ~40 ficheros, una carpeta `types/` con barrels es sobre-ingeniería. Un único fichero plano es más fácil de mantener. Si el dominio crece, se promueve a carpeta entonces, no antes.

### 3.1 El ángulo de rendimiento de Astro 7 (Rust + Vite 8) — la verdad honesta

La pregunta pedía justificar la decisión por *"las nuevas directrices de rendimiento/compilación de Astro 7"*. La respuesta técnica honesta es:

> **Esto NO es una decisión de rendimiento.** Los tipos de TS se **borran por completo** en compilación. `import type` se elimina **antes** de que el compilador Rust o Rolldown (Vite 8) toquen el grafo. **Cero bytes** en el bundle, sea central o local.

- **Rolldown / Vite 8** hace *tree-shaking por símbolo*: un barrel `src/types.ts` importado con `import type` no añade nada al grafo de módulos del bundle.
- El **único** efecto medible es sobre el grafo de tipos de `tsc`/IDE, y a esta escala (~40 ficheros) es despreciable.
- **Recomendación de higiene con el compilador Rust:** activar `verbatimModuleSyntax` en `tsconfig.json` para forzar que los imports de tipos sean `import type` explícito, garantizando borrado limpio. (El preset `strict` de Astro ya implica `isolatedModules`, que va en la misma línea.)

**Conclusión:** decide central-vs-local **solo por mantenibilidad**. Quien venda una justificación de rendimiento aquí, se equivoca.

---

## 4. Tooling: arreglar el `astro check` roto

El `@astrojs/check@latest` actual no entiende Astro 7 (rompe en `<style>`). Acciones para el siguiente paso:

1. **Por ahora:** `pnpm build` es el gate fiable. Para `any` implícitos, el método de este informe (grep + filtrar `ts(7006)`) es lo válido.
2. **Cuando exista versión compatible:** fijar `@astrojs/check` + `typescript` como `devDependencies` a una release alineada con Astro 7, y añadir script:
   ```jsonc
   // package.json -> scripts
   "check": "astro check"
   ```
   **Verificar primero** que parsea un `<style>` sin falsos positivos antes de confiar en su salida.
3. Considerar añadir `"typecheck"` al pipeline `audit` solo cuando (2) sea fiable.

---

## 5. Orden sugerido para la refactorización (paso siguiente)

1. **Crear `src/types.ts`** con `Lang`, `SearchItem`, `Project`.
2. **`blog-search.json.ts`**: anotar `index: SearchItem[]` (cierra el contrato del productor).
3. **`BlogIndexContent.astro`**:
   - frontmatter: añadir `interface Props` → mata los implícitos #1–#5.
   - `<script>`: importar `Fuse`/`FuseResult`/`SearchItem` → mata los 3 explícitos.
4. **`TagFilter.astro`**: `interface Props` → implícito #8.
5. **`FilterProject.astro`**: `interface Props` (con `Project[]`) → implícitos #6–#7; renombrar el `lang` del `.filter` (shadowing).
6. **`ThemeSwitcher.astro`**: `type Theme` local + anotar `applyTheme` → implícito #9.
7. **Confirmar la forma de `Project`** en el origen (`[...page].astro`) y completar la interfaz.
8. **`pnpm build`** tras cada paso (gate). `astro check` cuando §4 sea viable.

**Ningún cambio de runtime. Refactor puramente de tipado.** Riesgo: bajo.
