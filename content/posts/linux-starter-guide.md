---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Linux Starter Guide"
date: 2024-06-28T23:36:46+01:00
tags: ["linux"]
description: "How to install and use Linux"
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

TL;DR: This is a guide for anyone new to Linux, or that have never used Linux before. After reading the guide, you should be able to switch from Windows, macOS or ChromeOS to Linux, or at least know more about it and why many people prefer it.

## What is Linux?

You can think of Linux as an alternative to Windows and macOS; An operating system for your computer.

An OS is responsible for managing the computer's physical components (hardware) and programs (software). It acts as a 'bridge' between the two, allowing them to work together. Most computers come with Windows pre-installed, and Apple Macs come with macOS, so why should one consider switching to Linux instead?

Linux is open-source, meaning that anyone can read, distribute and contribute to the project however they see fit. Some may argue that, since the code can be read for anyone, bad actors can more easily find security flaws, but that is far from the thruth. Because so many developers work on Linux, security flaws are quickly discovered and fixed, before they bring any harm to the users. It is much harder to introduce a bug, since all contributions are approved manually, let alone allowing it to exist for long. This makes Linux much more secure than Windows or macOS.

Linux is also less resource-intensive, so you can run heavier programs and get the most out of your computer. If you use an Android device, Chromebook, or even smart home devices, you are already using Linux.

No entity controls Linux, due to its open nature, so you will always be private while using Linux by itself; It doesn't collect any user data, doesn't have paid features, and doesn't force you to see any ADS. Linux also doesn't force you to install updates if you don't want to, and won't interrupt your work for any reason.

The disadvantage of Linux (which has been improving a lot over the last few years) is software support. Some apps such as Photoshop and Microsoft Word and games like League of Legends and Roblox, don't work on Linux. Before switching to Linux, make sure all your programs are supported, and if not, try to find other free and open alternatives, like Kritta or GIMP instead of Photoshop, or Google Docs, LibreOffice or OnlyOffice to replace Microsoft Word.

## The First Step: Choose a Base Distribution

One of the best features of Linux is that you can customize it and use it however you like. Instead of a global Linux OS, you get to choose a distribution. Linux itself is just a Kernel - like an engine, that can be used to power any distribution.

A Linux distro bundles the Linux Kernel, a Desktop Environment and some free and open-source programs to help you get started.

There are hundreds of distros, but only three will be more relevant to you:

- Debian Linux
- Arch Linux
- Fedora Workstation

These are often used as a base for other distros to build upon.

To get started, I recommend that you pick Debian-based options, because they are the most widely used, have better support, and are overall more stable. You will find more documentation and help online with these, too.

## Choose Your Desktop Environment

Again, there are many DEs, but the two most popular are *GNOME* and *KDE Plasma*.

This choice won't affect how your computer works, but rather how it looks like and how it feels to use. 

GNOME is simple and intuitive, and that makes it harder to customize, but also stable and predictable. You can add features with extensions, and it has the best application ecosystem available. By default, it feels more like macOS.

![Gnome 46](../../images/gnome46.jpeg)

KDE Plasma is the most powerful desktop of any operating system. It is very flexible, and you can customize it easily however you see fit. You can change almost everything through the settings, but that also makes it more complex, and so, less intuitive. By default, it looks a lot like Windows 10, but you can make it look like anything, really. The main downsides are that KDE tends to be more buggy, and applications designed for it are more complex and often lack simpler features.

![KDE Plasma 6](../../images/plasma6.jpg)

The choice you make doesn't really matter that much, since you can easily switch between them if you happen to not like one, or prefer the other. If you can, try both, and see which one you like the most. As a general rule, if you came from Windows, try KDE Plasma, and if you came from macOS, try GNOME first.

## Choose a Distribution

Finally, you can decide which distro to install.

If you decided to try GNOME, I recommend the following:

