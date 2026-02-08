---
title: 'Titan Dashboard: Construyendo mi propio "Life OS" con FastAPI y React'
description: 'Por qué decidí construir desde cero un dashboard personal para unificar nutrición, hábitos y finanzas. Stack técnico, patrones de arquitectura, decisiones de diseño y las lecciones aprendidas en el camino.'
pubDate: '2026-02-08'
heroImage: '/react.png'
heroImageAlt: 'Titan Dashboard - Life OS'
tags: ['python', 'react', 'project']
lang: 'es'
---

# Titan Dashboard: Construyendo mi propio "Life OS" con FastAPI y React

## La idea

Llevo tiempo queriendo centralizar varias áreas de mi vida en un solo lugar: **nutrición** (recetas, ingredientes, costes), **hábitos**, **finanzas**, **gimnasio** y hasta notas de filosofía estoica. Existen apps para cada una de estas cosas, pero ninguna las une todas ni me deja personalizarlas como quiero.

Así que decidí construirlo yo mismo. **Titan Dashboard** es mi proyecto personal de "Life OS": un panel full-stack donde puedo gestionar todo desde una sola interfaz. De momento he completado el **módulo de comida** (recetas, ingredientes, tags, cálculos nutricionales y de costes) y el **sistema de autenticación**. El resto de módulos (hábitos, finanzas, gimnasio) están en el roadmap.

Este post explica **por qué elegí cada tecnología**, los **patrones de arquitectura** que he aplicado, los **problemas reales** que he resuelto y las **lecciones** que me llevo.

## El stack técnico

### Backend: Python + FastAPI

**¿Por qué Python?** Para mí es el lenguaje más versátil que existe. Sirve para backend, scripting, automatización, data science, IA... Siempre es una opción a tener en cuenta. Además, ya tenía experiencia con Flask de proyectos anteriores, así que decidí dar el salto a **FastAPI**.

**¿Por qué FastAPI y no Flask?** Flask fue mi punto de partida, pero FastAPI me ofrece varias ventajas:

- **Validación automática** con Pydantic. En Flask tenías que validar los datos manualmente o usar librerías externas. En FastAPI defines un schema y la validación viene gratis.
- **Documentación automática**. Swagger UI y ReDoc se generan solos. En Flask necesitas flask-swagger o similares.
- **Async nativo**. FastAPI soporta `async/await` de serie, lo que lo prepara para operaciones de I/O pesadas.
- **Type hints de Python**. FastAPI los usa para todo: validación, serialización, documentación. Escribes código Python moderno y el framework hace el trabajo.

### Comparativa de frameworks backend

Antes de elegir investigué las alternativas principales. Aquí va mi análisis:

| Framework | Lenguaje | Filosofía | Ideal para |
|-----------|----------|-----------|-----------|
| **Express** | Node.js | Minimalista, total libertad | APIs rápidas, microservicios. Si vienes de JS, cómodo |
| **Flask** | Python | Micro-framework, tú decides todo | Prototipos, APIs pequeñas. Mi punto de partida |
| **FastAPI** | Python | Moderno, type-safe, autovalidación | APIs con buena DX, proyectos que crecen. **Mi elección** |
| **Django** | Python | "Baterías incluidas" (ORM, admin, auth) | Proyectos grandes con panel admin. Demasiado para mi caso |
| **Laravel** | PHP | MVC completo, Eloquent ORM | Apps monolíticas tradicionales. Lo conozco del trabajo |

**¿Por qué no Express?** Lo consideré porque ya conozco JavaScript, pero FastAPI me da validación de datos, documentación y type safety de serie. Con Express tendría que montar todo eso a mano.

**¿Por qué no Django?** Demasiado opinionado para un proyecto personal. Django viene con su ORM, su sistema de templates, su panel de admin... Yo quería control total sobre cada pieza y construirlo modularmente.

### Frontend: React + TypeScript + Tailwind

**¿Por qué React?** Honestamente, es el único framework de frontend que realmente me gusta. Pero más allá del gusto personal, hay una razón práctica: si en algún momento quiero hacer una **app móvil**, puedo usar **React Native** y reutilizar buena parte de la lógica, los tipos y los patrones que ya tengo.

### Comparativa de frameworks frontend

