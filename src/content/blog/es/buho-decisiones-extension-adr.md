---
title: 'Búho de Decisiones: qué significa guardar bien un ADR'
description: 'Un formulario que guardaba Markdown acabó necesitando pruebas de concurrencia, reservas por número y decisiones sobre errores parciales. Así está evolucionando mi extensión de VS Code.'
pubDate: '2026-10-25'
heroImage: '../../../assets/blog/buho-notas-stock.webp'
heroImageAlt: 'Cuaderno abierto y lápiz junto a un portátil y un teléfono sobre una mesa blanca'
tags: ['web_development', 'devops']
lang: 'es'
---

Dos pulsaciones en Guardar podían acabar con dos decisiones distintas usando el mismo número. Si además tenían el mismo título, una podía sobrescribir a la otra.

Mi extensión de VS Code solo estaba guardando Markdown. Precisamente por eso el fallo era fácil de subestimar: el formulario se cerraba, el archivo existía y parecía que todo había ido bien.

El proyecto se llama **Búho de Decisiones**. Permite registrar decisiones técnicas junto al código, guardar notas y volver desde una referencia al documento que explica una elección. Durante el desarrollo he ido resolviendo con Claude Code preguntas que necesitaba entender antes de seguir: por qué una cola no cubría dos ventanas, qué reservaba `wx` o por qué había que releer después de conseguir el candado.

Esta es la historia de ese guardado y de los tests que lo hicieron más preciso. También del siguiente problema, todavía a medio integrar: qué ocurre cuando una decisión nueva reemplaza a otra y hay que actualizar varios archivos.

## Para qué sirve guardar una decisión de arquitectura

Un **ADR**, Architecture Decision Record, conserva el contexto de una decisión, la opción elegida, las alternativas y sus consecuencias. El código muestra qué se está usando; el documento ayuda a entender por qué tenía sentido elegirlo y cuándo habría que revisarlo.

En Búho cada decisión es un Markdown numerado dentro de `.decisions/`. El formulario recoge contexto, decisión tomada, alternativas e intención futura, además de título y categoría. Un ejemplo adaptado del propio proyecto sería:

```md
---
id: 0003
categoria: arquitectura
fecha: 2026-10-17
status: decidido
titulo: Reservar el número antes de guardar
---

## Contexto
Dos guardados pueden calcular el mismo número y perder contenido.

## Decisión tomada
Reservar el ID con un archivo creado de forma exclusiva.

## Alternativas consideradas
Una cola en memoria no coordina dos procesos de extensión.

## Intención futura
Probar el recorrido completo con varios procesos y revisar
la colisión de números entre ramas de Git.
```

El bloque entre `---` es el **frontmatter**, los metadatos. Después viene el texto que puedo leer y editar como cualquier otro Markdown. El ejemplo resume el ADR real de la reserva; no es una copia literal.

Los archivos pueden versionarse junto al código y siguen siendo legibles aunque deje de utilizar la extensión. Ese formato también deja al usuario editarlos a mano, lo que obliga a validar lo que leo y a convivir con cambios externos.

Cuando hay varias decisiones aparecen otras necesidades: saber cuáles siguen vigentes, cuáles requieren revisión y qué documento sustituyó a uno anterior. Búho intenta llevar esas operaciones al editor, sin añadir un backend.

### El número también se utiliza desde el código

La extensión reconoce una referencia como esta, con un número de ejemplo:

```ts
// @adr 7
```

**CodeLens** es la función de VS Code que permite poner un enlace sobre esa línea. Búho busca la decisión y ofrece abrirla, o indica que no la encuentra. También reconoce `@nota` y `@todo` para capturar texto como nota o tarea.

Por eso un ID duplicado tiene consecuencias más allá del orden de la carpeta: `@adr 3` deja de identificar una decisión inequívoca.

## La carrera entre leer y escribir

El guardado calculaba el siguiente número leyendo los archivos y sumando uno al máximo. Después escribía el nuevo documento:

```text
Leer nombres → calcular máximo + 1 → escribir Markdown
```

Entre esas operaciones había varios `await`. Mientras una lectura espera, otro guardado puede avanzar. No hace falta ejecutar dos líneas de JavaScript al mismo instante para que las operaciones se intercalen.

