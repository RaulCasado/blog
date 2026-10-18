---
title: 'How I turned my Kobo into a client for my self-hosted library'
description: 'What began as removing recommendations from the home screen became two reading paths: KEPUB in Nickel for books and CBZ over OPDS in KOReader for manga and comics. Backups, commands, decisions and real verification.'
pubDate: '2026-09-13'
heroImage: '../../../assets/blog/kobo-library-cover.jpg'
heroImageAlt: 'An e-ink reader displaying a black-and-white comic page'
tags: ['linux', 'devops']
lang: 'en'
featured: false
---

## It started with two cards I did not want to see

My Kobo worked well. It synced books from my server, opened them quickly and had the battery life you expect from an e-ink reader. The problem was much less dramatic: every visit to the Home screen brought up shop recommendations, Kobo Plus and related books I had not asked for.

There were also two tabs I never used, Notebooks and Discover. What I wanted sounded simple: a clean home screen, a shortcut to my library and a comfortable way to read manga and comics without filling the device.

The list grew while I discussed the options with Copilot. NickelMenu, KOReader, reading profiles, orientation, EPUB, KEPUB, CBR, CBZ, OPDS and KoboPatch all entered the conversation. At some point I was no longer fixing two annoying cards. I was designing how the Kobo should fit into my home server.

One condition was fixed from the start: **every change had to be reversible**. I did not want to replace the original reader, break a sync setup that already worked or apply a binary patch blindly because a website recognised the model.

The final setup uses two readers on the same device. Nickel, Kobo's original software, still handles novels and non-fiction. KOReader handles fixed-layout image content. The server remains the only library.

## The conversation was a lead, not proof

Copilot did a useful first pass. It identified the device as a Kobo Libra Colour N428 running firmware `4.45.23792`, prepared early backups, installed a custom sleep image and adjusted the night-reading settings. I settled on STIX Two Text, font size 29 and frontlight level 15. It also explained the broad differences between NickelMenu, KOReader and KoboPatch.

The conversation contained something even more valuable: my actual concerns. This was not only a question of how to install a package. I was worried about breaking server sync, losing access to the official store, filling 32 GB with comics and having to maintain a patched firmware every time Kobo shipped an update.

I exported the complete chat to Markdown. That file became the working specification. Before touching the device again, I checked every important claim against the Kobo itself, the server configuration and the official projects.

That distinction matters. An assistant can suggest a sensible combination of tools while getting a version, path or experimental option wrong. Saying “this is reversible” is also weak unless a tested backup and a concrete route back both exist.

These were the sources that survived the review:

