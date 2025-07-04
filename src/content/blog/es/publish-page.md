---
title: 'De localhost a producción: una guía para publicar tu página web'
description: 'Aprende a llevar tu sitio web desde el entorno local hasta la web pública con esta guía paso a paso.'
pubDate: 'June 07 2025'
heroImage: '/philo.webp'
lang: 'es'
---

# THIS IS WORK IN PROGRESS PLEASE BE PATIENT :D
# De localhost a producción: una guía para publicar tu página web

Publicar una página web puede parecer algo complejo, y es cierto que hay muchos pasos que se deben seguir. Pero teniendo una guía es algo más sencillo. En este artículo, te voy a explicar un sobre cómo publicar tu web y todas las preguntas que me surgieron a mí cuando lo hice por primera vez.


## ¿Qué es publicar una página web?

Lo primer que tenemos que entender es qué significa publicar una página web. Publicar una página web es el proceso de hacer que tu sitio web sea accesible en Internet. Esto implica subir los archivos de tu sitio a un servidor web, que es un PC que almacena y sirve los archivos de tu sitio a los visitantes. 
De forma que todo el mundo pueda acceder a tu página web, necesitas un nombre de dominio (como `tusitio.com`) y un servidor web donde alojar los archivos de tu sitio.

## ¿Qué requisitos necesito para publicar una página web?

Para publicar una página web, realmente no necesitas mucho. Simplemente necesitas:

- **Tu sitio web**: Si un poco obvio, pero para subir tu sitio web, necesitas ficheros que mostrarán tu contenido. Esto puede ser HTML, CSS, JavaScript, imágenes, etc. Si estás usando un framework, necesitarás los archivos generados por este.
- **Un servidor web**: Un servicio que te permita alojar tu sitio web. Esto puede ser un servidor propio, un servicio de alojamiento compartido, o un servicio en la nube.
- **Un nombre de dominio**: Un nombre que los usuarios pueden usar para acceder a tu sitio web, como `tusitio.com`. Esto es opcional, pero recomendado para que tu sitio sea más fácil de recordar y acceder.

## ¿Qué es realmente un dominio?

Vale ahora que sabemos que sabemos que necesitamos un dominio, ¿qué es un dominio? Si todo el mundo sabe que es un dominio, pero ¿sabemos realmente que pasa? O ¿como funciona? En esta parte voy a profundizar un poco más en el tema.

Lo primero que haré será definir qué es un dominio. Un dominio es una dirección única en Internet que identifica a un sitio web. Es lo que los usuarios escriben en su navegador para acceder a tu sitio. Por ejemplo, `tusitio.com` es un dominio. En mi caso el mío es `raulcasado.com`. Este dominio está asociado a una dirección IP, que es la dirección única de un servidor en Internet. Cuando un usuario escribe tu dominio en su navegador, el navegador envía una solicitud al servidor asociado a esa dirección IP para obtener los archivos de tu sitio web. Esto es especialmente util ya que ningún usuario quiere recordar una dirección IP, y es mucho más fácil recordar un nombre de dominio como `raulcasado.com` que una dirección IP como `78.46.123.456`.

Vale ahora tendrás varias preguntas, como ¿quién da estos dominios? ¿puedo yo generar un dominio? ¿Cómo se asocia un dominio a un servidor? ¿Yo tengo lla propiedad del dominio? Bueno, vamos a responder a todas estas preguntas ya que son todas muy importantes y muy buenas preguntas.

