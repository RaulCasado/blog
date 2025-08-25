---
title: "Ciberseguridad Web: Conceptos Básicos"
description: "Una introducción a los conceptos fundamentales de la ciberseguridad web, incluyendo amenazas comunes, mejores prácticas y herramientas esenciales."
pubDate: "2025-08-12"
heroImage: "/cibersecurity-basic/logo.jpg"
tags: ["web_development"]
---

## 1. Introducción

La ciberseguridad es un tema crucial en desarrollo de aplicaciones modernas. Ya que de ella depende la seguridad de los datos y la confianza de los usuarios. En este artículo, exploraremos los conceptos básicos de la ciberseguridad web, desde las amenazas más comunes hasta las mejores prácticas para proteger tus aplicaciones.
En este artículo, me voy a centrar principalmente en la seguridad de aplicaciones web, aunque muchos de los conceptos son aplicables a otros tipos de software.

Si estáis metidos en el mundo del desarrollo, seguro que os suena el caso de Tea App, una aplicación donde mujeres compartían sus experiencias en citas sobre x hombres. Bueno un usuario de 4chan encontró no una vulnerabilidad, sino que la base de datos de Firebase estaba totalmente expuesta. ¿El resultado? Más de 70.000 mujeres expuestas, con sus nombres, fotos y experiencias personales. Un desastre total que podría haberse evitado con unas buenas prácticas de seguridad. Y todo esto se podría haber evitado con seguridad en la base de datos ya que como digo estaba totalmente expuesta.
Y casos como este son más comunes de lo que pensamos. Por eso, es fundamental entender los conceptos básicos de la ciberseguridad web.

## 2. Vulnerabilidades más comunes

Primero vamos a ver las vulnerabilidades más comunes que afectan a las aplicaciones web. Estas son algunas de las más críticas:

### 2.1 SQL Injection

Creo que todos sabemos a qué me refiero con SQL Injection, pero por si acaso:
SQL Injection es una técnica de ataque que permite a un atacante ejecutar código SQL malicioso en una base de datos a través de una entrada no validada. Por ejemplo, si tienes un formulario de inicio de sesión que no valida correctamente los datos, un atacante podría inyectar código SQL para acceder a información sensible.

Un ejemplo vulnerable sería:

```sql
SELECT * FROM users WHERE username = '$username' AND password = '$password';
```
En este ejemplo, si `$username` o `$password` contienen código SQL malicioso, el atacante podría manipular la consulta para obtener acceso no autorizado a la base de datos. como por ejemplo 1=1 que siempre se cumplirá.
La solución a esto es utilizar **prepared statements** o un ORM (Object-Relational Mapping) que maneje la sanitización de los datos automáticamente. Esto evita que el código SQL se construya de forma insegura.

Una sentencia segura sería:

```sql
SELECT * FROM users WHERE username = ? AND password = ?;
```
Esto asegura que los datos se traten como parámetros y no como parte del código SQL, evitando así la inyección.

### 2.2 XSS (Cross-Site Scripting)

XSS es una vulnerabilidad que permite a un atacante inyectar scripts maliciosos en páginas web vistas por otros usuarios. Esto puede llevar al robo de cookies, sesiones o incluso a la redirección a sitios maliciosos. Esto es muy peligroso ya que al robarte las cookies, el atacante puede hacerse pasar por ti en la aplicación web, esto hace que no tenga que pasar por el proceso de autenticación y puede acceder a tu cuenta sin problemas.

Hay varios tipos como el Stored XSS, donde el script malicioso se almacena en el servidor y se ejecuta cada vez que un usuario visita la página, o el Reflected XSS, donde el script se refleja en la URL y se ejecuta inmediatamente. O también el DOM-based XSS, donde el script se ejecuta en el navegador del usuario sin pasar por el servidor.

Por ejemplo, si un usuario publicase un comentario que contiene un script malicioso:

```html
<script>alert('Guardando datos');</script>
```

Este script se ejecutaría en el navegador de cualquier usuario que viese ese comentario, lo que podría comprometer su seguridad.

### 2.3 Diferencia innerHTML vs textContent

Si has trabajado con JavaScript, seguro que has oído hablar de `innerHTML` y `textContent`. La diferencia es crucial para la seguridad:

Como hemos dicho introducir código HTML sin sanitizarlo puede llevar a XSS. Por ejemplo, si usas `innerHTML` para insertar contenido en una página:

```javascript
document.getElementById('output').innerHTML = userComment;
```

