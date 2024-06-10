---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Exploring FreeBSD"
date: 2024-06-01T17:55:19+01:00
tags: ["freebsd", "bsd"] 
description: "A linux user's first steps into the BSD world."
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

**TL;DR** Although I've heard of BSD before and have experience with Linux, I have never attempted to run a "true" BSD system (excluding macOS) as a daily driver. I likely made mistakes along the way, and not everything went as planned. If you are an experienced FreeBSD user, feel free to correct me or send some tips my way. I'll read any emails I receive. I will definitely revisit FreeBSD in the future. *This is a blog post, not a guide.*

## Motivation

A few days ago, I was researching, as I often do, when I stumbled across someone recommending FreeBSD in a video's comment section.

The name sounded familiar, but I never looked into it that much. After a few hours of research and a quick read of the [Chapter 1. Introduction](https://docs.freebsd.org/en/books/handbook/introduction/) of the FreeBSD Handbook, I learned a few things:

- The documentation seemed very good. Unlike what I am used to in the Linux world. `Man` pages have examples and the guides are actually very well-written and helpful.
- The kernel itself is smaller than Linux, and seems very secure and minimal.
- FreeBSD can actually be used as a Desktop OS and supports Xorg and even Wayland, which surprised me.
- Not all Linux software will work on FreeBSD, but luckily, everything I use is available as a package (and port).

So, I decided to try FreBSD on a spare laptop to see where it would take me, if not for anything else, just to learn something new.

## Installation, the handbook and XFCE

The initial installation was surprisingly easy. The TUI installer is intuitive, and setting up the system (while reading the handbook) never had me lost. As mentioned before, the documentation is *really* good, and this chapter was no exception.

![Installing FreeBSD](/images/freebsd14-install.png)

After setting it up and testing the TTY, I found that although many Linux utilities are present, they either work slightly differently or have less options. Personally, I think that is a good thing; Thery feel simple.

Eventually, I needed a GUI, and so, I installed **XFCE**. Again, the handbook was very helpful.

I didn't add my user to the `wheel` group, but logging into root and enabling it fixed the issue.

XFCE behaves similarly on Linux and overall felt quite stable, as it usually does.

## Going deeper

I was happy with my system for a while, but soon enough, I wanted to take things further.

I like to keep my workstation as clean and simple as possible, so I removed XFCE and began preparing a **DWM** system.

Something interesting I noticed is that, because FreeBSD is a complete OS instead of a distribution (like Debian or Arch for Linux), there are no packages installed, and `pkg` only returns itself. Every package the user will ever install is located at `/usr/share/...` and not as part of the system. This is another great advantage for FreeBSD.

However, not all went as planned. Soon enough, the network stopped working, and so I began troubleshooting.

Pinging Google and freebsd.org worked, but I was having issues with certificates. It took me a while to figure out, but I had to install a package: `ca_certificates_nss` and remove the old ones. This did not fix the issue by itself, but reinstalling git and curl did fix it.

I kept working on the system for over an hour until I couldn't connect to the internet, again. This time, I couldn't solve it. I couldn't ping any websites and could only communicate with my local network. (It wasn't the router's fault... something was wrong with the system.)

Still, I got DWM, Dmenu and ST to work, until "disaster" struck again.

Rebooting the system didn't work; the computer would never turn off; a poweroff and halt had the same result. This is another issue I couldn't fix (yet).

I also noticed that a missing driver for the SD card reader was slowing the boot time by ~2min, so I disabled it.

## My final thoughts

Overall, I can't use FreeBSD on my current hardware, or, most likely I'm missing something important. In any case, I believe that my goal was fulfilled: To learn a new system and better understand Linux.

The [Handbook](https://docs.freebsd.org/en/books/handbook/) provides a lot of good information that is useful for BSD *and* Linux systems. Learning how a file system works, better understanding drivers and the differences between both systems is already a great takeaway.

I'd like to keep exploring, but for now, I do have work that needs to be done, and so I'll return to my previous Linux system. I will likely revisit FreeBSD in the future, and I'll still recommend it, especially for servers, but I won't be switching as of now.