- [**Ubuntu**](https://ubuntu.com/download/desktop) Easy to install and use, a good first option. Includes a dock and some extra features that most people find useful (for example: a dock and a slightly different style).
- [**Debian**](https://www.debian.org/) Even more stable than Ubuntu. Uses older packages and has a lot more manual configuration, and updates are not as intuitive. Choose Debian only if you are willing to explore and learn more about Linux.

And if you chose KDE Plasma, try:

- [**Kubuntu**](https://kubuntu.org/getkubuntu/) A derivation of Ubuntu that uses KDE instead. Easy to use and has the best software support.
- **Debian** Select KDE Plasma when prompted, instead of GNOME. Debian uses an older version of KDE, but it is the most stable distro you can choose. Debian has more manual configuration than Kubuntu, so choose it only if you are willing to learn more about Linux.
- [**Linux Mint**](https://linuxmint.com/download.php) Another great option to get started. Has a Cinnamon and KDE version, both are quite simple to use and well-designed. This is the most recommended option for new users, and it feels a lot like Windows 10 out of the box. Choose it if you want something simple and more similar to Windows.

## Install Linux

it  
First, you'll need a spare USB drive. The drive will be erased, so make sure to not leave anything important on it. Download your preferred distribution from their respective websites (likely an `.iso` file) and a flash tool, such as [Balena Etcher](https://etcher.balena.io/).

Then, use Balena to flash the iso onto the USB drive. This is a simple process, all you have to do is follow the instructions on the Balena Etcher program.

Note: Remember to save your files somewhere before continuing, as your drive will be fully erased.

After doing so, shut down your computer. The USB drive you created contains the Linux system that you want to install, but to use it, you have to tell the computer to boot it instead of your current Windows or macOS installation. On most Windows devices, you can press F10,F11 and F12 repeatedly while starting, and a menu will appear, where you can select your USB drive. If this didn't work for you, try the DEL and F2 keys, and you will enter the BIOS. From there, look for a list of boot devices, and place the USB drive first. If you couldn't do this, or are using a Mac, search for help online. This process can vary between motherboard brands and manufacturers.

Once you see the logo of your distro, follow the steps on-screen to install it. The exact process will change over time, so by the time you read this post, anything I write could be outdated. Luckily it's easy to follow, so you won't need a guide for this.

If prompted, select your preferred DE, and when the installer asks for a disk, select your computer's drive, and fully erase it. If you encounter any option that confuses you, leave it as the default, or quickly search what it does online. The default values are the ones most people would want to use, so they should be what you are looking for.

After a reboot, you should be greeted by a display manager (login screen), and after you log in, your new Linux desktop.

### Troubleshooting

If something went wrong, not all is lost.

The most common issues are:
- **You are using a new computer, with parts that are not yet supported by the Linux Kernel.** If you decided to try Debian or Linux Mint, try Ubuntu or Kubuntu instead. Ubuntu is often more up-to-date, since Debian is focused on stability over device support.
- **You have proprietary components, such as NVIDIA GPUs.** This issue is usually very simple to fix, simple check if you misses any option during installation to use proprietary drivers/firmware if needed.
- **The computer is working, but one or more features seem broken.** Bluetooth or WiFi don't work, or a touchscreen is unresponsive. In these cases, make sure that your hardware is supported, and try to install its proprietary drivers.
- **Low performance in games / graphic glitches.** You are likely using an NVIDIA GPU. Install the proprietary drivers, and it should be good to go. Ubuntu and Mint have driver managers and tools to help you with this. If you can't find them, look for help online. There are many articles about this subject.
- **I can see my desktop, but text and icons look very small.** Go to settings and search for display scaling, then increase the slider until your desktop looks fine. This happens because you are using a 2K or 4K screen, which has more pixels than a regular screen. After applying your new scaling setting, reboot. Sometimes some elements will still look blurry until you do.

## Install New Programs

Some programs might be missing, or you may need something that isn't installed by default.

To install new software, open the `Software` app on GNOME (the name can vary) or `Discover` on KDE. From there, simply search for any software you need, and install it.

If you can't find what you are looking for, search online for the program's webpage. Some programs are available as `.deb` files, which you can run to install new software. After launching it, you will have the option to install the program. These are similar to `.dmg` files on macOS and `.exe` or `.msi` files on Windows. Use this option as a last resort only. Most apps you will ever need are in the software store program, and files downloaded from the web may not be as secure.

## Keep Exploring!

With a Linux desktop and the software you need, you should be ready to use your device. If you can, spend some time exploring and changing settings to customize your system, and make the most out of it.

If you had any issues that are beyond the scope of this post, and can't find a solution online, feel free to send me a message (links in the home page), or ask on Reddit or a Linux forum. You may also have HexChat, Konversation, or another IRC client, which you can use to chat with other Linux users and developers in a public room.
