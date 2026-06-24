---
title: 'De localhost a producción: una guía para publicar tu página web'
description: 'Aprende a llevar tu sitio web desde el entorno local hasta la web pública con esta guía paso a paso.'
pubDate: '2025-07-10'
heroImage: '../../../assets/blog/deploy/pexels-spacex-586066.jpg'
heroImageAlt: 'Un cohete despegando al espacio, simbolizando el viaje de publicar un sitio web.'
tags: ['web_development']
lang: 'es'
---

Publicar una página web puede parecer algo complejo, y es cierto que hay muchos pasos que se deben seguir. Pero teniendo una guía es algo más sencillo. En este artículo, te voy a explicar cómo publicar tu web y todas las preguntas que me surgieron a mí cuando lo hice por primera vez.

## ¿Qué es publicar una página web?

Lo primero que tenemos que entender es qué significa publicar una página web. Publicar una página web es el proceso de hacer que tu sitio web sea accesible en Internet. Esto implica subir los archivos de tu sitio a un servidor web, que es un PC que almacena y sirve los archivos de tu sitio a los visitantes.
Para que todo el mundo pueda acceder a tu página web, necesitas un nombre de dominio (como `tusitio.com`) y un servidor web donde alojar los archivos de tu sitio.

## ¿Qué requisitos necesito para publicar una página web?

Para publicar una página web, realmente no necesitas mucho. Simplemente necesitas:

- **Tu sitio web**: Sí, un poco obvio, pero para subir tu sitio web, necesitas ficheros que mostrarán tu contenido. Esto puede ser HTML, CSS, JavaScript, imágenes, etc. Si estás usando un framework, necesitarás los archivos generados por este.
- **Un servidor web**: Un servicio que te permita alojar tu sitio web. Esto puede ser un servidor propio, un servicio de alojamiento compartido, o un servicio en la nube.
- **Un nombre de dominio**: Un nombre que los usuarios pueden usar para acceder a tu sitio web, como `tusitio.com`. Esto es opcional, pero recomendado para que tu sitio sea más fácil de recordar y acceder.

## ¿Qué es realmente un dominio?

Vale ahora que sabemos que necesitamos un dominio, ¿qué es un dominio? Todo el mundo sabe qué es un dominio, pero ¿sabemos realmente qué pasa? O ¿cómo funciona? En esta parte voy a profundizar un poco más en el tema.

Lo primero que haré será definir qué es un dominio. Un dominio es una dirección única en Internet que identifica a un sitio web. Es lo que los usuarios escriben en su navegador para acceder a tu sitio. Por ejemplo, `tusitio.com` es un dominio. En mi caso el mío es `raulcasado.com`. Este dominio está asociado a una dirección IP, que es la dirección única de un servidor en Internet. Cuando un usuario escribe tu dominio en su navegador, el navegador envía una solicitud al servidor asociado a esa dirección IP para obtener los archivos de tu sitio web. Esto es especialmente útil ya que ningún usuario quiere recordar una dirección IP, y es mucho más fácil recordar un nombre de dominio como `raulcasado.com` que una dirección IP como `78.46.123.456`.

Vale ahora te surgirán varias preguntas, como ¿quién da estos dominios? ¿puedo yo generar un dominio? ¿Cómo se asocia un dominio a un servidor? ¿Yo tengo la propiedad del dominio? Bueno, vamos a responder a todas estas preguntas ya que son todas preguntas muy buenas e importantes.

Los dominios son gestionados por organizaciones llamadas registradores de dominios. Estas organizaciones son responsables de vender y administrar los nombres de dominio. Algunos de los registradores más conocidos son GoDaddy, Namecheap, y Google Domains. Cuando compras un dominio, estás pagando por el derecho a usar ese nombre durante un período determinado (generalmente un año). Esto resuelve bastantes dudas que tenemos como por ejemplo ¿quién da los dominios? ya hemos visto que son los registradores de dominios. ¿Puedo yo crear un dominio? No, ya que tienen que estar registrados por un registrador de dominios como Namecheap. ¿Es el dominio mío? Sí, pero solo durante el período que hayas pagado. Si no renuevas el dominio, perderás el derecho a usarlo, y el dominio estará disponible para que otra persona lo compre. Si estás pensando en comprar un dominio, te recomiendo que lo hagas a través de un registrador de confianza y que leas las condiciones antes de comprarlo. Si estás atento, te habrás dado cuenta de que me he dejado una pregunta sin responder: ¿cómo se asocia un dominio a un servidor? Bueno, esto es algo que se hace a través de los registros DNS. Los registros DNS son como una agenda telefónica para Internet. Cuando compras un dominio, puedes configurar los registros DNS para que apunten a la dirección IP de tu servidor web. Esto permite que cuando alguien escriba tu dominio en su navegador, el navegador sepa a qué servidor enviar la solicitud.

