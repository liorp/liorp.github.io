---
title: "How to install Hebrew in LyX on macOS"
date: 2022-08-14T18:40:00+03:00
categories:
  - tutorials
tags:
  - lyx
  - hebrew
  - macos
excerpt: "Adding Hebrew support to LyX using XeTeX"
---

Recently I bought a new Mac Mini with the M1 chip (boy, is this thing f-a-s-t), and I wanted to start fresh. So, it's just about time I wrote this little guide.

---

After installing some of my favorite programs, I tackled the notorious installation of LaTeX with Hebrew support head-on.

Here's what I did:

- I'm using [MacTeX][mactex] and [LyX][lyx].
- To add Hebrew support, I downloaded the [Culmus Hebrew fonts][culmus] (the gz file for OpenBSD), and installed (directly into Font Book) the David, Miriam, and Simple fonts.
- I compile using XeTeX, which supports Unicode out of the box.
- My font settings are:
  - David CLM for Roman
  - Simple CLM for Sans Serif
  - Miriam CLM for Typewriter
  - Class Default for Math

Check out the following picture for more details (this can be found under `Document➡️Settings...`):

![settings](/assets/images/2022-08-14-how-to-install-hebrew-in-lyx-on-macos/settings.png)

---

Further guides can be found [here][huji] (I personally recommend the guide by Michael Kelly).

[mactex]: https://www.tug.org/mactex/
[lyx]: https://www.lyx.org/
[culmus]: https://sourceforge.net/projects/culmus/files/culmus/0.133/culmus-0.133.tar.gz/download?use_mirror=netix
[huji]: https://huji-il.libguides.com/LyX
