---
title: 'Mis Primeros 3 Meses como Desarrollador: De Cero a Gestionar 5 Proyectos en Producción'
description: 'Una crónica honesta y sin filtros de mi viaje como desarrollador junior. Desde arreglar sistemas de notificaciones rotos hasta gestionar arquitecturas multi-timezone - esto es lo que nadie te cuenta sobre tu primer trabajo como programador.'
pubDate: '2025-11-24'
heroImage: '/blog-placeholder-5.jpg'
heroImageAlt: 'Desarrollador trabajando en múltiples proyectos'
tags: ['job']
lang: 'es'
---

Dejadme empezar con algo inesperado: **En mis primeros 3 meses como desarrollador sin experiencia profesional previa, terminé gestionando 5 proyectos en producción simultáneamente, arreglando bugs críticos que afectaban a más de 50 empleados, e implementando sistemas completos desde cero.**

Este no es un post para presumir. Es un baño de realidad sobre lo que los desarrolladores junior a veces enfrentan y, honestamente, ha sido la experiencia más intensa y gratificante de mi vida.

## Cómo Empezó Todo

Hace tres meses, entré en mi primer día como desarrollador en Internalia Group. Estaba nervioso, emocionado y listo para aprender. Lo que no esperaba era la curva de aprendizaje tan empinada que vendría: código legacy, sistemas en producción sirviendo a clientes reales, y la oportunidad de crecer rápidamente.

Esto es lo que esos 3 meses realmente fueron.

## Los Números No Mienten

Dejadme daros las métricas en bruto:

- **Más de 80 tareas** completadas en Jira
- **5 proyectos empresariales** en producción
- **~27 tareas/mes** de media
- **0 días** de caída crítica después de mis correcciones
- Tecnologías aprendidas desde cero: **Firebase/Firestore, GraphQL, FCM, manejo multi-timezone**

Para contexto, un junior típico a los 3 meses maneja quizás 1-2 proyectos con supervisión constante. Yo tenía cinco, completamente autónomo.

## Mi primer bug

Mi primer bug lo recuerdo como si fuese ayer, el problema era que las fechas se mostraban incorrectamente en un gráfico cuando cambiabas tu horario local del ordenador, lo podías ver siendo por ejemplo lunes te decía que era Domingo. Y sí como cualquier programador fuí a la zona donde se mostraban estas fechas y vi un Date. En ese momento sentí el verdadero terror. Como bien sabéis el objeto Date de JavaScript es uno de los más complejos y problemáticos de manejar, sobre todo cuando entran en juego las zonas horarias. Después de investigar un poco, descubrí que el problema radicaba en cómo se estaba parseando la fecha. El sistema estaba convirtiendo a UTC primero, luego aplicando la zona horaria, lo que causaba cambios de fecha inesperados. Lo solucioné cambiando la forma en que se parseaba la fecha, asegurándome de interpretar correctamente la zona horaria local del usuario antes de cualquier conversión. Este pequeño cambio resolvió el problema y me enseñó una valiosa lección sobre la importancia de manejar correctamente las zonas horarias en aplicaciones globales.

## Proyecto 1: Work Time App (WTA) - La Pesadilla de las Zonas Horarias

### El Bug que Afectó a Más de 50 Empleados

Si pensabáis que el error anterior de las fechas era grave, esperad a escuchar esto.

**El problema:** Los empleados en España (UTC+1) y El Salvador (UTC-6) veían fechas incorrectas en sus registros de control horario. Esto no era solo molesto - estaba afectando los cálculos de nómina. El problema era que directamente no había lógica de zona horaria en el sistema. Por lo que lo tuve que hacer de 0. Usé moment.js una librería de JavaScript para manejar fechas y horas de manera más sencilla y robusta. Después de muchas pruebas y errores ví lo que estaba implementando y era algo tal que así.

Después de investigar el código, encontré el culpable:

```javascript
// ANTES (incorrecto):
moment.utc(register.start).tz('Europe/Madrid')

// DESPUÉS (correcto):
moment(register.start, 'YYYY-MM-DD HH:mm:ss')
```

