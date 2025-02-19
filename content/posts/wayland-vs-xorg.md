---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Wayland vs Xorg"
date: 2024-06-06T10:27:24+01:00
tags: ["wayland", "xorg", "linux"]
description: "My experience with Wayland. Is it ready in 2024?"
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

## A Bit of Context

### What is a Display Server?

If you use Linux or any BSD variant, you have likely heard of, and used, a display server.

A display server is the component required to load any graphics or graphical user interfaces (GUIs - most browsers, games, …) and display any video content.

The display server also handles input, manages the physical display, listens for requests to draw graphics, and supports hardware acceleration.

### Xorg

For many years, Xorg was the only (usable) display server. It has a very complex design by nature, handles many functions, and overall is very monolithic. This can be a great feature since the window manager and app developers tend to have less lower-level code to handle graphics, but Xorg's design has made it very difficult to maintain and improve.

Most linux programs were designed with Xorg in mind, however, a newer display server is slowly taking over.

### Wayland

Wayland is the opposite of Xorg. It has a simpler and more efficient design and is overall more modern, with the ability to draw 'perfect frames'; doesn't have screen tearing issues; and doesn't allow apps to record the entire screen or easily act as keyloggers. For the times in which an app does need to use these features, Wayland implemented portals, which often ask for user permission first.

There is no doubt that Wayland is the future of display servers, but not everyone agrees that Wayland is ready as of now. There are still many bugs, missing features, and other issues to worry about.

## My Take on Wayland

We can now finally answer the question: Which display manager should you use?

If you use XFCE, MATE, Cinnamon or any X window managers, such as dwm and i3, you can only use Xorg. These do not support Wayland (yet).

If you use sway, hyprland, or any other Wayland compositor, you need Wayland. I highly recommend you to also enable XWayland for this use-case, as many apps only support X, and you will likely run into many issues if you don't have X support as well.

Finally, you may have the option to choose. In this case, assuming you use linux as a desktop OS, in my personal opinion, I still recommend Xorg.

Wayland is good, but because many apps do not support it well, you will run into bugs and crashes. For example:

- Chrome and Electron apps look blurry on a 4K screen since they render at Full HD instead of the native resolution. To resolve this, you have to add a flag to the application's `.desktop file` - `--ozone-platform-hint=auto` usually fixes it.
- Steam has issues with certain games, resulting in crashes and system freezes.
- Some hardware, like some NVIDIA GPUs, either don't work or have rendering artifacts, crash often or are generally unstable.
- Many games have worse performance when compared to Xorg.
- Some apps that require screen sharing are expecting Xorg, and so they won't be able to access the screen, or use a portal that needs to be installed on the system (or at least, have a graphical frontend for the user).
- However, because Wayland is newer, you will have better performance in some cases, and have access to the newest features, including better security and a more minimal system.

Wayland will also fix screen tearing. If it bothers you on X, you can use a compositor like picom, at the cost of a noticeable input delay. Wayland window managers are also compositors, so an external compositor is not needed.

## Conclusion

The final choice fully depends on your personal needs and wishes. Here's my guide to help you choose:

1. Do you use i3, dwm, XFCE, or any X window manager?
    - Yes: Stick to X. Your tools will likely be ported to Wayland in the future. If not, new alternatives will arrive, such as sway for i3.
2. No: Do you value stability over new features?
    - Yes: Again, use Xorg. Wayland is newer and has compatibility problems with many apps.
3. No: Are you willing to fix issues, research and replace some apps with Wayland alternatives?
    - Yes: Wayland is likely for you. You will get the newest features, no screen tearing, and a more minimal system.
    - No: Xorg is more stable, and you will likely have less issues with it.

Personally, I'm using Xorg with DWM, since I would still need XWayland for my work and would have to replace DWM, Dmenu, ST and many programs I use daily. Also, because I have a HiDPI screen, some apps scale poorly (or not at all; they appear blurry), and Wayland compositors such as Sway and Hyprland crash very often and/or have very low performance. This is likely an issue with my hardware, but many people report the same.
