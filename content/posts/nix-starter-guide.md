---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Nix Starter guide"
date: 2024-10-20T16:10:10+01:00
tags: ["linux", "nix", "macos"]
description: "Easily manage packages, configurations, and create development environments."
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

## What is Nix and NixOS?

You may have heard of Nix before. The name can be a bit confusing at first, as Nix is:
- A programming language
- A package manager
- A Linux distribution (Known as NixOS)

This guide will focus on Nix as the package manager, and how it can make your life easier.

## The Problem

On macOS, the intended way to download new programs is to open the developer's website and execute an installer (or disk image) that installs the program. This approach can be time-consuming, as well as generate confusion when a program has to be updated. For this reason, many people use Homebrew as a package manager for macOS.

Homebrew is great, but if you switch between machines, you will have to redownload all your programs, configure them one by one, and organize them how you like. You could load a backup, but then you'd have to do it every time you switch machines, and your files would also be synced, which may not be desired. Even macOS has to be configured to your liking, a process that has to be repeated.

On Linux, there are many package managers, so if you switch distros often, all your configuration work will be lost, and you will have to adapt any scripts you may have to the new package manager.

If you switch between macOS and Linux often, the problem grows even more, as now you have two completely different systems, apps and settings to manage, all at once.

... Let's take a step back, shall we?

## Searching for a Solution

When trying to solve this issue, I came up with a few ideas. I could:
- **Keep two different configurations: One for macOS and one for Debian.** I began work on this, and then... I realized that I needed to support Arch as well. No big deal, 3 configurations isn't a lot, I can manage it- I also have an arm laptop, and an x86 macOS machine that needs support. And what if I switch to another device in the future? ... This approach was getting me nowhere, as the 2 configurations I started with became 5, then 10, then more.
- **Write a compatibility layer between `brew`, `apt`, `pacman`, etc.** This seemed like a good approach at first, but because a package can have different names depending on how it is packaged, among many other issues, I quickly had to give up.
- **Use the same package manager everywhere.** I tried to use Homebrew everywhere, but quickly noticed that many packages are missing, especially on Linux. Configurations would have to be ported as well.

None of these solutions seemed to work, and so, I kept looking.

## NixOS

While researching, I came across NixOS: An interesting distro I had never heard of. Well, why not give it a try?

NixOS is stable, while on the bleeding edge, because instead of executing commands to configure your system, you build a config file that contains every setting, package, systemd services and even users and hardware options. If something breaks, all you have to do is go back to your previous working configuration. Want to share your system with a friend or colleague? They can run your configuration file, and then return to their system, as if nothing ever happened. A custom live iso? Simply load your config to it. You can also try other people's configurations, try 10 in a day if you like!