El problema era el parseo. El sistema estaba convirtiendo a UTC primero, luego aplicando la zona horaria, lo que causaba cambios de fecha.Y más importante, aprendí que las zonas horarias son la pesadilla de todo desarrollador. (Otra vez)

### Construyendo un Sistema Completo de Vacaciones desde Cero

Uno de mis mayores desafíos fue diseñar e implementar un sistema completo de gestión de vacaciones. No solo la UI - toda la arquitectura.

Propuse tres soluciones diferentes, evalué los pros y contras de cada una, e implementé la óptima. Esto es lo que construí:

**Vista de Administrador:**
- DataTables con filtrado en tiempo real
- Flujo de aprobación/rechazo
- Exportación a Excel/PDF/CSV
- Badges de estado (Pendiente/Aprobada/Rechazada)

**Vista de Empleado:**
- Formulario de solicitud con cálculo automático de días
- Vista de histórico de solicitudes
- Seguimiento de estado
- Comentarios opcionales

Entre las opciones estaban crear una tabla nueva lo que requería no reutilizar nada del código existente o modificar el sistema actual. Opté por modificar el sistema actual para mantener la coherencia y evitar duplicación de código. Así pude integrar todo perfectamente con la lógica existente.

### El Problema del Turno de Noche

Aquí va uno divertido: los empleados trabajando turnos nocturnos (23:00 - 07:00) no aparecían en el dashboard del día siguiente. ¿Por qué? Porque el sistema solo obtenía los registros de "hoy".

Mi solución fue innovadora (o al menos me gusta pensar eso):

```javascript
// Obtener registros de HOY
const todayRegisters = await fetchRegistries(dateToday);

// Obtener registros de AYER sin cerrar
const yesterdayRegisters = await fetchRegistries(dateYesterday)
    .then(data => data.filter(reg => !reg.end || reg.end === 'null'));

// Combinar ambos datasets
const allActiveRegisters = [...todayRegisters, ...yesterdayRegisters];
```

**Resultado:** 100% de precisión independientemente del horario del turno.

### El Bug de Integridad de Datos Históricos

Este fue crítico. Cuando un administrador cambiaba el nombre de un empleado en su licencia (digamos de Pablo a Enrique), **todos los registros históricos se actualizaban para mostrar el nuevo nombre**.

Imagina reportes de nómina mostrando "Enrique trabajó 8 horas el 1 de septiembre" cuando en realidad fue Pablo. Esto es una pesadilla de cumplimiento legal.

**La causa raíz:** La base de datos estaba haciendo JOINs en tiempo real, por lo que cambiar el nombre en la tabla `licenses` cambiaba retroactivamente todos los registros vinculados.

**Mi solución:** Desnormalización parcial con triggers.

```sql
-- Añadir nombre de empleado a la tabla registries
ALTER TABLE registries 
ADD COLUMN employee_name VARCHAR(255);

-- Trigger para guardar nombre en el momento del registro
CREATE TRIGGER save_employee_name
BEFORE INSERT ON registries
FOR EACH ROW
BEGIN
    SET NEW.employee_name = (
        SELECT name FROM licenses WHERE id = NEW.user_id
    );
END;
```

Ahora los registros históricos preservan el nombre en el momento en que fueron creados. Integridad de datos: **restaurada**.

### El Misterio de los 500 Registros

Un día, los clientes reportaron que no podían añadir más fechas no laborables. Después de investigar, descubrí algo interesante:

**El problema:** Había un límite hardcoded de 500 registros en las queries, combinado con `ORDER BY` que causaba que registros importantes quedaran fuera.

```sql
-- Query problemática:
SELECT * FROM registries 
WHERE date >= '2024-01-01' 
ORDER BY timestamp DESC
LIMIT 500  -- ❌ Límite que causaba pérdida de datos
```

**La causa raíz:** Sin acceso al servidor GraphQL ni a la base de datos de producción, no pude implementar la solución completa. Pero documenté el problema detalladamente, propuse soluciones (eliminar LIMIT, implementar paginación real, optimizar índices) y escalé el issue.

