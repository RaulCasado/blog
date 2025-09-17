---
title: 'Flask Parte 1: Introducción'
description: 'En esta serie de posts, exploraremos Flask, un microframework web para Python. Comenzaremos con una introducción a sus características principales y cómo configurar un entorno básico.'
pubDate: '2025-09-17'
heroImage: '/api-flask-1/python.jpg'
heroImageAlt: 'Python code on a computer screen'
tags: ['python']
lang: 'es'
---

Hola de nuevo a todos. Hoy comenzamos una serie de posts que os van a ayudar a entender Flask, un framework web ligero para Python. A lo largo de esta serie, exploraremos sus características principales, cómo configurar un entorno básico y cómo construir aplicaciones web sencillas. Tendremos más posts en el futuro que profundizarán en temas más avanzados, pero hoy nos centraremos en los fundamentos. Como por ejemplo qué es Flask, por qué usarlo y cómo empezar. Si ya tienes algo de experiencia con Flask, puedes saltarte este post o leerlo para ver si hay algo que no sabías.

## ¿Qué es una API?

Antes de meternos de lleno con Flask, tendremos que definir que vamos a hacer con el mismo. Hoy vamos a hacer una API. Una API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas y protocolos que permiten que diferentes aplicaciones se comuniquen entre sí. En términos simples, una API define cómo los diferentes componentes de software deben interactuar. 

Una comparativa para que entiendas facilmente qué es una API es pensar en ella como un menú en un restaurante. El menú proporciona una lista de platos que puedes pedir, junto con una descripción de cada plato. Cuando especificas lo que quieres del menú, la cocina (el sistema) prepara tu pedido y te lo entrega. No necesitas saber cómo se prepara la comida, solo necesitas saber qué está disponible y cómo pedirlo. De manera similar, una API proporciona una lista de operaciones que los desarrolladores pueden usar, junto con una descripción de lo que hacen. Los desarrolladores no necesitan saber cómo está implementada la API, solo necesitan saber qué operaciones están disponibles y cómo usarlas.

Otro concepto que tendriamos que entender es el concepto de cliente-servidor. En una arquitectura cliente-servidor, el cliente es la aplicación o dispositivo que solicita servicios o recursos, mientras que el servidor es la aplicación o dispositivo que proporciona esos servicios o recursos. El cliente y el servidor se comunican a través de una red, generalmente utilizando protocolos estándar como HTTP. 

El cliente envía una solicitud al servidor, que procesa la solicitud y devuelve una respuesta. Esta arquitectura permite la separación de responsabilidades, ya que el cliente se encarga de la interfaz de usuario y la experiencia del usuario, mientras que el servidor se encarga del procesamiento de datos y la gestión de recursos. Un ejemplo común de arquitectura cliente-servidor es una aplicación web, donde el navegador web actúa como el cliente y el servidor web actúa como el servidor.

Vale Raúl muy bien lo que me estás contando pero ¿por qué tendría que aprender yo lo que es una API o para qué la necesitamos? Pues muy sencillo, porque la mayoría de las aplicaciones modernas dependen de las APIs para funcionar. Por ejemplo, cuando usas una aplicación de redes sociales en tu teléfono, esa aplicación probablemente se comunica con un servidor a través de una API para obtener y enviar datos. Lo mismo ocurre con muchas otras aplicaciones, como aplicaciones de mensajería, aplicaciones de comercio electrónico y aplicaciones de productividad. Aprender a construir y consumir APIs es una habilidad esencial para los desarrolladores modernos. Además, como he dicho antes, permite la separación de responsabilidades, lo que facilita el mantenimiento y la escalabilidad de las aplicaciones.

## Introducción a Flask

### ¿Qué es Flask?

Flask es un microframework web para Python que permite a los desarrolladores crear aplicaciones web de manera rápida y sencilla. Fue creado por Armin Ronacher y lanzado en 2010 como parte del proyecto Pocoo. Flask es conocido por su simplicidad, flexibilidad y facilidad de uso, lo que lo convierte en una opción popular para desarrolladores de todos los niveles de experiencia.

