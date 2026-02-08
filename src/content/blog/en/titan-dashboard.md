---
title: 'Titan Dashboard: Building My Own "Life OS" with FastAPI and React'
description: 'Why I decided to build a personal dashboard from scratch to unify nutrition, habits, and finances. Tech stack, architecture patterns, design decisions, and the lessons learned along the way.'
pubDate: '2026-02-08'
heroImage: '/react.png'
heroImageAlt: 'Titan Dashboard - Life OS'
tags: ['python', 'react', 'project']
lang: 'en'
---

# Titan Dashboard: Building My Own "Life OS" with FastAPI and React

## The Idea

I've been wanting to centralize several areas of my life in one place for a while: **nutrition** (recipes, ingredients, costs), **habits**, **finances**, **gym** and even stoic philosophy notes. There are apps for each of these things, but none of them brings everything together or lets me customize them the way I want.

So I decided to build it myself. **Titan Dashboard** is my personal "Life OS" project: a full-stack panel where I can manage everything from a single interface. So far I've completed the **food module** (recipes, ingredients, tags, nutritional and cost calculations) and the **authentication system**. The remaining modules (habits, finances, gym) are on the roadmap.

This post explains **why I chose each technology**, the **architecture patterns** I've applied, the **real problems** I've solved, and the **lessons** I'm taking away.

## The Tech Stack

### Backend: Python + FastAPI

**Why Python?** For me, it's the most versatile language out there. It works for backend, scripting, automation, data science, AI... It's always an option worth considering. Plus, I already had experience with Flask from previous projects, so I decided to make the jump to **FastAPI**.

**Why FastAPI over Flask?** Flask was my starting point, but FastAPI offers several advantages:

- **Automatic validation** with Pydantic. In Flask you had to validate data manually or use external libraries. In FastAPI you define a schema and validation comes for free.
- **Automatic documentation**. Swagger UI and ReDoc are generated automatically. In Flask you need flask-swagger or similar.
- **Native async**. FastAPI supports `async/await` out of the box, which makes it ready for heavy I/O operations.
- **Python type hints**. FastAPI uses them for everything: validation, serialization, documentation. You write modern Python and the framework does the work.

### Backend Framework Comparison

Before choosing, I researched the main alternatives. Here's my analysis:

| Framework | Language | Philosophy | Best for |
|-----------|----------|-----------|----------|
| **Express** | Node.js | Minimalist, total freedom | Quick APIs, microservices. Comfortable if you come from JS |
| **Flask** | Python | Micro-framework, you decide everything | Prototypes, small APIs. My starting point |
| **FastAPI** | Python | Modern, type-safe, auto-validation | APIs with great DX, growing projects. **My choice** |
| **Django** | Python | "Batteries included" (ORM, admin, auth) | Large projects with admin panel. Overkill for my case |
| **Laravel** | PHP | Full MVC, Eloquent ORM | Traditional monolithic apps. I know it from work |

**Why not Express?** I considered it because I already know JavaScript, but FastAPI gives me data validation, documentation, and type safety out of the box. With Express I'd have to set all that up manually.

**Why not Django?** Too opinionated for a personal project. Django comes with its ORM, its template system, its admin panel... I wanted total control over each piece and to build it modularly.

### Frontend: React + TypeScript + Tailwind

**Why React?** Honestly, it's the only frontend framework I really like. But beyond personal taste, there's a practical reason: if at some point I want to build a **mobile app**, I can use **React Native** and reuse a good portion of the logic, types, and patterns I already have.

### Frontend Framework Comparison

| Framework | Philosophy | Why I didn't choose it |
|-----------|-----------|----------------------|
| **Angular** | Complete framework, opinionated | Too heavy for a personal project. Too much boilerplate |
| **Vue** | Progressive, easy to learn | Good framework, but doesn't offer me the mobile ecosystem of React Native |
| **Astro** | Content-first, islands of interactivity | Perfect for blogs (in fact I use it for this blog), but not for SPAs with lots of state |
| **Svelte** | Compiled, no virtual DOM | Interesting, but smaller ecosystem and no React Native equivalent |

**TypeScript** because I can't imagine working on a project this size without types. It catches errors before they reach the browser.

**Tailwind CSS** because it lets me prototype quickly without leaving JSX. No separate CSS files or inventing class names.

### Database: SQLite

For a personal project, SQLite is perfect: a single file, zero configuration, zero services running. If the project grows, migrating to PostgreSQL is trivial thanks to using SQLModel (which is SQLAlchemy under the hood).

### Additional Tools

- **SQLModel**: ORM that combines SQLAlchemy with Pydantic. You define your models once and they serve both the database and validation.
- **uv**: Python dependency manager. Fast and modern, replaces pip + virtualenv.
- **Vite**: Frontend bundler. Instant hot reload.
- **Axios**: HTTP client with interceptors to inject the JWT token automatically.
- **React Router**: SPA navigation without page reloads.