Los dominios son gestionados por organizaciones llamadas registradores de dominios. Estas organizaciones son responsables de vender y administrar los nombres de dominio. Algunos de los registradores más conocidos son GoDaddy, Namecheap, y Google Domains. Cuando compras un dominio, estás pagando por el derecho a usar ese nombre durante un período determinado (generalmente un año). Esto resulve bastantes dudas que tenemos como por ejemplo ¿quién da los dominios? ya hemos visto que son los registradores de dominios. ¿Puedo yo crear un dominio? No ya que tienen que estar registrados por un registrador de dominios como Namecheap. ¿Es el dominio mío? Sí, pero solo durante el período que hayas pagado. Si no renuevas el dominio, perderás el derecho a usarlo, y el dominio estará disponible para que otra persona lo compre. Si estás pensando en comprar un dominio, te recomiendo que lo hagas a través de un registrador de confianza y que leas las condiciones antes de comprarlo. Si estás atento te habrás dado cuenta de que me he dejado una pregunta sin responder, ¿cómo se asocia un dominio a un servidor? Bueno, esto es algo que se hace a través de los registros DNS. Los registros DNS son como una agenda telefónica para Internet. Cuando compras un dominio, puedes configurar los registros DNS para que apunten a la dirección IP de tu servidor web. Esto permite que cuando alguien escriba tu dominio en su navegador, el navegador sepa a qué servidor enviar la solicitud.

Una pregunta que nos hemos dejado fuera es ¿qué pasa cuando yo pongo un dominio en mi buscador? bueno pues es más complejo de lo que parece. Pero antes de explicarlo, tengo que explicarte qué son las DNS.

## ¿Qué pasa cuando pongo un dominio en mi navegador?

Vamos paso a paso a ver qué pasa cuando escribes un dominio en tu navegador.

1.**Cache del navegador**: Cuando escribes un dominio en tu navegador, lo primero que hace es buscar en su caché local para ver si ya ha resuelto ese dominio recientemente. Si lo encuentra, utiliza la dirección IP almacenada en la caché. Especialmente útil para acelerar el proceso de carga de sitios web que visitas con frecuencia.
2.**Cache del sistema operativo**: Si el navegador no encuentra el dominio en su caché, consulta la caché de DNS del sistema operativo. Esta caché almacena las resoluciones de dominios recientes para acelerar el proceso. Cuanto duran los registros en la caché del sistema operativo depende de la configuración del sistema y de los registros DNS. Que es conocido como TTL (Time To Live).
3.**Consulta al servidor DNS**: Si el dominio no está en la caché del navegador ni en la del sistema operativo, el navegador envía una consulta a un servidor DNS. Este servidor es responsable de resolver el dominio y devolver la dirección IP correspondiente. El servidor DNS puede ser proporcionado por tu proveedor de servicios de Internet (ISP) o puedes usar un servidor DNS público como los de Google (8.8.8.8) o Cloudflare. Pero y ¿si no se encuentra ese dominio? Bueno puede ser que el dominio no exista, que se haya creado hace poco y no se haya propagado aún, o que haya un problema con el servidor DNS. Y si digamos que Google no encuentra el dominio? Entonces empezará a buscar en otros servidores DNS, siguiendo una jerarquía de servidores. Primero consultará los servidores raíz, luego los servidores de dominio de nivel superior (TLD) y finalmente los servidores autoritativos para el dominio específico. Este proceso puede llevar un poco de tiempo, pero generalmente es rápido.
4.**Respuesta del servidor DNS**: Una vez que el servidor DNS encuentra la dirección IP correspondiente al dominio, envía esa información de vuelta al navegador. El navegador almacena esta dirección IP en su caché para futuras consultas y procede a conectarse al servidor web asociado a esa dirección IP.
5.**Conexión al servidor web**: Con la dirección IP en mano, el navegador establece una conexión con el servidor web. Esto implica enviar una solicitud HTTP (o HTTPS) al servidor para obtener los archivos del sitio web. El servidor web recibe la solicitud y responde enviando los archivos necesarios para mostrar la página web en el navegador del usuario.
6.**Renderizado de la página**: Finalmente, el navegador recibe los archivos del servidor y los procesa para mostrar la página web al usuario. Esto incluye interpretar el HTML, aplicar estilos CSS y ejecutar cualquier código JavaScript necesario para que la página funcione correctamente.


## Hosting ¿donde vive mi web?

## Unir todas las piezas del puzzle.

## Como tener un email profesional

## Lecciones aprendidas y conclusiones