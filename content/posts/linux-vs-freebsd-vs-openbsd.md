---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Linux vs FreeBSD vs OpenBSD"
date: 2024-06-10T11:05:20+01:00
tags: ["freebsd", "openbsd", "linux"]
description: "Straight to the point comparison between Linux and *BSDs."
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

## Why am I doing this (again)?

I've been using Linux for many years, and recently tried FreeBSD on a spare laptop. I didn't see many differences initially, but it got me wondering: What *really* are the differences between Linux and \*BSDs? Which OS should I use?

Of course, the short answer is always the same: **It depends**. So, I had to decide what is most important to me. Before continuing, I recommend that you do the same.

From most relevant to less important for me personally:

1. Performance (How fast the OS is. The fewer lines of code, the better. How is memory usage? Minimal requirements?)
2. Security (How secure is it by default? Can I harden it further?)
3. Separation of concerns (I don't mean it on a technical level. Instead: Are the user packages and configs mixed with the OS's? Will I feel the need to format the computer often? Can I easily know where everything is and why?)
4. Hardware compatibility (Does it work on my machine? On an older machine? On a newer machine?; Can I plug in a random speaker/camera/USB stick and expect it to work?)
5. Software availability (Can I easily install the software I use? If not, can I compile it manually? Is porting unavailable software easy?)
6. "Extra" features (Does it support Bluetooth? Wifi6? Has a cool virtualization system?)

You may disagree with my priorities - and that's okay, the final decision will likely vary.

## Linux vs \*BSDs

First, we'll take a look at Linux Distros and how they compare. ~~(I'd just like to interject for a moment. What you’re referring to as Linux, is in fact, GNU/Linux, or as I’ve recently taken to calling it, GNU plus Linux.)~~ 

All Linux distros use the Linux Kernel, and most (but not all) use GNU utilities and SystemD.

The Linux Kernel is very large, and so, much less minimal than any BSD Kernels. However, the code is there for a reason, and it is mainly for hardware support. Linux also develops faster and tools are often replaced, making it more up-to-date but less stable.

In short, these are the advantages of Linux over BSDs:

4. Hardware compatibility
5. Software availability (Most proprietary software that supports Linux does not support BSD. It's easier to find software for Linux overall.)
6. A LOT of extra features
- Video Performance (Nvidia GPU support and performance in games is usually better)

As you can see, these aspects (4., 5., 6.) are lower on my list, so let's continue.

## FreeBSD

FreeBSD seems to be the most popular BSD OS and has the most ported software available. It is aimed for general use and takes performance as a priority.

The advantages are as follows:

1. Performance (one of the main goals of the project)
2. Security (Generally safer than Linux)
3. Separation of concerns (user packages are only installed in user directories; the base system is always clean.)
5. Software availability (Can run Linux binaries and has many ports available.)
6. Extra features (ZFS support, Jails, Bluetooth and more.)
- Documentation (The community is smaller than Linux's, but the written documents are far better.)
- Fast `pkg` (The package manager is written in C and is faster than OpenBSD's.)

## OpenBSD

OpenBSD is heavily focused on security and readability. The documentation and manual pages are great, and it is more minimal than FreeBSD.

The differences are:

2. Security (Security is the main goal. The codebase is minimal and tidy. This also means that there is less change over time, and it lacks performance improvements that would make the system less secure.)
3. Separation of concerns (Similar to FreeBSD.)
4. Hardware compatibility (Supports older hardware.)
- Does not have Bluetooth support (Doesn't matter to me.)
- Documentation (another primary focus. Said to be better than FreeBSD in some cases.)

## Conclusion

For my needs and wishes, FreeBSD is likely the better option for me. It is still minimal compared to Linux, while having great software support and performance. There are also patches for DWM (I'll post about it soon!), and I feel like it will require less effort to use than OpenBSD.

My preference (in theory) boils down to this:
1. FreeBSD
2. OpenBSD (if FreeBSD does not work on that hardware, or if security is the primary need.)
3. Linux (if both fail to support my hardware, or I happen to need a program that doesn't work on both. I'm used to Debian, but was recommended Alpine by the community.)

My preferences and needs might change, so I'll create a new post after properly testing FreeBSD and OpenBSD. Until then, feel free to correct me and make suggestions, as usual. I'll read every email I get.

I also encourage you to check out the sources below. I simplified this post a lot; It is only meant to help you (and me) decide which OS to use, not explain every difference and features is detail. Quare FreeBSD was especially useful.

Thanks for reading and a special *thank you* to everyone who helped on Reddit, link below.

## Sources

- Smart people on Reddit – <https://redd.it/1dbxxyb>, <https://redd.it/1dbxz0r>
- [Old YT playlist (some good points there)](https://www.youtube.com/playlist?list=PLdArachVKgnZ4-RPot9EbKBdyR4qtzIOo)
- [Quare FreeBSD](https://vermaden.wordpress.com/2020/09/07/quare-freebsd/) – <https://redd.it/inwclo> | <https://news.ycombinator.com/item?id=31664952>
- [Alpine Linux](https://alpinelinux.org/about/)
- [OpenBSD Goals](https://www.openbsd.org/goals.html)
- [OpenBSD Why Use](https://www.openbsd.org/faq/faq1.html#WhyUse)
- [FreeBSD Features](https://www.freebsd.org/features/)