## Partes de una URL: diseccionando un dominio

Vamos a usar esta URL de ejemplo (no funcional):

`https://blog.raulcasado.com:443/posts/como-subi-mi-web-online?utm_source=google&utm_medium=ejemplo#dns`

Una URL como esta se puede dividir así:

`[protocolo]://[subdominio].[dominio].[TLD]:[puerto]/[ruta]?parámetros#fragmento`

Protocolo: `https://`
Indica el tipo de conexión. En este caso, HTTPS (HTTP seguro). También podría ser `http://`, `ftp://`, etc.

Subdominio: `blog.`
Permite separar partes del sitio, como `blog.raulcasado.com` o `admin.raulcasado.com`.

Dominio de segundo nivel (SLD): `raulcasado`
Es el nombre elegido por ti. Junto con el TLD forma el dominio completo: `raulcasado.com`.

Dominio de nivel superior (TLD): `.com`
Es la extensión. Puede ser `.com`, `.es`, `.dev`, etc. Cada TLD tiene su propio propósito u origen.

Puerto: `:443`
Indica el puerto usado para conectarse al servidor. El 443 es el estándar para HTTPS. (80 para HTTP).

Ruta: `/posts/como-subi-mi-web-online`
Indica qué recurso quieres del servidor. Aquí accedemos a un artículo específico del blog.

Parámetros de consulta: `?utm_source=google&utm_medium=ejemplo`
Opcionales. Se usan para pasar datos al servidor o herramientas como Google Analytics. En este caso, indican que la visita viene de Google y es parte de un ejemplo.

Fragmento: `#dns`
Sirve para saltar directamente a una sección específica dentro de la página. No se envía al servidor.

Una pregunta que nos hemos dejado fuera es: ¿qué pasa cuando yo pongo un dominio en mi buscador? Bueno, pues es más complejo de lo que parece. Pero antes de explicarlo, tengo que explicarte qué son las DNS.

## ¿Qué son las DNS?

Vale, ya hemos hablado mucho de DNS pero nunca he explicado realmente qué son. Las DNS (Domain Name System) son como la agenda de contactos de Internet.

Imagínate que quieres llamar a tu amigo Goku, pero en lugar de tener su nombre guardado en el móvil, solo tuvieras su número: +34 123 456 789. Vale un número de teléfono sería fácil de recordar sobre todo para la generación de antes de los smartphones, pero ¿y si tuvieras que recordar el número de cada persona que conoces? Sería un caos, ¿verdad?

Pues exactamente eso es lo que hacen las DNS: **traducen nombres que entendemos los humanos (`raulcasado.com`) a direcciones IP que entienden las máquinas (`78.46.123.456`)**.

### ¿Cómo funcionan las DNS?

El sistema DNS está organizado como un árbol jerárquico:

1. **Servidores raíz**: Los "jefes" del sistema. Saben dónde encontrar información sobre cada TLD (.com, .es, etc.)

2. **Servidores TLD**: Saben dónde encontrar información sobre dominios específicos dentro de su extensión. Aquí me voy a parar un momento, ya que es importante entender que los TLD son las extensiones de los dominios, como `.com`, `.es`, `.org`, etc. Por ejemplo, si buscas `raulcasado.com`, el servidor TLD para `.com` te dirá dónde encontrar la información del dominio `raulcasado.com`. Que, por ejemplo, en nuestro caso sería Namecheap, quien es el registrador de dominios que compré.

3. **Servidores autoritativos**: Los que realmente saben la dirección IP de tu dominio. Estos son los servidores que tienen la información específica de tu dominio. Por ejemplo, si buscas `raulcasado.com`, el servidor autoritativo te dirá que la dirección IP es `78.46.123.456`.

### Los tipos de registros DNS más importantes:

**Registro A**: Conecta tu dominio con una dirección IP
```
raulcasado.com → 78.46.123.456
```

**Registro CNAME**: Hace que un subdominio apunte a otro dominio
```
www.raulcasado.com → raulcasado.com
```

**Registro MX**: Le dice al mundo dónde debe llegar tu email
```
mail para @raulcasado.com → mx.zoho.eu
```

**Registro TXT**: Para verificaciones y configuraciones especiales
```
Verificación de dominio, SPF, DKIM, etc.
```

**El símbolo @**: Representa tu dominio raíz (sin subdominios)
```
@ = raulcasado.com
www = www.raulcasado.com
blog = blog.raulcasado.com
```

### ¿Dónde se configuran los DNS?

