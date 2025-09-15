---
title: "Semana 7: Mejorando el Blog: Buscador, Filtros y Posts Destacados"
description: "Esta semana he cambiado el foco hacia el propio blog, implementando funcionalidades clave como un buscador dinámico, filtros para organizar el contenido y un sistema de posts destacados para mejorar la experiencia del lector."
pubDate: "2025-09-15"
tags: ["weekly","web_development", "astro"]
heroImage: '/weekly/blog-meta.jpg'
heroImageAlt: 'Una imagen que representa la mejora de un blog con iconos de búsqueda y filtros'
---

Después de una intensa fase de refactorización en ProjectOrganizer, esta semana decidí tomar un respiro del proyecto principal para centrarme en la plataforma que estáis leyendo ahora mismo: el blog. A medida que el número de posts crece, me di cuenta de que la experiencia de navegación se estaba volviendo engorrosa. Era el momento de aplicar algunas mejoras de calidad de vida que llevaba tiempo posponiendo.

## 🚀 Resumen Ejecutivo

Ha sido una semana más tranquila en cuanto a volumen de código, pero muy productiva en términos de impacto en la experiencia de usuario. Las mejoras se han centrado en:

- **Implementación de un buscador** para filtrar posts por palabras clave.
- **Creación de un filtro** para mostrar u ocultar los resúmenes semanales.
- **Adición de un sistema de posts destacados (`featured`)** para dar visibilidad a artículos importantes.
- **Mejora de la UX** con un mensaje de "no hay resultados".

## 🛠️ Identificando las Necesidades del Blog

El blog, como cualquier otro proyecto de software, necesita mantenimiento y nuevas funcionalidades para seguir siendo útil. Identifiqué tres áreas principales de mejora:

### 1. Dificultad para Encontrar Contenido

Con cada semana que pasa, la lista de posts se alarga. Encontrar un artículo específico sobre una tecnología o una semana concreta se estaba convirtiendo en una tarea manual de "scroll y rezo". La falta de una función de búsqueda era el principal problema.

### 2. Ruido Visual de los Posts Semanales

Aunque los resúmenes semanales son el corazón de este blog, pueden eclipsar otros artículos más técnicos o específicos. Un lector interesado en un tutorial podría no querer navegar a través de todas las actualizaciones de progreso.

### 3. Jerarquía de Contenido Plana

Por defecto, el blog mostraba el último post como el más importante. Sin embargo, a veces un post más antiguo puede ser más relevante o un buen punto de partida para nuevos lectores. Necesitaba una forma de destacar contenido clave independientemente de su fecha de publicación.

## 🏗️ La Estrategia de Mejoras

Con los problemas identificados, me puse manos a la obra para implementar soluciones directas y efectivas.

### Fase 1: Búsqueda y Descubrimiento de Contenido

La mejora más importante fue la creación de un **buscador dinámico**. Usando un poco de JavaScript y la data que Astro expone, implementé una barra de búsqueda que filtra los posts en tiempo real a medida que el usuario escribe. Para mejorar la experiencia, añadí un mensaje claro de "No se encontraron posts" cuando un término de búsqueda no arroja resultados.

### Fase 2: Filtrado y Organización

Para reducir el "ruido", añadí un simple interruptor (checkbox) que permite a los lectores **mostrar u ocultar los posts etiquetados como "weekly"**. Esto limpia la vista principal y permite a los usuarios centrarse en el tipo de contenido que más les interesa en ese momento.

### Fase 3: Priorización con Posts Destacados

Para romper la tiranía del orden cronológico, introduje una nueva propiedad en el frontmatter de los posts: `featured: true`. Ahora puedo marcar cualquier post como "destacado". La lógica de la página de inicio se modificó para que, si existe un post destacado, este se muestre en una posición privilegiada, asegurando que el contenido más importante siempre sea visible.

## 📊 Métricas de la Semana

- **3 nuevas funcionalidades** implementadas en el blog.
- **Mejora significativa de la UX** para los lectores.
- **0 dependencias externas** añadidas, todo resuelto con Astro y JavaScript vainilla.
- **Mayor control editorial** sobre el contenido del blog.

## 🎯 Lecciones Aprendidas

### 1. Tu Blog También es un Producto

Es fácil ver el blog solo como un medio para documentar otros proyectos, pero la plataforma en sí misma merece ser tratada como un producto. Invertir tiempo en mejorarla beneficia directamente a tus lectores y a ti mismo.

### 2. La Experiencia del Lector es Clave

Funcionalidades como la búsqueda o los filtros no son un lujo; son esenciales para un blog con una cantidad creciente de contenido. Facilitar la vida al lector fomenta que se quede más tiempo y explore más.

### 3. El Frontmatter es tu API de Contenido

En sistemas como Astro, el frontmatter de los archivos Markdown es una herramienta increíblemente poderosa. Añadir un simple booleano como `featured` puede transformar por completo la forma en que se presenta el contenido sin necesidad de sistemas complejos.

## 🚀 Próximos Pasos

Con un blog más robusto y fácil de navegar, la próxima semana volveré a centrarme en **ProjectOrganizer**. Los objetivos siguen siendo los mismos:

1. **CSS/Tailwind**: Empezar a dar forma visual al proyecto.
2. **Backend Integration**: Preparar la conexión con una API REST.
3. **Testing**: Añadir una base sólida de tests unitarios.

Esta pausa para mejorar el blog ha sido refrescante y necesaria. A veces, para avanzar más rápido, primero hay que afilar las herramientas y ordenar la casa.
