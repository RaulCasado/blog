---
title: 'How I Gave My Xiaomi Mi A2 a Second Life with a Custom ROM'
description: 'Complete guide on how I installed a Custom ROM on a Xiaomi Mi A2 abandoned by the manufacturer. From unlocking the bootloader to installing alternative apps like NewPipe, Spotube, and Aurora Store.'
pubDate: '2026-02-08'
heroImage: '/mi_a2.jpg'
heroImageAlt: 'Xiaomi Mi A2 with Custom ROM'
tags: ['linux', 'android']
lang: 'en'
---

# How I Gave My Xiaomi Mi A2 a Second Life with a Custom ROM

## Introduction

I had a **Xiaomi Mi A2** collecting dust in a drawer. The phone works perfectly hardware-wise, but Xiaomi dropped support for it years ago. It was stuck on Android 10 with no security patches, no updates, and more and more apps becoming incompatible.

Instead of tossing it or letting it die, I decided to install a **Custom ROM** to give it a second life. What seemed like a straightforward process turned into an odyssey of wrong ROMs, broken links, abandoned projects, and GApps that refused to work. But in the end, I got it done, and now I have a perfectly functional phone running modern Android.

This post documents the entire process: the real problems I had, how I solved them, and what I installed afterwards to have a useful phone without depending on Google.

## Why a Custom ROM

When a manufacturer abandons a device, you have several options:

1. **Keep using it as-is**: No security patches, increasingly incompatible apps.
2. **Buy a new phone**: The easy but expensive and wasteful option.
3. **Install a Custom ROM**: Give it a second life with an updated Android.

The third option is the most interesting if you like tinkering and don't mind getting your hands dirty. Plus, you're reducing e-waste.

## Knowing the Device: Xiaomi Mi A2

Before touching anything, it's important to understand what device you have:

