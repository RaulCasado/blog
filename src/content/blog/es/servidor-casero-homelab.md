---
title: 'Un servidor en casa: qué le he quitado a la nube y qué no'
description: 'Cómo monté un mini PC de segunda mano como servidor doméstico para fotos, música, libros y contraseñas. Las alternativas que descarté y por qué, los contras honestos de cada servicio, y por qué ahora mismo es mal momento para comprar hardware.'
pubDate: '2026-09-08'
heroImage: '../../../assets/blog/homelab-cover.jpg'
heroImageAlt: 'Un mini PC compacto de sobremesa, el tipo de máquina que hace de servidor doméstico'
tags: ['linux', 'devops', 'security']
lang: 'es'
---

## De qué va esto

Tengo un mini PC encendido en un rincón de casa. Lleva ocho días seguidos funcionando sin que yo lo toque, y ahora mismo guarda mis fotos, mi música, mis libros y mis contraseñas. Ninguna de esas cosas pasa ya por Google.

Este post cuenta cómo llegué ahí: qué es un servidor cuando lo miras de cerca, qué alternativas me planteé en cada decisión y por qué elegí las que elegí. También cuenta lo que **no** funciona tan bien como parece cuando lo lees en un tutorial entusiasta, porque hay contras reales y prefiero decirlos.

Y al final hablo de dinero, porque justo ahora hay un factor que cambia bastante el consejo que le daría a alguien que quiera copiarme.

## Primero: ¿qué es un servidor?

Un servidor no es un tipo de ordenador. Es un **papel** que un ordenador desempeña.

Tu portátil está pensado para que tú te sientes delante: tiene pantalla, teclado, y se apaga cuando cierras la tapa. Un servidor es un ordenador al que nunca te sientas delante. Está encendido siempre, sin pantalla ni teclado conectados, esperando a que otros aparatos le pidan cosas por la red. Tú hablas con él desde el móvil o desde el portátil, y él responde.

Eso es literalmente todo. Cuando abres Instagram, tu móvil le pide fotos a un servidor de Meta. Cuando yo abro mi galería, mi móvil se las pide a una caja que tengo a cuatro metros. La diferencia no es técnica: es de quién es la caja.

"Servidor" tampoco significa un armario con luces parpadeando. El mío es un mini PC de oficina reacondicionado, del tamaño de un libro grueso, que consume menos que una bombilla vieja.

## El hardware: un PC de oficina de segunda mano

Compré un **HP ProDesk 400 G6 Mini**. Esto es lo que lleva:

- Intel Core i5-10500T, 6 núcleos y 12 hilos
- 16 GB de RAM DDR4
- Un SSD NVMe de 476 GB
- Gráfica integrada Intel UHD 630, sin tarjeta dedicada
- Ubuntu 26.04 LTS

¿Por qué un mini PC de oficina y no otra cosa? Me planteé tres opciones.

Una **Raspberry Pi** es lo que todo el mundo recomienda para empezar, y es una buena recomendación: barata, diminuta, consume nada. La descarté porque quería que este trasto hiciera cosas exigentes —procesar fotos, quizá modelos de IA— y una Pi se queda corta en cuanto le pides algo más que servir ficheros. Además el almacenamiento por tarjeta SD es un punto de fallo conocido.

Un **NAS comercial** (un Synology, por ejemplo) es la opción cómoda: viene con su sistema, sus apps, su interfaz bonita. Lo estuve mirando en serio, y llegué a comparar modelos y discos. Lo descarté por dos razones: cuesta bastante más por la potencia que te da, y te ata a su ecosistema. Si un día quiero instalar algo que a Synology no le gusta, tengo un problema que en un Ubuntu normal no existe.

Un **VPS en la nube** habría sido más fiable en cuanto a disponibilidad, pero rompe la premisa entera. Si el objetivo es que mis fotos no estén en el ordenador de otro, alquilar el ordenador de otro no lo resuelve.

El mini PC de oficina reacondicionado gana porque es el punto dulce: potencia de PC real, precio de segunda mano, consumo bajo, y encima es hardware pensado para estar años encendido en una oficina. Estos equipos salen al mercado de segunda mano por miles cuando las empresas renuevan.

## La decisión que lo condiciona todo: no abrir ningún puerto

Antes de instalar nada hay que responder a una pregunta: **¿cómo llego al servidor desde fuera de casa?**

