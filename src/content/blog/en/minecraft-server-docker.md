---
title: 'How I Set Up a Modded Minecraft Server with Docker on an Old PC'
description: 'Complete guide to deploying a Minecraft server with Cobblemon using Docker Compose on limited hardware. From initial setup to RAM optimization, CLI mod management and admin tricks.'
pubDate: '2026-02-08'
heroImage: '/minecraft.webp'
heroImageAlt: 'Minecraft server with Docker'
tags: ['docker', 'linux', 'minecraft']
lang: 'en'
---

# How I Set Up a Modded Minecraft Server with Docker on an Old PC

## Introduction

A few weeks ago I set out to do something that many people think requires expensive dedicated hosting: set up a **stable modded Minecraft server (Cobblemon)** to play with friends. I did it on an old PC I have at home that I lovingly call "Servercito" (little server), running **Ubuntu Server**, without spending a single euro on hosting.

This post covers the entire process: from Docker configuration to RAM optimization, terminal-based mod management, admin tricks, and the real problems I had to solve. If you have an old PC lying around and the desire to build something, this is for you.

## The "Low-Spec" Philosophy: You Don't Need Super Hardware

### The Challenge

My "Servercito" is no beast. It's an old PC with limited resources, but enough to run a modded Minecraft server for a small group of friends. The key isn't having the best hardware, it's **optimizing what you have**.

### Memory Management: ZRAM and Swap

One of the first problems was RAM. Java is a memory-hungry monster, and if the OS runs out of RAM, Linux's **OOM Killer** (Out of Memory) kills the process without mercy. To prevent this:

- **ZRAM**: Compresses RAM in real time. Instead of wasting RAM with uncompressed data, ZRAM creates a compressed swap block directly in memory. This gives you more headroom before the system starts using disk swap.
- **Disk Swap**: As an additional safety net. If ZRAM fills up, the system uses disk swap before killing processes.

### Monitoring with htop

`htop` became my best friend. It's a real-time resource monitor that shows you exactly how much RAM and CPU each process is using. Essential for detecting if the server is running out of memory.

```bash
htop
```

A quick glance and you know if the server is doing fine or if you need to adjust something.

## The Heart: Docker and Docker Compose

### Why Docker

Docker lets you spin up and tear down the server in seconds. If something breaks, you delete the container and start over without touching your system. Backups are as easy as copying a folder. And the best part: **everything is isolated**, you don't need to install Java directly on your system.

### The itzg/minecraft-server Image

It's the **industry standard** for Minecraft servers on Docker. It supports Vanilla, Fabric, Forge, Modrinth modpacks and much more. It's incredibly configurable through environment variables.

### docker-compose vs docker compose

A detail that confuses many people:

- `docker-compose` (with hyphen): The **old version** (v1), written in Python. It's deprecated.
- `docker compose` (without hyphen): The **modern version** (v2), a native Docker plugin written in Go. Faster and the one you should use.

If you type `docker-compose` and it works, you probably have both installed, but always use `docker compose`.

### The docker-compose.yml

This is the file that controls everything. Here's my configuration (adapted):

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
      WHITELIST: "YourUsername"
      OPS: "YourUsername"
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
      - SUBDOMAINS=your-subdomain
      - TOKEN=your-token-here
    restart: unless-stopped
```

Key points:

- **`MEMORY: "6G"`**: How much RAM you give to the Java server. Adjust according to your hardware.
- **`mem_limit: 7g`**: Docker's hard limit. If the container tries to use more than 7GB, Docker stops it. This **protects your host system** from Java eating all the RAM.
- **`USE_AIKAR_FLAGS: "true"`**: Enables Aikar's flags, which optimize Java's Garbage Collector for Minecraft servers. Less lag, fewer memory spikes.
- **`OVERRIDE_SERVER_PROPERTIES: "true"`**: Forces environment variables to overwrite the existing `server.properties`. Without this, changing `MAX_PLAYERS` wouldn't take effect if the file already exists.

### DuckDNS: Dynamic IP Solved

If your ISP gives you a dynamic IP (like most do), you need a dynamic DNS service so your friends can always connect to the same address. **DuckDNS** is free and we put it directly in the `docker-compose.yml` as another service. This way it updates automatically without external scripts or crons.

## CLI Mod Management: Ferium

### What is Ferium

When your server has no graphical interface (it's an Ubuntu Server), managing mods manually is tedious. **Ferium** is a CLI tool that lets you add, update, and remove Minecraft mods directly from the terminal.

```bash
# Add a mod
ferium add lithium

# Update all mods
ferium upgrade

