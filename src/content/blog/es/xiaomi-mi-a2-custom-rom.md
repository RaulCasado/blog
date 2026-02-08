---
title: 'Cómo le di una segunda vida a mi Xiaomi Mi A2 con una Custom ROM'
description: 'Guía completa sobre cómo instalé una Custom ROM en un Xiaomi Mi A2 abandonado por el fabricante. Desde desbloquear el bootloader hasta instalar apps alternativas como NewPipe, Spotube y Aurora Store.'
pubDate: '2026-02-08'
heroImage: '/mi_a2.jpg'
heroImageAlt: 'Xiaomi Mi A2 con Custom ROM'
tags: ['linux', 'android']
lang: 'es'
---

# Cómo le di una segunda vida a mi Xiaomi Mi A2 con una Custom ROM

## Introducción

Tenía un **Xiaomi Mi A2** acumulando polvo en un cajón. El teléfono funciona perfectamente a nivel de hardware, pero Xiaomi dejó de darle soporte hace años. Se quedó atascado en Android 10 sin parches de seguridad, sin actualizaciones, y cada vez más apps dejaban de ser compatibles.

En lugar de tirarlo o dejarlo morir, decidí instalarle una **Custom ROM** para darle una segunda vida. Lo que parecía un proceso sencillo se convirtió en una odisea de ROMs equivocadas, enlaces rotos, proyectos abandonados y GApps que no funcionaban. Pero al final lo conseguí, y ahora tengo un teléfono perfectamente funcional con Android moderno.

Este post documenta todo el proceso: los problemas reales que tuve, cómo los solucioné y qué instalé después para tener un teléfono útil sin depender de Google.

## Por qué una Custom ROM

Cuando un fabricante abandona un dispositivo, tienes varias opciones:

1. **Seguir usándolo tal cual**: Sin parches de seguridad, cada vez más apps incompatibles.
2. **Comprar otro teléfono**: La opción fácil pero cara y contaminante.
3. **Instalar una Custom ROM**: Darle una segunda vida con un Android actualizado.

La tercera opción es la más interesante si te gusta aprender y no te importa cacharrear un poco. Además, reduces basura electrónica.

## Conociendo el dispositivo: Xiaomi Mi A2

Antes de tocar nada, es importante entender qué dispositivo tienes:

- **Nombre en código**: `jasmine_sprout`
- **Programa**: Android One (Android "puro" de Google)
- **Sistema de particiones**: **A/B** (esto es importante, luego explico por qué)
- **Último Android oficial**: Android 10
- **Estado**: End of Life (EOL), sin soporte del fabricante

El nombre en código (`jasmine_sprout`) es crucial. Es lo que necesitas buscar cuando buscas ROMs y recoveries. Si buscas "Xiaomi Mi A2" a secas, te pueden aparecer resultados del Mi A2 Lite (que es otro dispositivo completamente diferente).

### ¿Qué son las particiones A/B?

A diferencia de dispositivos más antiguos que tienen una sola partición del sistema, el Mi A2 tiene **dos particiones** (slot A y slot B). El sistema arranca desde una mientras la otra se usa para actualizaciones. Esto tiene implicaciones importantes:

- **No hay partición de recovery dedicada**: El recovery comparte espacio con el boot.
- **TWRP puede ser problemático**: Algunos dispositivos A/B no se llevan bien con TWRP.
- **Hay que flashear en el slot correcto**: Si flasheas en el slot equivocado, puedes acabar con un sistema que no arranca.

## Preparación: Herramientas desde Linux

Todo el proceso lo hice desde **Ubuntu**, que para estas cosas es mucho más fácil que Windows. Nada de drivers raros ni programas de terceros:

```bash
sudo apt install adb fastboot
```

Con eso tienes todo lo necesario. En Windows necesitarías instalar drivers USB específicos de Xiaomi, el SDK de Android, y rezar para que todo funcione. En Linux, conectas el teléfono y listo.

### Verificar la conexión

```bash
# Con el teléfono conectado y depuración USB activada
adb devices

# Debería mostrar algo como:
# List of devices attached
# XXXXXXXX    device
```

