---
title: Encryption [GPG]
description: 
draft: false
tags:
  - networking
  - tools
author: TrudeEH
showToc: true
---

## Symmetric Encryption

- User A sends a password to user B.
- The password is used to encrypt the messages.
- A secure way to share the password is required.

## Asymmetric Encryption

- Users A and B have a public key and a private key.
- The public keys are shared, and they are used to encrypt the messages.
- The users can use their private keys to decrypt the messages.

## GPG

GPG uses asymmetric encryption to sign, encrypt and decrypt files.

### Create a Set of Keys

```Shell
gpg --full-gen-key
Select ECC (sign and encrypt) - The most secure option
Select default curve
```

### Encrypt a File

```Shell
gpg --encrypt -r email@example.org <file> # Encrypt with the recipient (-r) key.
```

### Decrypt a File

```Shell
gpg --decrypt --output <file-output> <file> # Use the private key to decrypt a file.
```

### Encrypt a Message

```Shell
echo "Very safe message" | --encrypt --armor -r email@example.org
```

- `-armor` Saves the encrypted info in plain text. (Great for blog posts or copying/pasting)

### Decrypt a Message

GPG automatically figures out which private key to use. The encrypted file includes some metadata.

```Shell
cat encrypted-message.txt | gpg --decrypt
```

### Sign a Message

Uses a public key to sign a message, making sure that the contents are not tampered with.

```Shell
echo "Very important message" | gpg --clearsign -u email@example.org
```

- `-clearsign` Is used to sign plain (clear) text.

### Sign a File

The signature is embedded in the file

```Shell
gpg --sign -u email@example.org <file>
```

The signature is separate from the file

```Shell
gpg --detach-sign -u email@example.org <file>
```

### Verify Signed message/file

```Shell
gpg --verify signed-message.txt
# or, if detached
gpg --verify <file.sig> <file>
```

### Import

```Shell
gpg --import public.pgp
gpg --import private.pgp
# To be able to use the key for encryption, it must be trusted.
gpg --edit-key email@example.com
> trust
> 5
```

### Export

```Shell
gpg --output public.pgp --armor --export email@example.com
gpg --output private.pgp --armor --export-secret-keys email@example.com
```

### List Keys

```Shell
gpg --list-keys # Same as gpg -k
gpg --list-secret-keys
```

## Cryptsetup

Cryptsetup manages encrypted volumes using the LUKS standard. It allows you to create, open, and control encrypted partitions or file-based containers.

### Encrypted File Container

```Shell
dd if=/dev/zero of=encrypted.img bs=1M count=100 # Create a 100M container
# Format the file as a LUKS encrypted volume
sudo cryptsetup luksFormat encrypted.img 
sudo cryptsetup luksOpen encrypted.img encryptedVolume  # Open the container
# Format the volume with an ext4 filesystem
sudo mkfs.ext4 /dev/mapper/encryptedVolume
```

#### Mount

```Shell
sudo mount /dev/mapper/encryptedVolume /mnt/encrypted
```

#### Unmount

```Shell
sudo umount /mnt/encrypted
sudo cryptsetup luksClose encryptedVolume  # Close the encrypted container
```

### Encrypted Storage Devices

A Storage Device can be a USB drive, disk, SD card, etc...

> If you have access to a desktop environment, you can use the GNOME Disks APP, for example, to create an encrypted partition.

#### Prepare the Device

1. If your device is mounted, unmount all mount points before continuing:

```sh
lsblk # List the storage devices available
sudo umount <mount_point>
```

2. Populate the partition with random data to avoid pattern-based encryption attacks: (optional)

> This process will WIPE the device and overwrite all data on it! Make sure to back up your files before proceeding.

```sh
# Slow, but more random values
sudo dd if=/dev/urandom of=/dev/sdX bs=4K status=progress

# Faster solution, but not as random
sudo badblocks -c 10240 -s -w -t random -v /dev/sdX
```

3. Prepare the partition to encrypt:

In this example, the whole device will be erased and encrypted, but you can also create a separate partition to encrypt, instead of the entire device.

```sh
# Clear all partitions
echo ",,;" | sudo sfdisk /dev/sdX
```

#### Encrypt the Partition

First, the partition must be formatted with Linux Unified Key Setup (LUKS). LUKS stores metadata at the beginning of the partition which contain the type of encryption and a randomly generated key, encrypted with the passphrase provided to `luksFormat`.

It's recommended to use at least 3 random words as the passphrase.

```sh
# Format the device
sudo cryptsetup luksFormat /dev/sdX1
# Create a virtual device to manage the encrypted device
sudo cryptsetup luksOpen /dev/sdX1 myusb
# Format the partition using the encrypted device created earlier.
sudo mkfs.ext4 /dev/mapper/myusb -L <label>
sudo cryptsetup luksClose myusb # Close the device
```

After performing these steps, you may disconnect the drive.

#### Accessing the Device

When connected the device, your file manager should prompt you for a password. If you are not using a desktop environment, you might have to mount it yourself:

```sh
sudo cryptsetup luksOpen /dev/sdX1 myusb  
sudo mkdir -p /media/myusb  
sudo mount /dev/mapper/myusb /media/myusb
```

Then, to unmount:

```sh
sudo umount /media/myusb  
sudo cryptsetup luksClose myusb
```