| Framework | Filosofía | Por qué no lo elegí |
|-----------|-----------|---------------------|
| **Angular** | Framework completo, opinionado | Demasiado pesado para un proyecto personal. Mucho boilerplate |
| **Vue** | Progresivo, fácil de aprender | Buen framework, pero no me aporta el ecosistema móvil de React Native |
| **Astro** | Content-first, islas de interactividad | Perfecto para blogs (de hecho lo uso para este blog), pero no para SPAs con mucho estado |
| **Svelte** | Compilado, sin virtual DOM | Interesante, pero ecosistema más pequeño y sin equivalente a React Native |

**TypeScript** porque no puedo imaginarme trabajar en un proyecto de este tamaño sin tipos. Atrapa errores antes de que lleguen al navegador.

**Tailwind CSS** porque me deja prototipar rápido sin salir del JSX. Nada de archivos CSS separados ni inventar nombres de clases.

### Base de datos: SQLite

Para un proyecto personal, SQLite es perfecto: un solo archivo, cero configuración, cero servicios corriendo. Si el proyecto crece, migrar a PostgreSQL es trivial gracias a que uso SQLModel (que por debajo es SQLAlchemy).

### Herramientas adicionales

- **SQLModel**: ORM que combina SQLAlchemy con Pydantic. Defines tus modelos una vez y sirven tanto para la BD como para la validación.
- **uv**: Gestor de dependencias de Python. Rápido y moderno, reemplaza a pip + virtualenv.
- **Vite**: Bundler del frontend. Hot reload instantáneo.
- **Axios**: Cliente HTTP con interceptores para inyectar el token JWT automáticamente.
- **React Router**: Navegación SPA sin recargas de página.

## Arquitectura del proyecto

```
Dashboard/
├── backend/
│   └── app/
│       ├── main.py              # Entry point FastAPI
│       ├── database.py          # Configuración SQLite
│       ├── dependencies.py      # Auth middleware (JWT)
│       ├── models/              # Modelos SQLModel (tablas)
│       ├── schemas/             # Validadores Pydantic (DTOs)
│       ├── routes/              # Endpoints por módulo
│       ├── repositories/        # Patrón Repository
│       └── utils/               # Seguridad (bcrypt, JWT)
│
└── frontend/
    └── src/
        ├── main.tsx             # Entry point React
        ├── App.tsx              # Rutas
        ├── context/             # Estado global (Auth)
        ├── api/                 # Cliente HTTP + endpoints
        ├── types/               # Interfaces TypeScript
        ├── components/          # Layout, Sidebar
        └── pages/               # Vistas (Dashboard, Recipes...)
```

## Patrones de arquitectura

### Backend

#### 1. Repository Pattern

Cada modelo tiene su propio repositorio que encapsula todas las queries a la base de datos. Los endpoints nunca tocan `session.add()` ni escriben SQL directamente.

```python
# En el endpoint (limpio)
@router.post("/")
def create_recipe(data: RecipeCreate, session: Session = Depends(get_session)):
    repo = RecipeRepository(session)
    return repo.create(data, user_id=current_user.id)

# En el repositorio (toda la lógica de BD)
class RecipeRepository:
    def create(self, data: RecipeCreate, user_id: int) -> Recipe:
        recipe = Recipe(**data.model_dump(exclude={'ingredients', 'tag_ids'}))
        self.session.add(recipe)
        self.session.flush()  # Obtener ID antes del commit
        # ... crear relaciones intermedias
        self.session.commit()
        return recipe
```

La ventaja: si mañana cambio SQLite por PostgreSQL, solo toco los repositorios. Las rutas no cambian.

#### 2. Dependency Injection

FastAPI inyecta automáticamente la sesión de BD y el usuario autenticado en cada endpoint:

```python
@router.get("/recipes")
def get_recipes(
    session: Session = Depends(get_session),          # FastAPI inyecta la BD
    current_user: User = Depends(get_current_user)     # FastAPI inyecta el usuario
):
    # No creo sesiones ni valido tokens manualmente
```

#### 3. DTO Pattern (Schemas)

Schemas de Pydantic para controlar exactamente qué datos entran y salen de la API:

