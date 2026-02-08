---
title: 'Cómo monté un servidor de Minecraft modded con Docker en un PC antiguo'
description: 'Guía completa para desplegar un servidor de Minecraft con Cobblemon usando Docker Compose en hardware limitado. Desde la configuración inicial hasta la optimización de RAM, gestión de mods por terminal y trucos de administrador.'
pubDate: '2026-02-08'
heroImage: '/minecraft.webp'
heroImageAlt: 'Servidor de Minecraft con Docker'
tags: ['docker', 'linux', 'minecraft']
lang: 'es'
---

# Cómo monté un servidor de Minecraft modded con Docker en un PC antiguo

## Introducción

Hace unas semanas me propuse algo que mucha gente piensa que necesita un servidor dedicado caro: montar un **servidor de Minecraft modded (Cobblemon)** estable para jugar con amigos. Lo hice en un PC viejo que tengo en casa al que cariñosamente llamo "Servercito", corriendo **Ubuntu Server**, sin gastar ni un euro en hosting.

Este post cubre todo el proceso: desde la configuración de Docker hasta la optimización de RAM, gestión de mods por terminal, trucos de administración y los problemas reales que tuve que resolver. Si tienes un PC viejo por casa y ganas de montar algo, esto es para ti.

## La Filosofía "Low-Spec": No necesitas un super hardware

### El reto

Mi "Servercito" no es ninguna bestia. Es un PC antiguo con recursos limitados, pero suficiente para correr un servidor de Minecraft modded para un grupo pequeño de amigos. La clave no está en tener el mejor hardware, sino en **optimizar lo que tienes**.

### Gestión de memoria: ZRAM y Swap

Uno de los primeros problemas fue la RAM. Java es un monstruo consumiendo memoria, y si el sistema operativo se queda sin RAM, el **OOM Killer** (Out of Memory) de Linux mata el proceso sin piedad. Para evitar esto:

- **ZRAM**: Comprime la RAM en tiempo real. En lugar de desperdiciar RAM con datos sin comprimir, ZRAM crea un bloque de swap comprimido directamente en memoria. Esto te da más margen antes de que el sistema empiece a usar el disco.
- **Swap en disco**: Como red de seguridad adicional. Si ZRAM se llena, el sistema usa swap en disco antes de matar procesos.

### Monitorización con htop

`htop` se convirtió en mi mejor amigo. Es un monitor de recursos en tiempo real que te muestra exactamente cuánta RAM y CPU está usando cada proceso. Imprescindible para detectar si el servidor se está pasando de memoria.

```bash
htop
```

Un vistazo rápido y sabes si el servidor va bien o si necesitas ajustar algo.

## El Corazón: Docker y Docker Compose

### Por qué Docker

Docker te permite levantar y tirar el servidor en segundos. Si algo se rompe, borras el contenedor y vuelves a empezar sin tocar tu sistema. Los backups son tan fáciles como copiar una carpeta. Y lo mejor: **todo queda aislado**, no necesitas instalar Java "a pelo" en tu sistema.

### La imagen itzg/minecraft-server

Es el **estándar de la industria** para servidores de Minecraft en Docker. Soporta Vanilla, Fabric, Forge, Modrinth modpacks y un montón más. Es increíblemente configurable a través de variables de entorno.

### docker-compose vs docker compose

Un detalle que confunde a mucha gente:

- `docker-compose` (con guión): Es la **versión antigua** (v1), escrita en Python. Está deprecada.
- `docker compose` (sin guión): Es la **versión moderna** (v2), un plugin nativo de Docker escrito en Go. Más rápida y la que debes usar.

Si escribes `docker-compose` y te funciona, probablemente tengas ambas instaladas, pero usa siempre `docker compose`.

### El docker-compose.yml

Este es el archivo que controla todo. Aquí va mi configuración (adaptada):

