---
title: IRC
description: 
date: 2025-02-17T09:13:13+00:00
draft: false
tags:
  - networking
author: TrudeEH
showToc: true
---

## The IRC Protocol

IRC is a very simple communication protocol that allows users to chat in real time. IRC is **very lightweight**, but does **not encrypt** messages by default.

## Using IRC

### Server

To be able to communicate, users must connect to a server. Each server has its own rules, bots and commands. The IRC protocol itself does not implement encryption, however, [[https-ssl-certs|SSL Certificates]] can be used to establish a secure connection **with the server**.  
Every message sent **can be read by the server**, including **private messages** between users.  
Separate IRC instances can communicate. This concept is often called **server federation**. This allows for users in different servers to send messages to each other.

### Client

To connect to a server, every user needs a client. Because IRC is an open protocol, there are many clients one can use, however, for this example I am using [halloy](https://halloy.squidowl.org/index.html).  
Halloy can be configured as follows:

```TOML
# Example without encryption
[servers.trude_unsafe]
nickname = "trude"
server = "server.trude.dev"
port = 6667
use_tls = false
channels = ["\#general"]
# Example with encryption (TLS)
[servers.trude]
nickname = "trude"
server = "server.trude.dev"
port = 6697
use_tls = true
channels = ["\#general"]
```

### Modes (user roles)

- `@user` - Admin / Operator
- `+user` - Voiced user
- `user` - Regular user

### Channels

A `#channel` is a room where users can communicate. Channels can be public or invite-only.

### DMs

Two users can send private messages (aka, direct messages) to each other outside channels. However, the server is always able to read and log these messages due to the lack of encryption.

### [Commands](https://docs.inspircd.org/4/commands/)

Users are able to perform actions with simple text commands.

#### Basic Commands

|Command|Action|
|---|---|
|`/join #channel`|Join a channel.|
|`/part #channel [message]`|Leave a channel with an optional goodbye message.|
|`/msg nickname message`|Send a DM to one or more users.|
|`/quit [message]`|Leave the server with an optional goodbye message.|
|`/motd`|Read the server's "message of the day".|
|`/nick nickname`|Change your nickname. (The name other people see when messaging you; the `/whois` command can still reveal your real name).|
|`/whois nickname`|Get information about an user. By default, this includes:  <br>- Hostname  <br>- Real name  <br>- IP Address  <br>- Joined channels  <br>- Last message/Login time  <br>- User modes  <br>- Origin server|
|`/whowas nickname`|Same as whois, but for nicknames that were recently used. Can also reveal previous login times for connected users.|
|`/me action`|Send a message as an action (third-person). (Usually for role playing purposes; only changes formatting).|
|`/topic <#channel> <?text>`|View or set the topic for the channel. (Description of the channel).|
|`/names #channel`|List all users in a channel.|
|`/list`|List all available channels.|
|`/ping`|Check connection with the server.|
|`/admin`|Display administrative information about the server.|
|`/time`|Display the current time on the server.|

#### Operator Commands

|Command|Description|
|---|---|
|`/kick nickname [reason]`|Removes a user from the channel.|
|`/ban nickname`|Bans a user from the channel (usually combined with a kick).|
|`/mode #channel +mode`|Changes channel modes (e.g., `/mode #chat +i` makes it invite-only).|
|`/invite nickname #channel`|Invites a user to join a private or invite-only channel.|
|`/op nickname`|Grants operator status to a user (if you are an operator).|
|`/deop nickname`|Removes operator status from a user.|

#### User Modes

|Command|Description|
|---|---|
|`/mode nickname +mode`|Sets user modes (e.g., `/mode yourname +i` to become invisible).|
|`/mode #channel +mode`|Sets modes for a channel (e.g., `/mode #chat +m` to make it moderated).|
|`/away [message]`|Sets your status to "away" with an optional message.|
|`/back`|Removes your "away" status. (Some servers use `/away` as a toggle, instead.|

|Common channel modes|Description|
|---|---|
|`+i`|Makes the channel invite-only.|
|`+m`|Moderates the channel (only operators or voiced users can speak).|
|`+n`|Prevents messages from users not in the channel.|
|`+t`|Only operators can change the topic.|
|`+k`|Requires a password to join the channel.|

|Common user modes|Description|
|---|---|
|`+i`|Makes your user "invisible" (hides you from `/who`).|
|`+o`|Grants operator privileges.|
|`+v`|Gives a user the ability to speak in a moderated channel  

### Bots

A bot is an automated user (program/script) that can respond to commands, monitor chat or automate activities.  
Commands to bots are often prefixed with `!`, though, this is not always the case.

## Hosting an IRC Server

There are many ways to host an IRC server, and the exact steps vary depending on your platform, server software and encryption standards.

### Docker

One of the easiest ways to launch an IRC server is through Docker, using `inspircd`.  
For example, this `docker compose` file allows you to run a simple server.

```YAML
name: inspircd
services:
  main_app:
    cpu_shares: 50
    command: []
    container_name: inspircd
    deploy:
      resources:  
        limits:  
          memory: 2048M # Max RAM usage  
    environment:  
      - INSP_SERVER_NAME=irc.local  
      - INSPIRCD_ADMIN_EMAIL=nomail@example.com  
      - INSPIRCD_ADMIN_NAME=admin  
    hostname: inspircd  
    image: inspircd/inspircd-docker:latest  
    ports:  
      - target: 6667  
        published: "6667"  
      - target: 6697  
        published: "6697"  
    restart: unless-stopped  
    volumes:  
      - type: bind  
        source: /DATA/AppData/irc_server # Config directory  
        target: /inspircd/conf  
    devices: []  
    cap_add: []  
    network_mode: host  
    privileged: false
```

To properly configure your server, be sure to read the [container’s documentation](https://hub.docker.com/r/inspircd/inspircd-docker/).  
This container generates a self-signed SSL certificate for secure connections, however, it won't be accepted by actual clients. Refer to my [[https-ssl-certs|SSL guide]] to generate a real certificate for TLS to work. After generating your certificate, simply replace the old one with it.

### Linux

On Linux, the process is only a little more involved.  
First, install `inspircd` using your distro's package manager. (IRC server)

> If you use a firewall, enable ports 22, 6667 and 6697 (for TLS) before continuing.

```Shell
sudo apt update
sudo apt install inspircd -y
```

Then, edit the configuration file to your liking.

```Shell
sudoedit /etc/inspircd/inspircd.conf
```

Finally, start `inspircd`.

```Shell
sudo systemctl start inspircd
```

To enable TLS, refer to my [[https-ssl-certs|SSL guide]]. After generating your certificate, copy it to `inspircd`'s ssl directory.

```Shell
 sudo cp /etc/letsencrypt/live/irc.example.com/fullchain.pem /etc/inspircd/ssl/cert.pem
 sudo cp /etc/letsencrypt/live/irc.example.com/privkey.pem /etc/inspircd/ssl/key.pem
```

And add the following block to your `ispircd` configuration:

```JSON
<bind address="" port="6697" type="clients" ssl="gnutls">
<gnutls
    certfile="/etc/inspircd/ssl/cert.pem"
    keyfile="/etc/inspircd/ssl/key.pem"
    priority="SECURE192:-VERS-SSL3.0">
<module name="m_ssl_gnutls.so">
```