## Project Architecture

```
Dashboard/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI entry point
│       ├── database.py          # SQLite configuration
│       ├── dependencies.py      # Auth middleware (JWT)
│       ├── models/              # SQLModel models (tables)
│       ├── schemas/             # Pydantic validators (DTOs)
│       ├── routes/              # Endpoints per module
│       ├── repositories/        # Repository Pattern
│       └── utils/               # Security (bcrypt, JWT)
│
└── frontend/
    └── src/
        ├── main.tsx             # React entry point
        ├── App.tsx              # Routes
        ├── context/             # Global state (Auth)
        ├── api/                 # HTTP client + endpoints
        ├── types/               # TypeScript interfaces
        ├── components/          # Layout, Sidebar
        └── pages/               # Views (Dashboard, Recipes...)
```

## Architecture Patterns

### Backend

#### 1. Repository Pattern

Each model has its own repository that encapsulates all database queries. Endpoints never touch `session.add()` or write SQL directly.

```python
# In the endpoint (clean)
@router.post("/")
def create_recipe(data: RecipeCreate, session: Session = Depends(get_session)):
    repo = RecipeRepository(session)
    return repo.create(data, user_id=current_user.id)

# In the repository (all DB logic)
class RecipeRepository:
    def create(self, data: RecipeCreate, user_id: int) -> Recipe:
        recipe = Recipe(**data.model_dump(exclude={'ingredients', 'tag_ids'}))
        self.session.add(recipe)
        self.session.flush()  # Get ID before commit
        # ... create intermediate relations
        self.session.commit()
        return recipe
```

The advantage: if tomorrow I swap SQLite for PostgreSQL, I only touch the repositories. The routes stay the same.

#### 2. Dependency Injection

FastAPI automatically injects the database session and authenticated user into each endpoint:

```python
@router.get("/recipes")
def get_recipes(
    session: Session = Depends(get_session),          # FastAPI injects the DB
    current_user: User = Depends(get_current_user)     # FastAPI injects the user
):
    # No manual session creation or token validation
```

#### 3. DTO Pattern (Schemas)

Pydantic schemas to control exactly what data enters and exits the API:

```python
# What the user sends (no ID, no timestamps)
class RecipeCreate(BaseModel):
    name: str
    instructions: str
    ingredients: list[RecipeIngredientInput]
    tag_ids: list[int]

# What the API returns (with everything calculated)
class RecipeResponse(BaseModel):
    id: int
    name: str
    total_cost: float           # Automatically calculated
    calories_per_serving: float  # Automatically calculated
```

This prevents a user from sending fields they shouldn't (like `id` or `created_at`) and the API from returning sensitive data (like hashed passwords).

#### 4. Computed Properties

Models have `@property` that calculate data on the fly without storing it in the database:

```python
class Recipe(SQLModel, table=True):
    # ... table fields

    @property
    def total_cost(self) -> float:
        """Calculates cost by summing price * quantity of each ingredient"""
        return sum(item.price * item.quantity for item in self.recipe_ingredients)

    @property
    def calories_per_serving(self) -> float:
        """Total calories divided by servings"""
        return self.total_calories / self.servings if self.servings else 0
```

If an ingredient's price changes, the cost of all recipes updates automatically because it's always recalculated.

### Frontend

#### 1. Provider Pattern (Context API)

Authentication state is global. Any component can know if the user is logged in without passing props:

```tsx
// In main.tsx: the provider "sandwich"
<BrowserRouter>
  <AuthProvider>   {/* Needs Router for useNavigate */}
    <App />        {/* Needs Auth for PrivateRoute */}
  </AuthProvider>
</BrowserRouter>
```

The order matters: `AuthProvider` uses `useNavigate` from the Router, so it has to be inside `BrowserRouter`. This was one of the first errors I had to solve.

#### 2. API Client with Interceptors

A single Axios client that automatically:

- **Injects the JWT token** in every request (request interceptor).
- **Redirects to login** if it receives a 401 (response interceptor).

```typescript
// Request interceptor: adds the token automatically
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

No component worries about managing tokens manually.

#### 3. Container/Presenter Pattern

Complex components are split into two layers:

- **Custom Hook** (`useIngredients`): All logic (API calls, loading states, errors).
- **Visual component**: Only receives data and renders HTML.

This reduced a 300-line page to ~80 readable lines.

## The Food Module in Detail

It's the first completed module and the most complex. It includes:

### Tier List System for Ingredients

Each ingredient has a nutritional quality rating from **F** (junk/ultra-processed) to **S** (superior):

| Tier | Description | Example |
|------|-------------|---------|
| S | Superior | Salmon, free-range eggs |
| A | Excellent | Chicken, brown rice |
| B | Good | Pasta, legumes |
| C | Average | White bread |
| D | Poor | Processed meats |
| E-F | Junk | Ultra-processed foods |

### Many-to-Many Relationships

A recipe has many ingredients, and an ingredient appears in many recipes. This is solved with **junction tables**:

```
Recipe <-> RecipeIngredient <-> Ingredient
              (quantity)
