---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Smartphone Security and Privacy Guide"
date: 2024-06-16T12:44:18+01:00
tags: ["android", "privacy", "security", "grapheneos"]
description: "Most people need a phone, but they all collect personal data and track you. How can we fix our phones, then?"
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

## The Current State of Smartphones

Most people own a smartphone. They are extremely useful tools, but they are also a nightmare for security and privacy. This guide will attempt to help you improve your security and privacy while using a smartphone, without losing useful functionality.

There are, mainly, three types of smartphone:
- Android Devices
- iOS Devices (the iPhone)
- Dumb phones / brick phones / feature phones (KaiOS or custom)

### Android

Android by default is the most customizable of the bunch. Different brands usually have their own software, and also ship Google apps. The most important one being Google Play Services. This application connects to Google to allow the Play Store to function, logging in with Google, and power most Google Apps. It also shares *a lot* of user data with Google.

The OS itself is open-source, and so is private. However, the added software increases the attack surface exponentially, and sends user data to the device's manufacturer, Google, and often Meta (Facebook) and many others. The default launcher is usually close-source too.

To summarize: Android itself is open, but the added software (launcher, apps and features) are not. This is a major compromise for security and privacy.

### iOS

The iPhone is entirely proprietary, which gives Apple a lot more control over the user's device. This is a double-edged sword: Apple often limits third party trackers, but they do just as much tracking as Google does *themselves*.

Apple can also remotely lock devices, wipe them, and the user can't replace the launcher and some default apps and services.

Overall, the iPhone is only slightly better for privacy than Android, *by default*, but the user has much less control over their own device. Also, because iOS is proprietary, it's much harder to tell which data is being collected.

### Feature Phones

There isn't much to say about these. These devices are simple, and can be secure and somewhat private. The main issue with them is that they are only private because you do nothing on them. SMS messages are not encrypted nor are calls, so in a way, they'd be the worst for communicating.