**Lección aprendida:** No todos los bugs se pueden arreglar inmediatamente, especialmente en arquitecturas distribuidas. La clave es documentar bien el problema para quien sí tenga los accesos necesarios.

### Auto-Cálculo de Horas: UX que Ahorra Tiempo

Uno de esos "pequeños" detalles que hace la diferencia:

Antes, los administradores tenían que calcular manualmente las horas semanales y mensuales cada vez que modificaban un horario. Tedioso y propenso a errores.

**Implementé:**

```javascript
function calculateScheduleHours() {
    let totalHours = 0;
    for(let day = 1; day <= 7; day++) {
        const hours = parseFloat($(`#hours_${day}`).val()) || 0;
        const pause = parseFloat($(`#pause_${day}`).val()) || 0;
        totalHours += (hours - pause);
    }
    $('#weekly_hours').val(totalHours.toFixed(2));
    $('#monthly_hours').val((totalHours * 4.33).toFixed(2));
}
```

**Resultado:** Cero errores de cálculo manual + ahorro de 10-15 minutos por modificación de horario.

A veces las mejores features son las que nadie nota porque "simplemente funcionan".

### Portal del Empleado: Bridging Mobile y Web

Desafío interesante: adaptar un sistema diseñado para webview móvil al panel web, manteniendo compatibilidad con ambos.

**El reto:** Los usuarios móviles usaban autenticación por PIN, mientras que los usuarios web usaban sesión estándar. Un mismo endpoint tenía que manejar ambos casos.

**Solución:** Detección de modo (Individual vs Oficina) y validación apropiada según el contexto.

**Debugging memorable:** Error 400 que resultó ser validación de PIN incorrecta. Horas de debugging para una línea de código. Bienvenido al desarrollo. 😅

## Proyecto 2: Málaga CF - Notificaciones Push del Infierno

Este proyecto casi me rompe. Y luego se convirtió en mi mayor logro.

### Heredando un Sistema Roto

Recibí un sistema de notificaciones push "funcional". Excepto que no funcionaba. Para nada. Cero documentación. Código roto. Y usuarios reales esperando notificaciones.

Tuve que:
1. Entender Firebase Cloud Messaging (FCM) desde cero
2. Debuggear por qué las notificaciones enviadas a "Todos" no llegaban a nadie
3. Implementar diferentes tipos de notificación (individual, grupal, por sector)
4. Crear notificaciones automáticas para eventos y deadlines

### La Gran Aventura de Debugging

Después de horas de debugging, encontré el problema:

```php
case 'Todos':
    $idinsert = -2;
    // BUG: ¡Faltaba obtener los tokens GCM!
    // Estaba enviando al último token obtenido, no a todos
    
    // FIX: Realmente obtener todos los tokens
    $sql = "faltaba coger los tokens gcm de la bd";
