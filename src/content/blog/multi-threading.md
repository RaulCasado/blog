---
title : 'Multithreading'
description : 'Una exploración filosófica del problema de los filósofos comensales y conceptos de programación concurrente'
pubDate: ' May 13 2025'
heroImage : '/philo.webp'
heroImageAlt : 'Una ilustración conceptual de cinco filósofos sentados alrededor de una mesa'
---

# Una mirada filosófica al Multithreading

## Introducción

Si estás leyendo esto, da igual que sepas o no lo que es el multithreading. Con este artículo quiero explicar con mis propias palabras qué es el multithreading y cómo funciona. Ya me enfrenté al problema de los filósofos en la escuela de 42 y quiero compartir mi experiencia con vosotros. Espero que os sirva de ayuda y que no os quedéis con dudas. Si tenéis alguna pregunta, no dudéis en dejarla en los comentarios.

## ¿Qué es el Multithreading?

Antes de sumergirnos en el problema filosófico, vamos a entender qué es el multithreading. Imagina que eres un cocinero profesional preparando una cena elaborada. Podrías cocinar cada plato de forma secuencial (un solo hilo), pero eso sería ineficiente. En lugar de eso, podrías tener varios procesos simultáneos: la sopa hirviendo en un fuego, la carne asándose en el horno, y tú cortando verduras.

En programación, un **thread** o **hilo** es como uno de esos procesos de cocina que puede ejecutarse de forma independiente. El **multithreading** es la capacidad de un programa para ejecutar varios hilos concurrentemente, permitiendo hacer varias tareas "al mismo tiempo".

Los hilos son la medida más pequeña de ejecución en un programa. Cada hilo tiene su propio flujo de control, pero comparten el mismo espacio de memoria. Esto significa que pueden comunicarse entre sí de manera eficiente, pero también pueden entrar en conflicto si no se gestionan adecuadamente. Pero en el caso de de los filósofos, no se pueden comunicar entre ellos, ya que no tienen acceso a la memoria compartida.

## ¿Qué es el problema de los filósofos?

El problema de los filósofos te va a guiar por todos los problemas que el multithreading puede presentar. Desde deadlocks hasta data races no te preocupes si todavía no entiendes lo que son, al final del artículo tendrás una idea clara de lo que son y cómo evitarlos.

Pero vale cuál es el realmente el problema de los filósofos. En la implementación de 42 hay N filósofos donde N es un número mayor que 0. Cada filósofo tiene un tenedor a su izquierda y otro a su derecha. Para comer, necesita ambos tenedores. Y tú mi querido lector te estarás preguntando, ¿por qué 2 tenedores? No sé además que es un poco antihigiénico. Pero bueno, así es el problema. También tienes otros parámetros como el número de filósofos que ya hemos mencionado pero el número de tenedores es también el mismo número que el de filósofos. Así que si hay 5 filósofos, hay 5 tenedores. Tienes otros argumentos como el tiempo qeu tardan en morir, el tiempo qeu tardan en comer, el tiempo que tardan en dormir y por último un parámetro opcional que es la cantidad de veces que tienen que comer siendo este último un número mayor que 0. No lo he comentado pero el tiempo en este ejercicio se mide en milisegundos. Así que si un filósofo tarda 1000ms en comer, significa que tarda 1 segundo.

Todo esto da a lugar a que no todos los filósofos pueden comer al mismo tiempo. Si un filósofo coge el tenedor de su izquierda y el de su derecha, los demás filósofos no pueden comer. Pero claro que pasa si dos filósofos cogen el mismo tenedor a la vez. Pues que tendremos nuestro primer problema que se llama **data racing** que es lo que vamos a ver a continuación.

## Conceptos clave en el multithreading

### 1. Recursos compartidos y data racing