- **Codename**: `jasmine_sprout`
- **Program**: Android One (Google's "pure" Android)
- **Partition system**: **A/B** (this is important, I'll explain why later)
- **Last official Android**: Android 10
- **Status**: End of Life (EOL), no manufacturer support

The codename (`jasmine_sprout`) is crucial. It's what you need to search for when looking for ROMs and recoveries. If you search for just "Xiaomi Mi A2", you might get results for the Mi A2 Lite (which is a completely different device).

### What Are A/B Partitions?

Unlike older devices that have a single system partition, the Mi A2 has **two partitions** (slot A and slot B). The system boots from one while the other is used for updates. This has important implications:

- **No dedicated recovery partition**: The recovery shares space with the boot partition.
- **TWRP can be problematic**: Some A/B devices don't play well with TWRP.
- **You must flash to the correct slot**: If you flash to the wrong slot, you can end up with a system that won't boot.

## Preparation: Tools from Linux

I did the entire process from **Ubuntu**, which is much easier than Windows for this kind of thing. No weird drivers or third-party programs needed:

```bash
sudo apt install adb fastboot
```

That's all you need. On Windows, you'd need to install Xiaomi-specific USB drivers, the Android SDK, and pray everything works. On Linux, you plug in the phone and you're good to go.

### Verifying the Connection

```bash
# With the phone connected and USB debugging enabled
adb devices

# Should show something like:
# List of devices attached
# XXXXXXXX    device
```

If it shows `unauthorized`, accept the USB debugging prompt on the phone screen.

## Step 1: Unlocking the Bootloader

The bootloader controls what software can boot on the phone. By default, it's locked to prevent installing unofficial software.

### Enabling Developer Options

1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times in a row
3. Go back to Settings, you'll now see **Developer Options**
4. Enable **OEM Unlock** and **USB Debugging**

### Unlocking

```bash
# Reboot into bootloader mode
adb reboot bootloader

# Unlock (THIS ERASES ALL DATA)
fastboot flashing unlock
```

**IMPORTANT**: Unlocking the bootloader **completely wipes the phone**. Back up everything first. It also voids the warranty (though on a 2018 phone, that hardly matters).

Confirm the unlock on the phone screen using the volume and power buttons.

## Step 2: The Odyssey of Finding the Right ROM

This is where the real adventure began. Finding a compatible ROM for an abandoned device isn't as easy as it seems.

### Attempt 1: Official LineageOS

My first choice was **LineageOS**, the most well-known and reliable Custom ROM. I went to their official website, searched for the Mi A2... and nothing. **Official support for jasmine_sprout had been retired (EOL)**. LineageOS no longer maintains official builds for this device.

### Attempt 2: PixelExperience

My second choice was **PixelExperience**, a ROM that replicates the Google Pixel experience. But upon searching, I discovered that **the PixelExperience project had shut down**. It no longer exists. Some forks like PixelOS are still active, but they didn't have Mi A2 support.

### Attempt 3: The Wrong Link

Searching through forums, I found a link that looked promising. I downloaded it, started reading the instructions, and... it was a ROM for a **Samsung Galaxy S5**. Yes, I downloaded a completely wrong ROM. Lesson: **always verify the device codename** before flashing anything.

### Attempt 4: XDA to the Rescue

Finally, I did what I should have done from the start: search directly on **XDA Developers** for the codename `jasmine_sprout`.

I found a thread for **LineageOS 22.1 Unofficial** maintained by a community developer. It's not official, but it has regular updates and good user reviews.

## Step 3: Installing the Recovery

To install a Custom ROM, you need a **custom recovery**. The recovery is a mini operating system that lets you flash ROMs, make backups, and format partitions.

### TWRP vs Lineage Recovery

There are two main options:

- **TWRP**: The most well-known recovery, with a touch interface and many options. But on A/B devices, it can cause problems.
- **Lineage Recovery**: Simpler, text-based, but works perfectly with A/B devices.

For the Mi A2, I went with **Lineage Recovery** as recommended by the ROM developer.

### Flashing the Recovery

```bash
# Make sure you're in bootloader mode
adb reboot bootloader

# Flash recovery to boot partition
fastboot flash boot recovery.img

# Reboot into recovery
fastboot reboot recovery
```

### The "Reboot to Recovery" Trick

With A/B partitions, there's an important trick: after flashing the recovery, **don't reboot normally**. Use the "Reboot to Recovery" option from the recovery itself or from fastboot. If you reboot normally, the system might overwrite the recovery you just installed.

## Step 4: Installing the ROM

Once in recovery, the process is relatively straightforward:

```bash
# From recovery, enable sideload mode
# (select "Apply update" → "Apply from ADB")

# From your PC, send the ROM
adb sideload lineageos-22.1-jasmine_sprout.zip
```

Wait for it to finish (it can take a few minutes) and **don't reboot yet**.

## Step 5: The GApps Drama

This is where one of the biggest problems came. If you want the Play Store and Google services, you need to install **GApps** (Google Apps) separately, since LineageOS doesn't include them for legal reasons.

### The Problem

I tried several GApps options:

- **MindTheGapps**: Install error.
- **LiteGApps**: Same errors.
- **NikGApps**: Didn't work either.

After researching in the XDA thread, I discovered that **many users reported the same GApps issues with this specific ROM**. It was a known problem without a clear solution at the time.

### The Decision

I had two options:

1. Keep searching for a ROM + GApps combination that worked.
2. Use the phone **without Google services** and find alternatives.

I went with the second option. And honestly, it was one of the best decisions I could have made. More on that later.

## The Nuclear Option: Converting Mi A2 to Mi 6X

An interesting fact I discovered during research: the **Xiaomi Mi A2** and the **Xiaomi Mi 6X** are essentially **the same hardware**. The difference is that the Mi A2 comes with Android One (stock Android) and the Mi 6X comes with MIUI.

Some XDA developers suggest **converting the Mi A2 to Mi 6X** by flashing the 6X firmware. This opens the door to many more ROMs, since the Mi 6X (codename `wayne`) has more community support, including ROMs with Android 14 and 15.

I didn't do this in my case because the LineageOS ROM was already working well, but it's an option worth considering if you want more ROM variety.

## Step 6: Rooting with Magisk (Optional)

If you want root access on your device (total system control), you can install **Magisk**:

1. Download the Magisk APK from its official GitHub.
2. Rename the `.apk` file to `.zip`.
3. From recovery, flash the zip with `adb sideload`.

```bash
# Rename
mv Magisk-v27.0.apk Magisk-v27.0.zip

# Flash from recovery
adb sideload Magisk-v27.0.zip
```

Magisk gives you "systemless" root access, meaning it doesn't modify the system partition directly. This makes future ROM updates easier.

**What is root good for?** Things like:

- Removing system bloatware
- Using apps that require root (Titanium Backup, AdAway)
- Advanced system customization
- Magisk modules (like Viper4Android for better audio)

## Step 7: Alternative Apps - Life Without Google

This was the most surprising part of the process. I discovered that you can have a perfectly functional phone without depending on Google services.

### Aurora Store - Play Store Without a Google Account

**Aurora Store** is an alternative Play Store client. It lets you download any app from the Play Store **without needing a Google account** or Google services installed.

- You can use an anonymous account
- Downloads the same APKs as the official Play Store
- Clean interface without bloatware
- Automatic app updates

### NewPipe - YouTube Without Ads or Tracking

**NewPipe** is an open-source YouTube client that doesn't use Google's official API:

- **No ads** (you don't even need an ad blocker)
- **Background playback** (what YouTube Premium charges for)
- **Video and audio downloads** directly
- **No Google account** needed
- Import your subscriptions from YouTube

Honestly, the experience is better than the official YouTube app in many ways.

### Spotube - Spotify Without Premium

**Spotube** is an open-source Spotify client that combines Spotify's catalog with free audio sources:

- Listen to music from Spotify's catalog **for free**
- No ads
- Download for offline listening
- Similar interface to Spotify
- No Premium account needed

### Other Useful Apps

- **F-Droid**: Open-source app store. Lots of privacy apps and utilities.
- **Obtainium**: Update manager that downloads directly from GitHub/GitLab.

## Problems I Had and How I Solved Them

### "I can't find my device with adb"

**Problem**: When connecting the phone, `adb devices` showed nothing.

**Solution**: Making sure USB debugging was enabled and that I had accepted the debugging prompt on the phone screen. On Linux, you sometimes need to add udev rules:

```bash
# Create udev rule for Xiaomi
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="2717", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android.rules
sudo udevadm control --reload-rules
```

### "The recovery won't boot"

**Problem**: After flashing the recovery, the phone booted into the normal system instead of recovery.

**Solution**: With A/B partitions, you need to be careful with slots. I used `fastboot --set-active=a` to make sure I was on the correct slot, and rebooted directly to recovery without going through the normal system.

### "The ROM won't install due to signature"

**Problem**: When attempting sideload, the recovery rejected the ROM due to signature verification.

**Solution**: In Lineage Recovery, disable signature verification before installing. This is normal for unofficial ROMs.

### The Bootloop

**Problem**: After installing the ROM, the phone was stuck in an infinite reboot loop showing the logo.

**Solution**: Format the data partition from recovery (this erases all user data) and reflash the ROM. Bootloops usually happen when there are remnants from the previous system that are incompatible with the new ROM.

## Important Disclaimers

Before you jump into doing this:

- **You lose your warranty**: Unlocking the bootloader voids the manufacturer's warranty.
- **Risk of bricking**: If something goes wrong, you could render the phone unusable (though with the Mi A2, it's quite hard to cause a permanent brick thanks to EDL mode).
- **Back up everything**: Before starting, save all your photos, contacts, and important data.
- **Read before acting**: Read the complete XDA thread before flashing anything. Other users' comments are pure gold.
- **Charged battery**: Make sure you have at least 70% battery before starting.

## Conclusion

What started as "I'll just install a ROM real quick" turned into several hours of research, failed attempts, and learning. But the result was worth it:

- **Phone with updated Android** instead of abandoned Android 10.
- **Faster** than with the original system (Custom ROMs tend to be more optimized).
- **No bloatware** or unnecessary pre-installed apps.
- **Alternative apps** that in many cases are better than the official ones.
- **Knowledge gained** about how Android works at a low level.

A phone that was headed straight for a drawer is now perfectly functional for daily use: browsing, watching videos, listening to music, messaging, and much more.

If you have an old phone collecting dust, give it a chance before tossing it. You're not just saving money, you're reducing e-waste and learning things most users will never see.

---

*If you have any questions or want to share your experience with Custom ROMs, feel free to reach out on [LinkedIn](https://linkedin.com/in/raul-casado) or [GitHub](https://github.com/RaulCasado).*