Although the most secure / private option for a phone (as long as you're okay with SMS not being encrypted at all), these are not an option for most people.

## Threat Model

The first step is to determine what your threat model is - how far you are willing to go.

For example, are you being targeted specifically? Is the government interested in you? Or are you only trying to cut off Big Tech from your data?

Write down who your targets are, to help you decide what to defend against. The further you go, the more convenience you must sacrifice.

## Some Ideas of Things to Do and Explore

### The Simple Route

**Low threat model** - Big Tech; Peace of mind; Not comfortable modifying your phone; Normal person

- Remove unnecessary apps and delete their respective accounts.
- Use strong and unique passwords: These are hard to remember, so use a password manager like [KeePassDX](https://www.keepassdx.com/) or [Nextcloud Passwords](https://f-droid.org/packages/com.hegocre.nextcloudpasswords/). There are more apps like these, but be sure to check that they encrypt your passwords, and are open-source.
- Use open-source apps whenever possible. [Fdroid](https://f-droid.org/en/), an alternate app store for Android, only has open software listed.
- Move away from Google and Apple services, in favor of local solutions.
- Switch away from Chrome. Both [Brave](https://brave.com/) and [Firefox](https://www.mozilla.org/firefox/new/) are good alternatives.
- Avoid personal information on social media.
- Use [Matrix](https://matrix.org/) or [Signal](https://signal.org) for private chats.

### Advanced Route

**High threat model** - Someone capable is after you; You value security and privacy a lot; You are a tinkerer, or willing to learn; Paranoid

- Switch to a Pixel Phone (mainstream, easy to modify, kind of ironic since it's a Google device).
- Install [GrapheneOS](https://grapheneos.org/) (More security) or [CalyxOS](https://calyxos.org/) (Easier to use) on your Pixel.
- Stuck with any other phone? Try to install [LineageOS](https://www.lineageos.org/) on it. If supported, you will be better off with it, but avoid it if you can.
- Avoid anything that requires Google services.
- Communicate only through Matrix or [XMPP](https://xmpp.org/).
- ...

There are many more things you can do, but I can't help you with some of them, since this is as far as I'm willing to explore myself. It's impossible to be 100% safe, but following these steps will certainly help you *a lot* already.

## Reality Check

You may find that you don't fit into any of these routes perfectly, and instead, somewhere in between. I, for example, still need some Google services, and not everyone uses Matrix in my life. This is why privacy and security are a spectrum, not a yes or no value. For me, most of these steps are worth it, but having this blog, just by itself, is already increasing my attack surface.

You might want to make sacrifices to have nice things, and that's okay. Start by doing something; pick anything from the lists. Then, you might want to continue, or find your own balance.

## Open-source Apps that I Recommend

- [InnerTune](https://f-droid.org/packages/com.zionhuang.music/) - YouTube Music replacement (also no more Ads and free premium features)
- [NewPipe](https://f-droid.org/packages/org.schabi.newpipe/) - YouTube alternative (also with premium features and no Ads)
- [Fossify Calendar](https://f-droid.org/es/packages/org.fossify.calendar/) - Open Calendar app
- [Pie Launcher](https://f-droid.org/pt/packages/de.markusfisch.android.pielauncher/) - Simple and efficient APP launcher
- [DAVx⁵](https://f-droid.org/packages/at.bitfire.davdroid/) - Sync calendars, To-dos and contacts with Nextcloud
- [Element](https://f-droid.org/pt/packages/im.vector.app/) - The most popular Matrix client
- [Fdroid](https://f-droid.org) - Open-Source-only App Store
- [K-9 Mail](https://f-droid.org/pt/packages/com.fsck.k9/) - Email client (supports Gmail)
- [Fossify SMS Messenger](https://f-droid.org/packages/org.fossify.messages/) - SMS Messenger
- Nextcloud Suite - [Files](https://f-droid.org/packages/com.nextcloud.android.beta/); [News](https://f-droid.org/packages/de.luhmer.owncloudnewsreader/); [Passwords](https://f-droid.org/packages/com.hegocre.nextcloudpasswords/); [Notes](https://f-droid.org/packages/it.niedermann.owncloud.notes/); [Talk](https://f-droid.org/packages/com.nextcloud.talk2/) - Replace Google Services with your NC instance

## GrapheneOS

Earlier in the list, I mentioned switching to GrapheneOS as an advanced step.

Graphene is the AOSP (core Android) without Google services, and with only open software. It also has regular security patches and many [security features](https://grapheneos.org/features) are applied, making Android much safer. This is the best solution out there, but with no Google services, things like Android Auto, Google Maps, and many other apps like the Play Store itself would be unavailable.

This would not work for me - however - GrapheneOS has a very clever solution. The ability to run Google Play Services in a container.

If you are not used to the concept of virtual machines and containers, picture a smaller phone inside your own. This small phone is isolated and limited, and so, even if it is compromised, you don't really lose anything of value.

For GrapheneOS, this means that you can still install the Play Store, and keep your private stuff separate. GrapeheneOS also has more advanced security features; and using the container, supports Quick Share, Android Auto, and most modern Google features.

You don't have to enable these features if you don't need them, obviously, but most people will benefit from them.

There is also a [Web installer](https://grapheneos.org/install/web) to easily install GrapheneOS on your device.

## Nextcloud

At this point, you know about GrapheneOS, and how to keep your phone safe, however, you might miss all those Google features. Applications like Google Drive, Google Photos, Contacts, Calendar... the list goes on.

You may also want to sync your photos to some cloud that you can access on other devices and keep regular backups without thinking about them.

There would be no private solution to this, as "The cloud is just someone else's computer". But what if *you* own that computer?

I won't get into too much detail in this post (I will discuss Nextcloud in a future post soon, and how to install it), but if you have a spare computer, or are willing to build yourself a home server (often cheaper than paying for Google One in the long run), you can install Nextcloud on it, and replace all Google services with it. You also get a lot more storage, and it's easy to extend it if you need more.

## Parting Thoughts

In conclusion

- It's impossible to be 100% private and secure. Choose your threat model and focus on it, one step at a time.
- Switch to open-source apps and OSes whenever possible.
- If you're comfortable tinkering and own a Google Pixel device, install GrapheneOS, it's easier than it seems.
- If you can, use Nextcloud instead of Google services.

Stay safe out there.