Como hemos dicho los tenedores solo pueden ser usados por un filósofo a la vez. Pero claro con varios hilos es muy probable que el filósofo 1 intente usar el tenedor que está usando el filósofo 2 esto no se puede permitir. Entonces como podemos evitar que los hilos accedan a los tenedores al mismo tiempo? Pues la respuesta es con un mutex. Un mutex es un mecanismo de sincronización que permite que solo un hilo acceda a un recurso compartido a la vez. Es como si cada tenedor tuviera un candado y solo el filósofo que lo tiene en la mano puede usarlo.

```c
pthread_mutex_t tenedor_mutex[5];  // Array de mutexes para los tenedores
```

En este ejemplo tenemos un array de mutexes que representan 5 filósofos y 5 tenedores. Cada tenedor tiene su propio mutex que se usa para bloquear el acceso al tenedor mientras un filósofo lo está usando. Entonces cuando un filósofo quiere usar un tenedor, primero bloquea el mutex correspondiente y luego lo libera cuando ha terminado de usarlo.

Pero por qué es tan importante los mutex. Bueno te voy a poner un ejemplo muy básico para que lo entiendas y lo puedas ejecutar tú mismo para ver la importancia.

```c
#include <stdio.h>
#include <pthread.h>

#define NUM_THREADS 10
#define NUM_INCREMENTS 100000

int counter = 0; // variable compartida

void* increment(void* arg) {
    for (int i = 0; i < NUM_INCREMENTS; ++i) {
        counter++; // ⚠️ condición de carrera aquí
    }
    return NULL;
}

int main() {
    pthread_t threads[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; ++i) {
        pthread_create(&threads[i], NULL, increment, NULL);
    }

    for (int i = 0; i < NUM_THREADS; ++i) {
        pthread_join(threads[i], NULL);
    }

    printf("Valor final del contador: %d (esperado: %d)\n", counter, NUM_THREADS * NUM_INCREMENTS);
    return 0;
}
```
En este ejemplo tenemos un contador que se incrementa 100000 veces por cada hilo. Si compilas y ejecutas el programa verás que el valor final del contador no es lo esperado. Pero por qué pasa esto? Porque al no estar protegido el hilo 1 puede leer el valor del contador antes de que el hilo 2 lo haya incrementado. Entonces el hilo 1 lee el valor del contador y lo incrementa pero el hilo 2 también lo hace al mismo tiempo. Entonces al final el valor del contador no es el esperado. Ya que las operaciones de sumar++ no son atómicas. Bueno Raúl y que significa que no sean atómicas? Si yo veo una línea de código que dice counter++ eso significa que el compilador va a hacer lo siguiente:
```c
counter = counter + 1;
```
Pero claro esto no es cierto porque el compilador no puede hacer eso. Lo que realmente hace el compilador es lo siguiente:
```c
int temp = counter; // Lee el valor actual
temp = temp + 1; // Incrementa el valor
counter = temp; // Escribe el nuevo valor
```
Esto significa que el compilador tiene que leer el valor del contador, incrementarlo y luego escribirlo de nuevo. Pero claro si el hilo 1 lee el valor del contador y antes de que el hilo 2 lo haya incrementado, el hilo 2 también lee el valor del contador y lo incrementa. Entonces al final el valor del contador no es el esperado.

Si has ido siguiendo al explicación sabras que la solución a este problema es usar un mutex. Pero no tendriamos el mismo problema si el hilo1 y el hilo2 intentan acceder al mismo mutex a la vez?. Pues la respuesta es que no. El mutex es un mecanismo que sí es atómico esto quiere decir que no importa cuántos hilos intenten acceder al mutex al mismo tiempo, solo uno de ellos podrá acceder a él. Entonces si el hilo 1 bloquea el mutex, el hilo 2 tendrá que esperar a que el hilo 1 lo desbloquee antes de poder acceder a él. Lo que nos quita las condiciones de carrera. Bueno pues un problema menos ya solo te queda resolver tu propia vida y el resto del problema :D.

### 3. Deadlock (Bloqueo mutuo)

Nuestro mayor enemigo. Si cada filósofo toma el tenedor de su izquierda y espera el de la derecha, todos están bloqueados eternamente. Es como cuando quedas con tus amigos para decidir dónde comer y todos dicen "a mí me da igual, decidid vosotros"... y acabáis muriendo de hambre.