Con `0001` y `0002` en la carpeta, el fallo era este:

| Paso | Guardado A | Guardado B |
| --- | --- | --- |
| 1 | Lee máximo 2 | |
| 2 | | Lee máximo 2 |
| 3 | Elige 3 | Elige 3 |
| 4 | Escribe | Escribe |

Si los títulos eran diferentes, podían quedar `0003-usar-docker.md` y `0003-usar-kafka.md`. Si eran iguales, coincidía el nombre completo y la escritura podía reemplazar el contenido anterior.

Pedí a Claude un ejemplo de esa carrera. Después pregunté qué cambiaba entre un proceso y dos ventanas. Cada ventana puede tener su propio proceso de extensión: una cola guardada en la memoria de uno no coordina al otro.

Había que definir primero qué quería proteger: **el número compartido por los nombres**, además del contenido de cada archivo.

## El test tenía que comprobar que quedaban las dos decisiones

La prueba prepara dos documentos anteriores y lanza dos guardados sin esperar a que termine el primero. Este fragmento procede del test del proyecto; necesita su preparación de filesystem simulado y no se puede ejecutar por sí solo:

```ts
await Promise.all([
  saveDecision(buildDecision('Usar Docker', 'contexto A')),
  saveDecision(buildDecision('Usar Docker', 'contexto B'))
]);

expect(files.size).toBe(4);
const contents = [...files.values()].join('\n');
expect(contents).toContain('contexto A');
expect(contents).toContain('contexto B');
```

La condición de éxito era conservar los dos contextos nuevos y los dos documentos antiguos. Comprobar solo que la promesa se resolvía habría dejado pasar la pérdida.

Otro caso utiliza títulos diferentes y exige IDs distintos. Así cubríamos las dos formas del fallo: sobrescritura y referencia ambigua.

También pregunté por `Promise.all`. Con dos `await` secuenciales, A termina antes de empezar B y el test puede no provocar la carrera. Aquí interesa solapar operaciones asíncronas. El filesystem simulado cede ejecución en puntos concretos con `setImmediate`, dejando que avance el otro guardado.

<details>
<summary>Una miniatura del fallo que puedes ejecutar sin tocar archivos</summary>

Este ejemplo didáctico usa un `Map` en memoria. Representa el caso de dos escrituras al mismo destino; no reproduce toda la extensión ni utiliza su código. Guárdalo como `carrera.mjs` en una carpeta de pruebas y ejecútalo con `node carrera.mjs`:

```js
import assert from 'node:assert/strict';

const files = new Map([[1, 'anterior A'], [2, 'anterior B']]);
const tick = () => new Promise(resolve => setImmediate(resolve));

async function saveUnsafe(context) {
  const id = Math.max(...files.keys()) + 1;
  await tick();
  files.set(id, context);
}

await Promise.all([saveUnsafe('contexto A'), saveUnsafe('contexto B')]);

assert.equal(files.size, 4); // Falla: quedan 3; ambos eligieron el ID 3.
```

El fallo de la aserción es el resultado esperado del ejemplo. Para cubrir este riesgo en tu proyecto, fuerza el solape en una prueba aislada y comprueba que sobreviven ambas entradas. Hacer pasar una ejecución secuencial no ejercita el mismo caso.

</details>

## Por qué reservamos el ID con otro archivo

Elegimos crear una reserva como `.0003.lock` usando el modo `wx` de Node: crear el archivo para escribir, de forma exclusiva. Si ya existe, se recibe `EEXIST`. La comprobación y la creación se hacen como una operación indivisible del filesystem local utilizado.

Aplicarlo solo al Markdown habría cubierto nombres idénticos. Con títulos distintos, los dos nombres completos podrían crearse sin colisión. La reserva depende únicamente del ID.

Estas fueron las alternativas reales:

| Opción | Ventaja | Límite para este problema |
| --- | --- | --- |
| Desactivar Guardar | Evita el doble clic normal | No coordina otra ventana |
| Cola en memoria | Ordena guardados de un proceso | Otra ventana tiene otra memoria |
| Creación exclusiva del Markdown | Protege el mismo nombre | Dos títulos pueden compartir ID |
| Reserva por ID | Comparte una exclusión entre escritores | Depende del filesystem y del protocolo común |
| IDs con hash o fecha | Evitan parte de la colisión numérica | Cambian referencias humanas y archivos existentes |