Si userComment contiene código HTML malicioso, este se ejecutará en el navegador del usuario, lo que puede comprometer su seguridad.

Por otro lado, `textContent` trata el contenido como texto plano, lo que significa que cualquier código HTML se mostrará como texto y no se ejecutará:

```javascript
document.getElementById('output').textContent = userComment;
```

Esto es mucho más seguro, ya que evita la ejecución de scripts maliciosos.
La principal diferencia es que innerHTML interpreta el contenido como html es decir si por ejemplo nosotros ponemos

```html
<div id="output"></div>
```
y luego hacemos
```javascript
document.getElementById('output').innerHTML = '<script>alert("XSS")</script>';
```
Esto ejecutará el script y mostrará una alerta. En cambio, si usamos `textContent`:
```javascript
document.getElementById('output').textContent = '<script>alert("XSS")</script>';
```
Esto mostrará el texto `<script>alert("XSS")</script>` tal cual, sin ejecutarlo. Por lo tanto, siempre que sea posible, usa `textContent` en lugar de `innerHTML` para evitar vulnerabilidades de XSS.

## 3. Buenas prácticas de saneamiento

Como hemos dicho en los puntos anteriores, es crucial validar y sanear los datos de entrada antes de procesarlos. Aquí hay algunas buenas prácticas:

Por ejemplo, si tienes un formulario de registro, asegúrate de validar el formato del correo electrónico y sanitizar cualquier entrada de texto para evitar inyecciones de código.

También es importante evitar concatenar HTML o SQL directamente. En su lugar, utiliza funciones de sanitización que eliminen o escapen caracteres peligrosos, como `<`, `>`, `&`, etc. Esto ayuda a prevenir ataques de inyección y XSS.

## 4. Capas extra de protección (Defensa en profundidad)

### 4.1 Content Security Policy (CSP)

CSP es una herramienta poderosa para prevenir XSS y otras inyecciones de código. Esta herramienta permite definir qué fuentes de contenido son seguras y cuáles no. Por ejemplo, puedes especificar que solo se permiten scripts de tu propio dominio y bloquear cualquier script externo. Esto como entenderás es una capa extra de seguridad que ayuda a mitigar los riesgos de XSS y otras vulnerabilidades relacionadas con la inyección de código.

También es otra capa que ayuda por si las medidas anteriores fallan. CSP actúa como una segunda línea de defensa, bloqueando cualquier contenido no autorizado antes de que se ejecute en el navegador del usuario.

Bueno y ¿cómo lo puedo implementar?

Es importante configurar CSP correctamente en tu servidor web. Por ejemplo, en Apache o Nginx, puedes añadir una cabecera HTTP que defina tu política de seguridad:

```apache
Header set Content-Security-Policy "default-src 'self'; script-src 'self' https://apis.google.com; object-src 'none';"
```

