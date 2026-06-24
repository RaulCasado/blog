---
title: "Mi sprint de autoaprendizaje: lo que me enseñaron siete semanas de Kaggle, CS50 y React"
description: "Una retrospectiva de un periodo intensivo de autoaprendizaje: machine learning en Kaggle, fundamentos de Python con CS50, construir un proyecto de React desde cero y las lecciones difíciles sobre alcance, arquitectura y herramientas por el camino."
pubDate: "2025-09-15"
heroImage: '../../../assets/blog/weekly/blog-meta.jpg'
heroImageAlt: 'Un espacio de trabajo que representa semanas de aprendizaje y desarrollo continuo'
tags: ['career', 'python', 'web_development']
lang: 'es'
---

Durante un tramo de finales del verano de 2025 llevé un diario semanal de todo lo que iba aprendiendo. Esas notas quedan ahora reunidas en esta única retrospectiva: es más útil leer el arco completo de una vez que siete entradas de diario sueltas. Esto es lo que aquellas semanas me enseñaron de verdad.

## Machine learning, a fondo, en Kaggle

Recorrí los itinerarios de Kaggle de forma metódica en vez de saltar de uno a otro. La progresión importó:

- **ML intermedio**: pipelines para mantener los flujos limpios, validación cruzada para una evaluación honesta, XGBoost como caballo de batalla para datos estructurados y el **data leakage** — ese bug sutil que infla tus métricas en silencio hasta que producción te baja a la realidad.
- **Visualización de datos** con Seaborn: barplots, heatmaps, scatter/regplots y distribuciones, aprendiendo a *mirar* los datos antes de modelarlos.
- **Feature engineering**: codificar categóricas, combinar columnas en features con más contexto, información mutua para elegir las variables más informativas y PCA para la dimensionalidad. La lección recurrente: una buena feature suele ganarle a un modelo más sofisticado.
- **Deep learning** con TensorFlow/Keras: de una sola neurona a la clasificación binaria.
- **Visión por computador**: redes convolucionales de principio a fin — convolución y ReLU, max pooling, stride/padding, convnets propias y data augmentation. Aquí aprendí paciencia: algunos ejercicios pedían 50 épocas a ~6 minutos cada una. Esperar horas por una sola ejecución te enseña a respetar el cómputo.
- **Series temporales**: ARIMA/LSTM y una prudencia sana con activos ruidosos como las criptomonedas. Además de escalado vs. normalización y el poco glamuroso oficio de limpiar datos.

## Fundamentos de Python con CS50

En paralelo terminé el **CS50's Introduction to Programming with Python** de Harvard: funciones, condicionales, bucles y excepciones, tests unitarios, entrada/salida de archivos, expresiones regulares y POO. Las regex fueron el módulo que más se resistió — potentes, pero dolorosas de depurar, y un buen recordatorio de que la herramienta más ingeniosa no siempre es la más legible.

## La lección más valiosa: el alcance gana a la complejidad

Para mi proyecto final de CS50 construí el Juego de la Vida de Conway con una arquitectura MVC completa y una interfaz en Tkinter. Estaba orgulloso de él — hasta que la comunidad me señaló que estaba **sobreingenierizado** para lo que el curso pedía. Escoció después de todo el trabajo, pero fue la lección más útil de todo el periodo: entender el *alcance* de un problema es tan importante como saber programarlo. Dejé el proyecto en GitHub y construí algo más adecuado para la tarea real.

## Construyendo ProjectOrganizer: de las features a los cimientos

El hilo más importante de estas semanas fue un proyecto personal — una app para centralizar proyectos, tareas, registros diarios, ideas y recursos. Es donde el aprendizaje se hizo real:

- **Decisiones de arquitectura desde el principio**: React Router para la navegación, `localStorage` como capa de datos inicial y una "única fuente de verdad" para el estado.
- **Un gran refactor**: un componente `ProjectDetail` había crecido hasta ser un monolito con más de 20 imports y prop drilling profundo. Introduje la Context API de React para eliminar el prop drilling, extraje lógica a hooks y servicios (`useSwal`, una clase `DateUtils`) y usé barrel exports para domar los imports. La forma funcional de actualizar el estado (`setState(prev => …)`) arregló en silencio toda una clase de race conditions.
- **Herramientas y disciplina**: Husky + Commitlint + Prettier + lint-staged para estandarizar commits y formato. Dieciocho commits en una semana, pero el código salió mucho más mantenible.

## Y el blog que estás leyendo

Algunas de esas semanas fueron a parar a esta misma web: migrarla y refactorizarla en Astro, y añadir la búsqueda y el filtrado por tags que la hacen navegable a medida que crecen los posts. Construir tus propias herramientas es una de las mejores formas de aprender — notas cada aspereza en tus propias manos.

## A qué se redujo todo

Mirando atrás, los temas técnicos importan menos que los hábitos que construyeron: estudiar con estructura, terminar lo que empiezo, pedir feedback aunque duela y cuidar los cimientos de un proyecto, no solo sus features. Esa mentalidad es la que me llevé al trabajo profesional — y es la razón por la que sigo escribiendo aquí.