Si aparece `unauthorized`, acepta el aviso de depuración USB en la pantalla del teléfono.

## Paso 1: Desbloquear el Bootloader

El bootloader es lo que controla qué software puede arrancar en el teléfono. Por defecto viene bloqueado para evitar que instales software no oficial.

### Activar las opciones de desarrollador

1. Ve a **Ajustes → Acerca del teléfono**
2. Toca **Número de compilación** 7 veces seguidas
3. Vuelve a Ajustes, ahora verás **Opciones de desarrollador**
4. Activa **Desbloqueo OEM** y **Depuración USB**

### Desbloquear

```bash
# Reiniciar en modo bootloader
adb reboot bootloader

# Desbloquear (ESTO BORRA TODOS LOS DATOS)
fastboot flashing unlock
```

**IMPORTANTE**: Desbloquear el bootloader **borra completamente el teléfono**. Haz backup de todo antes. También invalida la garantía (aunque en un teléfono de 2018, eso ya da igual).

Confirma el desbloqueo en la pantalla del teléfono con los botones de volumen y power.

## Paso 2: La odisea de encontrar la ROM correcta

Aquí es donde empezó la aventura de verdad. Encontrar una ROM compatible para un dispositivo abandonado no es tan fácil como parece.

### Intento 1: LineageOS Oficial

Mi primera opción fue **LineageOS**, la Custom ROM más conocida y fiable. Fui a su web oficial, busqué el Mi A2... y nada. **El soporte oficial para jasmine_sprout fue retirado (EOL)**. LineageOS ya no mantiene builds oficiales para este dispositivo.

### Intento 2: PixelExperience

Mi segunda opción fue **PixelExperience**, una ROM que replica la experiencia de un Google Pixel. Pero al buscar, descubrí que **el proyecto PixelExperience cerró**. Ya no existe. Algunos forks como PixelOS siguen activos, pero no tenían soporte para el Mi A2.

### Intento 3: El enlace equivocado

Buscando en foros, encontré un enlace que parecía prometedor. Lo descargué, empecé a leer las instrucciones y... era una ROM para un **Samsung Galaxy S5**. Sí, descargué la ROM completamente equivocada. Lección: **siempre verifica el nombre en código del dispositivo** antes de flashear nada.

### Intento 4: XDA al rescate

Finalmente, hice lo que debería haber hecho desde el principio: buscar directamente en **XDA Developers** el nombre en código `jasmine_sprout`.

Encontré un thread de **LineageOS 22.1 Unofficial** mantenido por un desarrollador de la comunidad. No es oficial, pero tiene actualizaciones regulares y buenas reviews de usuarios.

## Paso 3: Instalar el Recovery

Para instalar una Custom ROM necesitas un **recovery personalizado**. El recovery es un mini sistema operativo que te permite flashear ROMs, hacer backups y formatear particiones.

### TWRP vs Lineage Recovery

Hay dos opciones principales:

- **TWRP**: El recovery más conocido, con interfaz táctil y muchas opciones. Pero en dispositivos A/B puede dar problemas.
- **Lineage Recovery**: Más simple, basado en texto, pero funciona perfectamente con dispositivos A/B.

Para el Mi A2, opté por el **Lineage Recovery** que venía recomendado por el desarrollador de la ROM.

### Flashear el Recovery

```bash
# Asegurarte de estar en modo bootloader
adb reboot bootloader

# Flashear el recovery en la partición boot
fastboot flash boot recovery.img

# Reiniciar en recovery
fastboot reboot recovery
```

### El truco de "Reboot to Recovery"

Con particiones A/B, hay un truco importante: después de flashear el recovery, **no reinicies normalmente**. Usa la opción "Reboot to Recovery" desde el propio recovery o desde fastboot. Si reinicias normal, el sistema puede sobreescribir el recovery que acabas de instalar.

## Paso 4: Instalar la ROM

Una vez en el recovery, el proceso es relativamente sencillo:

```bash
# Desde el recovery, activar el modo sideload
# (seleccionar "Apply update" → "Apply from ADB")

# Desde tu PC, enviar la ROM
adb sideload lineageos-22.1-jasmine_sprout.zip
```

Espera a que termine (puede tardar unos minutos) y **no reinicies todavía**.

## Paso 5: El drama de las GApps

Aquí vino uno de los mayores problemas. Si quieres tener la Play Store y los servicios de Google, necesitas instalar **GApps** (Google Apps) por separado, ya que LineageOS no las incluye por razones legales.

### El problema

Probé varias opciones de GApps:

- **MindTheGapps**: Error al instalar.
- **LiteGApps**: Mismos errores.
- **NikGApps**: Tampoco funcionaban.

Después de investigar en el thread de XDA, descubrí que **muchos usuarios reportaban los mismos problemas con GApps en esta ROM específica**. Era un problema conocido sin solución clara en ese momento.

### La decisión

Tenía dos opciones:

1. Seguir buscando una combinación de ROM + GApps que funcionara.
2. Usar el teléfono **sin servicios de Google** y buscar alternativas.

Opté por la segunda opción. Y honestamente, fue una de las mejores decisiones que pude tomar. Pero de esto hablo más adelante.

## La opción nuclear: Convertir Mi A2 en Mi 6X

Un dato interesante que descubrí durante la investigación: el **Xiaomi Mi A2** y el **Xiaomi Mi 6X** son esencialmente **el mismo hardware**. La diferencia es que el Mi A2 viene con Android One (stock Android) y el Mi 6X viene con MIUI.

Algunos desarrolladores en XDA sugieren **convertir el Mi A2 en Mi 6X** flasheando el firmware del 6X. Esto abre la puerta a muchas más ROMs, ya que el Mi 6X (nombre en código `wayne`) tiene más soporte de la comunidad, incluyendo ROMs con Android 14 y 15.

No lo hice en mi caso porque la ROM de LineageOS ya me funcionaba bien, pero es una opción a tener en cuenta si quieres más variedad de ROMs.

## Paso 6: Root con Magisk (Opcional)

Si quieres tener acceso root en tu dispositivo (control total del sistema), puedes instalar **Magisk**:

1. Descarga el APK de Magisk desde su GitHub oficial.
2. Renombra el archivo `.apk` a `.zip`.
3. Desde el recovery, flashea el zip con `adb sideload`.

```bash
# Renombrar
mv Magisk-v27.0.apk Magisk-v27.0.zip

# Flashear desde recovery
adb sideload Magisk-v27.0.zip
```

Magisk te da acceso root "sin sistema" (systemless), lo que significa que no modifica la partición del sistema directamente. Esto facilita las actualizaciones futuras de la ROM.

**¿Para qué sirve el root?** Para cosas como:

- Eliminar bloatware del sistema
- Usar apps que requieren root (Titanium Backup, AdAway)
- Personalización avanzada del sistema
- Módulos de Magisk (como Viper4Android para mejor audio)

## Paso 7: Apps alternativas - Vida sin Google

Esta fue la parte más sorprendente del proceso. Descubrí que puedes tener un teléfono perfectamente funcional sin depender de los servicios de Google.

### Aurora Store - Play Store sin cuenta Google

**Aurora Store** es un cliente alternativo de la Play Store. Te permite descargar cualquier app de la Play Store **sin necesidad de tener una cuenta de Google** ni los servicios de Google instalados.

- Puedes usar una cuenta anónima
- Descarga las mismas APKs que la Play Store oficial
- Interfaz limpia y sin bloatware
- Actualizaciones automáticas de apps

### NewPipe - YouTube sin anuncios ni rastreo

**NewPipe** es un cliente de YouTube de código abierto que no usa la API oficial de Google:

- **Sin anuncios** (ni siquiera necesitas bloqueador)
- **Reproducción en segundo plano** (lo que YouTube Premium cobra)
- **Descarga de vídeos y audio** directamente
- **Sin cuenta de Google** necesaria
- Importa tus suscripciones desde YouTube