Cuando compras un dominio, el registrador (Namecheap, GoDaddy, etc.) te da acceso a un panel donde puedes configurar estos registros. Es como editar la agenda de contactos de Internet para tu dominio.

La clave está en entender que **comprar el dominio** y **configurar dónde apunta** son dos cosas separadas. Puedes comprar `tudominio.com` en Namecheap pero hacer que apunte a un servidor de Netlify, Vercel, o donde quieras.

**En resumen**: Las DNS son el sistema que hace que cuando escribas `google.com`, tu navegador sepa que tiene que ir a buscar la web a la dirección IP `142.250.185.78` (una de las IPs de Google).

## ¿Qué pasa cuando pongo un dominio en mi navegador?

Vamos paso a paso a ver qué pasa cuando escribes un dominio en tu navegador.

1. **Cache del navegador**: Cuando escribes un dominio en tu navegador, lo primero que hace es buscar en su caché local para ver si ya ha resuelto ese dominio recientemente. Si lo encuentra, utiliza la dirección IP almacenada en la caché. Especialmente útil para acelerar el proceso de carga de sitios web que visitas con frecuencia.
2. **Cache del sistema operativo**: Si el navegador no encuentra el dominio en su caché, consulta la caché de DNS del sistema operativo. Esta caché almacena las resoluciones de dominios recientes para acelerar el proceso. Cuánto duran los registros en la caché del sistema operativo depende de la configuración del sistema y de los registros DNS. Esto es conocido como TTL (Time To Live). TTL es como una fecha de caducidad le dice al navegador cuánto tiempo puede guardar esa información antes de volver a preguntar.
3. **Consulta al servidor DNS**: Si el dominio no está en la caché del navegador ni en la del sistema operativo, el navegador envía una consulta a un servidor DNS. Este servidor es responsable de resolver el dominio y devolver la dirección IP correspondiente. El servidor DNS puede ser proporcionado por tu proveedor de servicios de Internet (ISP) o puedes usar un servidor DNS público como los de Google (8.8.8.8) o Cloudflare. Pero, ¿y si no se encuentra ese dominio? Bueno puede ser que el dominio no exista, que se haya creado hace poco y no se haya propagado aún, o que haya un problema con el servidor DNS. Y si, digamos que Google no encuentra el dominio? Entonces empezará a buscar en otros servidores DNS, siguiendo una jerarquía de servidores. Primero consultará los servidores raíz, luego los servidores de dominio de nivel superior (TLD) y finalmente los servidores autoritativos para el dominio específico. Este proceso puede llevar un poco de tiempo, pero generalmente es rápido.
4. **Respuesta del servidor DNS**: Una vez que el servidor DNS encuentra la dirección IP correspondiente al dominio, envía esa información de vuelta al navegador. El navegador almacena esta dirección IP en su caché para futuras consultas y procede a conectarse al servidor web asociado a esa dirección IP.
5. **Conexión al servidor web**: Con la dirección IP en mano, el navegador establece una conexión con el servidor web. Esto implica enviar una solicitud HTTP (o HTTPS) al servidor para obtener los archivos del sitio web. El servidor web recibe la solicitud y responde enviando los archivos necesarios para mostrar la página web en el navegador del usuario.
6. **Renderizado de la página**: Finalmente, el navegador recibe los archivos del servidor y los procesa para mostrar la página web al usuario. Esto incluye interpretar el HTML, aplicar estilos CSS y ejecutar cualquier código JavaScript necesario para que la página funcione correctamente.

## Hosting: ¿dónde vive mi web?

Vale, ya que eres un pro en dominios, ahora vamos a hablar de hosting. El hosting es el servicio que te permite alojar tu sitio web en un servidor para que sea accesible en Internet. Es como el lugar donde vive tu sitio web. Existen diferentes tipos de hosting, y cada uno tiene sus propias características y ventajas.

### Tipos de hosting

Aquí van algunos de los tipos de hosting que conozco: si me he dejado alguno, me lo puedes comentar y lo añadiré.

- **Hosting compartido**: En este tipo de hosting, varios sitios web comparten el mismo servidor y sus recursos. Es una opción económica y fácil de usar, ideal para sitios web pequeños o personales. Sin embargo, el rendimiento puede verse afectado si otros sitios en el mismo servidor consumen muchos recursos.

- **Hosting VPS (Servidor Privado Virtual)**: En un VPS, un servidor físico se divide en varios servidores virtuales, cada uno con sus propios recursos dedicados. Ofrece más control y rendimiento que el hosting compartido, pero a un costo más alto. Es adecuado para sitios web de tamaño medio o para aquellos que necesitan más recursos.

