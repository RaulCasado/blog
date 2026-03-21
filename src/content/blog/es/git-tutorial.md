---
title: "Git: Guía completa para empezar desde cero"
description: "Una guía práctica sobre Git para desarrolladores: qué es, por qué usarlo, y todos los comandos esenciales que necesitas en el día a día."
pubDate: "2026-03-21"
heroImage: "/git-tutorial/hero.jpg"
tags: ["git", "tutorial", "devtools"]
featured: false
---

## 1. ¿Qué es Git y por qué existe?

<!-- 
  CONTENIDO SUGERIDO:
  - Problema clásico: carpetas con nombres como "proyecto_final_v2_DEFINITIVO"
  - Pequeña historia: Linus Torvalds lo creó en 2005 para gestionar el kernel de Linux
  - ¿Qué es un VCS (Version Control System)?
  - Alternativas: SVN (centralizado), Mercurial. ¿Por qué ganó Git?
  
  📸 CAPTURA RECOMENDADA: 
  - Meme/imagen de la carpeta con versiones sin control. Funciona genial para enganchar.
-->
Como habéis visto en el título del post, hoy vamos a hablar de Git.

Primero os quiero hablar de la historia de Git de forma breve:

Git surgió en 2005 de la mano de Linus Torvalds, el creador de Linux. La necesidad de un sistema de control de versiones surgió a raíz de la necesidad de gestionar el desarrollo del kernel de Linux, que en ese momento era un proyecto muy grande y con muchos colaboradores. En ese momento, el sistema de control de versiones que se utilizaba era BitKeeper, pero debido a problemas con la licencia, se decidió crear uno propio. Ya sabemos que los usuarios de Linux son muy dados a crear sus propias herramientas y más si no están de acuerdo con las existentes.

Una vez creado Git, se extendió rápidamente por la comunidad de desarrolladores y se convirtió en el sistema de control de versiones más utilizado en el mundo. 

Pero antes que es un sistema de control de versiones o VCS? Un sistema de control de versiones es una herramienta que permite gestionar los cambios en el código fuente de un proyecto a lo largo del tiempo. Permite guardar diferentes versiones del código y volver a ellas en cualquier momento. Por ejemplo creo que todos hemos tenido las típicas carpetas con nombres como "proyecto_final_v2_DEFINITIVO" o "proyecto_final_v2_DEFINITIVO_AHORA_SI".
Bueno Git y los sistema de control de versiones vienen a solucionar este tipo de problemas.

Una pregunta que me surgió al principio es qué alternativas hay a Git. Bueno pues existen otros sistemas de control de versiones como SVN o Mercurial. Pero Git se ha convertido en el estándar de la industria por su flexibilidad y rapidez. Además SVN es un sistema de control de versiones centralizado mientras que Git es distribuido. Esto significa que en SVN hay un servidor central que almacena todo el código y en Git cada desarrollador tiene una copia completa del repositorio. Respecto a Mercurial me he encontrado un post donde comparan Git con MacGyver y a Mercurial con James Bond, explicando que Git sigue la filosofía Unix: siendo que no es una herramienta monolítica si no que son un conjunto de alrededor de 150 pequeños "scripts" o comandos que puedes combinar haciendo que sea mucho más flexible. Por otro lado Mercurial es monolítico, es decir, es una herramienta única que hace todo el trabajo. Además por lo que he leído la gestión de ramas en Mercurial es mucho más difícil de usar que en Git. Si os interesa aquí os dejo el enlace para que le podáis echar un vistazo.