Se implementó la reserva y también se desactiva Guardar al enviar el formulario. Pedí incluir esa defensa del botón en el ADR: evita una causa del solape, mientras la reserva sigue cubriendo otros llamadores.

Los números legibles eran útiles para `@adr 7`. Si coordinar escrituras distribuidas o ramas independientes fuese el requisito central, habría que reconsiderar esa identidad antes de seguir ampliando el candado local.

## La parte que faltaba: releer con el candado adquirido

Conseguir la reserva todavía dejaba una carrera:

1. B calcula que el siguiente número es 3.
2. A reserva 3, escribe el ADR y libera.
3. B consigue ahora la reserva 3, que vuelve a estar disponible.
4. Si B usa su cálculo antiguo, repite el número.

Por eso se **vuelve a escanear la carpeta bajo la reserva**. Solo se escribe si el candidato sigue libre; si ya apareció, se libera y se reintenta con otro.

Hay un test que hace aparecer `0003` entre la primera lectura y ese reescaneo. Espera una única escritura nueva a `0004`. Otro fuerza veinte intentos fallidos y exige un error claro sin escribir.

Ese fue un aprendizaje más útil que quedarme con «usa un lock»: tenía que comprobar qué dato podía haberse quedado antiguo incluso después de obtenerlo.

### Cerrar el archivo no elimina la reserva

`fs.promises.open` devuelve un **FileHandle**, un objeto que representa el archivo abierto. `close` libera ese recurso, pero el archivo sigue existiendo. La reserva dura hasta que otra operación lo borra.