```yaml
version: '3.8'

services:
  minecraft:
    container_name: minecraft-cobbleverse
    image: itzg/minecraft-server
    restart: unless-stopped
    ports:
      - "25565:25565"
    environment:
      EULA: "TRUE"
      TYPE: "MODRINTH"
      VERSION: "1.21.1"
      MEMORY: "6G"
      MODRINTH_MODPACK: "cobbleverse"
      MODRINTH_MODPACK_VERSION: "1.7.0c"
      MAX_PLAYERS: "5"
      ENABLE_WHITELIST: "true"
      WHITELIST: "TuUsuario"
      OPS: "TuUsuario"
      OVERRIDE_SERVER_PROPERTIES: "true"
      USE_AIKAR_FLAGS: "true"
      ENABLE_ROLLING_LOGS: "true"
      REMOVE_OLD_MODS: "true"
    mem_limit: 7g
    volumes:
      - ./data:/data
    tty: true
    stdin_open: true

  duckdns:
    image: lscr.io/linuxserver/duckdns
    container_name: duckdns
    environment:
      - SUBDOMAINS=tu-subdominio
      - TOKEN=tu-token-aqui
    restart: unless-stopped
```

Puntos clave:

- **`MEMORY: "6G"`**: Cuánta RAM le das al servidor de Java. Ajústala según tu hardware.
- **`mem_limit: 7g`**: Límite duro de Docker. Si el contenedor intenta usar más de 7GB, Docker lo frena. Esto **protege tu sistema host** de que Java se coma toda la RAM.
- **`USE_AIKAR_FLAGS: "true"`**: Activa los flags de Aikar, que optimizan el Garbage Collector de Java para servidores de Minecraft. Menos lag, menos picos de memoria.
- **`OVERRIDE_SERVER_PROPERTIES: "true"`**: Fuerza a que las variables de entorno sobreescriban el `server.properties` existente. Sin esto, cambiar `MAX_PLAYERS` no tendría efecto si el archivo ya existe.

### DuckDNS: IP dinámica resuelta

Si tu ISP te da una IP dinámica (como la mayoría), necesitas un servicio de DNS dinámico para que tus amigos puedan conectarse siempre a la misma dirección. **DuckDNS** es gratuito y lo metimos directamente en el `docker-compose.yml` como otro servicio. Así se actualiza automáticamente sin scripts externos ni crons.

## Gestión de Mods por Terminal: Ferium

### Qué es Ferium

Cuando tu servidor no tiene interfaz gráfica (es un Ubuntu Server), gestionar mods a mano es tedioso. **Ferium** es una herramienta CLI que te permite añadir, actualizar y eliminar mods de Minecraft directamente desde la terminal.

```bash
# Añadir un mod
ferium add lithium

# Actualizar todos los mods
ferium upgrade

# Listar mods instalados
ferium list
```

### Mods esenciales de rendimiento

En hardware limitado, estos mods son obligatorios:

- **Lithium**: Optimiza la lógica del juego (IA de mobs, pathfinding, redstone). Sin impacto visual.
- **FerriteCore**: Reduce el consumo de RAM drásticamente optimizando cómo se almacenan los datos internos.
- **ModernFix**: Arregla un montón de ineficiencias del juego base. Complementa a Lithium.
- **Krypton**: Optimiza el networking. Comprime mejor los paquetes y reduce el ancho de banda.

### Mods técnicos útiles

- **Chunky**: Pre-genera el mundo para evitar lag cuando los jugadores exploran zonas nuevas. Generar chunks sobre la marcha es lo que más lag causa.
- **Carpet Mod**: Permite crear bots con `/player spawn` que mantienen zonas cargadas. Muy útil para granjas automáticas (como la de miel) sin necesidad de tener un cliente real conectado.

## Trucos de "Admin Ninja"

### Gestión sin entrar al juego

No necesitas abrir Minecraft para administrar tu servidor. Desde la terminal:

```bash
# Añadir a alguien a la whitelist
docker exec -i minecraft-cobbleverse mc-send-to-console whitelist add NombreJugador

# Dar permisos de administrador
docker exec -i minecraft-cobbleverse mc-send-to-console op NombreJugador

# Ejecutar cualquier comando del servidor
docker exec -i minecraft-cobbleverse mc-send-to-console say Hola a todos!
```

### Inspeccionar datapacks sin descomprimir

Un truco muy útil: puedes inspeccionar el contenido de datapacks y JARs sin descomprimirlos usando `unzip`. Esto fue especialmente útil para ver los equipos de los líderes de gimnasio de Cobblemon y sus stats (IVs/EVs):

```bash
# Ver la lista de archivos dentro de un zip
unzip -l COBBLEVERSE-RCT-DP.zip

# Ver el contenido de un archivo específico sin extraer
unzip -p COBBLEVERSE-RCT-DP.zip ruta/al/archivo.json | python3 -m json.tool
```