- **Hosting dedicado**: En este tipo de hosting, tienes un servidor completo para tu sitio web. Ofrece el máximo control y rendimiento, pero también es el más caro. Es ideal para sitios web grandes o aplicaciones que requieren muchos recursos.

- **PaaS (Platform as a Service)**: Este tipo de hosting te permite desplegar aplicaciones sin preocuparte por la infraestructura subyacente. Proveedores como Heroku o Vercel ofrecen PaaS, lo que facilita el despliegue y la escalabilidad de aplicaciones web.

- **Hosting en la nube**: Este tipo de hosting utiliza múltiples servidores en la nube para alojar tu sitio web. Ofrece alta disponibilidad y escalabilidad, lo que significa que tu sitio puede manejar picos de tráfico sin problemas. Proveedores como AWS, Google Cloud y Azure ofrecen servicios de hosting en la nube.

También tienes otras opciones como el hosting administrado, donde el proveedor se encarga de la configuración y el mantenimiento del servidor, o el hosting autogestionado, donde tú eres responsable de todo. O el hosting estático, que es ideal para sitios web estáticos y se puede alojar en servicios como GitHub Pages. O el hosting serverless también dentro de los VPS puedes crear tu propio docker y alojar tu sitio web en un contenedor, que podríamos considerar o no como un tipo de hosting.

Y con tantos tipos de hosting, ¿cómo elijo el mejor para mi sitio web? Bueno, la elección del hosting depende de varios factores, como el tamaño de tu sitio web, el tráfico que esperas recibir y tu presupuesto. Si estás empezando y tienes un sitio web pequeño, el hosting compartido puede ser una buena opción o incluso plataformas como Vercel o Netlify que son super fáciles para integrar con GitHub y tienen unos planes gratuitos bastante generosos y para proyectos personales cumplen más que de sobra. Si esperas un tráfico más alto o necesitas más control, considera un VPS o un hosting en la nube. Y si tienes un sitio web grande o una aplicación compleja, el hosting dedicado puede ser la mejor opción.

El precio también es un factor importante, ya que puedes tener opciones desde gratis hasta cientos de euros al mes. Por lo que te recomiendo que compares precios y características antes de tomar una decisión. Aquí voy a hacer un pequeño parón para hablar de los precios de los dominios y el hosting. Los precios de los dominios varían según el registrador y el TLD que elijas. Por ejemplo, un dominio `.com` puede costar entre 10 y 20 euros al año, mientras que un dominio `.es` puede costar entre 5 y 15 euros al año. Algunos registradores ofrecen descuentos para el primer año, así que es buena idea comparar precios antes de comprar.
En cuanto al hosting, los precios también varían según el tipo de hosting y el proveedor.
El hosting compartido puede costar entre 3 y 10 euros al mes, mientras que un VPS puede costar entre 20 y 100 euros al mes. El hosting dedicado puede costar entre 100 y 200 euros al mes, dependiendo de los recursos que necesites. El hosting en la nube puede ser más variable, ya que pagas por los recursos que usas, pero puedes encontrar planes desde 5 euros al mes hasta cientos de euros al mes. Por lo que te recomiendo que compares precios y características antes de tomar una decisión. También es importante leer las opiniones de otros usuarios para asegurarte de que el proveedor que elijas sea confiable y ofrezca un buen servicio al cliente.

## Unir todas las piezas del puzzle

Ahora que entiendes dominios, hosting y DNS por separado, vamos a conectarlos. Te voy a mostrar exactamente cómo llevé mi proyecto Astro desde `localhost:4321` hasta `raulcasado.com`.

### El momento de la verdad: mi proceso real

#### 1. Preparando el proyecto para deployment

**¿Necesitas hacer `npm run build` antes de subir a Netlify?**
**¡NO!** Netlify se encarga de eso automáticamente.

```bash
# Esto es solo para probar localmente que el build funciona
npm run build
# Pero NO subas la carpeta dist/ a GitHub
```

**Requisitos previos:**
- Proyecto en GitHub (solo código fuente)
- `package.json` con scripts configurados
- Todo funciona en local con `npm run dev`

**¿Por qué no subir `dist/`?**
Como has visto en el `.gitignore`, Astro excluye automáticamente:
```text
# build output
dist/
# generated types  
.astro/
```

**El flujo correcto:**
1. Tú pusheas solo el código fuente a GitHub
2. Netlify detecta el push automáticamente  
3. Netlify ejecuta `npm run build` en sus servidores
4. Netlify publica la carpeta `dist/` generada

#### 2. Desplegando en Netlify paso a paso

**Por qué elegí Netlify:**
- Plan gratuito generoso
- Integración perfecta con GitHub
- SSL automático
- Deploy automático con cada push

**El proceso:**

