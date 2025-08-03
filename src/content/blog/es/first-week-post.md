---
title: 'Resumen Semanal #1: Kaggle, Refactorización del Blog y CS50'
description: 'Una semana de aprendizaje intensivo: desde técnicas avanzadas de Machine Learning en Kaggle y SQL con BigQuery, hasta una profunda refactorización de mi blog con Astro y un gran avance en el curso de Python de CS50.'
pubDate: '2025-08-01'
heroImage: '/weekly/maxresdefault.jpg'
tags: ["weekly","kaggle", "astro", "python"]
lang: 'es'
---

¡Primera semana completada! Decidí empezar a documentar mi progreso semanal como una forma de mantenerme enfocado, registrar lo que aprendo y, por qué no, compartirlo con quien pueda encontrarlo útil. Esta semana ha sido una mezcla de desarrollo web, machine learning y fundamentos de programación.

## Lunes: Arreglando el blog y sentando las bases en Kaggle

La semana empezó con una pelea con mi propio blog. El filtro de proyectos no funcionaba como esperaba, y el culpable era el renderizado en servidor (SSR). La solución fue mover la lógica al lado del cliente con JavaScript. A veces, la solución más simple es la correcta.

En Kaggle, completé la introducción al Machine Learning intermedio, cubriendo temas cruciales:
- **Pipelines:** Para optimizar flujos de trabajo.
- **Cross-Validation:** Para evaluar modelos de forma más robusta.
- **XGBoost:** La herramienta predilecta para datos estructurados.
- **Data Leakage:** Cómo detectar y evitar este sutil pero desastroso problema.

## Martes: Refactorización masiva y visualización de datos

El martes fue día de limpieza de código. Refactoricé gran parte del blog para reutilizar componentes (`BlogIndexContent`, `HomePageContent`) y mejorar la estructura. También implementé un filtro de tags con JavaScript para una experiencia más dinámica.

Por la tarde, volví a Kaggle para sumergirme en la visualización de datos con **Seaborn**:
- **Gráficos de Barras (`barplot`) y Mapas de Calor (`heatmap`):** Ideales para comparaciones y correlaciones.
- **Gráficos de Dispersión (`scatterplot`, `regplot`):** Para explorar relaciones entre variables.
- **Distribuciones (`histplot`, `kdeplot`):** Para entender la forma de los datos.

## Miércoles: Feature Engineering y puliendo detalles

Por la mañana, di los últimos retoques estéticos al blog, preparándolo para ser compartido.

La tarde fue para una de las partes más creativas del Machine Learning: el **Feature Engineering**. Aprendí a:
- **Codificar variables categóricas** con `pd.get_dummies()`.
- **Combinar y agrupar columnas** para crear nuevas características con más contexto.
- **Usar `mutual_info_classif`** para seleccionar las variables más informativas.
- **Aplicar PCA** para reducir la dimensionalidad y entender la estructura de los datos.

## Jueves: CS50 y una inmersión profunda en SQL

El jueves por la mañana me dediqué a los fundamentos con el curso **CS50's Introduction to Python de Harvard**. Avancé a través de los módulos de funciones, condicionales, bucles y excepciones, resolviendo un montón de pequeños problemas que refuerzan las bases.

Por la tarde, me enfrenté a **SQL y BigQuery** en Kaggle. Pasé de las consultas básicas a conceptos más avanzados:
- **Agregaciones y `JOIN`s**.
- **Subqueries legibles con `WITH`**.
- **Funciones analíticas (`OVER`)** para cálculos complejos sin agrupar.
- **Manejo de datos anidados con `UNNEST()`**, una joya de BigQuery.

## Viernes: Cerrando la semana con CS50

Para terminar la semana, me enfoqué completamente en CS50. Terminé la sección de **excepciones** y completé el módulo sobre **librerías externas**, practicando con `random` y el uso de APIs de terceros. Mi objetivo es terminar el curso la próxima semana.

## Domingo: Reflexión y preparación para la próxima semana

El domingo fue un día de reflexión y preparación. Revisé lo aprendido, organicé mis notas y planifiqué los objetivos para la próxima semana. Me siento motivado para seguir avanzando en Kaggle y CS50, y también quiero explorar más sobre Astro y cómo mejorar mi blog. También he escrito este post para documentar mi progreso y reflexionar sobre lo aprendido.

### Reflexión final

Ha sido una semana intensa pero increíblemente productiva. La clave, como me recordé a mí mismo, es "intentarlo una vez más". Este blog es parte de ese intento. Nos vemos la próxima semana con más avances.
