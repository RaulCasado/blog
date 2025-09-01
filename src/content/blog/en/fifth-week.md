---
title: "Week 5: A Deep Dive into a Major Refactor"
description: "From monolithic components to a clean architecture. This week was all about a major refactoring effort to tackle prop drilling, centralize logic, and build a more maintainable foundation for the future."
pubDate: "2025-09-01"
tags: ["weekly","web_development"]
heroImage: '/weekly/refactor.jpg'
heroImageAlt: 'A diagram showing a complex system being simplified through refactoring'
---

This week, I decided to pause the development of new features and focus on a crucial, often overlooked, aspect of software development: **refactoring**. As the project grew, I noticed several "code smells" that were making the codebase harder to maintain and scale. It was time to address this technical debt head-on.

## 🚨 Identifying the Pain Points

The first step was to take a hard look at the current state of the application and identify the main problem areas. A few key issues stood out:

### 1. The Monolithic Component
The `ProjectDetail.tsx` component had become a monster. It was handling state for tasks, ideas, sketches, and blog posts, leading to over 20 imports and hundreds of lines of code. A component with this many responsibilities is a clear red flag and was, without a doubt, the worst-designed part of the application.

```typescript
// RED FLAG: A component with too many imports is doing too much.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// ... and 15+ more imports
```

### 2. Excessive Prop Drilling
To manage state, I was passing props down through multiple layers of components. For example, an `onDeleteTask` function might travel from `App.tsx` -> `ProjectDetail.tsx` -> `TasksSection.tsx` -> `TaskList.tsx` -> `TaskItem.tsx`. Most of these intermediate components didn't even use the function; they just passed it along. This makes components tightly coupled, hard to reuse, and a nightmare to debug.

### 3. State Management Headaches and Desynchronization
Beyond prop drilling, I found specific instances where state management was fragile. For example, in the sketch canvas feature, the `undo/redo` logic depended on an external state variable, which could lead to desynchronization bugs.

```typescript
// BEFORE: Prone to state desync issues
const saveToHistory = useCallback(() => {
  // ...
  setCanvasHistory(prev => {
    const newHistory = prev.slice(0, historyIndex + 1); // Depends on external `historyIndex`
    newHistory.push(imageData);
    return newHistory;
  });
  setHistoryIndex(prev => prev + 1);
}, [historyIndex]); // Dependency on external state

// AFTER: Robust state update using the functional form
const saveToHistory = useCallback(() => {
  // ...
  setCanvasHistory(prev => {
      const currentIndex = prev.length - 1;
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(imageData);
      return newHistory;
  });
  // No more external dependencies for the core logic
}, []);
```
This small change is a perfect example of the principle: "If you're updating state based on a previous value, always use the functional update form to avoid race conditions and phantom dependencies."

### 4. Scattered Services and Data Integrity Issues
Services for local storage, notifications (`Swal`), and date manipulation were scattered. This decentralization meant that components had direct dependencies on specific libraries. Worse, it led to real data integrity problems. For instance, because ideas were stored under a separate localStorage key from projects, deleting a project would leave its associated ideas orphaned in storage. This is a classic symptom of a disconnected data layer.

## 🏗️ The Refactoring Strategy

With the problems identified, I laid out a multi-phase plan to systematically improve the architecture.

### Phase 1: Taming the Monolith with Context
The most urgent issue was `ProjectDetail`. The solution was to introduce **React's Context API**. I created a `ProjectProvider` that encapsulates all the state and logic related to a single project. This applied the **Dependency Inversion Principle**: high-level components no longer depend on the implementation details of low-level ones. Instead, both depend on an abstraction (the context).

This approach has two huge benefits:
1.  **Eliminates Prop Drilling:** Any child component can now access shared state and actions directly using `useContext`.
2.  **Decouples Components:** `ProjectDetail` became a simple "orchestrator" component, responsible only for laying out its children within the provider.

### Phase 2: Centralizing Logic with Hooks, Services, and Barrels
To combat scattered logic, I took several key actions:

1.  **Created a `useSwal` hook and service:** I debated whether to use a `context + hook` or `service + hook` pattern. Since the primary need was to display messages without components needing to know about a queue of notifications, the simpler `service + hook` pattern was perfect. It abstracts all notification logic, so if I decide to change the library later, I only need to update the service.
2.  **Created a `DateUtils` class:** All date formatting and manipulation logic is now in one place, ensuring consistency.
3.  **Implemented Barrel Exports:** To clean up the massive import blocks, I used `index.ts` files to create "barrels." This consolidates exports from a feature folder, allowing me to turn many lines of imports into a single, clean line.

### What's Next on the Refactoring Roadmap?

The work is far from over, but a solid foundation has been laid. Here are the next steps:

1.  **Generic `useForm` Hook:** Create a custom hook to handle form state, validation, and submission logic for all forms in the app. This will drastically reduce boilerplate code and ensure all forms are robust and consistent.
2.  **Unified Repository Service:** Consolidate all data-handling services (`LocalStorageService`, `SketchStorageService`, etc.) into a single `Repository` class. This will provide a unified API for all data operations and, crucially, solve the data integrity issues like orphaned ideas.
3.  **Performance Optimization:** Strategically use `useMemo`, `useCallback`, and `React.memo` to prevent unnecessary re-renders in critical components, especially in data-heavy views like task lists.
4.  **UI Component Library:** Build a set of base, reusable UI components (`Button`, `Input`, `Modal`) to ensure a consistent look and feel and speed up future development.

This refactoring process has been a massive undertaking, but the improvements in code quality, maintainability, and developer experience are already paying off. It's a reminder that building great software isn't just about adding features; it's also about taking care of the foundation it's built on.
