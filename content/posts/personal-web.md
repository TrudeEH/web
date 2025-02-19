---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "A Guide to the Personal Web"
date: 2024-07-18T20:52:02+01:00
tags: ["web", "privacy"]
description: "A practical guide to the small/personal web: RSS, Blogs and Personal Sites"
cover:
  image: "" # image path/url
  alt: "" # alt text
  caption: "" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: true # only hide on current single page
---

Google is progressively getting worse, YouTube has more and more ADs, and most websites are very hard to use, as the screen is constantly filled with "cookie" pop-ups, ADs, videos and large paragraphs of keywords that contain nothing of real value.

I've been bothered by the "modern" web quite a lot, as I used to get my news from YouTube, but seeing the internet get progressively worse made me wonder if there is a better way...

## Using the Personal Web

If you use the internet extensively, you have likely found many blogs and personal websites, such as the one you are on right now, my blog. These tend to be more honest, less intrusive, and many, such as my own, have no ADs, and collect no personal data about you. This one, for example, is open-source, so you can research freely without worrying about copyright laws, and even suggest changes and help me improve it.

Personal websites are great since they are not restricted by what an app allows you to do. You can do *anything* on your website, since you actually *own* it. There is no limit to how creative you can get.

Since personal sites are so much better than social media, why don't more people use them instead? There are a few reasons:

- Building a website is harder. You can create a social media account in seconds, but a website requires more work.
- Often there is little financial incentive. My website has no ADs, so I make no money from it.
- Social media platforms use algorithms to hook you in and decide what you should watch for you, which makes it easier to find new content that you might enjoy.
- Google (and other engines) will promote commercial websites, since they make more money, have more keywords and often use aggressive SEO optimizations.

Still here? Great, so you are probably willing to put a bit more work to make your experience better. Luckily, it's very easy.

### RSS

The first and most important step is to fix the algorithm problem. You probably wouldn't want to manually check every website you like to see if they posted anything new, so we need a way to bring them all together, a news aggregator.

Programs like these can scan a website for changes and assemble a list of every new post from your favorite sites, much like how email works. On a more technical level, news aggregators will periodically check the RSS feed on the target website, which contains a list of every post added, and then combine the list with every other feed scanned, to create a single list with every post for you to read.

To get started, download any RSS app. Here are some of my recommendations:

- [NewsFlash](https://apps.gnome.org/NewsFlash/) (Linux - Best for GNOME)
- [Akregator](https://apps.kde.org/akregator/) (Linux - Best for KDE)
- [NetNewsWire](https://netnewswire.com/) (Best for macOS/iOS)
- [RSS Guard](https://github.com/martinrotter/rssguard) (Best for Windows, also supports Linux and macOS)

Now that you have an aggregator, you need some websites to follow. Add those that you already know and like, and explore the internet to find some more! If you need some help, try these:

- [Marginalia Search](https://search.marginalia.nu/) (Google Search alternative that focuses on finding content from personal sites and blogs instead of commercial sites)
- [Neocities](https://neocities.org/browse) (Collection of small and creative websites)
- [The Big List of Personal Websites](http://biglist.terraaeon.com/index.html)

## Create Your Own Content

If you like reading other people's content, you might be wondering how you can create your own corner of the web. It requires some work, but it's not too difficult.

### Creating Your Own Website

Many people would recommend you to use website builders like Wordpress, and they can work for the most part, but you will be missing out on a lot of customization and freedom.

Instead, learn the basics of `html`. It may seem difficult at first, but html is really just a way to format text for browsers.

Now you can type anything on the web, add images and media, but you probably want some colors and styling too. For this purpose, `css` was created. Learning it effectively can be difficult, but you can find many examples online to help you build your own site. The basics are simple, and with some research, you can build almost anything you imagine.

If all you want is a website with a few links to your socials and to introduce yourself to the world, you can stop here. If you also want to keep a blog, however, there is a better tool for the job.

### Hosting a Personal Blog

You could use plain html and css to build your blog, but that would not only get tiring, but you would waste a lot of time that could be used to create content. If you want to do it anyway, go for it, but for those who want an easier time, [HUGO](https://gohugo.io/) is the solution.

HUGO allows you to set up a website, select or build a theme, and then add new content to it whenever you want. You can write new posts using the [Markdown](https://www.markdownguide.org/basic-syntax/) format.

This post isn't a full HUGO tutorial (coming soon!), but it should be enough to get you started on your own research. As an example, you can find my website's source code [on GitHub](https://github.com/TrudeEH/web).

### Publish Your Site

After building your site, there are still a few steps that you need to take before other people can access it.

1. **Host your website.** You can host it yourself, using a spare computer or server, hire someone else, or use an online service to do it for you. For example, [GitHub pages](https://pages.github.com/) is a good free service (and it's the one I'm currently using).
2. **Buy a domain name.** This is an optional step, but you likely want a custom name for your site. You can buy a domain name online and point it to your website address, so when someone types it in search, your website shows up. These are not very expensive. Mine renews for <40$/year.
3. **Website analytics.** This is entirely optional too, but if you want to know how many people visit your site, you need some sort of analytics. Google Analytics is the most popular option. Keep in mind that these are not always accurate, and can be blocked easily by ad blockers and tracker blockers, such as uBlockOrigin.

## Conclusion

Switching to a more personal web is as easy as using any RSS program and adding your favorite sites there. Social media can also be replaced with forums and chat rooms, and you can even create your own content to inspire others, without being forced to watch ADs or having an algorithm decide what you should see.

We can't change the internet, but we can at least get our small corner clean and tidy, and maybe help some people along the way.