# List installed mods
ferium list
```

### Essential Performance Mods

On limited hardware, these mods are mandatory:

- **Lithium**: Optimizes game logic (mob AI, pathfinding, redstone). No visual impact.
- **FerriteCore**: Drastically reduces RAM usage by optimizing how internal data is stored.
- **ModernFix**: Fixes a ton of base game inefficiencies. Complements Lithium.
- **Krypton**: Optimizes networking. Better packet compression and reduced bandwidth.

### Useful Technical Mods

- **Chunky**: Pre-generates the world to avoid lag when players explore new areas. Generating chunks on the fly is what causes the most lag.
- **Carpet Mod**: Allows creating bots with `/player spawn` that keep areas loaded. Very useful for automatic farms (like honey farms) without needing a real client connected.

## "Admin Ninja" Tricks

### Managing Without Entering the Game

You don't need to open Minecraft to manage your server. From the terminal:

```bash
# Add someone to the whitelist
docker exec -i minecraft-cobbleverse mc-send-to-console whitelist add PlayerName

# Give admin permissions
docker exec -i minecraft-cobbleverse mc-send-to-console op PlayerName

# Run any server command
docker exec -i minecraft-cobbleverse mc-send-to-console say Hello everyone!
```

### Inspecting Datapacks Without Extracting

A very useful trick: you can inspect the contents of datapacks and JARs without extracting them using `unzip`. This was especially useful for checking Cobblemon gym leader teams and their stats (IVs/EVs):

```bash
# List files inside a zip
unzip -l COBBLEVERSE-RCT-DP.zip

# View a specific file's content without extracting
unzip -p COBBLEVERSE-RCT-DP.zip path/to/file.json | python3 -m json.tool
```

### Logs: Your Window Into the Server

```bash
# View the last 20 log messages
docker logs --tail 20 minecraft-cobbleverse

# Follow logs in real time (Ctrl+C to exit)
docker logs -f minecraft-cobbleverse

# Combine both: last 20 + follow in real time
docker logs --tail 20 -f minecraft-cobbleverse
```

### Basic Docker Compose Commands

```bash
# Start the server (in background)
docker compose up -d

# Stop the server
docker compose down

# Check container status
docker ps

# Restart the server
docker compose restart

# Check resource usage
docker stats minecraft-cobbleverse
```

## Problems We Had and How We Solved Them

### Corrupted JSONs

One day the server stopped booting with a `JsonSyntaxException` in Cobblemon files. The problem was that some temporary JSON files had become corrupted. The solution was to identify the corrupt files (by reading the stack trace in the logs) and delete them. The server regenerates them on startup.

**Lesson**: The `config/` folder and temporary files in the `data/` root are not the same thing. Config files can be edited, temporary files can be deleted without worry.

### RAM: Finding the Balance

At first I gave the server too much RAM and the host system ran out of memory to function. The OOM Killer terminated the process.

**Solution**: Adjust `MEMORY` (Java RAM) and `mem_limit` (Docker limit) always leaving room for the operating system. If you have 8GB of total RAM, don't give 8GB to the server. Give it 5-6GB and leave the rest for Linux, Docker, and Java's overhead.

### Crash Loops from Incompatible Mods

Sometimes the server entered a crash loop after adding a new mod. The key is to **read the crash report**: it always tells you which mod is causing the problem.

```bash
# Check recent logs to find the error
docker logs --tail 100 minecraft-cobbleverse | grep -i "error\|caused by\|crash"
```

### Linux Permissions on Docker Volumes

A classic problem: Docker creates files as an internal user, and then you can't modify them from outside. Or the reverse: you restore a backup with `sudo` and Docker can't read the files.

**Solution**: Make sure the files in `./data` belong to your user:

```bash
sudo chown -R $USER:$USER ./data
```

The `itzg/minecraft-server` image is smart and fixes permissions on startup, but if you restore backups manually, keep this in mind.

## Alternatives If You Don't Have Hardware

If you don't have an old PC available, there are free options:

- **Oracle Cloud Free Tier**: Offers ARM instances (Ampere) with up to 24GB of RAM and 4 CPUs for free permanently. More than enough for a Minecraft server.
- **Minecraft hosting services**: Aternos (free but limited) or paid servers like Apex Hosting.

The advantage of doing it yourself: **you actually learn Linux, Docker, networking, and system administration**.

## Conclusion

Setting up a modded Minecraft server on an old PC with Docker isn't rocket science, but it has its pitfalls. The key takeaways:

1. **Docker isolates and simplifies**: Spinning up, tearing down, making backups - everything is cleaner.
2. **Optimize RAM**: ZRAM, Aikar flags, and well-configured memory limits.
3. **Performance mods are mandatory**: Lithium, FerriteCore, ModernFix, Krypton.
4. **Manage via terminal**: You don't need a graphical interface for anything.
5. **You don't need super hardware**: With an old PC and the right optimizations, you can have a stable server for a small group.

The best part is that by setting this up you learn a ton about Linux, Docker, networking, and system administration. Knowledge that serves you for much more than Minecraft.

---

*If you have any questions or want to share your experience setting up servers, feel free to reach out on [LinkedIn](https://linkedin.com/in/raul-casado) or [GitHub](https://github.com/RaulCasado).*