¿ Un microque? Primero definamos que es un framework y con eso tendremos una base sólida para entender que es un microframework. Un framework es un conjunto de herramientas, bibliotecas y convenciones que facilitan el desarrollo de software al proporcionar una estructura predefinida y soluciones comunes para problemas recurrentes. Los frameworks permiten a los desarrolladores centrarse en la lógica de negocio de su aplicación en lugar de preocuparse por los detalles técnicos de bajo nivel. Esta podríamos decir que es la definición formal. Pero para entenderlo mejor, podemos pensar en un framework como un conjunto de piezas de LEGO. Cuando construyes algo con LEGO, tienes una variedad de piezas y herramientas que puedes usar para crear diferentes estructuras. Un framework funciona de manera similar al proporcionar un conjunto de herramientas y componentes reutilizables que los desarrolladores pueden usar para construir aplicaciones de manera más eficiente. Por ejemplo con DJango que es otro framework de Python, tienes herramientas integradas para manejar bases de datos, autenticación de usuarios y enrutamiento de URLs, lo que facilita la creación de aplicaciones web complejas. Y como diría mi abuelo si ya está todo hecho ¿para qué voy a reinventar la rueda? esta realmente es la filosofía detrás de los frameworks.

Con la definición de framework clara, podemos definir que es un microframework. Un microframework es un tipo de framework web que proporciona una estructura mínima y un conjunto básico de herramientas para construir aplicaciones web. A diferencia de los frameworks completos, que incluyen una amplia gama de funcionalidades integradas, los microframeworks se centran en ofrecer solo las características esenciales necesarias para crear aplicaciones web, lo que permite a los desarrolladores tener más control y flexibilidad sobre la arquitectura y las dependencias de su aplicación. Flask es un ejemplo popular de microframework debido a su simplicidad y facilidad de uso. Yo añadiría que es ideal para proyectos pequeños y medianos, prototipos rápidos y aplicaciones que requieren una personalización significativa. En el caso de Flask, no hay problema alguno ya que te viene con lo mínimo y tú después puedes ir añadiendo las librerías que necesites para tu proyecto como digo máxima flexibilidad.

### ¿Por qué Flask para principiantes?

Si estás un poco metido en el mundo de la programación sabrás que existen muchos frameworks web para Python, los más conocidos son Flask, Django y FastAPI. Cada uno tiene sus propias ventajas y desventajas, pero Flask es una excelente opción para principiantes por varias razones:

1. **Simplicidad y Facilidad de Uso**: Flask tiene una curva de aprendizaje suave y una sintaxis sencilla, lo que facilita a los principiantes entender cómo funciona y comenzar a construir aplicaciones rápidamente.

2. **Documentación Clara y Completa**: La documentación oficial de Flask es extensa y bien organizada, lo que facilita a los principiantes encontrar la información que necesitan para aprender y resolver problemas.

3. **Flexibilidad y Personalización**: Flask permite a los desarrolladores elegir las herramientas y bibliotecas que desean utilizar, lo que les da la libertad de personalizar su aplicación según sus necesidades específicas.

4. **Comunidad Activa y Recursos Abundantes**: Flask tiene una comunidad activa de desarrolladores que contribuyen con tutoriales, extensiones y soporte, lo que facilita a los principiantes encontrar ayuda y recursos para aprender.

No uso Django porque es demasiado complejo para principiantes tiene una curva de aprendizaje más pronunciada y viene con muchas funcionalidades integradas que pueden ser abrumadoras para los nuevos desarrolladores.

