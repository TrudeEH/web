---
title: Firewall [UFW]
description: 
draft: false
tags:
  - linux
  - tools
  - security
author: TrudeEH
showToc: true
---
A firewall monitors and controls all incoming and outgoing network traffic, and can be implemented at the hardware or software level.

## See All Open Ports

All ports opened by a program, including those blocked by a firewall.

```sh
sudo ss -tupln
```

## Software Firewall (UFW)

```sh
# Enable the SSH port if it is being used
sudo ufw limit 22/tcp # `limit` is used to prevent bruteforce

# Set default connection settings
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Open ports for the services running
sudo ufw allow 80/tcp   # Web server 1
sudo ufw allow 443/tcp  # Web server 2

# Check if UFW is running and is configurations
sudo ufw status numbered

# Delete an entry
sudo ufw delete 2 # Number given by `status numbered`

# Enable UFW
sudo ufw enable
```

### Block Pings

Blocking pings prevents hackers from quickly discovering the server. It is still possible to scan all ports on the server and eventually find any open one, but it adds another layer of security.

```sh
echo "-A ufw-before-input -p icmp --icmp-type echo-request -j DROP" >> /etc/ufw/before.rules
```

After running the command above, a reboot is required to apply the setting.

## Fail2Ban

Fail2Ban is a software solution to prevent bruteforce attacks. If an IP is detected to attempt login too many times or performs other unwanted actions, it is temporarily blocked.


`/etc/fail2ban/jail.local`

```toml
[DEFAULT]
ignoreip = 127.0.0.1/8 ::1
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true

[wordpress]
enabled = true
filter = wordpress
logpath = /var/log/auth.log
maxretry = 3
port = http,https
bantime = 300
```

After adding your services and tweaking the configuration file, start fail2ban with:

```sh
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```