### Logs: tu ventana al servidor

```bash
# Ver los últimos 20 mensajes del log
docker logs --tail 20 minecraft-cobbleverse

# Seguir los logs en tiempo real (Ctrl+C para salir)
docker logs -f minecraft-cobbleverse

# Combinar ambos: últimos 20 + seguir en tiempo real
docker logs --tail 20 -f minecraft-cobbleverse
```

### Comandos básicos de Docker Compose

```bash
# Levantar el servidor (en segundo plano)
docker compose up -d

# Parar el servidor
docker compose down

# Ver el estado de los contenedores
docker ps

# Reiniciar el servidor
docker compose restart

# Ver los recursos que consume
docker stats minecraft-cobbleverse
```

## Problemas que tuvimos y cómo los resolvimos

### JSONs corruptos

Un día el servidor dejó de arrancar con un `JsonSyntaxException` en archivos de Cobblemon. El problema era que algunos archivos JSON temporales se habían corrompido. La solución fue identificar los archivos corruptos (mirando el stack trace en los logs) y borrarlos. El servidor los regenera al arrancar.

**Lección**: No es lo mismo la carpeta `config/` que los archivos temporales en la raíz de `data/`. Los de config se pueden editar, los temporales se pueden borrar sin miedo.

### La RAM: encontrar el equilibrio

Al principio le puse demasiada RAM al servidor y el sistema host se quedaba sin memoria para funcionar. El OOM Killer mataba el proceso.

**Solución**: Ajustar `MEMORY` (RAM de Java) y `mem_limit` (límite de Docker) dejando siempre margen para el sistema operativo. Si tienes 8GB de RAM total, no le des 8GB al servidor. Dale 5-6GB y deja el resto para Linux, Docker, y el overhead de Java.

### Crash loops por mods incompatibles

Alguna vez el servidor entraba en un bucle de crashes al añadir un mod nuevo. La clave es **leer el crash report**: siempre te dice qué mod está causando el problema.

```bash
# Ver los últimos logs para encontrar el error
docker logs --tail 100 minecraft-cobbleverse | grep -i "error\|caused by\|crash"
```

### Permisos de Linux en volúmenes Docker

Un problema clásico: Docker crea archivos como un usuario interno, y luego no puedes modificarlos desde fuera. O al revés, restauras un backup con `sudo` y Docker no puede leer los archivos.

**Solución**: Asegurarte de que los archivos en `./data` pertenecen a tu usuario:

```bash
sudo chown -R $USER:$USER ./data
```

La imagen `itzg/minecraft-server` es inteligente y arregla permisos al arrancar, pero si restauras backups manualmente, tenlo en cuenta.

## Alternativas si no tienes hardware

Si no tienes un PC viejo disponible, hay opciones gratuitas:

- **Oracle Cloud Free Tier**: Ofrece instancias ARM (Ampere) con hasta 24GB de RAM y 4 CPUs de forma gratuita permanente. Más que suficiente para un servidor de Minecraft.
- **Servicios de hosting de Minecraft**: Aternos (gratuito pero limitado) o servidores de pago como Apex Hosting.

La ventaja de hacerlo tú mismo: **aprendes Linux, Docker, networking y administración de sistemas** de verdad.

## Conclusión

Montar un servidor de Minecraft modded en un PC viejo con Docker no es ciencia espacial, pero tiene sus trampas. Las claves:

1. **Docker aísla y simplifica**: Levantar, tirar, hacer backups, todo es más limpio.
2. **Optimiza la RAM**: ZRAM, Aikar flags, y límites de memoria bien configurados.
3. **Mods de rendimiento obligatorios**: Lithium, FerriteCore, ModernFix, Krypton.
4. **Administra por terminal**: No necesitas interfaz gráfica para nada.
5. **No necesitas super hardware**: Con un PC viejo y las optimizaciones correctas, puedes tener un servidor estable para un grupo pequeño.

Lo mejor de todo es que montando esto aprendes una barbaridad sobre Linux, Docker, networking y administración de sistemas. Conocimiento que te sirve para mucho más que Minecraft.

---

*Si tienes alguna pregunta o quieres compartir tu experiencia montando servidores, no dudes en contactarme por [LinkedIn](https://linkedin.com/in/raul-casado) o [GitHub](https://github.com/RaulCasado).*
