---
title: SSH
description: 
date: 2025-02-17T09:21:16+00:00
draft: false
tags:
  - networking
author: TrudeEH
showToc: true
---


SSH is a protocol for accessing a terminal remotely.  
For SSH to work, the remote machine needs to have an OpenSSH instance running and listening for connections, and port 22 must be allowed through any VPNs or firewalls between the client and host machines. An SSH client is also needed, be it any UNIX system (using the `ssh` command), or a Windows server using a client such as PuTTY.

## OpenSSH Client

### Connect to a Remote Server

#### Connect Using a Password

```Shell
ssh <user>@<ip>
> <password>
ssh root@192.168.1.133
> Ctrl+D # Disconnect
```

> After connecting to a server for the first time, the fingerprint of that server is stored in the `~/.ssh/known-hosts` file.
> 
> This is a security measure to prevent MitM attacks. (The client is notified if the server's fingerprint changes).

#### Connect Using an SSH Key

First, it is necessary to generate a private and public key to use with SSH. Always use a passphrase to keep your private key secure in case your machine is compromised in the future.

```Shell
ssh-keygen  # Create a private/public key pair.
```

> Make sure to back up your keys! Running the above command and saving the new keys would overwrite the previous ones, possibly locking you out of your servers.  
> After generating your keys, send the public key to your network administrator.

#### Managing Multiple Keys

Having separate SSH keys can ensure that if one of them leaks, not all machines it has access to would be compromised.

```Shell
ssh-keygen -C "Comment" # The comment is optional, and defauls to your user/hostname
> $HOME/.ssh/<name>
# After sending the public key to the administrator...
ssh -i <path_to_private_key> <user>@<host>
```

This method requires you to type your key's passphrase every time an SSH connection is started.  
To load the key into memory, an `ssh-agent` is needed.

```Shell
eval "$(ssh-agent)" # Temporarily start the ssh-agent (already present if GUI)
ssh-add <path_to_private_key> # Load the key into memory
ssh -i <path_to_private_key> <user>@<host> # The password won't be asked again
```

### Configure The Client

Edit the `~/.ssh/config` file to configure the client.

#### Aliases

```Shell
Host <alias>
	Hostname <ip>
	Port 22
	User <remote user>
```

Now, connecting to the server is as simple as typing:

```Shell
ssh <alias>
```

## OpenSSH Server

Check whether the ssh server is running.

```Shell
systemctl status sshd / ssh
```

### Read Connection Logs

```Shell
su root
tail -f /var/log/auth.log
journalctl -fu ssh / sshd # Preferred way to read logs
```

### Configure SSH Keys

By default, the OpenSSH server is configured to support both passwords and keys.

#### Add a Client's Public Key

```Shell
 echo "PUBLIC_KEY" >> /home/<user>/.ssh/authorized_keys
```

If password login is enabled (or you are uploading someone else's key), there is a dedicated command to add a public key to the server, directly from the client:

```Shell
ssh-copy-id -i ~/.ssh/id_rsa.pub <user>@<server>
```

### Configure The Server

`/etc/ssh/sshd_config`

```Shell
# Changing the port can help security slightly, but is less convenient
Port 22
# Disable ssh into root (only after you have another user with sudo access)
PermitRootLogin false
# Disable password authentication (use keys exclusively)
PasswordAuthentication no
```
