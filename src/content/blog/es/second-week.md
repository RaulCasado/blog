---
title: "Mi Segunda Semana de Estudio: CS50, Deep Learning y una Lección sobre 'Over-engineering'"
description: "Un diario de mi segunda semana de estudio intensivo, terminando el curso CS50P, mis primeros pasos con Kaggle y una valiosa lección sobre la complejidad en los proyectos."
pubDate: "2025-08-10"
heroImage: "/cs50p.png"
tags: ["cs50", "python", "weekly","kaggle"]
---

Esta semana ha sido una montaña rusa de emociones y aprendizaje. Empezó con una productividad arrolladora, terminando casi todo el contenido del famoso curso **CS50’s Introduction to Programming with Python**, y continuó con un proyecto que me enseñó una de las lecciones más importantes para un desarrollador: no siempre más es mejor.

Aquí os dejo mi diario de a bordo.

## Lunes: A toda máquina con CS50 y Kaggle

El lunes fue un día increíblemente productivo. Por la mañana, me centré en el material de CS50 y completé dos unidades enteras:

*   **Unit Tests**: `Testing my twttr`, `Back to the Bank`, `Re-requesting a Vanity Plate`, `Refueling`.
*   **File I/O**: `Lines of Code`, `Pizza Py`, `Scourgify` (dejando `CS50 P-Shirt` para la noche).

Por la tarde, di mis primeros pasos en el mundo del Deep Learning con un curso de **Kaggle**:
*   **Intro to Deep Learning**: Completé los 6 módulos, desde la neurona básica hasta la clasificación binaria, usando TensorFlow y Keras.

Terminé el día con la sensación de haber aprovechado cada minuto.

## Martes: La recta final de CS50 y mi "pelea" con las Regex

El martes decidí aparcar Kaggle para dar el empujón final a CS50. Me enfrenté a los dos últimos módulos teóricos:

*   **Regular Expressions**: Un módulo que me pareció especialmente duro. Completé todos los ejercicios (`NUMB3RS`, `Watch on YouTube`, `Working 9 to 5`, etc.), pero me dejó una reflexión importante: las expresiones regulares son potentísimas, pero increíblemente difíciles de depurar. Para un problema como validar una IP, sentí que soluciones más sencillas con `split()` habrían sido más rápidas y legibles. ¿Es realmente necesario dominarlas a mano en la era de la IA?
*   **Object-Oriented Programming**: Un módulo mucho más agradecido, donde completé `Seasons of Love`, `Cookie Jar` y `CS50 Shirtificate`.

Con esto, ¡solo quedaba el proyecto final!

## Miércoles: Planificando el "Game of Life"

Con la teoría finiquitada, el miércoles lo dediqué a la planificación. Tras barajar varias ideas, me decidí por un clásico: el **Juego de la Vida de Conway**.

Mi plan era hacerlo "bien", aplicando una arquitectura **MVC (Modelo-Vista-Controlador)**. Dediqué el día a diseñar las clases, las funciones, la estructura de ficheros y a montar el esqueleto del proyecto. La idea era usar `tkinter` para la interfaz gráfica.

## Jueves: A programar

El jueves fue el día de la implementación. Fue una jornada de código puro en la que conseguí implementar casi toda la funcionalidad que había planeado:

*   Lógica principal del juego.
*   Renderizado en la ventana de `tkinter`.
*   Funciones para importar y exportar estados del juego desde ficheros.
*   Controles para pausar, reanudar y cambiar la velocidad.

Al final del día, el proyecto estaba prácticamente listo. Solo quedaba refactorizar, hacer los tests y grabar el vídeo para la entrega.

## Viernes: La dura lección del "Over-engineering"

El viernes, con la moral por las nubes, entré en la comunidad de Discord de CS50 para compartir mi avance. La respuesta fue un jarro de agua fría: el proyecto estaba **"over-engineered"**. Estaba bien hecho, sí, pero era mucho más complejo de lo que el curso pedía.

Fue un golpe duro. Después de todo el trabajo, me di cuenta de que había fallado en entender el alcance real del proyecto. Decidí subir el **Juego de la Vida a mi GitHub** como un proyecto personal, pero no lo presentaría para CS50. Tenía que empezar de cero.

## Reflexión final de la semana

Este fin de semana ha sido de autocrítica. ¿Por qué esta semana no fue tan productiva como la anterior?

1.  **Falta de foco**: He invertido tiempo en cosas que no eran prioritarias. El proyecto del "Game of Life" es un claro ejemplo. Aunque aprendí mucho, fue un fracaso en el contexto del curso.
2.  **La importancia del entorno**: La semana pasada cambiaba de lugar de estudio por las tardes, y eso me ayudaba a mantenerme concentrado. Esta semana no lo hice, y lo he notado.
3.  **La lección más valiosa**: No siempre "más complejo" significa "mejor". Entender los requisitos y el alcance de un proyecto es tan importante como saber programarlo.

Aunque la semana termina con un sabor agridulce, me quedo con el aprendizaje. Ahora toca volver a la pizarra, elegir un proyecto más adecuado para CS50 y aplicar las lecciones aprendidas sobre foco y gestión del tiempo. ¡A por la siguiente semana!
