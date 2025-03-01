---
title: Password Manager [PASS]
description: 
draft: false
tags:
  - tools
author: TrudeEH
showToc: true
---

## Password Managers

A password manager is a program responsible for saving all your passwords.  
You could have a single password and use it for everything, but if an attacker gets a hold of your password on just one service, they would have access to all of your accounts. Different services may have different requirements for passwords, too. To mitigate these issues, it's recommended to use a password manager, and a unique password for each service.  
There are many options available, however, *pass* is one of the simplest ones.

## Pass

*Pass* uses [encryption](encryption.md) to encrypt your passwords. If you don't have one already, use GPG to generate a personal key.  
Besides from allowing you to read your passwords, *pass* can be scripted, providing your passwords to scripts and other programs securely.  
Instead of a database, *pass* stores every password in separate files, inside a directory called `password-store`. You can use *pass* to organize passwords just like regular files in the filesystem.  
Pass also integrates with [Git](git.md), allowing you to undo changes, rollback to a previous state, and set a remote repository to save them on.

### Initialize Pass

#### Create a New `password-store` Directory

Your saved (encrypted) passwords will be stored here.

```Shell
pass init email@example.com
```

#### Import an Existing Password Set

Download and run the appropriate [official migration script](https://git.zx2c4.com/password-store/tree/contrib/importers/).

#### Clone a `password-store` Repository

```Shell
git clone <url> .password-store
```

### Manage Passwords

```Shell
pass add <name>          # Store a password in the root directory with a name
pass add <category/name> # Store the password in a subpath
pass generate <name>     # Generate a new password
pass                     # List all saved password names
pass <name>              # Output a password with its metadata
pass <name> | head -n 1  # Output the password only
pass -c <name>           # Copy password to clipboard
pass find <name>         # Search for a password's name
pass grep <name>         # Search for a password or metadata
pass edit <name>         # Edit an entry
pass rm <name>           # Delete password
```

### Metadata

Any lines under the password are read as metadata. Use the `pass edit` command to add any metadata after the password itself.

```Shell
pass edit <name>
```

…an editor window will be opened:

```Shell
PASSWORD-HERE
metadata: You can write anything.
username: some_username
Some note.
```

The `pass -c` command ignores metadata, but typing `pass <name>` still shows that data.  
To only show the first line, which contains the password, use the following command:

```Shell
pass <name> | head -n 1
```

### Git

You can run any git command on the password-store directory.  
For example:

```Shell
pass git revert HEAD  # Undo the last commit (restore a deleted password)
pass git remote add origin <url> # Add a remote origin
pass push origin main # Push the local repo onto the remote origin
```

### OTP Codes / 2FA

Online services might provide you with an `otpauth://` URL, or with a QR code.  
If a QR code is provided, you can decode it using `zbarimg`:

```Shell
zbarimg -q <qr.png>
```

Then, create a new OTP entry and paste in the `otpauth://` path that you acquired.

```Shell
pass otp add <name>
```

To generate an OTP code, use the following command:

```Shell
pass otp <name>
```