```python
# Lo que el usuario envía (sin ID, sin timestamps)
class RecipeCreate(BaseModel):
    name: str
    instructions: str
    ingredients: list[RecipeIngredientInput]
    tag_ids: list[int]

# Lo que la API devuelve (con todo calculado)
class RecipeResponse(BaseModel):
    id: int
    name: str
    total_cost: float           # Calculado automáticamente
    calories_per_serving: float  # Calculado automáticamente
```

Esto evita que un usuario envíe campos que no debería (como `id` o `created_at`) y que la API devuelva datos sensibles (como contraseñas hasheadas).

#### 4. Computed Properties

Los modelos tienen `@property` que calculan datos al vuelo sin guardarlos en la base de datos:

```python
class Recipe(SQLModel, table=True):
    # ... campos de la tabla

    @property
    def total_cost(self) -> float:
        """Calcula el coste sumando precio * cantidad de cada ingrediente"""
        return sum(item.price * item.quantity for item in self.recipe_ingredients)

    @property
    def calories_per_serving(self) -> float:
        """Calorías totales divididas entre raciones"""
        return self.total_calories / self.servings if self.servings else 0
```

Si cambia el precio de un ingrediente, el coste de todas las recetas se actualiza automáticamente porque se recalcula siempre.

### Frontend

#### 1. Provider Pattern (Context API)

El estado de autenticación es global. Cualquier componente puede saber si el usuario está logueado sin pasar props:

```tsx
// En main.tsx: el "sándwich" de providers
<BrowserRouter>
  <AuthProvider>   {/* Necesita Router para useNavigate */}
    <App />        {/* Necesita Auth para PrivateRoute */}
  </AuthProvider>
</BrowserRouter>
```

El orden importa: `AuthProvider` usa `useNavigate` del Router, así que tiene que estar dentro del `BrowserRouter`. Este fue uno de los primeros errores que tuve que resolver.

#### 2. API Client con Interceptores

Un solo cliente Axios que automáticamente:

- **Inyecta el token JWT** en cada petición (request interceptor).
- **Redirige al login** si recibe un 401 (response interceptor).

```typescript
// Request interceptor: añade el token automáticamente
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

Ningún componente se preocupa de gestionar tokens manualmente.

#### 3. Container/Presenter Pattern

Los componentes complejos se dividen en dos capas:

- **Custom Hook** (`useIngredients`): Toda la lógica (llamadas a API, estados de carga, errores).
- **Componente visual**: Solo recibe datos y renderiza HTML.

Esto redujo una página de 300 líneas a ~80 líneas legibles.

## El módulo de comida en detalle

Es el primer módulo completado y el más complejo. Incluye:

### Sistema de Tier List para ingredientes

Cada ingrediente tiene una clasificación de calidad nutricional de la **F** (basura/ultraprocesados) a la **S** (superior):

| Tier | Descripción | Ejemplo |
|------|-------------|---------|
| S | Superior | Salmón, huevos camperos |
| A | Excelente | Pollo, arroz integral |
| B | Bueno | Pasta, legumbres |
| C | Medio | Pan blanco |
| D | Pobre | Embutidos |
| E-F | Basura | Ultraprocesados |

### Relaciones Many-to-Many

Una receta tiene muchos ingredientes, y un ingrediente aparece en muchas recetas. Esto se resuelve con **tablas intermedias**:

```
Recipe ←→ RecipeIngredient ←→ Ingredient
            (quantity)
Recipe ←→ RecipeTag ←→ Tag
```

La tabla `RecipeIngredient` no es solo una relación: guarda la **cantidad** de cada ingrediente en la receta. Esto justifica que tenga su propio modelo en vez de ser una simple tabla de enlace.

### Cálculos automáticos

Cuando consultas una receta, el backend calcula automáticamente:

- **Coste total** y **coste por ración** (basado en precio/kg de cada ingrediente).
- **Macronutrientes totales** (proteínas, carbohidratos, grasas, calorías).
- **Macros por ración** (todo dividido entre el número de raciones).

Todo se calcula al vuelo con `@property`. Nada se guarda duplicado en la base de datos.

### Eager Loading (evitar el problema N+1)

El error de rendimiento más clásico de los ORMs: si tienes 100 recetas y por cada una haces una query para obtener sus ingredientes, tienes **201 queries** en vez de 3.

La solución es `selectinload`: le dices a SQLAlchemy que cargue las relaciones de una vez:

```python
def _get_query_with_relations(self):
    return select(Recipe).options(
        selectinload(Recipe.recipe_ingredients)
            .selectinload(RecipeIngredient.ingredient),
        selectinload(Recipe.recipe_tags)
            .selectinload(RecipeTag.tag)
    )