Recipe <-> RecipeTag <-> Tag
```

The `RecipeIngredient` table isn't just a relationship: it stores the **quantity** of each ingredient in the recipe. This justifies having its own model instead of being a simple link table.

### Automatic Calculations

When you query a recipe, the backend automatically calculates:

- **Total cost** and **cost per serving** (based on price/kg of each ingredient).
- **Total macronutrients** (protein, carbs, fat, calories).
- **Macros per serving** (everything divided by the number of servings).

Everything is calculated on the fly with `@property`. Nothing is stored duplicated in the database.

### Eager Loading (Avoiding the N+1 Problem)

The most classic ORM performance error: if you have 100 recipes and for each one you make a query to get its ingredients, you have **201 queries** instead of 3.

The solution is `selectinload`: you tell SQLAlchemy to load the relationships at once:

```python
def _get_query_with_relations(self):
    return select(Recipe).options(
        selectinload(Recipe.recipe_ingredients)
            .selectinload(RecipeIngredient.ingredient),
        selectinload(Recipe.recipe_tags)
            .selectinload(RecipeTag.tag)
    )
```

100 recipes with all their ingredients and tags: **3 queries**.

## Security

### JWT Authentication

The flow is straightforward:

1. The user logs in with email and password.
2. The backend verifies with **bcrypt** (salted hash, irreversible).
3. If correct, it generates a **JWT** signed with HS256.
4. The frontend stores the token and sends it with every request.
5. The backend validates the token signature without querying the database.

### Security Decisions

- **Generic error messages**: Always "Incorrect email or password", never "Email not found". This prevents an attacker from discovering which emails are registered (User Enumeration Attack).
- **bcrypt with salt**: Each password has a unique random salt. Even if two users have the same password, the hashes are different.
- **Environment variables**: The `SECRET_KEY` is never in the code. It lives in `.env`.

## Problems I Had and How I Solved Them

### Navigation That Destroyed the App

I started using HTML `<a href="/register">` tags to navigate. In an SPA like React, that reloads the entire page, destroys the state, and feels slow. The solution: using `<Link to="/register">` from React Router.

### The Provider Sandwich

When implementing `AuthContext`, I got errors because `AuthProvider` was trying to use `useNavigate` (from Router), but it was placed **outside** `BrowserRouter` in the component tree. The correct order is: Router wraps AuthProvider, which wraps App.

### The `flush()` vs `commit()` Problem

When creating a recipe, I needed the ID to create rows in the `RecipeIngredient` junction table. But after `session.add()`, the ID is `None`. The solution is `session.flush()`: it temporarily saves to the database to get the ID, but without committing. If something fails afterwards, you can rollback.

### Silent 401s

At first, when the token expired, requests failed with a 401 and the UI did nothing. I added an Axios interceptor that detects any 401 and automatically redirects to login, cleaning up the old token.

### ESLint Screaming About Context

Vite complained with "Fast refresh only works when a file only exports components" because `AuthContext.tsx` exported both the `AuthProvider` component and the `useAuth` hook. Pragmatic solution: `// eslint-disable-next-line react-refresh/only-export-components`.

## What's Next

The food module is complete. Next steps:

- **Habits module**: Habit CRUD, streaks, statistics.
- **Finance module**: Expense and income tracking.
- **Gym module**: Routines, progression, logs.
- **AI integration**: Using the Gemini API for automatic nutritional analysis and reading nutrition labels from photos.
- **Possible mobile app**: With React Native, reusing types and logic from the web frontend.

## What I'm Taking Away

Building this project has taught me more than any tutorial:

- **Real software architecture**: Repository Pattern, DTOs, Dependency Injection, Computed Properties. Patterns you use in production, not in exercises.
- **Thinking about data**: Designing Many-to-Many relationships, avoiding N+1, knowing when to use `flush()` vs `commit()`.
- **Professional frontend**: Context API, HTTP interceptors, separation of concerns, strict TypeScript.
- **Security from day one**: Hashing with bcrypt, JWTs, generic error messages, environment variables.

The most important thing: I went from having "code that works" to having **software architecture**. And that's a difference you can feel.

---

*If you want to see the code or have questions about the architecture, find me on [LinkedIn](https://linkedin.com/in/raul-casado) or [GitHub](https://github.com/RaulCasado).*
