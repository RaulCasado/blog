---
title: 'De la Entrevista al Código: Crónica de Mis Primeras Semanas como Programador'
description: 'He estado ausente tres semanas, ¡pero por una buena razón! Te cuento todo sobre mi entrevista, cómo conseguí mi primer trabajo como programador y mi increíblemente productiva primera semana.'
pubDate: '2025-09-30'
heroImage: '/blog-placeholder-4.jpg'
heroImageAlt: 'Un escritorio con un ordenador mostrando código'
tags: ['weekly']
lang: 'es'
---

¡He vuelto! Sé que han sido tres semanas de silencio por aquí, pero creedme, ha sido por una muy, muy buena razón. Este no es un post técnico como los que suelo escribir, sino una actualización más personal sobre un gran cambio en mi vida que me hace muchísima ilusión compartir: **¡he conseguido mi primer trabajo como programador!**

El camino ha sido intenso y el aprendizaje brutal, así que he pensado que sería interesante contaros cómo ha sido todo el proceso, desde la entrevista hasta mi primera semana "en las trincheras".

## Semanas 1 y 2: La Calma Antes de la Tormenta (o más bien, el estudio)

Todo empezó hace tres semanas con una entrevista de trabajo. Los nervios de siempre, las preguntas técnicas, la charla sobre proyectos... pero al final, las sensaciones fueron buenas. Tan buenas que, poco después, llegó la noticia: **¡el puesto era mío!**

La alegría fue inmensa, pero enseguida se transformó en un profundo sentido de la responsabilidad. Sabía que tenía que llegar preparado, así que esas dos semanas previas a mi incorporación se convirtieron en un campo de entrenamiento personal.

Mi objetivo era doble: refrescar tecnologías que sabía que usaría y explorar otras que me generaban curiosidad.

1. **Refuerzo de PHP y Firebase/Firestore**: Aunque ya tenía bases, quise profundizar. Repasé la sintaxis de PHP, sus particularidades y me puse a hacer pequeños proyectos para sentirme cómodo de nuevo. Al mismo tiempo, me sumergí en **Firebase y Firestore**. Monté pequeñas aplicaciones para entender bien cómo estructurar los datos, cómo funcionan las reglas de seguridad y cómo interactuar con la base de datos en tiempo real.

2. **Explorando el mundo de la IA (RAG y Faiss)**: Como sabéis, la inteligencia artificial es un campo que me apasiona. Aproveché para hacer proyectillos con **RAG (Retrieval-Augmented Generation)** y **Faiss**, una biblioteca de Facebook AI para la búsqueda de similitud. Quería entender de primera mano cómo se puede combinar un modelo de lenguaje con una base de datos vectorial para crear sistemas de preguntas y respuestas más potentes. Fue fascinante y, aunque no lo usaría directamente en mi primer día, me sirvió para mantener la mente activa y seguir aprendiendo. Y bueno a lo mejor lo uso en el futuro, ¿quién sabe?

Fueron dos semanas de estudio intenso, pero increíblemente gratificantes. Cada pequeño proyecto terminado era una dosis de confianza.

## Semana 3: Mi Primera Semana en el Mundo Real

Y llegó el día. La tercera semana fue mi primera semana de trabajo. La sensación de abrir el portátil sabiendo que el código que vas a escribir va a ser usado por personas reales es... indescriptible. Y ha sido, sin duda, una de las semanas más productivas de mi vida.

Esto es un resumen de mis primeras misiones:

### El Misterio de la Fecha Viajera en PHP

Mi primera tarea fue arreglar un bug curioso. En una parte de la aplicación, las fechas se mostraban incorrectamente, a menudo aparecía un día anterior al seleccionado. Esto ocurría cuando un usuario en su PC tenía una configuración de zona horaria local diferente. Tras investigar un poco, descubrí que el problema estaba en el parseo de la fecha. La solución fue usar `getUTCTime()` para normalizar la fecha a UTC antes de procesarla, asegurando que la zona horaria del cliente no afectase al resultado. ¡Primer bug solucionado!