```

**De 0% a 100% de funcionalidad.** Las notificaciones push finalmente funcionaban.

### Los Recordatorios Automáticos de Deadline

Construí un cron job que se ejecuta cada 24 horas y envía recordatorios automáticos para eventos con deadlines próximos:

```php
function enviarNotificacionesDeadline() {
    $ahora = time();
    $ventana24h = $ahora + (24 * 60 * 60);
    
    $eventos = getFirestoreEvents();
    
    foreach($eventos as $evento) {
        if($evento['deadline'] >= $ahora && 
           $evento['deadline'] <= $ventana24h) {
            
            $mensaje = "⏰ ¡Último día!\nEl plazo para " .
                      $evento['title'] . " termina mañana.";
            
            enviarNotificacion($mensaje, $evento['id']);
        }
    }
}
```

Configurado en Google Cloud Scheduler, testeado exhaustivamente, y desplegado a producción.

### El Incidente de SendGrid

Aquí es donde aprendí sobre **la importancia de la documentación** de la manera difícil.

Integré SendGrid para confirmaciones por email. No pude probarlo en desarrollo porque la IP de desarrollo no estaba en la whitelist de SendGrid, lo que generaba un error 403. Envié un email al equipo advirtiendo sobre esto y recomendando configurar la whitelist para producción.

A pesar de la advertencia, se decidió proceder con el deploy en producción. Como era de esperar, los emails no funcionaron inicialmente, pero se resolvió rápidamente ajustando la configuración.

**Lección aprendida:** Documenta todo por escrito. Tener el registro del email me ayudó a aclarar la situación y asegurar una resolución eficiente.

### Colaboración con el Equipo Mobile

Una parte importante fue coordinar con Daniel, el desarrollador mobile. Especialmente en:

- **Testing push notifications:** Necesitábamos múltiples dispositivos para probar envíos masivos
- **Sincronización de datos:** Asegurar que la estructura Firestore funcionara para web y móvil
- **Debugging conjunto:** Identificar si un bug era frontend, backend, o coordinación entre ambos

**Lección:** El desarrollo moderno raramente es trabajo solitario. La comunicación entre equipos es tan importante como el código.

## Proyecto 3: Internalia Group - Web Corporativa

Rediseño de la web completo (Inglés). Me encargué de:
- Actualizaciones de la sección de servicios de IA (TuCiudad, TuFerIA, TuFeria)
- Casos de estudio y showcase de proyectos
- Mejoras de diseño responsive
- Integración de redes sociales

Bastante directo comparado con los otros, pero buena práctica para trabajo frontend.

## Proyecto 4: Working Day Suite (WDS)

### El Bug de los Emojis 🌹

Lo usuarios no podían guardar formularios con emojis. Lo que causaba que clientes no pudieran enviar los pedidos correctamente. Junto al equipo de aplicaciones descubrimos que el emoji de rosa (🌹) estaba causando errores.

La solución borrar la transacción del emoji y coordinar con el equipo de aplicaciones móviles el bloqueo de esos caracteres. Tuve que usar herramientas de debugging de la transacción y herramientas como Postman para replicar el error y confirmar la solución.

También mi primer bug de las fechas fue en este proyecto, donde aprendí aún más sobre el manejo de zonas horarias.

En este proyecto también aprendí a hacer presupuestos técnicos para clientes, algo que no había hecho antes. Bueno un poco pero era más informal. Junto a los presupuestos también realicé alguna documentación de la API y algunos minor bugs que había que arreglar. Como duplicados en tablas del front que estaban causando Out of index errors.

### La Optimización de Exportación del Tracker

Cuando se exportaban más de 1 mes de datos de tracking GPS, los archivos eran masivos.

**Solución:** Cuando el rango de fechas > 30 días, solo exportar coordenadas (lat, lng, fecha), omitir timestamps completos y metadata.

```php
if($dateRange > 30) {
    // Solo coordenadas, reducir tamaño de archivo
    $export = array('lat', 'lng', 'date');
} else {
    // Exportación completa
    $export = array('lat', 'lng', 'timestamp', 'user', 'activity');
}
```

Ahorró a los clientes horas de tiempo de procesamiento semanalmente.

## Las Habilidades que Dominé (Frenéticamente)

### Tecnologías Aprendidas desde Cero:
- **Firebase/Firestore:** 3 días hasta estar listo para producción
- **Notificaciones Push FCM:** 1 semana hasta sistema completo
- **Manejo de timezone con Moment.js:** 2 días hasta arreglar bug crítico
- **Queries GraphQL:** 1 día hasta queries funcionales

### Habilidades Desarrolladas:
- **Arquitectura multi-timezone**
- **Diseño de base de datos NoSQL** (Firestore)
- **Sistemas de notificaciones push** (FCM)
- **Arqueología de código legacy** (leer código sin documentar)
- **Debugging de producción bajo presión**
- **Documentación y testing de APIs**

## Lo que Nadie te Cuenta sobre tu Primer Trabajo como Dev

### 1. El Aprendizaje Autónomo es Poderoso

Trabajé de manera muy autónoma, lo que me empujó a desarrollar habilidades de investigación. Google, Stack Overflow, documentación oficial y mucho ensayo y error se convirtieron en mis mejores herramientas.

**¿Me hizo aprender más rápido?** Absolutamente. **¿Desarrollé capacidad de resolver problemas?** Sin duda.

### 2. Los Bugs de Producción Dan Miedo

La primera vez que te das cuenta de que tu código está corriendo en producción, afectando a usuarios reales y dinero real... eso es un nivel diferente de responsabilidad.

### 3. La Documentación es tu Mejor Aliada

En cualquier proyecto, especialmente cuando trabajas con sistemas complejos, documentar es crucial.

**La lección:** Documenta todo. Cada advertencia, cada bloqueador, cada decisión. Por escrito. Esto no solo te protege, sino que ayuda a todo el equipo a entender las decisiones técnicas tomadas.

### 4. El Síndrome del Impostor es Real

Arreglé bugs críticos afectando a más de 50 empleados. Construí sistemas completos desde cero. Gestioné 5 proyectos simultáneamente.

Y **aún así** sentía que no tenía ni idea de lo que estaba haciendo la mitad del tiempo.

Eso es normal.

### 5. Aprenderás Más en 3 Meses que en 2 Años de Tutoriales

Ninguna cantidad de cursos online te prepara para:
- Debuggear un sistema de notificaciones push roto sin documentación
- Arreglar bugs multi-timezone en producción
- Diseñar arquitectura de base de datos para integridad de datos
- Gestionar múltiples peticiones urgentes simultáneamente

Aprendes haciendo. Y a veces, rompiendo cosas.

## La Evaluación Honesta: ¿Soy Realmente Bueno?

Dejadme ser real: no lo sé.

Lo que **sí sé** es:
- Completé tareas que nadie esperaba de un junior
- Resolví bugs críticos independientemente
- Implementé features complejas desde cero
- Aprendí nuevas tecnologías en días, no meses
- Trabajé sin supervisión exitosamente

**Estándar de la industria para un junior de 3 meses:**
- Operaciones CRUD simples con supervisión
- Corrección de bugs con guía
- 1 proyecto principal
- Muchas preguntas a seniors
- Code reviews constantes
- ~10 tareas/mes

**Lo que yo hice:**
- Bugs críticos de producción independientemente
- Features complejas (push, vacaciones, multi-timezone)
- 5 proyectos simultáneos
- Cero supervisión
- Cero code reviews
- 27 tareas/mes

Vosotros decidís.

## Lo que Me Llevo

### Habilidades Técnicas:
✅ Manejo multi-timezone
✅ Diseño de base de datos NoSQL
✅ Sistemas de notificaciones push
✅ Mantenimiento de código legacy
✅ Debugging de producción
✅ Integración de APIs

### Habilidades Profesionales:
✅ Autonomía completa
✅ Gestión de prioridades
✅ Disciplina de documentación
✅ Escalado de issues
✅ Gestión de presión

### Lecciones de Vida:
✅ Puedes aprender cualquier cosa si lo necesitas
✅ Documenta todo por escrito
✅ Los errores de producción no son el fin del mundo
✅ Pide ayuda cuando estés bloqueado >2 días
✅ Tu valor no lo define una empresa

## ¿Qué Sigue?

Después de esta experiencia increíble, estoy emocionado por las oportunidades que vienen. He aprendido que puedo adaptarme rápidamente y enfrentar desafíos complejos.

Estos 3 meses me enseñaron que puedo manejar mucho más de lo que pensaba, y estoy listo para el siguiente nivel.

## Pensamientos Finales

A cada desarrollador junior leyendo esto: **eres capaz de más de lo que piensas.**

Serás lanzado a situaciones para las que no estás listo. Te enfrentarás a bugs que parecen imposibles. Sentirás que te estás ahogando.

Y entonces, de alguna manera, lo resolverás.

Ese es el trabajo.

¿Pero también? **Conoce tu valor.** Has aprendido, has crecido, y has demostrado de lo que eres capaz. Eso tiene valor real en el mercado.

Busca oportunidades que te permitan seguir creciendo.

**La aventura continúa.** 🚀

---

*¿Quieres conectar? Encuéntrame en [LinkedIn](https://linkedin.com/in/raul-casado) o echa un vistazo a mis proyectos en [GitHub](https://github.com/RaulCasado). Siempre feliz de charlar con otros desarrolladores*