La respuesta clásica es abrir puertos en el router. Le dices al router "lo que llegue al puerto 443, mándalo al servidor", y ya puedes entrar desde cualquier sitio. Es lo que hace todo el mundo, y funciona.

También significa que tu servidor queda expuesto a internet entero. Y "internet entero" incluye a los bots que escanean direcciones IP las 24 horas buscando cosas mal configuradas. No es paranoia: es que si abres un puerto, en cuestión de horas alguien lo está probando.

La alternativa que elegí es **Tailscale**, que monta una red privada virtual entre mis dispositivos usando WireGuard. Mi móvil, mi portátil, mi PC y el servidor se ven entre sí como si estuvieran en la misma habitación, aunque yo esté en la otra punta del país. Y desde fuera de esa red, el servidor **no existe**. No hay puerto que escanear.

![Arquitectura del servidor: los dispositivos entran por Tailscale a un mini PC con cinco contenedores, sin exponer nada a internet](../../../assets/blog/homelab-stack.svg)

¿Contras? Dos, y son reales.

El primero: **todo el que quiera acceder tiene que instalar Tailscale**. Si quiero enseñarle las fotos a mi padre en su móvil, no le puedo pasar un enlace y ya. Eso es fricción de verdad.

El segundo: dependo de un servicio de terceros para la coordinación. Tailscale no ve mi tráfico —eso va cifrado de extremo a extremo— pero sí gestiona quién puede conectarse con quién. Existe [Headscale](https://github.com/juanfont/headscale), que es un servidor de coordinación autoalojado, y sería lo coherente del todo. No lo he montado porque añade una pieza más que mantener, y he preferido elegir mis batallas.

## Las fotos: lo que más me costaba dejar

Google Photos era lo más difícil de sustituir. No por las fotos en sí, sino por todo lo que hay alrededor: la copia automática, el buscador que encuentra "playa" sin que nadie haya etiquetado nada, las caras agrupadas.

Comparé seis opciones. Las tres que llegaron lejos:

**PhotoPrism** está más maduro y tiene fama de no romper nada entre versiones. Pero no tiene aplicación móvil oficial. Y la copia automática desde el móvil era justo el requisito central, así que quedó fuera por lo único que no podía ceder.

**Ente** me pareció técnicamente elegante: cifrado de extremo a extremo, y el reconocimiento facial corre **en el móvil**, no en el servidor, así que el servidor casi no trabaja. Sigue siendo mi plan B si algún día el mío se queda corto. Perdió porque su comunidad de autoalojamiento es mucho más pequeña, y eso importa a las tres de la mañana cuando algo falla y estás buscando a alguien que haya tenido tu mismo error.

**Immich** ganó. Es prácticamente un clon funcional de Google Photos: app nativa, copia automática en segundo plano, búsqueda semántica, reconocimiento facial. Y una comunidad enorme.

Ahora, el contra que no me voy a saltar: **Immich rompe cosas entre versiones mayores**. Alcanzó su versión estable en octubre de 2025, y en julio de 2026 la 3.0 ya trajo una migración obligatoria del motor de búsqueda vectorial. El propio proyecto recomienda no depender de él como copia única. Yo actualizo leyendo las notas de versión, nunca a ciegas.

Ocupa 9,2 GB con lo que le he metido hasta ahora.

## La música: donde el contra es más gordo

Aquí monté **Navidrome**, y la decisión fue fácil. Me planteé Jellyfin (que también hace vídeo, pero pide entre 2 y 4 GB de RAM) y Funkwhale (pensado para una red federada, que no es lo que necesito). Navidrome funciona con unos 50 MB de RAM y habla la API Subsonic, que es el estándar de facto: eso significa que puedo elegir entre docenas de aplicaciones de móvil en vez de estar atado a una.

Pero aquí está el contra más serio de todo el montaje, y quiero decirlo claro porque es el que más se nota en el día a día.

**Cuando tu música vive en un servidor, necesitas conexión para escucharla.** Si me meto en el metro y pierdo cobertura, la música se corta. Si tuviera los archivos en el móvil, no. Spotify tiene el mismo problema y lo resuelve con descarga offline; aquí también existe —Tempo, la app que uso, sincroniza para escuchar sin conexión— pero es un paso manual que tienes que acordarte de hacer, no algo que pasa solo.

Es un intercambio honesto: gano una biblioteca que es mía de verdad, que nadie puede retirar del catálogo, y que suena a la calidad que yo decida. Pierdo la comodidad de que simplemente funcione siempre.

Un detalle práctico que me costó una tarde: **AIMP, el reproductor que usaba en Android, no soporta Subsonic**. Solo existe un plugin para la versión de escritorio. Tuve que cambiar a [Tempo](https://github.com/CappielloAntonio/tempo), que es software libre y además funciona con Android Auto.

## Los libros: mi propia biblioteca, y el Kobo respirando

Esta es la parte que más satisfacción me ha dado, y la que menos esperaba.

Tengo un Kobo. Los lectores de libros electrónicos tienen poco espacio, así que acabas haciendo limpieza cada cierto tiempo, decidiendo qué borras. Con un servidor eso se acaba: **la biblioteca entera vive en el servidor y el Kobo solo lleva lo que estoy leyendo ahora**. Cuando termino, lo quito y bajo otro. El espacio deja de ser un problema.

Comparé seis opciones otra vez. La pelea real fue entre dos.

**Kavita** es objetivamente mejor gestionando bibliotecas enormes, y su desarrollo es más constante. Si tuviera decenas de miles de cómics, sería mi elección sin dudar.

**Calibre-Web-Automated** ganó por una razón muy concreta: **sincroniza de forma nativa con el Kobo por WiFi**. Con Kavita tendría que instalar KOReader en el lector para acceder por OPDS. Eso es toquetear el Kobo, y no me apetecía. Además, CWA tiene una carpeta de "ingesta": sueltas ahí un EPUB y él solo le arregla los metadatos, le busca portada y lo coloca. Yo partía de un montón de ficheros sueltos sin ordenar, así que eso me ahorró horas.

Aquí hay una excepción arquitectónica que merece explicación: **el Kobo es el único aparato que no entra por Tailscale**. No puede: es un lector de libros, no puedes instalarle una VPN. Así que este servicio sí está abierto a la red local de casa. Es una concesión consciente, no un despiste: la superficie expuesta es mi WiFi, no internet.

## Las contraseñas: lo más práctico de todo

**Vaultwarden** es una reimplementación de Bitwarden hecha en Rust. Habla el mismo protocolo, así que funcionan las aplicaciones oficiales de Bitwarden, pero consume una fracción de los recursos. Ocupa 324 KB en disco.

De todos los servicios, este es el que más me ha cambiado el día a día. Contraseñas distintas y largas en todas partes, autocompletado en el móvil y en el navegador, y la base de datos en mi casa.

Un detalle técnico bonito: el gestor de contraseñas **exige HTTPS de verdad**, aunque vaya por una red privada. El motivo es que la web usa la Web Crypto API del navegador, que solo funciona en "contexto seguro". Sin HTTPS la página carga pero el cifrado falla en silencio, que es la peor forma posible de fallar.

Lo resolví sin montar un proxy inverso, que era lo que esperaba tener que hacer: Tailscale puede emitir un certificado real de Let's Encrypt para el nombre del servidor dentro de mi red privada y hacer de proxy él mismo. Un contenedor entero que me ahorré.

## Los anuncios: el servicio que agradece toda la casa

**AdGuard Home** hace de servidor DNS para toda la red. Cuando cualquier dispositivo de casa pregunta "¿dónde está anuncios.ejemplo.com?", responde que no existe. El anuncio no se bloquea: **no llega a descargarse**.

Lo bueno de hacerlo a nivel de red es que funciona en aparatos donde no puedes instalar un bloqueador: la tele, la consola, el móvil de una visita.

Me planteé **Pi-hole**, que es el más conocido. Perdió por un motivo concreto: para cifrar las consultas DNS necesita una pieza auxiliar aparte, y el método que usaba media comunidad —`cloudflared` en modo proxy— dejó de funcionar en febrero de 2026 por un cambio de Cloudflare. AdGuard Home lleva eso integrado. También miré **Technitium**, que es técnicamente superior gestionando zonas DNS, pero eso resuelve un problema que yo no tengo todavía. Meter un servidor DNS autoritativo completo para bloquear anuncios es matar moscas a cañonazos.

## Lo que decidí no montar: el correo

Me hacía ilusión tener mi propio correo en mi propio dominio. Lo investigué y lo descarté, y creo que es la decisión más útil de todo el proyecto.

El problema no es montarlo. Existen soluciones que levantan un servidor de correo completo en una tarde. El problema es que **funcione**:

**Reputación de IP.** Un servidor de correo nuevo empieza con cero reputación. Gmail y Outlook tratan por defecto como sospechosa cualquier IP que no conocen. Sin SPF, DKIM y DMARC bien afinados durante meses, tus correos van a spam o rebotan sin avisarte. Eso no es una tarea, es un mantenimiento indefinido.

**Y el que me remató: mi operador bloquea el puerto 25 saliente** y no deja configurar el DNS inverso de la IP de casa. Sin eso, ni con la configuración perfecta se puede enviar correo fiable desde aquí. No es una limitación que yo pueda arreglar.

Así que el correo sigue en un proveedor gestionado. A veces la respuesta correcta es no autoalojar algo, y me parece más honesto contarlo que fingir que todo se puede.

## El otro uso: un sitio donde probar cosas

Más allá de los servicios, el servidor es **un sitio donde romper cosas sin consecuencias**.

Antes, cuando quería probar una base de datos, un contenedor raro o un panel web, lo instalaba en el portátil y acababa con el sistema lleno de porquería a medio desinstalar. Ahora lo levanto en el servidor, lo pruebo, y si no me convence borro el contenedor y no queda rastro.

Ahí caben los paneles personales: un tablero con el estado de mis cosas, un cron que me recopila algo cada mañana, una API pequeña para un proyecto. Cosas que en un servicio gestionado costarían una suscripción mensual cada una, y que aquí son un fichero de configuración más.

## Juntarlo con la IA local

Hace unas semanas escribí sobre [montar IA local en un PC antiguo](/es/blog/local-ai-lab-old-pc). Aquel experimento fue en otra máquina, con una gráfica dedicada, y la conclusión principal fue que **los modelos pequeños y especializados ganaron a los grandes** en casi todas las tareas reales que les puse.

Eso encaja con este servidor mejor de lo que parece. Un modelo pequeño de 4B parámetros dedicado a una sola cosa —clasificar, extraer datos estructurados, responder sobre mis notas— no necesita una gráfica de gama alta. Y aquí ya tengo la parte difícil montada: los datos.

Lo que tiene sentido montar aquí:

- **RAG sobre mis propias notas**: buscar en mis documentos y que un modelo responda citando los fragmentos. En aquel experimento aprendí que lo determinante no es el modelo, es la recuperación: sin RAG acertaba 2 de 7 preguntas, con varias consultas de recuperación subía a 5 de 7.
- **Un asistente pequeño** para tareas concretas y repetitivas, corriendo por la noche sin que nadie mire.
- **Paneles que se alimentan de mis propios datos**, sin mandar nada a una API externa.

Pero hay un límite honesto: **este servidor no tiene gráfica dedicada**. La UHD 630 integrada no sirve para inferencia. Todo iría por CPU, que funciona para modelos pequeños pero no da para nada ambicioso. Y hay un cuello de botella peor, que cuento ahora.

## Los límites reales de esta máquina

Tres cosas que se llevaron una sorpresa cuando audité el equipo:

**La RAM va en canal único.** Los 16 GB son un solo módulo, con el segundo zócalo vacío. Eso deja el ancho de banda de memoria a la mitad de lo que podría ser. Para servir fotos da igual, pero es exactamente el cuello de botella que más duele en inferencia de modelos por CPU. Arreglarlo es meter un segundo módulo idéntico.

**La red negocia a 100 Mb/s.** La tarjeta del servidor soporta Gigabit; lo que no lo soporta es el puerto del router donde está enchufado. Eso limita las transferencias a unos 12 MB/s, que se nota subiendo un lote grande de fotos. No es culpa del servidor, y se arregla con un cable mejor o un switch.

**Sin gráfica dedicada**, ya comentado.

De los tres, el único que me planteo tocar de verdad es la RAM. Y ahí viene el problema.

## Por qué ahora es mal momento para comprar

Si has leído hasta aquí pensando en montarte uno, este es el aviso importante.

**Los precios de la memoria y el almacenamiento se han disparado.**

![Comparativa de precios de RAM y SSD entre 2025 y 2026, con subidas de hasta el 485%](../../../assets/blog/memory-price-surge.svg)

Los números, recopilados en septiembre de 2026:

- El chip DDR5 pasó de **6,84 $ por GB** en septiembre de 2025 a **27,20 $ por GB** en diciembre. Casi cuatro veces más en un trimestre.
- Un kit de 2×32 GB DDR5-5600 que costaba unos **191 $** en agosto de 2025 ronda ahora los **1.118 $**. Un **+485 %**.
- La memoria NAND de los SSD ha doblado su precio en seis meses, de **4,80 $** a **10,70 $** por chip.
- Un SSD de consumo de 1 TB ha pasado de unos **45 $** a casi **90 $**.

La causa es la misma en ambos casos: la IA. Samsung, SK Hynix y Micron pueden dedicar sus obleas a memoria HBM para aceleradores de IA, con márgenes altos, o a memoria normal de PC, con márgenes bajos. Están eligiendo lo primero. En enero de 2026, más del 65 % de las obleas de DDR5 UDIMM fueron a servidores y aceleradores.

Y no parece un pico pasajero. Los analistas coinciden en que las causas son estructurales y no se espera alivio real **hasta finales de 2027**.

¿Qué significa esto en la práctica?

Si ya tienes hardware, es buen momento para **exprimirlo**. Yo tengo 405 GB libres de 466: espacio no me falta ni de lejos.

Si estabas pensando en comprar, **espera si puedes**. Y si no puedes esperar, mira el mercado de segunda mano y reacondicionado, que es justo de donde salió el mío y donde estos precios pegan menos.

Mi ampliación de RAM, esos 30-40 € que costaba un módulo hace un año, ahora mismo no sale a cuenta. Se queda en la lista para más adelante.

Con lo del NAS pasa igual. Lo tengo estudiado —comparé modelos, discos, capacidades— y la conclusión honesta fue que **no me hace falta todavía**. Con 405 GB libres, gastarme 300 € o más en almacenamiento que no necesito, en el peor momento de precios de la década, sería comprar por el gusto de comprar.

## Pros y contras, en corto

**Lo que gano:**

- Mis fotos, mi música, mis libros y mis contraseñas están en mi casa, en un disco que puedo tocar.
- Sin suscripciones. El coste es la luz, unos pocos euros al mes.
- Sin límites artificiales de espacio ni de calidad.
- Nadie retira algo de mi biblioteca porque venció una licencia.
- Un sitio donde probar cosas sin ensuciar el portátil.
- Bloqueo de anuncios en toda la casa, incluida la tele.

**Lo que pierdo:**

- **Yo soy el soporte técnico.** Si algo se cae un domingo, se arregla solo si lo arreglo yo.
- **La música necesita conexión**, salvo que sincronices offline a mano.
- **Compartir con gente de fuera es incómodo**, porque tienen que instalar Tailscale.
- **Las copias de seguridad son mi problema.** Un servidor no es una copia de seguridad: si se muere el disco, se muere todo. Esto es lo que menos resuelto tengo y lo digo sin adornos.
- **Hay que mantenerlo.** Actualizaciones, notas de versión, revisar que todo siga vivo.
- **Correo, no.** Hay cosas que no compensa autoalojar.

## Conclusión

Lo que más me sorprendió no fue la parte técnica. Fue darme cuenta de cuántas de las cosas por las que pagamos suscripción son, por debajo, bastante sencillas: un sitio donde guardar archivos y una aplicación decente para verlos. Lo que pagas casi siempre es la comodidad de que otro se ocupe.

Esa comodidad tiene valor real, no lo minimizo. Hay días que agradecería que Google se ocupara. Pero cuando el precio es que tus fotos, tu música y tus contraseñas vivan en el ordenador de otro, con sus reglas y sus cambios de condiciones, a mí me sale a cuenta ocuparme yo.

Si te lo estás planteando, mi consejo es empezar por **un solo servicio**. Monta el gestor de contraseñas, o el bloqueador de anuncios, y vive con él un mes. Cuando eso funcione y confíes en ello, añade el siguiente. Intentar montarlo todo a la vez es la forma más rápida de acabar con cinco cosas a medias y ninguna funcionando.

Y si es el hardware lo que te frena: mira el mercado reacondicionado, que ahora mismo es donde está el sentido común.

---

*Si montas el tuyo o tienes dudas sobre alguna de estas decisiones, escríbeme por [LinkedIn](https://linkedin.com/in/raul-casado) o [GitHub](https://github.com/RaulCasado).*
