---
title: "Tercera Semana: Redes Neuronales, Reinstalaciones y Nuevos Proyectos"
description: "Un resumen de mi tercera semana: un curso de Kaggle sobre redes convolucionales, desafíos técnicos, una nueva instalación de Ubuntu y el inicio de un emocionante proyecto personal."
pubDate: "2024-05-20"
tags: ["python", "weekly","kaggle"]
---

¡Hola a todos! Esta semana ha sido una montaña rusa de aprendizaje y desarrollo. Desde sumergirme en el mundo de la visión por computador con un curso de Kaggle hasta empezar un nuevo proyecto personal, pasando por una necesaria puesta a punto de mi sistema operativo.

### Aprendizaje Profundo con Kaggle

Comencé la semana completando un curso de Kaggle sobre visión por computador, que cubrió los fundamentos de las redes neuronales convolucionales (ConvNets). Los módulos que he completado son:

1.  **The Convolutional Classifier**: Creación del primer modelo de visión por computador con Keras.
2.  **Convolution and ReLU**: Descubriendo cómo las ConvNets crean características.
3.  **Maximum Pooling**: Extracción de características con *maximum pooling*.
4.  **The Sliding Window**: Explorando los parámetros de *stride* y *padding*.
5.  **Custom Convnets**: Diseñando mi propia red convolucional.
6.  **Data Augmentation**: Mejorando el rendimiento creando datos de entrenamiento adicionales.

Un desafío importante fue el tiempo de entrenamiento de los modelos. Algunos ejercicios requerían hasta 50 épocas, con cada una tardando unos 6 minutos. ¡Imagínense esperar 8 horas para un solo ejercicio! Esto ralentizó mi ritmo, pero fue una lección valiosa sobre la paciencia y los recursos que exige el *machine learning*.

### Puesta a Punto del Entorno de Desarrollo

También dediqué un día entero a reinstalar mi sistema operativo. Decidí empezar de cero con Ubuntu 24.04, la versión más reciente. Estuve configurándolo con el tema Dracula y optimizándolo para programar. Instalé extensiones de GNOME para monitorizar el uso de RAM, ya que con 8 GB mi portátil a veces se queda corto, sobre todo con VSCode y muchas pestañas abiertas.

### Explorando Herramientas: Obsidian

He estado probando Obsidian para tomar notas. Es una herramienta súper potente, pero la curva de entrada es considerable. Pasé bastante tiempo configurándola y siento que apenas he rozado la superficie de lo que puede hacer. He visto a gente usarlo como un "segundo cerebro", y la idea me parece fascinante. Aún no he decidido si será mi herramienta definitiva; también quiero darle una oportunidad a Notion.

### Nuevo Proyecto: Un Organizador Centralizado

¡Lo más emocionante de la semana es que he empezado un nuevo proyecto! La idea es crear un organizador de proyectos y recursos para tenerlo todo centralizado.

El concepto es tener una aplicación donde puedas definir el nombre de un proyecto, sus requisitos, dependencias, el stack tecnológico e incluso la arquitectura (como MVC). Dentro de cada proyecto, habría varias secciones:

*   **Un To-Do list** para las tareas pendientes.
*   **Un registro diario** de lo que has hecho y el tiempo invertido.
*   **Notificaciones por correo** (al estilo Duolingo) si llevas más de una semana sin trabajar en un proyecto.
*   **Una zona de bocetos** para dibujar ideas.
*   **Un espacio de brainstorming** para conectar ideas libremente.
*   **Una sección de recursos** para guardar enlaces útiles (tutoriales, documentación, etc.).

De momento, estoy centrado en el frontend. Ya he tomado algunas decisiones técnicas:

*   **Enrutamiento**: Usaré el modo declarativo de React Router DOM (`<BrowserRouter>`). Es perfecto para la complejidad actual de la aplicación, donde los datos viven en el `localStorage`. En el futuro, si migro a un backend como Flask, podría considerar `createBrowserRouter`.
*   **Gestión de Estado**: Adoptaré el principio de "Single Source of Truth" (única fuente de la verdad). Centralizaré el estado en un ancestro común para evitar inconsistencias y facilitar la sincronización entre componentes.

Actualmente, la base de la aplicación ya permite añadir el nombre del proyecto, el stack, las dependencias y los requisitos. ¡Espero seguir avanzando y compartiendo más detalles pronto!