FastAPI es una excelente opción para construir APIs rápidas y eficientes, pero puede ser un poco más avanzado para principiantes debido a su enfoque en la tipificación estática y las características asíncronas. Flask, por otro lado, ofrece un equilibrio ideal entre simplicidad y funcionalidad, lo que lo convierte en una opción accesible y poderosa para aquellos que están comenzando su viaje en el desarrollo web con Python. Por eso es que lo he escogido para este primer post de la serie. Además, aquí vamos a dar conceptos básicos que luego podrás aplicar en cualquier otro framework, o lenguaje como node.js, Ruby on Rails, etc.

### Instalación y setup

Para empezar a usar Flask, es muy sencillo. Primero, asegúrate de tener Python instalado en tu sistema. Esto lo haremos con el siguiente comando:

```bash
python3 --version
```

Nota: En algunos sistemas, especialmente Windows, es posible que tengas que usar `python` en lugar de `python3`. Sin embargo, recomiendo usar `python3` siempre que sea posible, ya que `python` a secas se suele referir a Python 2 que está obsoleto.

Si por alguna razón no tienes Python instalado, puedes descargarlo:

- **Windows**: [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
- **macOS**: [https://www.python.org/downloads/macos/](https://www.python.org/downloads/macos/)
- **Linux**: Usa el gestor de paquetes de tu distribución, por ejemplo, en Ubuntu: `sudo apt-get install python3`

Una vez que tengas Python instalado el siguiente paso es verificar que tienes `pip`, que es el gestor de paquetes de Python. Normalmente viene instalado por defecto con Python, pero puedes verificarlo con:

```bash
pip3 --version
```

Si no lo tienes instalado, puedes seguir las instrucciones aquí: [https://pip.pypa.io/en/stable/installation/](https://pip.pypa.io/en/stable/installation/)

Pero como digo seguro que lo tienes.

Ahora, vamos a crear un entorno virtual para nuestro proyecto. Esto es una buena práctica para aislar las dependencias de tu proyecto y evitar conflictos con otras instalaciones de Python en tu sistema. Esto es especialmente útil si estás trabajando en múltiples proyectos que pueden requerir diferentes versiones de paquetes, también así te aseguras de que no tengas conflictos de versiones ni paquetes. Para crear un entorno virtual, navega a la carpeta donde quieres crear tu proyecto y ejecuta:

```bash
python3 -m venv venv
```

El primer venv es el comando para crear un entorno virtual y el segundo es el nombre de la carpeta donde se guardará el entorno virtual. Puedes cambiarlo si quieres, pero `venv` es un nombre comúnmente usado.

Y para activar el entorno virtual:

- **Windows**:

```bash
venv\Scripts\activate
```

- **macOS/Linux**:

```bash
source venv/bin/activate
```

Una vez creado el entorno vitual y activado, el siguiente paso es instalar Flask. Puedes hacerlo fácilmente usando pip con el siguiente comando:

```bash
pip install Flask
```

Y con eso ya tienes Flask instalado en tu entorno virtual. Para verificar que Flask se ha instalado correctamente, puedes ejecutar:

```bash
python3 -m flask --version
```

Si todo ha ido bien, deberías ver la versión de Flask que has instalado.

Ahora crearemos el archivo requirements.txt. Este archivo es una convención en proyectos Python para listar las dependencias del proyecto. Esto facilita la instalación de todas las dependencias necesarias en otro entorno o máquina con un solo comando. Para crear el archivo, simplemente ejecuta:

```bash
pip freeze > requirements.txt
```

También crearemos un archivo `.gitignore` para asegurarnos de que no subimos nuestro entorno virtual a un repositorio Git. Puedes crear un archivo llamado `.gitignore` en la raíz de tu proyecto y añadir la siguiente línea:

```bash
venv/
```

Y por último crearemos un archivo llamado `app.py` que será el archivo principal de nuestra aplicación Flask. Puedes crear este archivo en la raíz de tu proyecto.

```bash
touch app.py
```

Y lo abrimos con nuestro editor de código favorito. Añadiendo esto al archivo `app.py`:

```python
# Importamos la clase Flask desde el módulo flask
# Esta es la clase principal que usaremos para crear nuestra aplicación web
from flask import Flask

# Creamos una instancia de la aplicación Flask
# __name__ le dice a Flask cuál es el nombre del módulo actual
# Flask usa esto para saber dónde buscar archivos como templates y archivos estáticos
app = Flask(__name__)

# Definimos una ruta usando el decorador @app.route()
# '/' significa que esta función se ejecutará cuando alguien visite la raíz de nuestro sitio
# Por ejemplo: http://localhost:5000/
# Un decorador en Python es una forma de modificar el comportamiento de una función
# Por ejemplo, @app.route('/') le dice a Flask que esta función maneja las solicitudes a la ruta '/'
@app.route('/')
def hello():
    """
    Esta función se llama 'view function' o función de vista
    Se ejecuta cada vez que alguien hace una petición GET a '/'
    Lo que retorne esta función es lo que verá el usuario en su navegador
    """
    return "¡Hola mundo!"

# Esta condición verifica si estamos ejecutando este archivo directamente
# (no importándolo desde otro archivo)
if __name__ == '__main__':
    # Iniciamos el servidor de desarrollo de Flask
    # debug=True significa:
    # - Si hay errores, se mostrarán en el navegador
    # - Si cambias el código, el servidor se reiniciará automáticamente
    # - NUNCA uses debug=True en producción por seguridad
    app.run(debug=True)
```

## 3. Fundamentos HTTP

### Métodos HTTP (GET, POST, PUT, DELETE)

Los métodos HTTP son un conjunto de verbos que indican la acción que se desea realizar en un recurso específico en la web. Los métodos más comunes son:

- **GET**: Se utiliza para solicitar datos de un recurso específico. Es el método más común y se usa para obtener información sin modificarla. Por ejemplo, cuando visitas una página web, tu navegador envía una solicitud GET al servidor para obtener el contenido de esa página.

- **POST**: Se utiliza para enviar datos a un servidor para crear o actualizar un recurso. A diferencia de GET, POST puede modificar el estado del servidor. Por ejemplo, cuando envías un formulario en una página web, se suele utilizar una solicitud POST para enviar los datos al servidor.

- **PUT**: Se utiliza para actualizar un recurso existente o crear uno nuevo si no existe. A diferencia de POST, que puede crear múltiples recursos, PUT es idempotente, lo que significa que realizar la misma solicitud varias veces tendrá el mismo efecto que hacerlo una sola vez. Por ejemplo, si estás actualizando la información de un usuario en una base de datos, usarías una solicitud PUT.

- **DELETE**: Se utiliza para eliminar un recurso específico. Al igual que PUT, DELETE es idempotente. Por ejemplo, si deseas eliminar un artículo de un blog, enviarías una solicitud DELETE al servidor.

### Status codes básicos (200, 201, 404, 500)

Los códigos de estado HTTP son respuestas estándar que los servidores web envían a los clientes (como navegadores o aplicaciones) para indicar el resultado de una solicitud HTTP. Aquí hay algunos de los códigos de estado más comunes y su significado:

- **200 OK**: Indica que la solicitud se ha procesado correctamente y que el servidor ha devuelto la información solicitada. Es el código de estado más común y se utiliza para solicitudes GET exitosas.

- **201 Created**: Indica que la solicitud se ha procesado correctamente y que se ha creado un nuevo recurso como resultado. Este código se utiliza comúnmente en respuestas a solicitudes POST que crean nuevos recursos en el servidor.

- **404 Not Found**: Indica que el servidor no pudo encontrar el recurso solicitado. Esto puede ocurrir si la URL es incorrecta o si el recurso ha sido eliminado. Es uno de los códigos de estado más conocidos y se muestra comúnmente cuando una página web no existe.

- **500 Internal Server Error**: Indica que el servidor encontró un error inesperado que le impidió completar la solicitud. Este código de estado es una señal de que algo ha ido mal en el servidor, pero no proporciona detalles específicos sobre el problema.

Básicamente, podemos dividir los códigos de estado HTTP en cinco categorías principales:

Aunque los 1xx existen, para APIs básicas como la que vamos a hacer no los vamos a usar.

2xx: Éxito, ya sea que se haya procesado correctamente la solicitud o se haya creado un recurso.

3xx: Redirección, por ejemplo 301 Moved Permanently o 302 Found. Aunque estos se suelen usar más en páginas web que en APIs.

4xx: Error del cliente, por ejemplo 400 Bad Request, 401 Unauthorized, 403 Forbidden y 404 Not Found.

5xx: Error del servidor, por ejemplo 500 Internal Server Error, 502 Bad Gateway y 503 Service Unavailable.

### Headers y Body

Los headers (encabezados) y el body (cuerpo) son dos componentes fundamentales de las solicitudes y respuestas HTTP que permiten la comunicación entre clientes y servidores en la web.

**Headers (Encabezados)**: Los headers son metadatos que proporcionan información adicional sobre la solicitud o respuesta HTTP. Se encuentran al principio de la solicitud o respuesta y consisten en pares clave-valor. Los headers pueden incluir información como el tipo de contenido (Content-Type), la longitud del contenido (Content-Length), las cookies, la autenticación, entre otros. Por ejemplo, un header común en una solicitud HTTP es "User-Agent", que indica el navegador o cliente que está realizando la solicitud.

**Body (Cuerpo)**: El body es la parte de la solicitud o respuesta HTTP que contiene los datos reales que se están enviando o recibiendo. En una solicitud, el body puede contener datos como formularios, archivos o JSON, dependiendo del método HTTP utilizado (por ejemplo, POST o PUT). En una respuesta, el body generalmente contiene el contenido solicitado, como HTML, JSON, imágenes, etc. El body es opcional en algunas solicitudes (como GET) pero obligatorio en otras (como POST).

## 4. JSON como formato de datos

### ¿Qué es JSON?

JSON (JavaScript Object Notation) es un formato de texto ligero para el intercambio de datos. Es fácil de leer y escribir para los humanos, y fácil de analizar y generar para las máquinas. JSON se basa en una sintaxis que es un subconjunto de JavaScript, pero es independiente del lenguaje, lo que significa que puede ser utilizado en una amplia variedad de lenguajes de programación.

### Ventajas de JSON

1. **Legibilidad**: JSON es fácil de leer y entender, lo que facilita la colaboración entre desarrolladores y la depuración de problemas. Siempre y cuando esté bien formateado y estructurado.

2. **Ligero**: JSON tiene una estructura simple y utiliza menos caracteres que otros formatos como XML, lo que reduce el tamaño de los datos transmitidos y mejora la velocidad de las aplicaciones.

3. **Compatibilidad**: JSON es compatible con la mayoría de los lenguajes de programación modernos, lo que facilita su uso en diferentes entornos y plataformas.

4. **Estructura de Datos Compleja**: JSON puede representar estructuras de datos complejas, como objetos anidados y arrays, lo que lo hace adecuado para una amplia variedad de aplicaciones.

Aunque el JSON no es la única opción para el intercambio de datos, es la más popular y ampliamente utilizada en el desarrollo web moderno. Otros formatos incluyen XML, YAML y CSV, pero JSON se ha convertido en el estándar de facto debido a sus ventajas mencionadas anteriormente.

### Estructura básica

JSON utiliza una estructura basada en pares clave-valor y soporta varios tipos de datos, incluyendo objetos, arrays, cadenas de texto, números, booleanos y nulos. Aquí hay un ejemplo básico de la estructura de JSON:

```json
{
  "nombre": "Juan",
  "edad": 30,
  "esEstudiante": false,
  "direccion": {
    "calle": "Calle Falsa 123",
    "ciudad": "Springfield"
  },
  "telefonos": ["123-456-7890", "987-654-3210"]
}
```

Si lo comparamos con XML, que es otro formato de datos común, JSON es generalmente más compacto y fácil de leer. Aquí hay un ejemplo del mismo conjunto de datos en XML:

```xml
<persona>
  <nombre>Juan</nombre>
  <edad>30</edad>
  <esEstudiante>false</esEstudiante>
  <direccion>
    <calle>Calle Falsa 123</calle>
    <ciudad>Springfield</ciudad>
  </direccion>
  <telefonos>
    <telefono>123-456-7890</telefono>
    <telefono>987-654-3210</telefono>
  </telefonos>
</persona>
```

Como podeís ver , JSON es más conciso y fácil de leer en comparación con XML, lo que lo hace una opción preferida para el intercambio de datos en aplicaciones web modernas.

## 5. Rutas y decoradores

### @app.route()

Si has estado siguiendo el post, ya hemos visto un ejemplo básico de cómo definir una ruta en Flask usando el decorador `@app.route()`. Este decorador se utiliza para vincular una URL específica a una función en tu aplicación Flask. Cuando un usuario visita esa URL, la función asociada se ejecuta y devuelve una respuesta. Por ejemplo, en el código que vimos antes:

```python
@app.route('/')
def hello():
    return "¡Hola mundo!"
```

Aquí, `@app.route('/')` indica que la función `hello()` se ejecutará cuando alguien visite la raíz de nuestro sitio web (http://localhost:5000/). La función devuelve el texto "¡Hola mundo!", que es lo que verá el usuario en su navegador.

### Métodos HTTP en rutas

Antes hemos visto los distintos métodos HTTP (GET, POST, PUT, DELETE). En Flask, puedes especificar qué métodos HTTP puede manejar una ruta utilizando el parámetro `methods` en el decorador `@app.route()`. Por defecto, una ruta solo maneja solicitudes GET. Aquí hay un ejemplo de cómo definir una ruta que maneja tanto GET como POST:

```python
@app.route('/tareas', methods=['GET', 'POST'])
def manejar_tareas():
    if request.method == 'GET':
        return "Listar todas las tareas"
    elif request.method == 'POST':
        return "Crear una nueva tarea"
```

En este ejemplo, la ruta `/tareas` puede manejar tanto solicitudes GET como POST. Dentro de la función `manejar_tareas()`, verificamos el método de la solicitud utilizando `request.method` y respondemos en consecuencia.

Aunque personalmente no me gusta mucho encidir múltiples métodos en una sola función, prefiero tener funciones separadas para cada método, pero esto es cuestión de preferencia personal y del contexto del proyecto.

### Parámetros en URLs

Vale hasta ahora hemos visto rutas básicas, pero a menudo querrás manejar rutas que incluyan parámetros dinámicos. Por ejemplo, si estás construyendo una API para gestionar tareas, podrías querer una ruta que permita obtener, actualizar o eliminar una tarea específica por su ID. En Flask, puedes definir rutas con parámetros utilizando la sintaxis `<tipo:nombre>`. Aquí hay un ejemplo:

```python
@app.route('/tareas/<int:id>', methods=['DELETE'])
def eliminar_tarea(id):
    return f"Eliminar la tarea con ID {id}"
```

Aquí el parámetro `<int:id>` indica que esperamos un entero como parte de la URL, y este valor se pasará a la función `eliminar_tarea()` como el argumento `id`. Si un usuario visita la URL `/tareas/5`, la función se ejecutará con `id` igual a 5.

Obviamente, tendríamos que hacer comprobaciones para asegurarnos de que la tarea con ese ID existe antes de intentar eliminarla, pero eso lo veremos en futuros posts. Al final del post tendrás el código completo de la API que hemos hecho hoy. ¿Te atreves a añadirle comprobaciones y mejoras?

## 7. CRUD completo con datos en memoria

### GET - Listar todas las tareas

Por ahora simplemente vamos a guardar las tareas en una lista en memoria. En un proyecto real, probablemente usarías una base de datos, pero para mantener las cosas simples y enfocarnos en Flask, usaremos una lista.

```python
from flask import Flask, request, jsonify
app = Flask(__name__)
tareas = []

@app.route('/tareas', methods=['GET'])
def listar_tareas():
    return jsonify(tareas)
```

Como podéis ver usamos el método `jsonify` para convertir nuestra lista de tareas en un formato JSON que se pueda enviar como respuesta. Esto por los motivos que hemos visto antes sobre JSON. Además, `jsonify` también establece automáticamente el header `Content-Type` a `application/json`, lo que indica al cliente que la respuesta es JSON.

### POST - Crear nueva tarea

```python
@app.route('/tareas', methods=['POST'])
def crear_tarea():
    nueva_tarea = request.json
    nueva_tarea['id'] = len(tareas) + 1  # Asignar ID automáticamente
    tareas.append(nueva_tarea)
    return jsonify(nueva_tarea), 201
```

Aquí usamos `request.json` para obtener los datos enviados en el cuerpo de la solicitud POST. Luego añadimos la nueva tarea a nuestra lista y devolvemos la tarea creada con un código de estado 201 (Created). Aquí tendríamos que hacer comprobaciones para asegurarnos de que los datos enviados son válidos, pero eso lo veremos en futuros posts.

### GET by ID - Obtener una tarea

```python
@app.route('/tareas/<int:id>', methods=['GET'])
def obtener_tarea(id):
    for tarea in tareas:
        if tarea['id'] == id:
            return jsonify(tarea)
    return jsonify({"error": "Tarea no encontrada"}), 404
```
Aquí buscamos la tarea por su ID en la lista y la devolvemos si la encontramos. Si no, devolvemos un error 404 (Not Found).

### PUT - Actualizar tarea

```python
@app.route('/tareas/<int:id>', methods=['PUT'])
def actualizar_tarea(id):
    datos_actualizados = request.json
    for tarea in tareas:
        if tarea['id'] == id:
            tarea.update(datos_actualizados)
            return jsonify(tarea)
    return jsonify({"error": "Tarea no encontrada"}), 404
```

### DELETE - Eliminar tarea

```python
@app.route('/tareas/<int:id>', methods=['DELETE'])
def eliminar_tarea(id):
    for tarea in tareas:
        if tarea['id'] == id:
            tareas.remove(tarea)
            return jsonify({"mensaje": "Tarea eliminada"})
    return jsonify({"error": "Tarea no encontrada"}), 404
```

## 8. Testing con Postman

### Configurar requests

Para probar nuestra API, una herramienta muy popular es Postman. Postman es una aplicación que permite a los desarrolladores crear, compartir, probar y documentar APIs de manera sencilla. Con Postman, puedes enviar solicitudes HTTP a tu API y ver las respuestas, lo que facilita la depuración y el desarrollo.

Pero también puedes hacerlo con otras herramientas como curl o requests en Python. Aquí te dejo un ejemplo de cómo hacerlo con curl:

```bash
curl -X GET http://localhost:5000/tareas
```

O con requests en Python:

```python
import requests
response = requests.get('http://localhost:5000/tareas')
print(response.json())
```

### Probar cada endpoint

Para probar los endpoints que hemos creado, simplemente abre Postman y crea una nueva solicitud para cada uno de los métodos HTTP que hemos implementado (GET, POST, PUT, DELETE). Asegúrate de configurar la URL correctamente (por ejemplo, `http://localhost:5000/tareas` para listar todas las tareas) y de seleccionar el método HTTP adecuado.

También si ves el repositorio de GitHub que he dejado al final del post, he dejado todo lo que hemos hecho más algunas cosillas extras para que puedas probarlo directamente. Incluidos tests.

### Verificar respuestas

Para cada solicitud que envíes, Postman te mostrará la respuesta del servidor, incluyendo el código de estado HTTP, los headers y el body. Asegúrate de verificar que las respuestas sean las esperadas. Por ejemplo, cuando creas una nueva tarea con una solicitud POST, deberías recibir un código de estado 201 y la tarea creada en el body de la respuesta.

![Postman Example](/api-flask-1/postman.png)

## 9. Conceptos REST básicos

### ¿Qué es REST?

REST (Representational State Transfer) es un estilo arquitectónico para diseñar servicios web que se basa en un conjunto de principios y restricciones. Fue introducido por Roy Fielding en su tesis doctoral en el año 2000. REST se utiliza comúnmente para construir APIs que permiten la comunicación entre clientes y servidores a través de HTTP.

Esta API que hemos hecho hoy es una API RESTful, ya que sigue los principios de REST. Estos principios incluyen:

1. **Cliente-Servidor**: La arquitectura REST se basa en una separación clara entre el cliente y el servidor. El cliente es responsable de la interfaz de usuario y la experiencia del usuario, mientras que el servidor se encarga del procesamiento de datos y la gestión de recursos.

2. **Sin Estado (Stateless)**: Cada solicitud del cliente al servidor debe contener toda la información necesaria para entender y procesar la solicitud. El servidor no debe almacenar ningún estado del cliente entre solicitudes. Esto significa que cada solicitud es independiente y no depende de solicitudes anteriores.

3. **Cacheable**: Las respuestas del servidor deben ser etiquetadas como cacheables o no cacheables. Si una respuesta es cacheable, el cliente puede almacenar la respuesta y reutilizarla para solicitudes futuras, lo que mejora el rendimiento y reduce la carga en el servidor.

4. **Interfaz Uniforme**: REST define una interfaz uniforme entre el cliente y el servidor, lo que simplifica la arquitectura y mejora la interoperabilidad. Esto incluye el uso de recursos identificados por URLs, el uso de métodos HTTP estándar (GET, POST, PUT, DELETE) y la representación de recursos en formatos estándar como JSON o XML.

5. **Sistema en Capas**: La arquitectura REST puede estar compuesta por múltiples capas, donde cada capa tiene una función específica. Esto permite la escalabilidad y la flexibilidad en el diseño del sistema.

Las APIs se suelen dividir se pueden dividir en base a dos factores principales: por lo que devuelven (JSON, XML, HTML) y por cómo están diseñadas (REST, SOAP, GraphQL). Hoy hemos visto una API REST que devuelve JSON.

Pero como digo también hay otros estilos de diseño de APIs como SOAP (Simple Object Access Protocol) y GraphQL. SOAP es un protocolo basado en XML que define un conjunto de reglas para la comunicación entre aplicaciones, mientras que GraphQL es un lenguaje de consulta para APIs que permite a los clientes solicitar exactamente los datos que necesitan.

Nuestra API es RESTful porque sigue los principios de REST y utiliza HTTP como protocolo de comunicación. Además, devuelve datos en formato JSON, que es un formato ligero y fácil de usar para el intercambio de datos.

### Recursos y URIs

En una API REST, los recursos son las entidades que se exponen a través de la API. Cada recurso debe tener una URI (Identificador Uniforme de Recursos) única que lo identifique. Por ejemplo, en nuestra API de tareas, podríamos tener las siguientes URIs:

- `/tareas`: para acceder a la colección de tareas.
- `/tareas/{id}`: para acceder a una tarea específica por su ID.

Es importante seguir buenas prácticas de naming al definir las URIs de los recursos. Algunas recomendaciones son:

- Utilizar sustantivos en plural para los nombres de los recursos (por ejemplo, `/tareas` en lugar de `/tarea`).
- Utilizar guiones bajos o guiones para separar palabras en las URIs (por ejemplo, `/tareas/completadas` en lugar de `/tareascompletadas`).
- Evitar el uso de verbos en las URIs, ya que el método HTTP (GET, POST, PUT, DELETE) ya indica la acción a realizar sobre el recurso.
