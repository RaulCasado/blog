---
title: "Semana 6: Desarrollo Intensivo: Refactorización y Mejoras en ProjectOrganizer"
description: "Una semana de transformación profunda: herramientas automatizadas, arquitectura limpia y funcionalidades robustas. De commits estandarizados a componentes optimizados, ProjectOrganizer gana en escalabilidad y mantenibilidad."
pubDate: "2025-09-08"
tags: ["weekly","web_development"]
heroImage: '/weekly/husky.jpg'
heroImageAlt: 'Un diagrama que muestra herramientas de desarrollo automatizadas optimizando el flujo de trabajo'
---

Esta semana ha sido una de esas semanas intensas de desarrollo donde el código se transforma, las herramientas se optimizan y el proyecto gana en robustez. Decidí aparcar el desarrollo de nuevas funcionalidades para centrarme en un aspecto crucial: la **refactorización sistemática y la configuración de herramientas**. A medida que el proyecto crecía, empecé a notar varios "code smells" que hacían que la base del código fuera más difícil de mantener. Era hora de atacar de frente esta deuda técnica con un enfoque multifase.

## 🚀 Resumen Ejecutivo

Hemos completado **18 commits** enfocándonos en tres áreas principales:

- **Configuración de herramientas de desarrollo** (Husky, Commitlint, Prettier)
- **Refactorización masiva de componentes** (reducción de props, mejor arquitectura)
- **Mejoras funcionales** (filtrado por tags, confirmaciones de eliminación)

## 🛠️ Identificando los Bad Smells y la Estrategia

El primer paso fue analizar el estado actual y identificar problemas similares a la semana anterior, pero con un enfoque en herramientas y UX.

### 1. Herramientas Desorganizadas

La falta de automatización en el flujo de desarrollo llevaba a inconsistencias en commits y formateo. Sin hooks de Git ni validaciones, era fácil cometer errores humanos.

### 2. Componentes con Props Excesivos

Continuando con el legado de la semana anterior, componentes como `IdeaItem` seguían sufriendo de prop drilling, con más de 10 props que complicaban la reutilización.

### 3. Falta de Validaciones y Feedback

Los formularios carecían de un sistema unificado de validación, y las eliminaciones no tenían confirmaciones, lo que podía llevar a pérdidas accidentales de datos.

## 🏗️ La Estrategia de Mejoras

Con los problemas identificados, tracé un plan para integrar herramientas y refactorizar.

### Fase 1: Automatización con Herramientas de Desarrollo

Implementé **Husky + Commitlint + Prettier** para estandarizar el proceso:

- **Husky**: Git hooks automáticos para ejecutar comandos antes de commits.
- **Commitlint**: Validación de mensajes de commit con formato estándar (ej. `feat(component): description`).
- **Prettier**: Formateo automático de código.
- **Lint-staged**: Ejecuta linting solo en archivos modificados.

Esto eliminó inconsistencias y mejoró la calidad del código desde el inicio.

### Fase 2: Refactorización Arquitectural

Reduje la complejidad de componentes con props excesivos:

````tsx
<IdeaItem 
  idea={idea}
  isExpanded={expandedIdea === idea.id}
  onToggleExpand={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)}
  onEditStart={() => handleEditStart(idea)}
  onDelete={() => onDeleteIdea(idea.id)}
  // ... 6 props más
/>
````

````tsx
<IdeaItem idea={idea} />  // Solo 1 prop, resto viene del context
````

Introduje **IdeasMainViewProvider** y un hook `useForm` unificado para gestionar estado global y formularios, aplicando el principio de responsabilidad única.

### Fase 3: Mejoras Funcionales

- **Sistema de Tags Completo**: Creé `TagInput` reutilizable y filtrado por tags en ideas.
- **UX/UI Improvements**: Añadí confirmaciones de eliminación y validación de formularios para mejor feedback.
- **Optimización de Rendimiento**: Usé `useMemo` y `React.memo` para prevenir re-renders innecesarios.

## 📊 Métricas de la Semana

- **18 commits** siguiendo conventional commits
- **10+ componentes refactorizados**
- **3 nuevas funcionalidades** (tags, confirmaciones, filtros)
- **0 bugs introducidos** (gracias a los tests automáticos)
- **Mejor maintainability** del código

## 🎯 Lecciones Aprendidas

### 1. Automatización Temprana

Implementar herramientas como Husky desde el inicio ahorra tiempo y reduce errores humanos.

### 2. Context para Props Excesivos

Cuando un componente supera las 5 props, Context es la solución ideal para desacoplar y simplificar.

### 3. Hooks Personalizados

Un `useForm` unificado reduce código duplicado y mejora la consistencia en validaciones.

## 🚀 Próximos Pasos

Con la base sólida, la próxima semana nos enfocaremos en:

1. **CSS/Tailwind**: Dar vida visual al proyecto
2. **Backend Integration**: Conectar con API REST
3. **Testing**: Añadir tests unitarios y de integración
4. **Performance**: Optimizaciones adicionales

Este proceso ha sido una tarea enorme, pero las mejoras en la calidad del código ya están dando sus frutos. Es un recordatorio de que construir un gran software no consiste solo en añadir funcionalidades, sino también en cuidar los cimientos.