Mi solución a este problema es simple aunque lo reconozco que no es la mejor. La solución es que cada filósofo par va a tener un pequeño delay a la hora de empezar a coger los tenedores. De esta manera si el filósofo 1 empieza a comer y el filósofo 2 no ha empezado a comer, el filósofo 2 no podrá coger el tenedor de la izquierda porque el filósofo 1 lo tiene cogido.


### Liberación de recursos

Cuando un filósofo ha terminado de comer, debe soltar ambos tenedores. Esto es como cuando terminas de comer en un restaurante y dejas el plato vacío en la mesa. En programación, esto se traduce en liberar los mutexes que has bloqueado.

```c
void soltar_tenedores() {
    pthread_mutex_unlock(&tenedor_mutex[id]);  // Suelta el tenedor izquierdo
    pthread_mutex_unlock(&tenedor_mutex[(id + 1) % 5]);  // Suelta el tenedor derecho
}
```
También es importante que se libere todos los recursos malloqueados (me acabo de inventar la palabra) al final del programa. Pero cuidado con esto ya que si usas valgrind con un input en el que los filósofos deberian de vivir valgrind hará que los filósofos mueran. Esto es por el lag que da valgrind al programa. Así que si usas valgrind ten cuidado con esto. De todas formas te recomiendo usarlo pero no te preocupes si ves que los filósofos mueren. Es normal.
Otra solución es usar la flag en el makefile de la siguiente manera:
```makefile
CFLAGS = -Wall -Wextra -Werror -fsanitize=thread
```
Esto hará que el programa se ejecute más lento pero no tendrás problemas con los filósofos. Aunque si usas esta opción no podrás usar valgrind. Así que tú decides.

Otra cosa importante es el hecho de que el hilo principal del programa no puede morir antes que los demás hilos. Si el hilo principal muere, todos los demás hilos también mueren. Esto es como si el cocinero se va de la cocina y deja a los ayudantes solos. No van a saber qué hacer. Y este hilo principal se va a encargar de recoger a todos los demás hilos para liberar los recursos que han sido asignados.

## ¿Cómo lo aplicamos en el mundo real?

En sistemas modernos, el multithreading está por todas partes:

- **Navegadores web**: Cada pestaña es un proceso con múltiples hilos.
- **Servidores**: Atienden miles de peticiones concurrentes.
- **Aplicaciones móviles**: Mantienen la interfaz responsiva mientras hacen tareas en segundo plano.

Un ejemplo en JavaScript usando Web Workers:

```javascript
// En el hilo principal
const worker = new Worker('tarea-intensa.js');

worker.onmessage = function(e) {
    console.log('La tarea ha finalizado con resultado:', e.data);
};

worker.postMessage('Inicia el cálculo');

// En tarea-intensa.js (ejecutado en otro hilo)
onmessage = function(e) {
    // Realizar cálculo intensivo...
    const resultado = 42;  // El sentido de la vida, según Douglas Adams
    postMessage(resultado);
};
```

## Conclusión

El multithreading es como una orquesta sinfónica donde cada músico (hilo) debe coordinarse perfectamente con los demás. Un solo error y toda la sinfonía puede derrumbarse.

El problema de los filósofos nos enseña lecciones fundamentales sobre cómo diseñar sistemas concurrentes robustos. La próxima vez que estés en una cena con amigos y falten tenedores, recuerda que estás experimentando un problema clásico de informática.

Como diría Sócrates si viviera en nuestra era: *"Solo sé que no sé nada... sobre sincronización de hilos"*.

Y tú, ¿te has enfrentado alguna vez a problemas de concurrencia en tus proyectos? ¿Cómo los has resuelto? Déjame tus comentarios y experiencias abajo.

Si te ha gustado este artículo, compártelo con tus amigos filósofos y programadores o con cualquiera que necesite leerlo. ¡Hasta la próxima!