NixOS is amazing and deserves more attention than what I can give it in this post, but the takeaway here is that everything that makes NixOS so good is actually powered by Nix. If you want to learn more about NixOS, I strongly advise you to watch [No Boilerplate's video on it](https://www.youtube.com/watch?v=CwfKlX3rA6E).

## Nix

Nix is a standalone package manager, with the largest software repository available. You can use it on macOS and Linux, and configure it in the same way for both systems. Remember NixOS's configuration file? Nix has that, too. In fact, Nix uses a declarative approach, where everywhing you do is written in a file, and Nix will reproduce your environment on any device.

Nix can do something even more useful: Create development environments, known in the Nix world as shells. A shell can have custom environment variables, execute commands and have its own packages. Like how you could install software in a container, Nix shells allow you to isolate the tools you use for a project from your host system, but without any performance loss. You can choose the exact version of the dependencies you need, and even share your shells so that everyone else you work with has the same development environment as you.

### Using Nix

To install Nix on your system, follow the instructions at the [NixOS website](https://nixos.org/download/).

After Nix is installed, you can use it like any other package manager:

```sh
nix-env -iA nixpkgs.pkg_name # Install a package
nix-env -e pkg_name # Uninstall a package
nix-env -u # Upgrade all packages
nix-env -qa search_term # Search for a package
```

Or you can use Nix shells instead:

```sh
nix-shell -p pkg_name # Enter a temporary shell with pkg_name available
nix-shell -p pkg_name --run command # Create a temporary shell and run a command inside it
nix-collect-garbage --delete-older-than 7d # Clean cached packages older than 7 days
```

A shell can also be declared in a Nix file like so:

```nix
let
    nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-24.05";
    pkgs = import nixpkgs { config = {}; overlays = []; };
in

pkgs.mkShellNoCC {
    packages = with pkgs; [
        cowsay
        lolcat
    ];

    GREETING = "Hello, Nix!";

    shellHook = ''
        echo $GREETING | cowsay | lolcat
    '';
}
```

Nix by itself can do a lot, but how about the configuration file I mentioned before? That is handled by Home-manager.

## Home-manager

Home-manager allows you to create a configuration file to manage your programs and settings.

You can use this file as a `home.nix` template:

```nix
# man home-configuration.nix
{ config, lib, pkgs, ... }:

let
  inherit (lib) mkIf optionals; # Import dependencies for home.nix
  inherit (pkgs.stdenv) isLinux isDarwin;
  userName = "yourName";
in
{
  # =======================================================================
  # ----------------------- HOME & INSTALLED PACKAGES ---------------------
  # =======================================================================

  home.username = userName;
  home.homeDirectory = if isLinux then "/home/${userName}" else "/Users/${userName}";
  home.stateVersion = "24.05";

  nixpkgs.config.allowUnfree = true; # Allow close-source programs

  home.packages = with pkgs; [
    fastfetch # A program to install

    # Install a font
    (nerdfonts.override { fonts = [ "JetBrainsMono" ]; }) # Override nerdfont to install JetBrains only.

    # Add a shell script
    (writeShellScriptBin "extract" ''
      if [ -f $1 ]; then
        case $1 in
        *.tar.bz2) tar xjf $1 ;;
        *.tar.gz) tar xzf $1 ;;
        *.bz2) bunzip2 $1 ;;
        *.rar) unrar e $1 ;;
        *.gz) gunzip $1 ;;
        *.tar) tar xf $1 ;;
        *.tbz2) tar xjf $1 ;;
        *.tgz) tar xzf $1 ;;
        *.zip) unzip $1 ;;
        *.Z) uncompress $1 ;;
        *.7z) 7z x $1 ;;
        *) echo "'$1' cannot be extracted via extract()" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
    '')
  ]
  ++ optionals isLinux [newsflash] # Add packages just for Linux systems
  ++ optionals isDarwin []; # Add packages just for macOS systems

  # Here you can generate files on your system. In this example, the first file is for nix to allow unfree apps, and the second duplicates a file, only on Linux systems.
  home.file = {
    ".config/nixpkgs/config.nix".text = "{ allowUnfree = true; }";
  } // (if isLinux then {
    # Cursor theme fix (Linux)
    ".icons/default".source = "${pkgs.bibata-cursors}/share/icons/Bibata-Modern-Classic"; # Set file content as another file
  } else {});

  # Define env variables here.
  home.sessionVariables = {
    EDITOR = "nvim";
  };

  # =====================================================
  # -------------------- LINUX --------------------------
  # =====================================================

  # GTK is a Linux-only package, so its configuration should only apply to Linux. You can use this syntax for macOS as well with the isDarwin variable.
  gtk = mkIf isLinux {
    enable = true;
    cursorTheme = {
      name = "Bibata-Modern-Classic";
      package = pkgs.bibata-cursors;
      size = 22;
    };
  };

  # ===========================================================
  # -------------------- Independent --------------------------
  # ===========================================================

  # Autostart services on boot
  services = {
    gnome-keyring.enable = isLinux; # Only enable gnome-keyring on Linux, for example.
  };

  # Install programs and configure them. The home.packages section is for installing packages only, while this one is used when you want to configure a package. A program listed here will be installed automatically, so don't list it under home.packages.
  programs = {
    home-manager.enable = true; # This line is needed so that home-manager manages itself.

    tmux = { # Example configuration of tmux, a cli program that works on Linux and macOS.
      enable = true;
      aggressiveResize = true;
      baseIndex = 1;
      disableConfirmationPrompt = true;
      escapeTime = 250;
      keyMode = "vi";
      mouse = true;
      plugins = with pkgs; [ tmuxPlugins.cpu ];
      prefix = "C-s";
      terminal = "tmux-256color";
      shell = if isLinux then "${pkgs.zsh}/bin/zsh" else "/bin/zsh";

      extraConfig = ''
        bind-key C command-prompt -p "Name of new window: " "new-window -n '%%'"
      '';
    };
  };
}
```

Once you finish your `home.nix` file, you can apply it using the following commands:

```sh
# Install Home-manager
nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
nix-channel --update
nix-shell '<home-manager>' -A install

# Apply config
mkdir -p $HOME/.config/home-manager
rm $HOME/.config/home-manager/home.nix # If you had one previously
cp home.nix $HOME/.config/home-manager/home.nix

home-manager -b backup switch
```

At this point, you already know how to configure your packages and install them, and create shells, but I also promised that you would be able to configure your *system*. For Linux, the best way to do this is to use NixOS, but on macOS, you can extend Nix using `nix-darwin`.

## Nix-darwin

Nix-darwin can install packages at the system level and manage macOS settings. It is similar to the `/etc/nixos/configuration.nix` file on NixOS.

This module also has its own configuration file (`flake.nix`), and I created a template for you to use as well:

```nix
{
  description = "Darwin system flake";

  inputs = { # Dependencies
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    nix-darwin = {
      url = "github:LnL7/nix-darwin";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    # Fix an issue where home-manager apps are not indexed on Spotlight
    mac-app-util = {
      url = "github:hraban/mac-app-util";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs@{ self, nix-darwin, nixpkgs, home-manager, mac-app-util }:
  let
    configuration = { pkgs, config, ... }: {
      services.nix-daemon.enable = true;
      nix.settings.experimental-features = "nix-command flakes";
      nixpkgs.config.allowUnfree = true;
      system.configurationRevision = self.rev or self.dirtyRev or null;
      system.stateVersion = 5;

      users.users.trude = { # Define your user here
        name = "yourName";
        home = "/Users/yourName";
      };

      home-manager = {
        extraSpecialArgs = {inherit inputs;};
        backupFileExtension = "backup";
        users = {
          "yourName" = import ./home.nix; # Load your home.nix file for home-manager
        };
        sharedModules = [
          mac-app-util.homeManagerModules.default
        ];
      };

      environment.systemPackages = []; # Install packages at the system-level here

      security.pam.enableSudoTouchIdAuth = true; # An example setting. This one allows you to use TouchID to run sudo commands

      system.defaults = { # macOS Settings
        # See more settings here: https://daiderd.com/nix-darwin/manual/index.html

        CustomUserPreferences = {
          "com.apple.Safari" = { # Enable dev mode on Safari as an example
            "com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled" = true;
          };
        };

        NSGlobalDomain = { # Lots of global options
          AppleICUForce24HourTime = false;
          AppleInterfaceStyle = "Dark";
          AppleScrollerPagingBehavior = true;
          AppleShowAllExtensions = true;
          AppleShowAllFiles = true;
          NSDocumentSaveNewDocumentsToCloud = false;
          NSWindowShouldDragOnGesture = true;
          KeyRepeat = 2;
          "com.apple.mouse.tapBehavior" = 1; #Tap to click on mouse.
          "com.apple.swipescrolldirection" = false; #Normal scrolling.

        };
    };

    # The next two blocks are used to support different architectures. Each one is an output, and you can select which one you want when applying the config.
    intel = { pkgs, config, ... }: {
      nixpkgs.hostPlatform = "x86_64-darwin";
    };

    apple-silicon = { pkgs, config, ... }: {
      nixpkgs.hostPlatform = "aarch64-darwin";
    };
  in
  {
    # Build darwin flake using:
    # $ nix run nix-darwin -- switch --flake ~/.config/nix-darwin
    darwinConfigurations.default = nix-darwin.lib.darwinSystem {
      modules = [
        configuration
        apple-silicon
        inputs.mac-app-util.darwinModules.default
        inputs.home-manager.darwinModules.default
      ];
    };
    darwinConfigurations.x86 = nix-darwin.lib.darwinSystem {
      modules = [
        configuration
        intel
        inputs.mac-app-util.darwinModules.default
        inputs.home-manager.darwinModules.default
      ];
    };
    darwinPackages = self.darwinConfigurations.default.pkgs;
  };
}
```

That was a lot, but this file should give you a good understanding of how nix-darwin works, and what you can do with it.

To apply your config, run the following commands:
```sh
mkdir -p ~/.config/nix-darwin/
cp -f flake.nix ~/.config/nix-darwin/
cp -f home.nix ~/.config/nix-darwin/

if [[ $(uname -m) == "x86_64" ]]; then
    echo "Intel mac."
    nix --extra-experimental-features "nix-command flakes" run nix-darwin -- switch --flake ~/.config/nix-darwin#x86
else
    echo "Apple silicon."
    nix --extra-experimental-features "nix-command flakes" run nix-darwin -- switch --flake ~/.config/nix-darwin#default
fi
```
**Note:** Nix-darwin already implements home-manager, so both configurations will be applied. There is no need to run the commands in the home-manager section of this blog post.

## Conclusion

Hopefully this post was helpful for you to set up your own Nix configuration, and encouraged you to keep exploring. I didn't show you everything that is possible, as I am learning more every day as well.

If you had trouble understanding the `.nix` files, take a look at the [nix.dev](https://nix.dev/) documentation, and if you need help or have questions, ask away on the [NixOS Discourse](https://discourse.nixos.org/), or hit me up with an email.

If you'd like to see my own Nix configurations and dotfiles, take a look at my [GitHub repository](https://github.com/TrudeEH/dotfiles). You are welcome to fork it, copy code and try it on your own system.
