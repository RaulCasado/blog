---
title: "Cuarta Semana: A Tope con Kaggle y Avances en el Proyecto"
description: "Esta semana ha sido súper productiva. He profundizado en conceptos clave de Data Science con Kaggle y he metido un buen empujón a mi proyecto organizador. ¡Os cuento los detalles!"
pubDate: "2025-08-25"
tags: ["python", "weekly","kaggle","web_development"]
heroImage: '/weekly/arena.jpg'
heroImageAlt: 'Un reloj de arena simbolizando el progreso en el tiempo'
---

¡Menuda semana! La verdad es que ha sido de las más productivas. Le he metido mucha caña tanto al curso de Kaggle como a mi proyecto personal, y siento que he avanzado un montón. Os cuento un poco lo que he estado haciendo.

### Más Lecciones de Kaggle

He seguido dándole fuerte a Kaggle, esta vez centrándome en conceptos que son el pan de cada día en el mundo de los datos. Aquí os dejo un resumen de lo que he aprendido:

1.  **Time Series (Series Temporales)**: Básicamente, datos que varían con el tiempo, como el precio de una acción o la temperatura. Se usan para predecir el futuro basándose en el pasado con modelos como ARIMA o LSTMs. Me ha quedado claro que intentar predecir cosas caóticas como las criptomonedas es una locura por la cantidad de "ruido" y factores externos (tos tos factores externos como Elon Musk).

2.  **Escalado vs. Normalización**: Dos técnicas que parecen lo mismo pero no lo son. **Escalar** es poner todos tus datos en el mismo rango (por ejemplo, de 0 a 1), súper útil para algoritmos que miden distancias. **Normalizar** es transformar los datos para que sigan una distribución específica (como la normal), que es lo que necesitan algunos modelos para funcionar bien.

3.  **Feature Engineering**: Esto es clave y me ha parecido una pasada. Es el arte de crear nuevas variables a partir de las que ya tienes para que el modelo aprenda mejor. Por ejemplo, si tienes una fecha, puedes sacar el día de la semana, el mes o si es fin de semana. En Kaggle, un buen *feature engineering* te puede dar la victoria, a veces es más importante que el propio modelo.

4.  **Data Cleaning**: Antes de hacer nada, hay que limpiar los valores basura. Esto implica gestionar valores que faltan, eliminar duplicados, quitar *outliers* (valores raros) y corregir errores de formato (como tener "España", "espana" y "españa" para lo mismo).

5.  **Fuzzy Matching**: Una herramienta genial para encontrar cadenas de texto que se parecen. Es perfecta para unificar datos con erratas, como "colombia" y "columbia". El problema es que a veces se lía y te puede decir que "iran" e "iraq" son lo mismo. Para evitarlo, se puede ajustar el umbral de similitud, usar diccionarios manuales o incluso meterle IA más avanzada para que entienda el significado real.

Al final, el flujo de trabajo siempre es el mismo: recolectar datos, limpiar, transformar (escalar, normalizar, crear *features*), modelar, evaluar y vuelta a empezar.

### Avances en el Proyecto Organizador

Esta semana también le he metido un buen acelerón al proyecto. Como os comenté, estoy creando un organizador de proyectos para tenerlo todo centralizado, y la verdad es que he avanzado un montón y me he enfrentado a decisiones técnicas interesantes.

#### Decisiones de Arquitectura y Estado

Desde el principio, tuve que tomar dos decisiones clave que marcan la estructura de la aplicación:

1.  **React Router DOM**: Me decanté por el modo declarativo, usando `<BrowserRouter>`. Ahora mismo es perfecto porque la aplicación no es súper compleja y todos los datos viven en el `localStorage`. El router no necesita saber nada sobre los datos, solo renderizar componentes. En el futuro, si añado un backend con Flask, seguramente tendré que pasar a algo más potente como `createBrowserRouter`, que maneja la carga de datos, pero de momento, esto es más que suficiente.

2.  **Single Source of Truth**: Para evitar el caos, decidí centralizar todo el estado de la aplicación. Si cada componente manejara su propio estado, acabaría con datos inconsistentes y sería una pesadilla mantenerlo todo sincronizado. Así que todo el estado principal vive en un componente "ancestro" que envuelve a todos los demás, y desde ahí lo distribuyo.

