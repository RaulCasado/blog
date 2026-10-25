---
title: 'Radicale y DAVx⁵: el calendario se sincronizaba, pero el aviso no llegaba'
description: 'Separar servidor, sincronización y aplicación de calendario permitió encontrar por qué una cita podía llegar al móvil sin entregar su aviso. Lo que probé con Radicale, DAVx⁵ y Fossify.'
pubDate: '2026-10-25'
heroImage: '../../../assets/blog/radicale-davx5-flujo.webp'
heroImageAlt: 'Radicale sincroniza con DAVx5 y los proveedores de Android; la app de contactos lee la agenda y Fossify lee el calendario y programa sus avisos'
tags: ['linux', 'devops']
lang: 'es'
---

El evento estaba en el móvil. También constaba su recordatorio. Esperamos a la hora prevista y no apareció la notificación.

Hasta entonces había comprobado que mi servidor recibía calendarios y contactos y que DAVx⁵ los llevaba a Android. Faltaba una parte: que la aplicación de calendario utilizase esos datos para avisar.

El 25 de octubre había pedido a Claude alternativas autoalojadas para calendario, contactos y notas. Quería aplicaciones que pudiese usar desde el teléfono y aprovechar el servidor que ya mantenía mis servicios. Excluí Nextcloud de la comparación: las fotos estaban en Immich y prefería empezar por un alcance pequeño. Aquí cuento el despliegue de calendario y contactos, desde los datos de prueba hasta la importación posterior de Google.

## Quién guarda la cita y quién tiene que avisar

**Radicale** es el servidor que conserva calendarios y libretas de contactos. Los clientes hablan con él mediante dos protocolos: **CalDAV** para calendarios y **CardDAV** para contactos. Son acuerdos sobre cómo consultar y modificar recursos, no aplicaciones que tenga que abrir cada día.

Los eventos se conservan como archivos `.ics`; los contactos, como vCard, habitualmente `.vcf`. Una cita puede incluir inicio, fin y recordatorio. Para que llegue al móvil y aparezca el aviso hacen falta otras piezas.

**DAVx⁵** conecta esos protocolos con los proveedores de datos de Android, los almacenes del sistema que consultan las aplicaciones. La app donde veo el mes no necesita hablar directamente con mi servidor. Puede leer el calendario que DAVx⁵ ya ha sincronizado.

En mi instalación quedaron cuatro responsabilidades, representadas en el [esquema ampliable de portada](/blog/radicale-davx5-flujo.svg):

1. Radicale conserva los datos en el servidor.
2. DAVx⁵ los intercambia con Android.
3. Los proveedores de calendario y contactos los mantienen en el dispositivo.
4. Las aplicaciones los muestran y editan; la de calendario programa además sus avisos.