### Alimentando a la IA con JSON

Una de mis tareas más interesantes fue preparar datos para el modelo de IA que la empresa está desarrollando. Mi trabajo consistía en estructurar información diversa en formato **JSON**. No era solo "escribir JSON", sino entender qué datos necesitaba el modelo, cómo debían estar anidados y qué formato era el más eficiente para que la IA lo "entendiera" bien. Fue genial ver cómo mis conocimientos teóricos sobre APIs y estructuras de datos se aplicaban a un proyecto de IA real.

### Desarrollando Nuevas Funcionalidades

La última parte de la semana la dediqué a añadir nuevas características a una aplicación interna. Aquí es donde toqué un poco de todo:

* **Imagen ampliable con JavaScript**: Implementé una funcionalidad para que los usuarios pudieran hacer clic en una imagen y verla en grande, en un modal. Un clásico del desarrollo front-end.
* **Modal que se cierra al clicar fuera**: Para mejorar la usabilidad, añadí un listener para que, si el usuario hace clic fuera del modal de la imagen, este se cierre automáticamente. Pequeños detalles que marcan la diferencia.
* **Campos de observaciones y deadline en Firestore**: Añadí nuevos campos a la base de datos de Firestore. Uno de ellos era un campo de "observaciones" para añadir texto libre. Otro, más interesante, fue un campo `deadline`. Este campo se usa para que un usuario no pueda inscribirse a un evento si la fecha límite ya ha pasado. Esto implicó no solo añadir el campo, sino también la lógica de validación correspondiente.
* **Inscripciones irreversibles**: Implementé una lógica para que, una vez que un usuario se inscribe a un evento, no pueda deshacer la acción.

## Y para rematar la semana: ¡La NASA International Space Apps Challenge!

Por si la semana no hubiera sido lo suficientemente intensa, decidí unirme a la [NASA International Space Apps Challenge](https://www.spaceappschallenge.org/) durante el fin de semana. ¡Y qué experiencia!

Nuestro equipo desarrolló **SpaceCrafter**, un proyecto que me hizo especial ilusión. Se trata de una aplicación web educativa pensada para que niños y entusiastas del espacio puedan diseñar y construir sus propias bases espaciales en 2D.

Lo mejor de todo es que no es un simple juego de arrastrar y soltar. Cada módulo que usas está **basado en diseños reales de la NASA y la ISS**, con sus especificaciones técnicas, costes y pesos reales. Mientras construyes, una **IA asistente** te guía en tiempo real, dándote consejos sobre dónde colocar el soporte vital, cómo optimizar la eficiencia o alertándote de problemas en tu diseño.

El proyecto incluía perfiles de usuario para guardar tus creaciones, un sistema de logros y hasta un ranking para que la comunidad pudiera votar por los mejores hábitats. Fue un desafío increíble desarrollar todo esto en un fin de semana, pero una oportunidad fantástica para aplicar todo lo aprendido y seguir explorando nuevas ideas.

## Conclusión

Ha sido una semana de locos, en el mejor sentido posible. Desde arreglar bugs en producción hasta desarrollar nuevas funcionalidades y rematar con una hackathon de la NASA. He aprendido más en estos últimos días que en meses de estudio por mi cuenta. La sensación de aplicar la teoría a problemas reales, de colaborar con un equipo y de ver cómo tu trabajo tiene un impacto directo es increíblemente motivadora.

Ahora toca seguir aprendiendo y aportando valor. Y por supuesto, ¡volver a la carga con el blog! Prometo que la espera ha merecido la pena.

Aquí tenéis el enlace al proyecto de la NASA por si queréis echarle un vistazo: [SpaceCrafter](https://nasa.manianetwork.es/).
¡Nos leemos en el próximo post!