```

100 recetas con todos sus ingredientes y tags: **3 queries**.

## Seguridad

### Autenticación JWT

El flujo es sencillo:

1. El usuario hace login con email y contraseña.
2. El backend verifica con **bcrypt** (hash con salt, irreversible).
3. Si es correcto, genera un **JWT** firmado con HS256.
4. El frontend guarda el token y lo envía en cada petición.
5. El backend valida la firma del token sin consultar la BD.

### Decisiones de seguridad

- **Mensajes de error genéricos**: Siempre "Email o contraseña incorrectos", nunca "Email no encontrado". Esto previene que un atacante descubra qué emails están registrados (User Enumeration Attack).
- **bcrypt con salt**: Cada contraseña tiene un salt aleatorio único. Aunque dos usuarios tengan la misma contraseña, los hashes son diferentes.
- **Variables de entorno**: La `SECRET_KEY` nunca está en el código. Vive en `.env`.

## Problemas que tuve y cómo los resolví

### La navegación que destruía la app

Empecé usando etiquetas HTML `<a href="/register">` para navegar. En una SPA como React, eso recarga la página completa, destruye el estado y se siente lento. La solución: usar `<Link to="/register">` de React Router.

### El sándwich de providers

Al implementar el `AuthContext`, me daba error porque `AuthProvider` intentaba usar `useNavigate` (del Router), pero estaba colocado **fuera** del `BrowserRouter` en el árbol de componentes. El orden correcto es: Router envuelve a AuthProvider, que envuelve a App.

### El problema de `flush()` vs `commit()`

Al crear una receta, necesitaba el ID para crear las filas en la tabla intermedia `RecipeIngredient`. Pero después de `session.add()`, el ID es `None`. La solución es `session.flush()`: guarda temporalmente en la BD para obtener el ID, pero sin hacer commit. Si algo falla después, puedes hacer rollback.

### Los 401 silenciosos

Al principio, cuando el token expiraba, las peticiones fallaban con un 401 y la UI no hacía nada. Añadí un interceptor de Axios que detecta cualquier 401 y redirige automáticamente al login, limpiando el token viejo.

### El ESLint que gritaba por Context

Vite se quejaba con "Fast refresh only works when a file only exports components" porque en `AuthContext.tsx` exportaba tanto el componente `AuthProvider` como el hook `useAuth`. Solución pragmática: `// eslint-disable-next-line react-refresh/only-export-components`.

## Lo que viene

El módulo de comida está completo. Los siguientes pasos:

- **Módulo de hábitos**: CRUD de hábitos, rachas (streaks), estadísticas.
- **Módulo de finanzas**: Tracking de gastos e ingresos.
- **Módulo de gimnasio**: Rutinas, progresión, registros.
- **Integración con IA**: Usar la API de Gemini para análisis nutricional automático y lectura de etiquetas de fotos.
- **Posible app móvil**: Con React Native, reutilizando tipos y lógica del frontend web.

## Lo que me llevo

Construir este proyecto me ha enseñado más que cualquier tutorial:

- **Arquitectura de software real**: Repository Pattern, DTOs, Dependency Injection, Computed Properties. Patrones que usas en producción, no en ejercicios.
- **Pensar en datos**: Diseñar relaciones Many-to-Many, evitar N+1, saber cuándo usar `flush()` vs `commit()`.
- **Frontend profesional**: Context API, interceptores HTTP, separación de responsabilidades, TypeScript estricto.
- **Seguridad desde el día uno**: Hashing con bcrypt, JWTs, mensajes de error genéricos, variables de entorno.

Lo más importante: pasé de tener "código que funciona" a tener **arquitectura de software**. Y esa es una diferencia que se nota.

---

*Si quieres ver el código o tienes preguntas sobre la arquitectura, encuéntrame en [LinkedIn](https://linkedin.com/in/raul-casado) o [GitHub](https://github.com/RaulCasado).*