La [introducción de DAVx⁵](https://www.davx5.com/manual/introduction.html) explica esa separación. Fue la clave del diagnóstico: cuando el evento ya estaba en Android, había que seguir su recorrido hacia la aplicación que debía notificar.

Después de elegir Radicale todavía pregunté si aquello era para calendario, para contactos o para las dos cosas. La respuesta era las dos. Tener varios nombres en una comparativa no me había dejado tan clara esa arquitectura.

## Por qué empecé por Radicale

Investigamos Radicale, Baïkal, Davis, Xandikos y EteSync. La selección inicial salió de documentación; el servicio que desplegamos y medimos fue Radicale.

Me encajaba como un servicio pequeño que guardaba archivos y podía seguir la estructura Docker del resto del servidor. Su [interfaz web](https://radicale.org/) administra colecciones, como crear una libreta o un calendario. Para consultar el mes o editar contactos seguiría utilizando clientes.

Baïkal era la alternativa más fácil de situar: trae administración web y su [instalación](https://sabre.io/baikal/install/) utiliza PHP, servidor web y una base de datos, que puede ser SQLite. Si ya tuviera ese stack o necesitase esa administración, sería una opción que valorar. Aquí preferí empezar con el servicio de archivos que resolvía el alcance inmediato.

Davis y Xandikos quedaron como alternativas investigadas, sin pruebas propias con mis clientes. EteSync abría una decisión diferente: cifrado de extremo a extremo, de forma que tampoco el servidor pudiera leer el contenido. No llegamos a probar su encaje.

La opción elegida no ofrece ese cifrado de extremo a extremo. HTTPS protege el transporte, y la red privada limita el acceso, pero Radicale maneja los datos. Si necesitase que el servidor no los conociera, tendría que reconsiderar la arquitectura.

No medimos el consumo de todas las alternativas. Lo que justificaba empezar por Radicale era su encaje; la comparación no fue una competición de rendimiento entre servidores.

## El despliegue y las primeras comprobaciones

Le pedí a Claude que lo montase siguiendo la estructura de los contenedores existentes y revisase si el firewall podía interferir.

Se desplegó **Radicale 3.9.0**, construyendo la imagen desde el proyecto. Los datos y la configuración quedaron en almacenamiento persistente separado del contenedor: recrear el programa debía conservar la agenda.

El acceso quedó en la red privada de Tailscale, una *tailnet* entre mis dispositivos. Tailscale Serve proporcionaba la entrada HTTPS y el certificado hacia el servicio local. Radicale mantenía su autenticación y permisos de acceso. No necesitaba publicar la agenda en internet para utilizarla desde el teléfono.

La medición en reposo rondó **30 MiB de RAM**. Se comprobaron respuestas `401` sin credenciales o con contraseña incorrecta y un `207` con credenciales válidas al consultar recursos mediante `PROPFIND`. En DAV, esa petición solicita propiedades y puede recibir un estado para cada recurso.

Desde el portátil funcionaban el certificado y el acceso privado; la vía directa que probamos desde la LAN rechazaba la conexión. Son pruebas concretas de acceso: no pudimos leer toda la configuración del firewall porque requería contraseña.

Con eso había un servidor accesible y autenticación funcionando. Todavía faltaba validar el cliente y los avisos.

## Configurar Android exige elegir la cuenta correcta

Instalé DAVx⁵, configuramos la cuenta y creamos un calendario y una libreta. Hubo que seleccionar sus colecciones y activar la sincronización. Una colección existente en el servidor no se descarga automáticamente si el cliente la deja desmarcada.

También importa dónde guardo lo que creo. Un contacto añadido a una cuenta local o de Google no se convierte por eso en un contacto de DAVx⁵. Para probar la subida elegimos expresamente la cuenta de destino.

El móvil ejecuta HyperOS, así que revisamos permisos de calendario, contactos y notificaciones, además de batería e inicio automático. Dejé DAVx⁵ sin restricciones de batería y confirmé el ajuste de autoinicio.

Los permisos y el trabajo de fondo son controles distintos: poder leer calendario no garantiza que el sistema deje ejecutar una sincronización a tiempo. Durante los ensayos utilizamos «Sincronizar ahora», útil para configurar el recorrido, pero todavía necesitábamos observarlo sin intervenir.

## Las pruebas de ida, vuelta y borrado

Antes de importar mis datos trabajamos con elementos desechables:

| Prueba | Resultado observado |
| --- | --- |
| Evento y contacto creados en el servidor | Llegaron a las cuentas correspondientes del móvil |
| Evento y contacto creados en la cuenta DAVx⁵ del móvil | Aparecieron como `.ics` y `.vcf` en Radicale |
| Revisión del horario | La zona `Europe/Madrid` y las horas se conservaban correctamente |
| Borrado de elementos de prueba en el servidor | Se propagó al móvil al sincronizar |

Eso es **sincronización bidireccional**: los cambios pueden viajar desde cualquiera de los extremos. Un evento presente en ambos sitios, pero desplazado una hora, habría seguido estando mal; por eso comprobamos también el dato temporal.

En nuestro ensayo se retiraron archivos del almacén de prueba. Si repites la comprobación, utiliza una colección separada y borra únicamente su evento o contacto mediante un cliente. No hace falta manipular el almacenamiento interno de una agenda real para demostrar la propagación.

El borrado enseñó además el límite de la sincronización como protección: un error también puede viajar correctamente. Una copia de seguridad tiene que permitir recuperar una versión anterior aunque los demás dispositivos ya hayan recibido el cambio.

## Aislar el fallo del recordatorio

La primera prueba con aviso se hizo usando Google Calendar. El evento había llegado y el sistema tenía el recordatorio registrado, pero no apareció la notificación esperada. La causa exacta no quedó diagnosticada.

Elegí probar **Fossify Calendar**, instalada desde F-Droid, un repositorio de aplicaciones Android. Empezamos con un evento creado localmente en el móvil. Así quitábamos del ensayo Radicale y DAVx⁵: queríamos saber si esa aplicación podía notificar en aquel estado del teléfono.

El evento local sí produjo una notificación. Quedaba probar si Fossify recogía el calendario remoto.

Al principio solo mostraba su calendario local. Ya tenía permisos, pero faltaba activar **Ajustes → CalDAV → Sincronizar CalDAV** y seleccionar el calendario del sistema que alimentaba DAVx⁵.

Durante el diagnóstico habíamos interpretado ese ajuste como una segunda conexión directa a Radicale. La prueba corrigió la hipótesis: Fossify reutilizaba los datos de Android. La sincronización no necesitaba otro camino; la app tenía que leer la cuenta correcta.

Repetimos el recorrido completo: crear un evento en Radicale, descargarlo con DAVx⁵, abrirlo en Fossify y comprobar que se programaba su aviso. La **notificación apareció alrededor de las 21:59, hora de Madrid**.

## La importación posterior y los eventos que parecían faltar

Después de esa batería importamos una exportación de Google en las colecciones de Radicale. Comprobamos la libreta de contactos y los eventos recientes desde el móvil.

Al comparar calendarios, Android mostraba menos eventos que el servidor. Podía parecer una pérdida de datos, pero la diferencia coincidía con la **ventana histórica configurada de DAVx⁵, de 90 días**. Los eventos anteriores seguían almacenados en Radicale; quedaban fuera del intervalo descargado al teléfono.

El conteo solo servía después de comparar el mismo conjunto. Antes de reimportar y crear duplicados, había que comprobar si el cliente filtraba por fechas o si realmente faltaban archivos en el destino.

Esa importación no demuestra que toda la migración esté cerrada. No he confirmado aquí la retirada de Google ni la fidelidad de todos los casos complejos: recurrencias, cumpleaños, grupos, fotografías y calendarios auxiliares necesitan sus propias comprobaciones. Tampoco sustituye a la prueba del recordatorio con el móvil sin tocar.

## Los dos tiempos de espera que todavía importan

En la prueba que sí notificó, **abrimos Fossify** para que cargase el evento y programase la alarma. Su configuración observada incluía una actualización periódica de dos horas.

Hay, por tanto, dos pasos que pueden añadir espera: DAVx⁵ descarga el evento y la aplicación de calendario lo procesa para programar el aviso. Que el primero funcione no fija el tiempo del segundo.

Una cita de la semana siguiente deja margen; otra creada desde el portátil diez minutos antes podría llegar demasiado tarde a la aplicación que debe avisar. El éxito obtenido al abrirla manualmente no resuelve ese caso.

Esta es la prueba que falta y que un lector puede adaptar, siempre sobre un calendario de ensayo:

1. Crear desde otro dispositivo un evento sin datos personales, con hora y recordatorio definidos; por ejemplo, para dentro de 30 minutos, con aviso cinco minutos antes.
2. Anotar la hora de creación y decidir de antemano qué retraso sería aceptable.
3. Dejar el móvil como se usaría normalmente, sin abrir DAVx⁵ ni Fossify ni forzar la sincronización.
4. Observar si aparece el aviso y a qué hora. Después comprobar si el evento llegó al proveedor de Android, para distinguir descarga de programación.
5. Repetir tras reiniciar y al cambiar de red.

Es un protocolo propuesto, no una batería ya superada. Una sola notificación tampoco establece una latencia máxima: el caso interesante es el evento remoto reciente mientras el teléfono trabaja por su cuenta.

## Qué me convence del montaje y qué sigue pendiente

Radicale resolvió el almacenamiento y DAVx⁵ llevó contactos y eventos entre servidor y Android. La importación posterior añadió datos reales; encontrar el límite de 90 días evitó confundir un filtro del cliente con una pérdida en el servidor.

Fossify llegó a entregar un aviso, pero solo he comprobado ese recorrido abriendo la aplicación. Por eso aún no puedo tratar el calendario como un sustituto fiable para recordatorios urgentes creados desde otro dispositivo.

La **copia de seguridad sigue pendiente**. La propuesta es conservar datos y configuración fuera del disco del servicio y comprobar una restauración. Mientras no exista esa copia recuperable, tener varios dispositivos sincronizados deja abierto el mismo riesgo de borrado propagado.

Para alguien con un servidor propio, Android y una agenda personal, esta separación permite elegir servidor y aplicaciones por separado y localizar dónde falla el recorrido. Exige también mantener permisos, sincronización de fondo y respaldo. Si se buscan invitaciones, agenda web integrada o garantías de avisos que no se quieren comprobar y mantener, el alcance que he probado aquí resulta insuficiente.

Antes de confiarle esos recordatorios, me quedan dos tareas concretas: repetir el ensayo remoto sin tocar el móvil y recuperar una copia en un entorno separado. Son las que decidirán si el montaje encaja en mi uso diario.