Esto indica que solo se permiten scripts del mismo origen y de `https://apis.google.com`, mientras que se bloquean todos los objetos externos. También puedes usar herramientas como [CSP Evaluator](https://csp-evaluator.withgoogle.com/) para verificar la efectividad de tu política.

### 4.2 Cookies seguras: HttpOnly y Secure

Las cookies son una parte fundamental de la seguridad web, especialmente para la autenticación y el manejo de sesiones. Aquí hay dos atributos importantes que debes conocer:

- **HttpOnly**: Este atributo evita que las cookies sean accesibles a través de JavaScript, lo que ayuda a prevenir ataques XSS. Si una cookie tiene el atributo `HttpOnly`, no podrá ser leída por scripts del lado del cliente, lo que reduce el riesgo de robo de sesión.

Esto significa que no podrás acceder a la cookie desde JavaScript, lo que es una gran ventaja de seguridad. Pero sí desde el servidor. Otro concepto importante es el atributo `Secure`, que asegura que la cookie solo se envíe a través de conexiones HTTPS, protegiéndola de ataques de tipo "man-in-the-middle".

Ejemplo en PHP:

```php
setcookie("session", "value", [
    "httponly" => true,
    "secure" => true,
    "samesite" => "Strict" // Esto puede tener otros valores como Lax o None
    "expires" => time() + 3600, // En 1 hora
]);
```

Hay que tener cuidado ya que no todas las cookies deben ser `HttpOnly`, por ejemplo, si necesitas acceder a una cookie desde JavaScript para alguna funcionalidad específica, no deberías marcarla como `HttpOnly`. Pero para las cookies de sesión o autenticación, es una buena práctica.

### 4.3 Uso de frameworks y templating engines

Los frameworks modernos ayudan a prevenir XSS y CSRF (Cross-Site Request Forgery) al proporcionar mecanismos de seguridad integrados. Por ejemplo, muchos frameworks utilizan templating engines que escapan automáticamente los datos antes de renderizarlos en el HTML, lo que reduce el riesgo de inyección de scripts maliciosos.

Para evitar XSS, por ejemplo en React :

```javascript
const userComment = "<script>alert('XSS');</script>";
return <div>{userComment}</div>; // Esto es seguro, React escapa el contenido
```

Esto asegura que cualquier contenido potencialmente peligroso se escape y no se ejecute como código, lo que es una gran ventaja de seguridad.

Una breve de explicación de CSRF:
CSRF es un tipo de ataque donde un atacante engaña a un usuario autenticado para que realice una acción no deseada en una aplicación web. Por ejemplo, si un usuario está autenticado en un sitio web y visita un enlace malicioso, el atacante podría hacer que el usuario realice una acción como transferir dinero o cambiar su contraseña sin su consentimiento.
Para prevenir CSRF, muchos frameworks proporcionan tokens CSRF que se incluyen en los formularios y se verifican en el servidor. Estos tokens son únicos para cada sesión y se envían con cada solicitud, lo que asegura que la solicitud provenga de una fuente legítima y no de un atacante que intenta engañar al usuario para que realice acciones no deseadas.

Por ejemplo imaginate que estás en tu banco (banco.com) y tienes la sesión abierta. Si visitas un sitio malicioso (malicious.com) que intenta hacer una transferencia de dinero a la cuenta del atacante, el navegador enviará automáticamente las cookies de sesión de tu banco junto con la solicitud, lo que podría permitir al atacante realizar la transferencia sin tu consentimiento.

Pero para CSRF, hay otras alternativas como usar tokens CSRF que se envían con cada solicitud y se verifican en el servidor. Esto asegura que las solicitudes provengan de fuentes legítimas y no de un atacante que intenta engañar al usuario para que realice acciones no deseadas. En Laravel por ejemplo puedes usar @csrf para generar un token CSRF en tus formularios:

```blade
<form method="POST" action="/transfer">
    @csrf
    <input type="hidden" name="amount" value="100">
    <button type="submit">Transferir</button>
</form>
```

## 5. Seguridad en la comunicación y autenticación

### 5.1 Gestión de contraseñas: Hashing vs Encriptación

Esto es un concepto que suele traer confusión, incluso lo he tenido que mirar varias veces para explicarlo bien. La diferencia entre hashing y encriptación es crucial para la seguridad de las contraseñas:

En el hashing, los datos se transforman en un valor de longitud fija que no se puede revertir. Esto significa que no puedes obtener la contraseña original a partir del hash. Por ejemplo, si usas bcrypt o Argon2 para hashear contraseñas, el resultado es un hash único que representa la contraseña, pero no puedes volver atrás y obtener la contraseña original.

```php
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
// no hay un password_dehash o algo así, solamente es unidireccional
```

En cambio, la encriptación es un proceso reversible. Puedes cifrar datos y luego descifrarlos para obtener la información original. Esto es útil cuando necesitas recuperar datos sensibles, como contraseñas olvidadas, pero también presenta riesgos si las llaves de cifrado son comprometidas.

Por ejemplo, si usas AES para encriptar una contraseña, puedes desencriptarla más tarde si es necesario:

```php
$encryptedPassword = openssl_encrypt($password, 'aes-256-cbc', $key, 0, $iv);
// Para desencriptar
$decryptedPassword = openssl_decrypt($encryptedPassword, 'aes-256-cbc', $key, 0, $iv);
```

Vale y ¿para qué sirve cada una?
El hashing es ideal para almacenar contraseñas, ya que no necesitas recuperar la contraseña original, solo verificar si el hash coincide con el hash de la contraseña ingresada por el usuario. En cambio, la encriptación es útil para datos que necesitas recuperar más tarde, como información sensible que debe ser protegida pero accesible.

Otro concepto del que podriamos hablar en el caso de los hashes es el concepto de "salting". El salting es una técnica que añade un valor aleatorio (el "salt") a la contraseña antes de hashearla. Esto ayuda a prevenir ataques de diccionario y rainbow tables, ya que incluso si dos usuarios tienen la misma contraseña, sus hashes serán diferentes debido al salt único.

```php
$salt = bin2hex(random_bytes(16)); // Genera un salt aleatorio
$hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
```

Esto asegura que incluso si dos usuarios tienen la misma contraseña, sus hashes serán diferentes, lo que dificulta los ataques de fuerza bruta y mejora la seguridad general del sistema.

### 5.2 Llaves públicas y privadas (Criptografía asimétrica)

Las llaves son un concepto fundamental en la criptografía asimétrica, que se utiliza para asegurar la comunicación y la autenticación. En este modelo, cada usuario tiene un par de llaves: una pública y una privada.

Puedes generarlas de forma muy fácil. Por ejemplo, para generar un par de llaves RSA:

```bash
ssh-keygen -t rsa -b 2048 -f mykey
```

La llave pública se puede compartir abiertamente, mientras que la llave privada debe mantenerse en secreto. La criptografía asimétrica permite cifrar datos con la llave pública y descifrarlos con la llave privada, lo que garantiza que solo el propietario de la llave privada pueda acceder a los datos.

Una comparación sencilla sería como si tuvieras una caja fuerte con dos llaves: una que cualquiera puede usar para cerrar la caja (llave pública) y otra que solo tú tienes para abrirla (llave privada). Esto asegura que solo tú puedas acceder a lo que hay dentro de la caja.

Una cosa que no hemos explicado es la diferencia entre la criptografía simétrica y asimétrica. En la criptografía simétrica, se utiliza la misma llave para cifrar y descifrar datos, lo que significa que ambas partes deben compartir la misma llave secreta. Esto puede ser un problema si la llave se ve comprometida. Y es por eso que la criptografía asimétrica es más segura, ya que cada usuario tiene su propia llave privada que nunca se comparte.

Estas llaves también se utilizan en protocolos de seguridad como SSL/TLS para asegurar la comunicación entre servidores y clientes. Por ejemplo, cuando visitas un sitio web seguro (HTTPS), el servidor envía su llave pública al navegador, que la utiliza para cifrar los datos enviados al servidor. Solo el servidor puede descifrar esos datos con su llave privada, lo que garantiza una comunicación segura.

También se utilizan en la firma digital, donde un mensaje se firma con la llave privada del remitente y se verifica con su llave pública. Esto asegura la autenticidad del mensaje y que no ha sido alterado durante la transmisión.

Y por último, también se puede utilizar para entrar a tus servidores de forma segura. Por ejemplo, si tienes un servidor SSH, puedes configurar la autenticación basada en llaves para acceder sin necesidad de contraseñas. Esto es más seguro y conveniente, ya que no tienes que recordar contraseñas complejas.

## 6. Configuración segura del servidor

### 6.1 CORS (Cross-Origin Resource Sharing)

CORS es un mecanismo de seguridad que permite a los servidores controlar qué dominios pueden acceder a sus recursos. Por defecto, los navegadores bloquean las solicitudes de origen cruzado (cross-origin requests) para proteger la seguridad del usuario. Sin embargo, a veces es necesario permitir que ciertos dominios accedan a tus recursos.

Un ejemplo de mala configuración sería permitir todos los orígenes:

```http
Access-Control-Allow-Origin: *
```

Esto permite que cualquier sitio web pueda acceder a tus recursos, lo que puede ser un riesgo de seguridad si no se controla adecuadamente. Esto está bien si tu API es pública, o si estás desarrollando una aplicación que necesita acceder a recursos de diferentes dominios. Pero si tu API es privada o sensible, deberías restringir los orígenes permitidos.

```http
Access-Control-Allow-Origin: https://example.com
```

Aquí solo permitimos que `https://example.com` acceda a nuestros recursos, lo que es mucho más seguro. Esto significa que solo las solicitudes provenientes de `https://example.com` serán aceptadas, mientras que cualquier otra solicitud será bloqueada por el navegador.

Por ejemplo si hacemos un fetch desde un dominio diferente:

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Si la configuración de CORS no permite el origen del dominio desde el que se hace la solicitud, el navegador bloqueará la solicitud y mostrará un error en la consola. Esto es una medida de seguridad para evitar que sitios maliciosos accedan a tus recursos sin autorización.

### 6.2 Permisos y privilegios mínimos

Ahora toca hablar de los permisos y privilegios mínimos. Esto no tiene tanto que ver con la ciberseguridad web, pero al final tu web tiene que estar alojada en algún sitio y es importante que el servidor esté configurado correctamente.
Los permisos y privilegios mínimos son un principio de seguridad que establece que cada usuario o proceso debe tener solo los permisos necesarios para realizar su tarea. Esto ayuda a minimizar el riesgo de que un atacante obtenga acceso no autorizado a recursos sensibles o realice acciones maliciosas en el sistema.

Primero veremos las herramientas más comunes para gestionar permisos en sistemas Unix/Linux:

Con ls puedes ver los permisos de un archivo:

```bash
ls -l archivo.txt
```

Esto mostrará algo como:

```
-rw-r--r-- 1 user group 0 Aug 10 12:00 archivo.txt
```

Aquí, los permisos se dividen en tres grupos: propietario, grupo y otros. Cada grupo tiene permisos de lectura (r), escritura (w) y ejecución (x). En este ejemplo, el propietario tiene permisos de lectura y escritura, el grupo tiene permisos de lectura y otros usuarios tienen permisos de lectura.

Para cambiar los permisos de un archivo, puedes usar el comando chmod:

```bash
chmod 644 archivo.txt
```

Para cambiar los permisos podemos usar la notación octal o simbólica. En este caso, 644 significa que el propietario tiene permisos de lectura y escritura, mientras que el grupo y otros usuarios tienen permisos de lectura.

Cada número en la notación octal representa un conjunto de permisos:
- 4: Lectura (r)
- 2: Escritura (w)
- 1: Ejecución (x)
- 0: Sin permisos

Para cambiar el propietario de un archivo, puedes usar el comando chown:

```bash
chown user:group archivo.txt
```

Esto cambiará el propietario del archivo a `user` y el grupo a `group`. Es importante asegurarse de que los archivos y directorios tengan los propietarios y grupos correctos para evitar accesos no autorizados.

Como digo esto es especialmente importante en servidores web, donde los archivos y directorios deben tener los permisos adecuados para evitar que usuarios no autorizados accedan a información sensible o realicen acciones maliciosas.

Algunos archivos con los que tienes que tener especial cuidado son:
- Archivos de configuración del servidor (como `nginx.conf` o `.htaccess`)
- Archivos de base de datos (como `config.php` o `database.yml`)
- Archivos de registro (logs) que pueden contener información sensible
- Archivos con contraseñas o claves API como `.env` o `config.json`
- Scripts de administración o mantenimiento que no deberían ser accesibles al público

## 7. Cosas a tener en cuenta

Otras cosas a tener en cuenta son:

- **Actualizaciones regulares**: Mantén tu software y dependencias actualizadas para evitar vulnerabilidades conocidas.
- **Contratar a expertos en seguridad**: Si tu aplicación maneja datos sensibles, considera contratar a un experto en seguridad para realizar auditorías y pruebas de penetración.
- **Educación continua**: La ciberseguridad es un campo en constante evolución. Por lo tanto, es importante mantenerse actualizado sobre las últimas amenazas y mejores prácticas. Participa en conferencias, lee blogs y sigue a expertos en seguridad para aprender sobre nuevas vulnerabilidades y técnicas de defensa
- **Actualizaciones de paquetes y dependencias**: Utiliza herramientas como `npm audit` o `pip-audit` para identificar y actualizar dependencias vulnerables en tus proyectos. Si usas github muchas veces te avisa de las vulnerabilidades de tus dependencias y te da una solución para arreglarlas.
- **SSH**: Hemos hablado antes de los permisos y llaves públicas y privadas, pero es importante mencionar que SSH es una herramienta esencial para la administración segura de servidores. Utiliza autenticación basada en llaves y desactiva el acceso por contraseña para mejorar la seguridad. También una configuración segura de SSH incluye deshabilitar el acceso root directo y cambiar el puerto por defecto (22) a uno personalizado para reducir el riesgo de ataques automatizados.

## 8. Conclusión y recursos

La ciberseguridad web es un tema complejo pero esencial para cualquier desarrollador. Al comprender las vulnerabilidades comunes, aplicar buenas prácticas de saneamiento y utilizar herramientas de seguridad adecuadas, puedes proteger tus aplicaciones y datos de posibles ataques.

Aquí hay algunos recursos recomendados para profundizar en el tema:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/): Una lista de las vulnerabilidades más críticas en aplicaciones web.
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/): Una herramienta para evaluar la efectividad de tus políticas de Content Security Policy (CSP).
- [Curso de ciberseguridad en Udemy](https://www.udemy.com/course/cybersecurity-for-beginners/): Un curso introductorio que cubre los conceptos básicos de la ciberseguridad web y cómo proteger tus aplicaciones.
- [Curso de ciberseguridad en Platzi](https://platzi.com/cursos/ciberseguridad/): Un curso más avanzado que profundiza en técnicas de defensa y ataques comunes en aplicaciones web.