1. **Crear cuenta en Netlify** con GitHub
2. **"Add new site" → "Import an existing project"**
3. **Seleccionar tu repo** de GitHub
4. **Netlify detecta Astro automáticamente** y configura:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
5. **¡Deploy automático!** En 2-3 minutos tienes tu URL temporal: `zealous-curie-123abc.netlify.app`

![Configuración final en Netlify](/deploy/netlify-domain-config.png)

**¡Mi sitio ya está online!** Pero con una URL fea. Hora de conectar mi dominio.

#### 3. Conectando mi dominio con Netlify

**En Netlify:**
1. Site settings → Domain management
2. "Add custom domain" → escribo `raulcasado.com`
3. Netlify verifica que poseo el dominio (puede pedir un TXT record temporal)
4. **Netlify configura todo automáticamente**

Aquí puedes ver una captura de cómo queda la configuración final en Netlify una vez que has añadido tu dominio personalizado:

![Configuración final del dominio en Netlify](/deploy/netlify-final-conf.png)

**Nota:** No necesitas cambiar nameservers manualmente como antes. Netlify se encarga de configurar los DNS records necesarios.

#### 4. La temida espera: propagación DNS

**Lo que pasa ahora:**
- Los DNS se actualizan gradualmente por Internet
- Puede tardar de 5 minutos a 24 horas
- En mi caso, tardó unas 2 horas

