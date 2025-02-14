---
tags:
  - notes
  - os
author: TrudeEH
draft: false
showToc: true
title: WSL2
---
Windows' `WSL` allows for installing a Linux subsystem on a Windows host. `WSL2` enhances `WSL` with support for launching GUI apps as if they were regular Windows programs (or any [X.org](http://X.org) window).

## Install WSL2

On recent `WSL` versions, this process is quite simple:

```PowerShell
wsl --list --online           # See available distros
wsl --install -d <distro>     # Select & Install distro
wsl --set-default-version 2   # Set WSL 2 as the default version
```

If the previous steps fail, `WSL` can still be installed manually:

```PowerShell
# Enable WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# Enable VMP
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# If the previous command fails:
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -NoRestart
wsl --set-default-version 2 # Set WSL 2 as the default version
```

Then, visit the Microsoft Store to download any distribution available. For this example, I selected [Ubuntu](https://www.microsoft.com/en-gb/p/ubuntu-2004-lts/9n6svws3rx71).  
If Ubuntu was installed previously, it can be promoted to `WSL2` using the following command:

```PowerShell
wsl --set-version Ubuntu 2
```

## Encrypt WSL2 Disks

To further isolate Linux files and programs from Windows, the home directory can be encrypted into a disk file. This also facilitates backups, as any user files will be stored there.

### Setup the Disk

This file will be later mounted as the current user's home directory, so it must be stored outside of it.

> These commands are for `WSL`, not Windows Powershell.

```Bash
sudo install -o ${USER} -g ${USER} -d "/home/.${USER}"
```

Next, the file has to be populated. Usually, `EXT4` filesystems use 4kB block sizes. With this in mind, use the following formula to determine the number of blocks needed to fill the disk, where x is the result and y is the amount of space, in GB, that you want the disk to occupy.  

$$x = y * 1024^2 / 4$$

```Bash
dd if=/dev/zero of="/home/.${USER}/disk.img" bs=4k count=<X> # Replace <X> with the result.
sudo losetup /dev/loop0 "/home/.${USER}/disk.img"   # Setup the loopback device
sudo cryptsetup -q luksFormat -y /dev/loop0         # Encrypt the disk with a password
sudo cryptsetup open /dev/loop0 loop0               # Setup the decrypted block device
sudo mkfs.ext4 /dev/mapper/loop0                    # Format the decrypted block device
sudo mount /dev/mapper/loop0 "/home/${USER}"        # Mount the disk over your existing home directory
sudo chown "${USER}:${USER}" "/home/${USER}"        # Fix permissions
# Finally, get a new bash session with the new changes.
bash -l; cd
```

### Helper Scripts

To facilitate mounting and unmounting the encrypted disk, the following scripts can be useful:  
**mount-home.sh**

```Bash
#!/bin/bash
sudo echo -n
cd /
sudo losetup /dev/loop0 "/home/.${USER}/disk.img"
sudo cryptsetup open /dev/loop0 loop0
sudo mount /dev/mapper/loop0 "/home/${USER}"
echo 'Home successfully mounted. Open a new terminal window or type: bash -l; cd'
```

> Add this script to your `.bashrc` to automate mounting the disk. If you do so, and later decide to undo your changes, you'll have to use an external editor, as `Bash` won't be able to load unless the correct password is provided.  

**unmount-home.sh**

```Bash
#!/bin/bash
cd /
sudo umount /home/${USER}
sudo cryptsetup close loop0
sudo losetup -d /dev/loop0
```