- [NickelMenu](https://pgaskin.net/NickelMenu/), which adds actions and menus without directly patching system files.
- [NickelHome](https://github.com/nicoverbruggen/NickelHome), which hides selected widgets on the Home screen.
- [KOReader](https://github.com/koreader/koreader), which publishes a Kobo package and documents installation on these devices.
- [Calibre-Web-Automated](https://github.com/crocodilestick/Calibre-Web-Automated), which already handled my library, ingestion and Kobo Sync.

KoboPatch did not make the first phase. I could not find a patch set that declared exact support for that firmware. A web tool can recognise a reader and still lack patches prepared for its binaries. I chose components I could remove independently.

## A backup does not count until it is verified

Linux sees the Kobo as a FAT volume. Copying it with `rsync` was easy. Knowing that the copy matched the device and that its database could be opened was the useful part.

The equivalent procedure, with generic paths, was:

```bash
rsync -a --info=progress2 '<KOBO_MOUNT>/' '<BACKUP_DIR>/'

find '<BACKUP_DIR>' -type f -print0 \
  | sort -z \
  | xargs -0 sha256sum > '<BACKUP_MANIFEST>'

sha256sum --check '<BACKUP_MANIFEST>'
sqlite3 '<BACKUP_DIR>/.kobo/KoboReader.sqlite' 'PRAGMA quick_check;'
```

The new backup contained 270 files and used about 138 MB. Every SHA-256 matched and SQLite returned `ok`.

There was a small trap. Opening a SQLite database can create temporary `-wal` and `-shm` files. They were not part of the source, so I closed SQLite and removed them from the backup. The inventory returned to the same 270 files.

This sounds excessive until a restore is needed. A directory named `backup` does not prove that its contents are complete. A verified manifest and a successful `quick_check` provide much better evidence.

## Three tools with three separate jobs

The project stopped looking like one big “Kobo mod” once I separated the responsibilities.

**NickelMenu** is the launcher. It adds entries to the original interface: open the web library, toggle Wi-Fi, rotate the screen, sleep, reboot, visit My Books or launch KOReader. It does not replace Nickel and it does not convert formats.

**NickelHome** changes the Home layout. Its job is to hide the promotional cards NickelMenu does not control.

**KOReader** is another reader. I open it for manga, comics and PDF, then close it when I want to return to Kobo. It provides an OPDS browser, cropping, zoom and folder-based profiles.

The bottom navigation became:

```text
Home · Books · Activity · Utilities
```

Utilities contains shortcuts to the server library, KOReader, books, collections, statistics, Wi-Fi, orientation, sleep and reboot. Two extra actions restore the Home cards and tabs without uninstalling anything.

The relevant NickelHome configuration is small:

```text
nhm_enabled:1
hide_home_row1col2_enabled:1
hide_home_row2col2_enabled:1
hide_home_row3_enabled:1
```

Those positions depend on the interface version. I did not copy them and hope for the best. I rebooted, reconnected the Kobo and read NickelHome's log. The mod reported that it had loaded on `4.45.23792` and hidden the three expected areas. I then checked the screen on the device.

## Preparing the package before preparing for trouble

I downloaded fixed versions and kept the source archives beside a checksum manifest:

- NickelMenu 0.6.0.
- NickelHome 0.6.
- KOReader 2026.07.1.

The Kobo build of KOReader 2026.07.1 is listed in the [official release](https://github.com/koreader/koreader/releases/tag/v2026.07.1). The [Kobo installation guide](https://github.com/koreader/koreader/wiki/Installation-on-Kobo-devices) also warns that Nickel may try to index hidden directories on firmware 4.17 and later.

I added the recommended exclusion to `[FeatureSettings]` in the Kobo configuration:

```ini
ExcludeSyncFolders=(\.(?!kobo|adobe).+|([^.][^/]*/)+\..+)
```

NickelMenu and NickelHome each shipped a `KoboRoot.tgz`. I inspected both archives, merged their contents and built one update package. KOReader went into `.adds/koreader`. No KoboPatch binary was included.

Deployment used Kobo's normal update mechanism:

```bash
cp '<MERGED_KOBOROOT>' '<KOBO_MOUNT>/.kobo/KoboRoot.tgz'
rsync -a '<PAYLOAD>/.adds/' '<KOBO_MOUNT>/.adds/'
sync
udisksctl unmount -b '<KOBO_DEVICE>'
udisksctl power-off -b '<KOBO_DEVICE>'
```

When I reconnected the reader, `KoboRoot.tgz` was gone. That was expected because the updater had consumed it. I counted the KOReader files, checked the configuration and read the NickelHome log. Only then did I consider the installation complete.

## EPUB, KEPUB, CBR and CBZ without the alphabet soup

This caused more confusion than the installation because the names look related when some of them are very different things.

An **EPUB** contains reflowable text. Increasing the font size causes paragraphs to lay themselves out again. It is the normal file I download and upload to the server.

A **KEPUB** is that book prepared for Kobo's engine. It integrates better with chapters, reading statistics, time remaining and other reader features. CWA keeps the EPUB and generates a KEPUB copy. Kobo Sync offers that copy to the native reader.

A **CBR** is usually a RAR archive full of images. A **CBZ** is usually a ZIP archive full of images. Each image is one page. Font size has no meaning because the lettering is part of the picture.

**CWA** is not a format. It stands for Calibre-Web-Automated, the service running on the server.

My existing path stayed intact:

```text
Windows -> portable storage -> laptop -> CWA receives EPUB
                                         -> keeps EPUB
                                         -> creates KEPUB
                                         -> Kobo Sync
                                         -> Nickel
```

Manga and comics received a second path:

```text
RAR or CBR -> validate -> CBZ -> CWA -> OPDS -> KOReader
```

I did not convert manga to KEPUB. CBZ preserves the pages, is easy to inspect and lets KOReader handle cropping and reading direction.

## The CBR files that were not CBR files

The first real test arrived as two RAR archives. One held a comic collection and the other held three manga volumes. Together they contained 124 inner files.

`7z` could read most of the large archive but reported an unsupported method for 17 items. I did not install another decompressor system-wide for a one-off task. I unpacked an `unrar` package inside the workspace and ran its binary from there.

I tested both outer archives before extracting them:

```bash
'<LOCAL_UNRAR>' t '<COLLECTION_ARCHIVE>.rar'
'<LOCAL_UNRAR>' t '<MANGA_ARCHIVE>.rar'
```

Both passed. I then validated every inner file. That exposed the amusing part: 95 were real RAR archives, while 29 were ZIP files carrying a `.cbr` extension. Renaming extensions blindly would have produced a tidy-looking collection whose labels lied about the contents.

The file signature decided which extractor to use. I also removed one advertising `.url` shortcut from the extracted material. The original RAR files stayed untouched.

I wrote a script to normalise every book. It did the following:

1. Detect RAR or ZIP from the contents.
2. Extract images only.
3. Apply natural page sorting.
4. Open every image with Pillow to verify it.
5. Rename pages to `0001.jpg`, `0002.jpg` and so on.
6. Create a CBZ using `ZIP_STORED`.
7. Add `ComicInfo.xml` with series, number, author, publisher, language and reading direction.

I used `ZIP_STORED` because JPEG and PNG are already compressed. Compressing them again inside the ZIP saves little and costs time. I did not resize or re-encode the images either. The goal was to preserve the received material and leave visual fitting to the reader.

The result was 124 CBZ files, 4,618 pages and about 3 GB. There were 4,568 JPEG files, 50 PNG files and 196 landscape pages. The last number matters because it includes double-page spreads.

I visually inspected samples from both series, generated a SHA-256 manifest and checked all 124 files before sending them to the server.

## CWA needed one new rule, not another server

The library already ran on CWA. Deploying Kavita or another service only for comics would have duplicated accounts, backups and maintenance. CWA already supports CBZ and CBR. Its automatic conversion was the problem because EPUB was configured as the target.

Before changing it, I made consistent backups of `cwa.db`, `app.db` and `metadata.db` through SQLite's backup API. Copying a `.db` while another process is writing can capture an inconsistent state. `Connection.backup()` avoids that risk.

I changed only the list of formats that should not be converted:

```text
auto_convert = 1
auto_convert_target_format = epub
auto_convert_ignored_formats = cbz,cbr
```

Regular books continue to arrive as EPUB and generate KEPUB. Comics are imported as CBZ or CBR.

I uploaded everything to a separate staging directory first. The transfer and verification pattern was:

```bash
rsync -a --info=progress2 '<READY_DIR>/' '<SERVER>:<STAGING_DIR>/'
scp '<SHA256_MANIFEST>' '<SERVER>:<STAGING_DIR>/SHA256SUMS'
ssh '<SERVER>' "cd '<STAGING_DIR>' && sha256sum --check SHA256SUMS"
```

The server reported 124 files and 3 GB. I still did not send all of them to ingestion. I copied one comic and one manga volume, watched the logs and queried `metadata.db`. CWA said the format was excluded from conversion and added both books as `CBZ`.

Only then did the remaining 122 files enter. I counted two things every 15 seconds: CBZ rows inside Calibre and files still waiting in the ingest directory. The counters ended at `CBZ=124` and `PENDING=0`, with a healthy container.

## The metadata proved why the pilot mattered

The content imported correctly, but CWA did not understand `ComicInfo.xml` the way I expected. The first comic had an unknown author and the first manga volume treated “Volume 01” as its author.

I made another `metadata.db` backup and prepared a script with two modes. With no arguments it only built a plan and required exactly 124 unique matches. With `--apply` it called `calibredb set_metadata` for every book.

I did not write directly into Calibre's relationship tables. I used its supported interface:

```bash
docker exec calibre-web-automated \
  calibredb set_metadata \
  --with-library=/calibre-library '<BOOK_ID>' \
  --field 'title:<TITLE>' \
  --field 'authors:<AUTHOR>' \
  --field 'series:<SERIES>' \
  --field 'series_index:<INDEX>' \
  --field 'tags:<Manga-or-Comics>' \
  --field 'languages:spa' \
  --field 'publisher:<PUBLISHER>'
```

Calibre finished with 121 books in the comic series and 3 in the manga series. The `Comics` and `Manga` tags act as virtual folders in CWA and OPDS. Calibre continues to organise physical storage by author and title, which is its normal model.

## Verifying the wrapper was not enough

CWA rewrote the ZIP containers while applying its services and metadata. The SHA-256 of each complete CBZ therefore changed. A different hash could mean a legitimate `ComicInfo.xml` update or a damaged page.

I opened all 124 server-side CBZ files, ran the ZIP CRC test and calculated the SHA-256 of every image inside. I then compared each page against the normalised source.

```text
ARCHIVES_OK=124
PAGES_IDENTICAL=4618
QUICK_CHECK=ok
```

All 4,618 pages were byte-for-byte identical. The ZIP wrapper and metadata had changed, not the images.

I took a final snapshot of all three databases and ran `PRAGMA quick_check` again. CWA was still healthy.

## Two profiles and an OPDS catalogue

I copied only two pilot files to the Kobo, one manga volume and one comic. Together they used about 170 MB. Copying all 3 GB over USB would have defeated the point of building an on-demand path.

KOReader received two automatic profiles:

| Setting | Comics | Manga |
| --- | --- | --- |
| Direction | Left to right | Right to left |
| Reflow | Off | Off |
| Crop | Automatic | Automatic |
| Fit | Full content | Full content |
| View | One page | One page |
| Footer | Hidden | Hidden |

The profiles plugin can execute settings when a document path contains a chosen string. Books below `/Comics/` receive the first profile and books below `/Manga/` receive the second.

I did not add automatic rotation for double-page spreads. There were 196 landscape images, but a rule that rotates every wide page can help with a spread and get in the way on a cover or an unusual composition. I left an orientation shortcut so the decision can be made while reading.

The CWA OPDS catalogue was preloaded in KOReader without a password. The user enters it on the device once. The download dialog then allows a local folder to be selected before downloading a CBZ.

“On demand” needs one qualification here. The selected volume is downloaded in full. Pages are not streamed one at a time, and the whole collection does not download either. That middle ground is the right one for me.

## The warning I did not fix because it did not need fixing

During ingestion, CWA tried to store checksums for KOReader progress sync and logged `no such table: book_format_checksums`.

Multi-device KOReader progress sync was disabled. CWA creates that table when the feature is enabled, but the ingest processor still attempted to calculate a checksum. The warning did not affect files, OPDS, Kobo Sync or ingestion.

I could have created the table manually to make the log quiet. That would have been the wrong fix because it would introduce schema that the application expects to manage when the feature is enabled. I documented the warning and left it alone. If I later need progress sync between two KOReader installations, I will enable it in CWA and let the application run its migration.

## Where the setup ended up

The Kobo is still a Kobo. Novels appear in the native library, use KEPUB and keep the integration I already had. Home no longer looks like a shop window. The Utilities tab gathers controls that used to be scattered across menus.

When I want manga, I open KOReader. I choose a volume through OPDS, save it below `/Manga/` and the profile changes the reading direction. A Western comic goes below `/Comics/` and page progression returns to left-to-right.

There is a complete device backup, three server database restore points, the original packages, checksums, staging data and normalisation scripts. The source RAR files are untouched.

Installing three tools was not the most useful part. Giving each one a limited job and checking every boundary was: firmware, archive, database, network and device. If an update breaks NickelHome, I can remove it without losing KOReader. If I stop using KOReader, Nickel and Kobo Sync remain. If CWA misreads another collection, the pilot will expose it before a hundred files enter the library.

That is what reversible meant in this project. It did not mean that nothing could fail. It meant that every failure had a known way out.

*Cover image adapted from a [CC0 photograph by freestocks.org](https://commons.wikimedia.org/wiki/File:Reading_on_an_e-book_reader_(Unsplash).jpg).*