**Cómo verificar la propagación:**
Puedes usar herramientas online como [whatsmydns.net](https://whatsmydns.net) para ver cómo se propaga tu dominio por el mundo. Verás algo así, con marcas de verificación verdes a medida que los servidores se actualizan:

![Verificación de la propagación DNS en whatsmydns.net](/deploy/what-my-dns.png)

O también puedes usar la terminal:
```bash
# Verificar desde terminal
dig raulcasado.com

# Verificar online
# whatsmydns.net - muestra propagación mundial
```

#### 5. El toque final: HTTPS automático

**Lo mejor de Netlify:** Se encarga automáticamente de:
- Certificado SSL/TLS (HTTPS)
- Renovación automática
- Redirect de HTTP a HTTPS

En unos minutos, `https://raulcasado.com` funcionaba perfectamente.

### Mi configuración DNS final

Después de todo el proceso, así quedó mi configuración DNS real en mi registrador de dominios (Namecheap en mi caso):

![Configuración de los DNS en Namecheap para apuntar a Netlify](/deploy/dns-final-namecheap.png)

Como puedes ver en la imagen, la configuración principal es un registro CNAME que apunta `www` a la URL de Netlify.

```
# Mi CNAME específico (desde Namecheap)
CNAME www blog-raulcasado.netlify.app
```

**¿Por qué ese CNAME específico?**
- `www.raulcasado.com` apunta a `blog-raulcasado.netlify.app`
- Netlify sabe que esa URL debe mostrar mi sitio
- Si Netlify cambia IPs, el CNAME sigue funcionando

### Herramientas que me salvaron la vida

**Para verificar DNS:**
```bash
# Verificar registros A
dig raulcasado.com

# Verificar CNAME
dig www.raulcasado.com

# Verificar propagación mundial
# whatsmydns.net (web)
```

**Para verificar que todo funciona:**
- [SSL Labs](https://ssllabs.com/ssltest/) - Test SSL
- [GTmetrix](https://gtmetrix.com/) - Performance
- Lighthouse en DevTools - Core Web Vitals

### ¿Y si usas Vercel en lugar de Netlify?

El proceso es prácticamente idéntico:
1. Deploy en Vercel (automático desde GitHub)
2. Añadir dominio custom en Vercel
3. Vercel configura DNS automáticamente
4. Esperar propagación
5. ¡Listo!

## Cómo tener un email profesional

Una de las cosas que más me llamó la atención cuando empecé a publicar mi web fue la posibilidad de tener un email profesional con mi propio dominio. Esto no solo le da un toque más profesional a tu presencia en línea, sino que también te permite gestionar tus correos electrónicos de manera más efectiva.

Pero Raúl, yo puedo seguir usando mi correo de Gmail o Outlook, ¿no? Sí, claro que puedes, pero tener un correo electrónico con tu propio dominio (como `tu_nombre@tu_dominio.com`) te da varias ventajas:

- **Credibilidad**: Un correo electrónico con tu propio dominio suena más profesional y confiable que uno genérico de Gmail o Yahoo. Esto es especialmente importante si estás tratando de establecer una marca personal o profesional.
- **Control**: Tienes más control sobre tu correo electrónico y puedes crear direcciones personalizadas para diferentes propósitos (por ejemplo, `contacto@tu_dominio.com`, `soporte@tu_dominio.com`, etc.). Esto te ayuda a organizar mejor tus correos y a mantener una imagen coherente.
- **Marca**: Usar tu propio dominio en tu correo electrónico refuerza tu marca personal o profesional. Cada vez que envías un correo, estás promocionando tu dominio y, por ende, tu sitio web.
- **Funcionalidades adicionales**: Muchos proveedores de correo electrónico ofrecen características adicionales como almacenamiento en la nube, calendarios compartidos y herramientas de colaboración que pueden ser útiles para ti o tu equipo.

Yo personalmente para la tarea de conseguir mi propio correo electrónico profesional, utilicé Zoho Mail, que es un servicio de correo electrónico que te permite crear direcciones de correo personalizadas con tu propio dominio. Zoho Mail ofrece un plan gratuito que incluye 5 GB de almacenamiento por usuario y la posibilidad de crear hasta 5 usuarios. La verdad que nunca he tenido problemas con Zoho Mail y me parece una buena opción para tener un correo electrónico profesional sin gastar mucho dinero. Si quieres saber más sobre cómo configurar tu correo electrónico con Zoho Mail, puedes consultar su [documentación oficial](https://www.zoho.com/mail/help/). Además de tener un plan gratuito generoso, sé que si quisiera tener más funcionalidades, Zoho Mail ofrece planes de pago que van desde 1 euro al mes por usuario, lo que lo hace muy asequible para pequeñas empresas o freelancers. También puedes considerar otros proveedores como Google Workspace o Microsoft 365, que ofrecen servicios de correo electrónico con tu propio dominio, pero suelen ser más caros. Pero para empezar, Zoho Mail es una excelente opción. 

Vale ahora te voy a explicar desde 0 como crear una cuenta de Zoho Mail y configurar tu correo electrónico con tu propio dominio.

#### 1. Registro en Zoho Mail

- Voy a [zoho.com/mail](https://zoho.com/mail) 
- Selecciono el plan gratuito (Zoho Mail Lite)
- Introduzco mi dominio: `raulcasado.com`
- Zoho me pregunta si ya poseo el dominio (sí, ya lo había comprado)

Obviamente Zoho te pedirá verificar que eres el propietario del dominio. Para ello, te proporcionará un registro TXT que deberás añadir a la configuración de DNS de tu dominio. Esto es para asegurarse de que realmente tienes acceso al dominio y puedes recibir correos electrónicos en él.

#### 2. Configurar los registros MX

Esta es la parte más importante. Los registros MX le dicen al mundo "los emails para este dominio van a estos servidores". En mi proveedor de dominios (yo uso Namecheap), añadí los registros que me proporcionó Zoho. La configuración final se ve así:

![Configuración de los registros MX en Namecheap para Zoho Mail](/deploy/mx-record-final.png)

Estos son los valores que usé yo, pero recuerda que podrían variar según el proveedor de correo que elijas, así que asegúrate de seguir las instrucciones específicas de Zoho Mail o del proveedor que estés utilizando.

```
Tipo: MX  | Nombre: @  | Valor: mx.zoho.eu     | Prioridad: 10
Tipo: MX  | Nombre: @  | Valor: mx2.zoho.eu    | Prioridad: 20
Tipo: MX  | Nombre: @  | Valor: mx3.zoho.eu    | Prioridad: 50
```

Estos valores podrían variar según el proveedor de correo que elijas, así que asegúrate de seguir las instrucciones específicas de Zoho Mail o del proveedor que estés utilizando.

Continuamos nuestro camino para configurar el correo electrónico. Nuestra siguiente parada es la configuración de SPF, DKIM y DMARC. Estos son protocolos de autenticación de correo electrónico que ayudan a prevenir el spam y el phishing, asegurando que los correos enviados desde tu dominio sean legítimos.

Si no configuras estos registros, es posible que tus correos terminen en la carpeta de spam de los destinatarios o incluso sean rechazados por algunos servidores de correo. Así que es importante configurarlos correctamente.

Tranquilo, puede parecer que vas a tener que hacer un máster en DNS, pero no es tan complicado como parece. Al final es copiar y pegar y eso a los programadores se nos da bien, ¿no?

#### 3. Configurar SPF

El registro SPF (Sender Policy Framework) especifica qué servidores están autorizados a enviar correos electrónicos en nombre de tu dominio. Para Zoho Mail, el registro SPF que debes añadir es:

```
Tipo: TXT  | Nombre: @  | Valor: v=spf1 include:zoho.eu ~all
```

Esto significa que cualquier correo enviado desde tu dominio debe pasar por los servidores de Zoho Mail para ser considerado legítimo. El `~all` al final indica que cualquier otro servidor no está autorizado, pero los correos enviados desde otros servidores no serán rechazados, solo marcados como sospechosos.

#### 4. Configurar DKIM

El registro DKIM (DomainKeys Identified Mail) añade una firma digital a tus correos electrónicos, lo que permite a los servidores de correo verificar que el correo no ha sido alterado durante el envío. Para configurar DKIM en Zoho Mail, sigue estos pasos:

Si has estado siguiendo los pasos que te da Zoho Mail, es bastante fácil. Una vez que hayas añadido el registro SPF, tendrás otra pestaña para configurar DKIM. Te proporcionará un registro TXT que debes añadir a la configuración de DNS de tu dominio. El registro DKIM tendrá un aspecto similar a este:

```
Tipo: TXT  | Nombre: zoho._domainkey  | Valor: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...
``` 

Asegúrate de copiar todo el valor proporcionado por Zoho Mail, ya que es una clave pública que se utiliza para verificar la firma de tus correos electrónicos.

#### 5. Configurar DMARC

El registro DMARC (Domain-based Message Authentication, Reporting & Conformance) ayuda a los servidores de correo a manejar los correos que no pasan las verificaciones SPF y DKIM. Para configurar DMARC en Zoho Mail, añade el siguiente registro TXT:

```
Tipo: TXT  | Nombre: _dmarc  | Valor: v=DMARC1; p=none; rua=mailto:tu_email@tu_dominio.com; ruf=mailto:tu_email@tu_dominio.com; sp=none; aspf=r;
```

Este registro indica que no se tomarán acciones específicas si un correo no pasa las verificaciones SPF o DKIM (`p=none`), pero se enviarán informes a la dirección de correo especificada en `rua` y `ruf`. Puedes cambiar `p=none` a `p=quarantine` o `p=reject` una vez que estés seguro de que todo está funcionando correctamente.

Cabe recalcar que los registros DMARC son opcionales, pero altamente recomendados para mejorar la seguridad de tu correo electrónico y reducir el riesgo de suplantación de identidad (phishing).

#### 6. Verificar la configuración

Una vez que hayas añadido todo tendrás que esperar un tiempo a que los cambios se propaguen. No te preocupes una vez que hayas configurado todo, ve pulsando verificar en Zoho Mail y te dirá si todo está correcto. Si ves algún error, revisa los registros que has añadido y asegúrate de que están configurados correctamente. Puedes usar herramientas como [MXToolbox](https://mxtoolbox.com/) para verificar la configuración de tus registros DNS. Si te salen errores, revisa que todo esté funcionando correctamente. Trata de enviar un correo electrónico a ti mismo o a un amigo para asegurarte de que todo está funcionando correctamente. Si recibes el correo sin problemas, tu correo electrónico profesional está configurado y listo para usar. Ya que esta herramienta es bastante perfeccionista y te avisa de todos los errores o posibles errores por ejemplo, con la configuración DMARC que he puesto te va a dar un warning ya que no has puesto una política de rechazo o cuarentena. Pero si quieres puedes ignorarlo y seguir adelante, ya que al principio es mejor tenerlo en modo `none` para asegurarte de que todo funciona correctamente antes de aplicar políticas más estrictas.

## Más allá de publicar: ¿qué más puedo hacer?

Si pensabas que después de todo lo que habías pasado ya podías descansar, ¡te equivocas! Publicar una página web es solo el primer paso. Una vez que tu sitio está en línea, hay muchas cosas más que puedes hacer para mejorar su rendimiento, seguridad y visibilidad. Aquí van algunas ideas:

- **Optimización SEO**: Asegúrate de que tu sitio web esté optimizado para los motores de búsqueda. Esto incluye usar palabras clave relevantes, crear contenido de calidad y asegurarte de que tu sitio sea fácil de navegar. Puedes usar herramientas como Google Search Console o SEMrush para analizar el rendimiento de tu sitio y encontrar áreas de mejora.

- **Seguridad**: Implementa medidas de seguridad para proteger tu sitio web de ataques. Esto incluye usar HTTPS, mantener tu software actualizado y hacer copias de seguridad regulares. También puedes considerar usar un firewall o un servicio de protección contra DDoS. Si al final usas Netlify, te recomiendo que uses su certificado SSL gratuito para asegurar tu sitio web. Si usas otro proveedor de hosting, asegúrate de que ofrezca opciones de seguridad y certificados SSL o lo configures tú mismo. Si usas un VPS, puedes configurar tu propio certificado SSL usando Let's Encrypt o comprar uno de una autoridad certificadora.

- **Analítica web**: Configura herramientas de analítica web como Google Analytics para rastrear el tráfico de tu sitio y entender cómo los usuarios interactúan con él. Esto te ayudará a tomar decisiones informadas sobre cómo mejorar tu sitio y atraer más visitantes.Personalmente no recomiendo mucho Google Analytics ya que recopila muchos datos y es un poco invasivo, pero si quieres usarlo, adelante. Una alternativa si quieres ver el rendimiento de tu web sería Lighthouse o PageSpeed Insights, que son herramientas de Google que te permite analizar el rendimiento de tu sitio web y obtener recomendaciones para mejorarlo. También puedes usar herramientas como Matomo o Plausible, que son alternativas más respetuosas con la privacidad

- **Hacer que aparezca en Google**: Si quieres que tu sitio web aparezca en los resultados de búsqueda de Google, asegúrate de que esté indexado. Puedes hacer esto enviando un sitemap a Google Search Console y asegurándote de que tu sitio cumpla con las directrices de Google para webmasters. También puedes considerar crear un perfil en Google My Business si tienes un negocio local, lo que te ayudará a aparecer en los resultados de búsqueda locales. Simplemente sigue los pasos que te indican en la misma página de Google, si tienes dudas, puedes buscar tutoriales en YouTube o me puedes preguntar a mí, que estaré encantado de ayudarte.

Y por último, no te olvides de hacer pruebas en distintos navegadores y dispositivos para asegurarte de que tu sitio web se vea y funcione correctamente en todas partes. Esto incluye probar en navegadores como Chrome, Firefox, Safari y Edge, así como en dispositivos móviles y tabletas. Puedes usar herramientas como BrowserStack o LambdaTest para hacer pruebas en diferentes navegadores y dispositivos sin necesidad de tenerlos físicamente.

## Lecciones aprendidas, conclusiones y problemas que tuve.

Primero me gustaría hablar de los problemas que tuve al publicar mi primera web. Uno de los problemas más comunes es la propagación del DNS. Cuando compras un dominio y lo configuras para apuntar a tu servidor, puede tardar un tiempo en propagarse por toda la red. Esto significa que puede que no puedas acceder a tu sitio web inmediatamente después de configurarlo. La propagación del DNS puede tardar desde unos minutos hasta 48 horas, dependiendo de varios factores como el TTL (Time To Live) de los registros DNS y la caché de los servidores DNS. Y sí muchas veces con la emoción de publicar tu web, te olvidas de esperar y piensas que algo ha ido mal. Pero no te preocupes, es normal y suele solucionarse solo con el tiempo.

Otro problema que tuve fue la configuración de las rutas por cómo estaba configurado mi Astro con la internacionalización. No redirigía bien las rutas si ponía el dominio sin la ruta del idioma. Por ejemplo, si ponía `raulcasado.com` en vez de `raulcasado.com/es`, me daba un error 404. Esto es algo que tuve que solucionar configurando las rutas correctamente en mi proyecto Astro. Si estás usando Astro, te recomiendo que leas la documentación sobre internacionalización para evitar este tipo de problemas.

Y ya no tuve ningún otro problema, por lo menos que yo recuerde. Pero si te surgen dudas o problemas, no dudes en preguntar. Siempre es mejor buscar ayuda que intentar solucionar un problema por tu cuenta y acabar rompiendo algo.

Seguimos con las lecciones aprendidas. Como he dicho la paciencia es clave. Aprendí a esperar a que los cambios se propagaran y a no desesperarme si algo no funcionaba de inmediato. También aprendí a leer la documentación y a buscar soluciones en línea. La comunidad de desarrolladores es muy activa y siempre hay alguien que ha tenido el mismo problema que tú. Aprendí a leer documentación de Netlify y de mi proveedor de dominio para entender cómo funcionaban las DNS y cómo configurar correctamente mi dominio. También aprendí a usar herramientas como `dig` y `nslookup` para verificar la configuración de mis registros DNS y solucionar problemas de conectividad.

Y por último, aprendí a no tener miedo de cometer errores. Publicar una página web es un proceso de aprendizaje y siempre habrá algo nuevo que aprender. No te preocupes si algo no funciona como esperabas, lo importante es aprender de los errores y seguir adelante.

La conclusión que saco de todo esto es que publicar una página web puede parecer complicado al principio, pero con paciencia y práctica, se convierte en un proceso más sencillo. Lo más importante es entender los conceptos básicos de dominios, hosting y DNS, y cómo se relacionan entre sí. Una vez que tengas claro esto, podrás publicar tu sitio web sin problemas.

Espero que este artículo te haya ayudado a entender mejor cómo publicar una página web y los conceptos relacionados. Si tienes alguna pregunta o necesitas ayuda, no dudes en dejar un comentario. Estoy aquí para ayudarte. Y si te ha gustado el artículo, ¡compártelo con tus amigos! 😊