#### Funcionalidades Implementadas

¡Esta semana he cerrado bastantes cosas!
*   **CRUD de Proyectos y Tareas**: ¡Terminado! Ya se pueden crear, ver, modificar y eliminar tanto proyectos como las tareas asociadas a cada uno. Para que la experiencia de usuario sea mejor, he añadido `SweetAlert` para las confirmaciones de borrado. Nadie quiere borrar algo por accidente.
*   **Tags en los proyectos**: He implementado un sistema de tags. Ahora mismo puedes filtrar por un tag, pero ya estoy pensando en cómo mejorarlo para poder seleccionar varios. El filtro era un simple `<select>`, pero me di cuenta de que con muchos proyectos sería un poco pesado, así que ahora los tags también son clickeables para filtrar directamente. ¡Mucho más cómodo!
*   **Recursos e Ideas**: He añadido una sección para guardar recursos (enlaces, documentación, etc.) en cada proyecto y también una sección de "Ideas" más general, para apuntar cualquier cosa que se me ocurra.
*   **Exportación del Blog**: He añadido una pequeña funcionalidad para exportar el resumen semanal del blog. Muy útil para este mismo blog, pero todavía hay que afinarlo un poco como por ejemplo permitir plantillas.

#### Deuda Técnica y Refactorización Pendiente

No todo es perfecto, claro. Mientras programaba, me he dado cuenta de que algunos componentes se están volviendo demasiado grandes.
*   `ProjectDetail` es un monstruo: gestiona la edición de tareas, los filtros, el CRUD completo y tiene varios componentes hijos. Funciona, que es lo importante, pero sé que tengo que dividirlo en componentes más pequeños y manejables.
*   `ProjectMainView` y `App` también están en mi radar. `App` tiene demasiada lógica de estado y enrutamiento, y quizás debería moverla a un componente dedicado.
*   **Tags como strings**: Ahora mismo los tags son simples strings. Funciona, pero lo ideal sería convertirlos en una clase `Tag` para que sean más robustos y escalables.
*   **Manejo de fechas**: El parseo y formateo de fechas está repartido por varios sitios. Quiero centralizarlo en un `dateUtils` y probablemente instalar una librería como `date-fns` para no volverme loco.
*   **Servicios**: Estoy pensando en crear servicios específicos para `localStorage` y para las notificaciones, para abstraer esa lógica y que no esté mezclada por toda la aplicación.

#### Configurando un Entorno Profesional: Husky, Prettier y más

Para darle un toque más pro al proyecto y asegurar la calidad del código, he decidido montar un sistema completo con Husky, Prettier, ESLint y Commitlint. La idea es automatizar el formato del código y estandarizar los mensajes de los commits.

Configuré `lint-staged` para que antes de cada commit (`pre-commit`), Prettier formatee los archivos y ESLint los revise. También añadí un hook (`commit-msg`) que usa Commitlint para validar que el mensaje del commit siga la convención de "Conventional Commits". Esto me obliga a escribir commits claros y descriptivos como `feat(blog): add export functionality`.

Para facilitar esto, instalé `commitizen`, que me permite escribir los commits con un asistente en la terminal (`npm run commit`). Es una pasada porque te guía y te aseguras de que todo queda perfecto.

#### Un Descubrimiento Random: `Symbol` en JavaScript

Mientras programaba, me topé con `Symbol()`. Es un tipo de dato de JS que crea valores únicos. Aunque dos `Symbol` tengan la misma descripción, son diferentes. Es útil para crear propiedades "privadas" en objetos que no quieres que salgan en un `for...in` o para generar IDs únicos sin librerías. En React, aunque no lo usas todos los días, puede venir bien para cosas como generar `keys` únicas en listas o para el `Context` API. Un apunte curioso que me guardo.

En resumen, ha sido una semana muy completa. Siento que estoy construyendo una base muy sólida tanto en conocimientos de datos como en el desarrollo de mi aplicación. ¡A seguir así!