Pregunté por esa diferencia y por qué `fs.promises.writeFile` con una ruta gestiona apertura y cierre, mientras que al conservar un FileHandle tengo esa responsabilidad. La [API de Node](https://nodejs.org/api/fs.html#filehandlewritefiledata-options) muestra el uso con cierre explícito.

La escritura del ADR queda en un `try` con liberación en `finally`. Los tests comprueban también los errores: si el documento se guardó y después falla la limpieza, el resultado debe conservar que el guardado ocurrió. Si fallan ambas cosas, se mantiene el error de escritura en lugar de ocultarlo con el de liberación.

Las reservas antiguas se limpian por edad, con un umbral de 60 segundos. Ese compromiso deja un límite importante: la edad no demuestra que el dueño haya muerto. Si un proceso vivo se pausa y pierde su reserva por esa limpieza, el protocolo deja de garantizar la exclusión que buscábamos.

Todos los escritores tienen que respetar la misma reserva. El candado tampoco coordina una edición manual o una operación externa que lo ignore.

## Qué prueban un mock, un fake y el disco real

Separé la lógica que conoce el Markdown del acceso a archivos y de los comandos del editor. Así puedo probar numeración y estados sin abrir VS Code. La separación tiene un efecto concreto: controlo qué devuelve una lectura y compruebo si debía haber una escritura.

Un **mock** sustituye una dependencia con respuestas controladas y permite observar sus llamadas. Un **fake** implementa una versión pequeña, como los archivos y reservas en memoria de la prueba concurrente.

En ese fake, comprobar y añadir la reserva ocurre sin un `await` entre ambos pasos. Si introdujera ahí otra carrera, dejaría de representar la propiedad que intenta simular.

| Pruebas existentes | Qué comprueban |
| --- | --- |
| Store con dependencias sustituidas | Numeración, formato, transiciones, errores y conservación del texto |
| Guardados solapados con fake | Que las intercalaciones ensayadas conservan ambos contenidos e IDs |
| Primitivas con directorios temporales reales | Semántica de `wx`, liberación y limpieza del filesystem |

La prueba con disco lanza **20 intentos de obtener el mismo candado** y exige exactamente un ganador. Eso comprueba una propiedad que el fake presupone. Sigue siendo una prueba desde un proceso; falta integrar el recorrido completo de `saveDecision` entre procesos o ventanas reales.

En workspaces virtuales que no ofrecen esa primitiva local, la extensión avisa y sigue una ruta sin la reserva. Es una garantía más débil y debe permanecer visible para quien utilice ese entorno.

## La prueba manual que abrió otro problema

Después probé el editor con varias carpetas de proyecto abiertas, un workspace *multi-root*. Me preguntó tres veces dónde guardar: una al abrir y dos al crear.

El refresh inicial consultaba pendientes; el guardado volvía a resolver el destino; y el refresh posterior podía preguntar otra vez. Los tests del store habían comprobado reglas, pero no ese recorrido del usuario.

Se separó la resolución **silenciosa** de la que puede abrir un selector. Una consulta de fondo puede desconocer todavía la carpeta; debe representar ese estado sin mostrar un diálogo ni anunciar falsamente cero pendientes.

También se pasó el destino ya resuelto a las operaciones que lo necesitaban y se recordó la elección durante la sesión. Los tests comprueban que se reutilice, que cancelar no la establezca y que se pida otra si la carpeta deja de pertenecer al workspace.

Hubo un caso especialmente concreto: dos carpetas llamadas `api`. El selector trabajaba con etiquetas y después buscaba la primera coincidencia por nombre. Podía elegir la equivocada. La opción pasó a conservar el objeto de carpeta completo, sin reconstruir su identidad a partir del texto visible.

Aquí mis preguntas sobre string, `Uri`, `WorkspaceFolder`, `.toString()` y `.fsPath` dejaron de ser una discusión de tipos. Estaban relacionadas con guardar en el proyecto correcto y con distinguir un recurso virtual de una ruta local. Tras los cambios hice una prueba manual y confirmé que el selector preguntaba cuando correspondía.

## Stryker obligó a decidir qué hacer con los documentos rotos

Vitest ejecuta las pruebas escritas. **Stryker modifica deliberadamente pequeñas partes del código** y repite los tests para ver si detectan esos cambios. Un mutante que sobrevive puede señalar una comprobación ausente o una modificación equivalente que no cambia el comportamiento.

Un commit de agosto documenta una mejora del mutation score del store de 78,51 % a 97,87 %, junto con decisiones funcionales: informar de archivos rotos que antes desaparecían del listado y detectar IDs duplicados sin destruir documentos.

Esos casos importaban porque el Markdown se puede editar a mano. Un archivo con nombre de ADR y frontmatter roto merece un error visible; una copia con otro nombre puede quedarse fuera del listado. De igual forma, un test de cambio de estado comprueba que solo se modifique la línea `status` del frontmatter, aunque el mismo texto aparezca en otro campo.

Los últimos registros de desarrollo muestran **222 tests pasando**, lint y compilación correctos, y un 100 % de mutación en el ámbito analizado. Son resultados históricos. El análisis se concentra en store y utilidades; no cubre toda la interfaz. Además, [Stryker cuenta los timeouts como mutantes detectados](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), y había uno en esas ejecuciones.

El fallo de los tres selectores explica mejor ese límite que el porcentaje: todavía necesitaba abrir la extensión y recorrer la acción real.

## Cuando una decisión deja de servir

Búho reconoce `decidido`, `pendiente-revisar`, `revisado`, `obsoleta` y `reemplazada`. Una pendiente está en vigor pero necesita revisión. Una obsoleta deja de aplicar; una reemplazada tiene una sustituta concreta. Revisar añade historia al documento, conservando el razonamiento anterior.

Los cambios permitidos están en una tabla común. Marcar obsoleta pide una razón, y reactivar devuelve a pendiente de revisión. La interfaz ayuda a rellenar bien; el dominio valida también para proteger llamadas que no pasen por ese formulario.

Hay un borde pequeño que muestra por qué: al actualizar una relación, un valor con un salto de línea podría introducir otra clave en el frontmatter. Los tests rechazan esos saltos y comprueban que el cuerpo permanezca intacto. Declarar un tipo TypeScript no valida automáticamente un archivo escrito a mano.

### Relacionar decisiones sin inventar dependencias

El diseño utiliza `reemplaza-a`, `reemplazada-por` y `muere-con`. Este último declara de forma expresa que una decisión pierde sentido al dejar de aplicar otra.

Un ejemplo ficticio del diseño: la decisión 10 sustituye a la 3; la 8 declara `muere-con: 0003`. La intención es marcar la 3 como reemplazada por la 10 y la 8 como obsoleta por la cascada. No se retira cualquier decisión que simplemente comparta contexto con la 3.

Se eligió un único ID de reemplazo. Admitir listas ampliaba el parser, las validaciones y los fallos parciales. El parser actual trabaja con pares sencillos `clave: valor`, no con toda la sintaxis YAML.

Ese ejemplo describe el alcance acordado. La cascada todavía no está implementada.

## El siguiente límite: crear un archivo y fallar al actualizar otro

Ya existen `planReplacement` y `applyReplacement`. El primero valida el objetivo sin escribir. Los tests distinguen ausente, roto, duplicado o con estado incompatible. El segundo puede marcar el objetivo como reemplazado y añadir el puntero y la sección correspondientes.

La aplicación vuelve a leer el estado. Si ya cambió, rechaza la operación. Todavía puede ocurrir otro cambio entre esa lectura y la escritura: ambas no forman una única operación indivisible.

**El formulario y `saveDecision` aún no conectan esos helpers para completar el reemplazo.** Tener esas piezas y sus tests no termina el flujo del usuario.

El diseño completo coordinará al menos dos documentos. Si se guarda el ADR nuevo pero falla la actualización del anterior, hay contenido creado y una operación incompleta. Ese resultado necesita un mensaje y una recuperación distintos del caso en que no se escribió nada.

Se acordó una fase **Plan**, solo de lectura, para validar el conjunto, y una fase **Apply**, que escribe archivo a archivo. Se descartó un índice JSON paralelo porque el Markdown editable se convertiría en otra fuente de verdad que reconciliar. También se descartó un rollback propio para este alcance: intentar deshacer lo escrito requiere más escrituras que pueden volver a fallar. Git ayuda a recuperar el historial, pero la extensión sigue teniendo que explicar qué ocurrió.

Por eso el escaneo de consistencia está dentro de la primera versión: debe encontrar punteros ausentes, relaciones incompletas y ciclos. Esa recuperación y su comunicación todavía son trabajo pendiente.

## Qué falta para la primera versión publicable

Al cerrar esta etapa los cambios descritos estaban confirmados en Git. Crear decisiones y notas, revisar, abrir referencias, reservar números en filesystem local y recordar la carpeta por sesión están implementados. Obsoleta y reactivar funcionan sin cascada.

Para completar el MVP, el mínimo producto viable que hemos acordado, faltan estos hitos:

- Unir creación, formulario y reemplazo, distinguiendo un guardado parcial de una operación completa.
- Implementar `muere-con`, proteger el recorrido frente a ciclos y permitir deshacer reemplazos.
- Añadir el aviso de sustitución en CodeLens y el escaneo de consistencia.
- Probar los fallos parciales, el recorrido entre ventanas y la conservación del formulario al fallar: hoy se cierra incluso con error.

El grafo visual, la renumeración entre ramas y el acceso desde agentes son líneas futuras. Dos ramas todavía pueden crear su `0003` por separado; el candado local no coordina sus historias ni decide a qué ADR pertenecen las referencias tras el merge. Las actualizaciones de notas y estados tampoco han adquirido exclusión mutua solo por compartir helpers.

Para una herramienta basada en archivos, «guardar bien» acaba incluyendo identidad, conservación del texto y claridad ante un fallo. Lo que puedo trasladar a otro proyecto es el método que nos ayudó aquí: escribir la intercalación, forzarla en un test y comprobar los datos que deben sobrevivir. Después, abrir la aplicación y recorrer el caso que el mock no representa.

El siguiente cambio de Búho está en ese mismo punto: el usuario debe poder distinguir que se creó su documento de que terminaron todas las actualizaciones del reemplazo. Hasta cerrar ese recorrido y sus pruebas, la primera versión sigue pendiente.

*Foto de portada: [JESHOOTS.COM en Unsplash](https://unsplash.com/photos/an-open-empty-notebook-on-a-white-desk-next-to-an-iphone-and-a-macbook-pUAM5hPaCRI), bajo la [licencia Unsplash](https://unsplash.com/license). Fotografía de archivo sobre la toma de notas; no es una captura de Búho.*
