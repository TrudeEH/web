---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Dotfiles: Configuration Files"
date: 2024-05-30T17:35:03+01:00
tags: ["linux", "macos", "crostini", "github", "git"]
description: "How to I set up my dotfiles in a UNIX system."
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

## What are dotfiles and why should I care?

After using your system for a while, you will likely change settings everywhere: On your desktop environment, different programs, and even create scripts to automate your work. Most of these configurations are saved in your `$HOME` directory, in the form of `.app_name`. These files begin with a **dot** (making them 'hidden'), hence the name **dotfiles**.

Some apps (like most browsers) are able to sync settings between different devices, but most programs can't. Eventually, you may have to replace your device, switch to another system temporarily, or face any other situation where you either lose your files or need your configurations somewhere else.

There are many ways to solve this issue; you may even have one yourself, but in this post, I'll show you how I do it.

## Symbolic Links

Sometimes we need a file in two places at once. This is usually not possible, because a file can only exist in one place at a time. A clever way to fix this is to 'link' two files together.

When a **symlink** is created, it 'points' to the original file, opening it instead, like a shortcut.

You can tell a file is a symlink, because `ls -al` displays the file like this:
```sh
(...) .tmux.conf -> dotfiles/dotfiles/.tmux.conf
```

In this example, the file `.tmux.conf` is a symlink to the real file, `dotfiles/dotfiles/.tmux.conf`. When the symlink is read, it returns the content of the file it 'points to'.

## Stow

With symlinks, we can easily save our configs somewhere, and then link them back where they came from. This way, we can save them and restore them on a different system.

This seems like a good solution; however, a problem remains. It is very tedious to link *every* config manually.

To solve this, **stow** was created.

Stow can be quite complex, but for our usage, this is all we need:
```sh
stow -vt $HOME dotfiles_directory
```

The `-v` flag will make the command more verbose (tell you what it is doing) and `-t` specifies where to create the symlinks. Finally, the `dotfiles_directory` is the directory where your dotfiles are located.

The dotfiles directory can look something like this:
```txt
dotfiles/
├── .bash_profile
├── .bashrc
├── .config
│   ├── git
│   │   └── config
│   ├── gtk-3.0
│   │   └── settings.ini
│   ├── gtk-4.0
│   │   └── settings.ini
│   └── nvim
│       └── init.vim
(...)
```

Where, `git` and `nvim`, for example, are the programs being configured.

Stow can be installed on any Linux system and on macOS, manually or through [homebrew](https://brew.sh/).

## Putting it all together

Finally, we reach the solution.

We can create a simple **git** repository, and host it anywhere (**github** is the most popular service) inside it, we can have a dotfiles directory, and move all our config files inside it, just as they are in the `$HOME` directory. Then, simply run the command `stow -vt $HOME dotfiles` to create links to all files in the dotfiles folder.

And that's it. You can now share your configurations, use them on multiple machines and systems, and even gain the ability to roll back your changes if something ends up breaking in the future.

I made [my own repository](https://github.com/TrudeEH/dotfiles) to serve as an example. Feel free to copy, fork, and modify it to suit your needs.
