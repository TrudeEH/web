---
tags:
  - notes
  - os
author: TrudeEH
draft: true
showToc: true
title: Linux
---
#todo

## Troubleshooting

- Read error logs from the last session

```Shell
sudo journalctl -b -1 -r -p err
```

## Disk Encryption

### Full Disk Encryption

The exact steps to fully encrypt a disk varies depending on the distribution, and can only be done at the install time.  
On Ubuntu, for example, you can enable it in the "Advanced Features" toggle, at the disk selection stage.  
![image93.png](image93.png)

### Encrypt Home Directory

```Bash
sudo apt install ecryptfs-utils cryptsetup # Install dependencies
# Create temporary admin account
sudo adduser temp_user           # Add new user
sudo usermod -aG sudo temp_user  # Give the new user sudo perms
```

Now, log out of the current user and switch to `temp_user`.

> [!important] Do not "switch accounts", the current user cannot be active while its home directory is being encrypted.  
On the `temp_user` account, run the following command, then, log out and return to your user.

```Bash
sudo ecryptfs-migrate-home -u <username>
```

After logging in, you might be greeted with a pop-up with the title "Update Information". Click on "Run this action now" and provide your password.  
If you already closed the pop-up, run the command below, and provide your password.

```Bash
encryptfs-unwrap-passphrase
```

You will receive a string of text. This will be your recovery password, needed to mount the home folder from another machine.

### Encrypt Swap

```Bash
swapon -s                # Check if you have a swap partition
sudo ecryptfs-setup-swap # Encrypt swap
```

You may get an error: `swapon: cannot open /dev/mapper/cryptswap1: No such file or directory`. If you do, reboot and check if the swap partition is encrypted with the `swapon -s` command.