![Post](https://importantshock.wordpress.com/2008/08/07/git-vs-mercurial/)

![Meme proyecto final](/git-intro/tfg_meme_versiones.jpg)

## 2. Los 3 estados de un archivo en Git

<!-- 
  CONTENIDO SUGERIDO:
  - Diagrama mental: Working Directory → Staging Area → Repository
  - Explicar que es el corazón de Git. Todo lo demás gira alrededor de esto.
  - Analogía: es como preparar una maleta. Coges ropa (working dir), la doblas y la metes en la maleta (staging), y cierras la maleta (commit).

  📸 CAPTURA RECOMENDADA: 
  - Un diagrama de los 3 estados. Vale la pena hacerlo una vez y que sea visual.
  - Es el único diagrama que realmente merece estar gráfico en todo el tutorial.
-->

Cuando trabajamos con Git los archivos que creamos y modificamos pueden estar en 3 estados:

1. **Working Directory**: Es el directorio donde trabajamos con los archivos.
2. **Staging Area**: Es el área donde preparamos los cambios que queremos guardar.
3. **Repository**: Es el repositorio donde guardamos los cambios.

![Estados de Git](/git-intro/staging.png)

Y como pasamos de unos a otros?

Cuando tu creas un archivo nuevo o modificas uno existente, este se encuentra en el **Working Directory**. Para que Git lo tenga en cuenta, debemos añadirlo al **Staging Area** con el comando `git add`. Una vez que tenemos todo lo que queremos guardar en el **Staging Area**, podemos hacer un **commit** con el comando `git commit`. Este commit se guardará en el **Repository**.

También podemos volver del **Staging Area** al **Working Directory** con el comando `git reset`. Y del **Repository** al **Staging Area** con el comando `git reset --soft`. Y del **Repository** al **Working Directory** con el comando `git reset --hard`. Pero cuidado con este último comando ya que perderemos todos los cambios que no hayamos guardado. Además de perder el historial de commits.

Para que lo entendamos fácil es como preparar la maleta de viaje, cuando tienes tu ropa en el suelo (Working Directory), la doblas y la metes en la maleta (Staging Area), y cierras la maleta (commit). Así será más fácil entender el flujo de trabajo de Git.

## 3. Configuración inicial

```bash
# Configura tu nombre y correo (aparecerán en cada commit tuyo)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Ver toda tu configuración actual
git config --list
```

<!-- 
  CONTENIDO SUGERIDO:
  - Por qué es importante configurar bien el nombre/email (queda en el historial para siempre)
  - Diferencia entre --global (todos tus proyectos) y sin --global (solo este repo)
  - Mencionar que el editor por defecto es vim y cómo cambiarlo a uno más amable
  
  ❌ NO HACE FALTA CAPTURA aquí. El bloque de código es suficiente.
-->

## 4. Empezar un proyecto: `git init` y `git clone`

```bash
# Opción A: Crear un nuevo repositorio desde cero
git init nombre-proyecto
cd nombre-proyecto

# Opción B: Descargar un repositorio existente de GitHub
git clone https://github.com/usuario/repositorio.git
```

<!-- 
  CONTENIDO SUGERIDO:
  - Cuándo usar init vs clone (proyecto nuevo vs unirse a uno existente)
  - Qué es la carpeta .git que aparece al hacer git init (el cerebro oculto del repo)
  - Mencionar brevemente qué es origin (nombre por defecto del repositorio remoto)
  
  ❌ NO HACE FALTA CAPTURA. Con el código y la explicación sobra.
-->

## 5. El `.gitignore`: lo que Git no debe ver

```bash
# Ejemplo de .gitignore
node_modules/
.env
*.log
dist/
```

<!-- 
  CONTENIDO SUGERIDO:
  - Por qué es CRÍTICO saber esto desde el principio (subir node_modules o .env a un repo público es un desastre)
  - gitignore.io para generar plantillas automáticamente
  - Cuándo añadir el .gitignore (SIEMPRE antes del primer commit)
  
  ❌ NO HACE FALTA CAPTURA.
-->

## 6. El ciclo de trabajo diario

### 6.1 Ver el estado del repositorio

```bash
git status
```

<!-- 
  CONTENIDO SUGERIDO:
  - Es el comando que más usarás. Antes de CUALQUIER cosa, haz git status.
  - Qué significa cada color/estado (rojo = sin seguimiento/unstaged, verde = en staging)

  📸 CAPTURA RECOMENDADA:
  - Una terminal con el output de git status con archivos en diferentes estados.
  - Merece captura porque el output es visual y ayuda a reconocerlo.
-->

### 6.2 Añadir cambios al Staging

```bash
# Añadir un archivo concreto
git add archivo.txt

# Añadir todos los cambios
git add .

# Añadir partes de un archivo (modo interactivo)
git add -p archivo.txt
```

<!-- 
  CONTENIDO SUGERIDO:
  - La diferencia entre "guardar" y hace un commit. El staging es el paso intermedio.
  - Por qué no siempre quieres añadir todo con `.` (puede que tengas cambios sin terminar)
  
  ❌ NO HACE FALTA CAPTURA. 
-->

### 6.3 Hacer un commit

```bash
# Commit con mensaje corto
git commit -m "feat: añadir formulario de login"

# Abrir el editor para escribir un mensaje largo y detallado
git commit

# Commit rápido de cambios ya rastreados (salta el git add)
git commit -am "fix: corregir typo en README"

# Modificar el último commit (mensaje o añadir un archivo olvidado)
git commit --amend
```

<!-- 
  CONTENIDO SUGERIDO:
  - Explicar qué es un buen mensaje de commit. Mencionad Conventional Commits brevemente.
  - El commit --amend: "se me olvidó un archivo" → el salvador.
  - Un commit = una unidad de trabajo lógica. No commits de "arreglos varios".
  - El SHA (identificador único del commit, ese hash largo que aparece).
  
  ❌ NO HACE FALTA CAPTURA.
-->

### 6.4 Conectar con el remoto y subir cambios

```bash
# Ver a qué servidor remoto está conectado tu repo
git remote -v

# Subir cambios a la rama principal
git push origin main

# La primera vez que subes una rama nueva
git push -u origin mi-rama
```

<!-- 
  CONTENIDO SUGERIDO:
  - Qué es "origin" (el apodo que Git le da al servidor remoto, normalmente GitHub)
  - Diferencia entre git push y git push -u (el -u solo se usa la primera vez)
  - Qué pasa si alguien ha subido cambios y tu push falla (necesitas hacer pull primero)
  
  ❌ NO HACE FALTA CAPTURA.
-->

### 6.5 Descargar cambios del remoto

```bash
# Descargar Y mezclar cambios en tu rama actual (lo más común)
git pull

# Solo descargar sin mezclar (para inspeccionar antes)
git fetch

# Ver qué cambios trajo el fetch antes de mezclarlos
git diff origin/main
```

<!-- 
  CONTENIDO SUGERIDO:
  - La diferencia clave: fetch descarga, pull = fetch + merge automático.
  - Cuándo usar fetch: cuando quieres ver qué ha cambiado antes de comprometerte.
  - Regla de oro: SIEMPRE haz git pull antes de empezar a trabajar por la mañana.
  
  ❌ NO HACE FALTA CAPTURA.
-->

## 7. Ver el historial

```bash
# Historial básico
git log

# Historial compacto (el más útil)
git log --oneline

# Historial con árbol de ramas visual
git log --oneline --graph --all

# Ver los cambios de un commit concreto
git show abc1234

# Ver quién cambió cada línea de un archivo y cuándo
git blame archivo.txt
```

<!-- 
  CONTENIDO SUGERIDO:
  - git log --oneline --graph --all es el que más usaréis en el día a día.
  - git blame: "¿quién escribió esta aberración?" (con humor). Sirve para entender el contexto.
  
  📸 CAPTURA RECOMENDADA:
  - Terminal con git log --oneline --graph --all mostrando varias ramas.
  - Vale la pena porque el árbol visual es espectacular y sorprende a los nuevos.
-->

## 8. Comparar cambios con `git diff`

```bash
# Ver cambios que NO están en staging aún
git diff

# Ver cambios que YA están en staging
git diff --staged

# Comparar dos commits
git diff abc1234 def5678

# Comparar con la rama main
git diff main
```

<!-- 
  CONTENIDO SUGERIDO:
  - El output de git diff puede abrumar al principio. Explicar: rojo = borrado, verde = añadido.
  - Mencionar que VS Code y otros editores ya integran esto visualmente (extensión GitLens).
  
  ❌ NO HACE FALTA CAPTURA. El output de diff en texto es suficiente.
-->

## 9. Deshacer cosas sin pánico

### 9.1 Guardar cambios temporalmente

```bash
# Guardar cambios sin commitear para cambiar de tarea
git stash

# Recuperar los cambios guardados
git stash pop

# Ver la lista de cosas guardadas
git stash list
```

<!-- 
  CONTENIDO SUGERIDO:
  - Escenario real: estás a medias de algo, te piden un hotfix urgente en otra rama.
  - git stash = "guardar la partida a medias" y retomarlo luego.
  
  ❌ NO HACE FALTA CAPTURA.
-->

### 9.2 Revertir cambios

```bash
# Descartar cambios de un archivo en working directory
git restore archivo.txt

# Sacar un archivo del staging (sin borrar los cambios)
git restore --staged archivo.txt

# Decirle a Git que deje de rastrear un archivo (sin borrarlo del disco)
git rm --cached archivo.txt
```

<!-- 
  CONTENIDO SUGERIDO:
  - Importante: git restore es seguro (es reversible). No borra el historial.
  - git rm --cached es el salvador cuando has subido algo al staging que no debías (ej: el .env)
  
  ❌ NO HACE FALTA CAPTURA.
-->

## 10. Ramas: trabajar en paralelo

### 10.1 Crear y moverse entre ramas

```bash
# Ver todas las ramas locales
git branch

# Crear una rama nueva
git branch mi-funcionalidad

# Moverse a una rama (el comando moderno)
git switch mi-funcionalidad

# Crear y moverse a la vez
git switch -c mi-funcionalidad

# Borrar una rama (solo si ya está mergeada)
git branch -d mi-funcionalidad

# Borrar una rama a la fuerza
git branch -D mi-funcionalidad
```

<!-- 
  CONTENIDO SUGERIDO:
  - Por qué las ramas son importantes: nunca trabajar directamente en main.
  - Flujo típico: main (producción), develop (integración), feature/xxx (tu trabajo).
  - git switch es el moderno, git checkout -b es el clásico. Ambos funcionan igual.
  
  📸 CAPTURA RECOMENDADA:
  - Terminal con git branch mostrando varias ramas y el asterisco en la activa.
  - Es simple pero visual y ayuda a entender qué está pasando.
-->

### 10.2 Fusionar ramas con `git merge`

```bash
# Situación: quieres fusionar "mi-funcionalidad" en "main"
git switch main
git merge mi-funcionalidad
```

<!-- 
  CONTENIDO SUGERIDO:
  - Fast-forward merge vs merge commit (explicar con el diagrama mental).
  - Qué es un conflicto de merge: dos personas editaron la misma línea del mismo archivo.
  - Cómo se ve un conflicto en el archivo (los <<<<, ====, >>>> que aparecen).
  - Cómo resolverlo: abrir el archivo, elegir qué versión quedarse, hacer git add y git commit.
  
  📸 CAPTURA RECOMENDADA:
  - Terminal o editor mostrando los marcadores de conflicto dentro de un archivo.
  - Merece captura porque es algo que asusta la primera vez y verlo ayuda mucho.
-->

## 11. Intro a GitHub (→ ver post completo de GitHub)

```bash
# Conectar tu repo local a uno de GitHub
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Subir el código por primera vez
git push -u origin main
```

<!-- 
  CONTENIDO SUGERIDO:
  - Breve: qué es GitHub frente a Git (Git es la herramienta, GitHub es la plataforma).
  - Crear un repo en GitHub (pasos en interfaz web, SÍ vale la pena una captura aquí).
  - Mención a Pull Requests, Issues, etc. → "Lo veremos en detalle en el próximo post".

  📸 CAPTURA RECOMENDADA:
  - Pantalla de creación de repo en GitHub.
-->

## 12. Buenas prácticas y convenciones

<!-- 
  CONTENIDO SUGERIDO:
  - Conventional Commits (feat:, fix:, docs:, chore:, refactor:...)
  - Commits pequeños y descriptivos. Nunca "arreglos varios".
  - Un commit por cada unidad lógica de trabajo.
  - Nunca subir credentials, tokens ni .env a un repo (aunque sea privado).
  - Regla de oro: git pull antes de empezar el día.
  - Usar ramas para TODO. main debe estar siempre en un estado funcional.
  
  ❌ NO HACE FALTA CAPTURA.
-->

## 13. Cheat Sheet: todos los comandos de un vistazo

| Comando | ¿Para qué sirve? |
|---|---|
| `git config --global` | Configurar nombre y email |
| `git init` | Crear un repositorio nuevo |
| `git clone <url>` | Descargar un repositorio |
| `git status` | Ver el estado del repo |
| `git add <archivo>` | Añadir al staging |
| `git add .` | Añadir todo al staging |
| `git commit -m "..."` | Hacer un commit |
| `git commit --amend` | Modificar el último commit |
| `git push` | Subir cambios al remoto |
| `git pull` | Bajar y mezclar cambios |
| `git fetch` | Solo bajar (sin mezclar) |
| `git log --oneline` | Ver historial compacto |
| `git log --oneline --graph --all` | Ver árbol de ramas |
| `git show <sha>` | Ver detalle de un commit |
| `git diff` | Ver cambios sin staging |
| `git blame <archivo>` | Ver quién cambió cada línea |
| `git stash` | Guardar cambios temporalmente |
| `git stash pop` | Recuperar los cambios guardados |
| `git restore <archivo>` | Descartar cambios locales |
| `git restore --staged` | Sacar del staging |
| `git rm --cached` | Dejar de rastrear un archivo |
| `git branch` | Listar ramas |
| `git switch -c <rama>` | Crear y cambiar a una rama |
| `git merge <rama>` | Fusionar una rama |
| `git branch -d <rama>` | Borrar una rama |
| `git remote -v` | Ver servidores remotos |

## 14. Conclusión y recursos

<!-- 
  CONTENIDO SUGERIDO:
  - Resumen de lo aprendido.
  - Mensaje motivador: Git parece difícil al principio pero es cuestión de práctica.
  - Próximo post: GitHub a fondo (Pull Requests, Issues, Actions...).
  
  Recursos recomendados:
  - https://git-scm.com/book/es/v2 (Pro Git, gratis y en español)
  - https://learngitbranching.js.org (Aprender ramas de forma visual e interactiva)
  - https://ohshitgit.com/es (Soluciones a errores comunes contados con humor)
-->