Honestamente, la experiencia es mejor que la app oficial de YouTube en muchos aspectos.

### Spotube - Spotify sin Premium

**Spotube** es un cliente de Spotify de código abierto que combina el catálogo de Spotify con fuentes de audio gratuitas:

- Escucha música del catálogo de Spotify **gratis**
- Sin anuncios
- Descarga para escuchar offline
- Interfaz similar a Spotify
- No necesitas cuenta Premium

### Otras apps útiles

- **F-Droid**: Tienda de apps de código abierto. Muchas apps de privacidad y utilidades.
- **Obtainium**: Gestor de actualizaciones que descarga directamente desde GitHub/GitLab.

## Problemas que tuve y cómo los solucioné

### "No puedo encontrar mi dispositivo con adb"

**Problema**: Al conectar el teléfono, `adb devices` no mostraba nada.

**Solución**: Asegurarme de que la depuración USB estaba activada y que había aceptado el aviso de depuración en la pantalla del teléfono. En Linux, a veces necesitas añadir reglas udev:

```bash
# Crear regla udev para Xiaomi
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="2717", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android.rules
sudo udevadm control --reload-rules
```

### "El recovery no arranca"

**Problema**: Después de flashear el recovery, el teléfono arrancaba en el sistema normal en vez del recovery.

**Solución**: Con particiones A/B, hay que tener cuidado con los slots. Usé `fastboot --set-active=a` para asegurarme de estar en el slot correcto, y reinicié directamente a recovery sin pasar por el sistema normal.

### "La ROM no instala por firma"

**Problema**: Al intentar sideload, el recovery rechazaba la ROM por verificación de firma.

**Solución**: En el Lineage Recovery, desactivar la verificación de firma antes de instalar. Esto es normal en ROMs no oficiales.

### El bootloop

**Problema**: Después de instalar la ROM, el teléfono se quedaba en un bucle de reinicio infinito mostrando el logo.

**Solución**: Formatear la partición data desde el recovery (esto borra todos los datos del usuario) y volver a flashear la ROM. Los bootloops suelen ocurrir cuando hay restos del sistema anterior que son incompatibles con la nueva ROM.

## Disclaimers importantes

Antes de que te lances a hacer esto:

- **Pierdes la garantía**: Desbloquear el bootloader invalida la garantía del fabricante.
- **Riesgo de brick**: Si algo sale mal, puedes dejar el teléfono inutilizable (aunque con el Mi A2 es bastante difícil hacer un brick permanente gracias a EDL mode).
- **Haz backup de todo**: Antes de empezar, saca todas tus fotos, contactos y datos importantes.
- **Lee antes de actuar**: Lee el thread completo de XDA antes de flashear nada. Los comentarios de otros usuarios son oro puro.
- **Batería cargada**: Asegúrate de tener al menos un 70% de batería antes de empezar.

## Conclusión

Lo que empezó como "voy a instalar una ROM rápido" se convirtió en varias horas de investigación, pruebas fallidas y aprendizaje. Pero el resultado valió la pena:

- **Teléfono con Android actualizado** en lugar de Android 10 abandonado.
- **Más rápido** que con el sistema original (las Custom ROMs suelen estar más optimizadas).
- **Sin bloatware** ni apps preinstaladas innecesarias.
- **Apps alternativas** que en muchos casos son mejores que las oficiales.
- **Conocimiento adquirido** sobre cómo funciona Android a bajo nivel.

Un teléfono que iba directo a un cajón ahora es perfectamente funcional para el día a día: navegar, ver vídeos, escuchar música, mensajería, y mucho más.

Si tienes un teléfono viejo acumulando polvo, dale una oportunidad antes de tirarlo. No solo estás ahorrando dinero, estás reduciendo basura electrónica y aprendiendo cosas que la mayoría de usuarios nunca verán.

---

*Si tienes alguna pregunta o quieres compartir tu experiencia con Custom ROMs, no dudes en contactarme por [LinkedIn](https://linkedin.com/in/raul-casado) o [GitHub](https://github.com/RaulCasado).*
