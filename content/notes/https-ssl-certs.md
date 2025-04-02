---
title: HTTPS and SSL Certificates
description: 
draft: false
tags:
  - networking
  - web
author: TrudeEH
showToc: true
---

## HTTP(s)

The `http` protocol sends data as plaintext, which is an issue when sharing sensitive data such as messages and passwords.  
`https` uses `TLS` to encrypt sensitive traffic between the client and server, creating a secure connection between the two.

## TLS

TLS is a form of [encryption](encryption.md), used to secure HTTPS connections.  
TLS replaces SSL (a deprecated protocol), however, the term SSL is still used often.

### Handshake

To establish a secure connection, a 'handshake' is performed between the client and the server.
1. The client send a message with browser and OS info, and all supported encryption algorithms.
2. The server selects the strongest supported algorithm, and responds with some server info, the selected algorithm, and an SSL Certificate (contains the domain name, certificate authority and public key).
3. The client checks the certificate to ensure that it is valid and signed by a valid certificate authority.
4. If the certificate is valid, the client generates a random session key, and encrypts it with the server's public key.
5. The session key is sent to the server.
6. The server decrypts the session key, using its own private key. If the key is valid, the server sends a finish message back to the client.
7. The client sends its own finish message, and a secure connection is established.

### SSL Certificates

SSL Certificates are needed because without them, a malicious actor could intercept the client's first handshake message, and establish a secure connection with the client, obtaining its secrets.  
A trusted third party is needed to validate that the public key sent to the client matches the server's actual public key.  
[Let’s Encrypt](https://letsencrypt.org) is a non-profit organization that signs certificates for free.

#### Certbot

The easiest way to generate a *Let's Encrypt* certificate is through `certbot`, which is available as a snap package.

```Shell
sudo apt install snapd
sudo snap install core && sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

> If you use a firewall, open port 80, as it is required for `certbot` to verify your domain information.  
> Once `certbot` is installed, you can either generate a standalone certificate (for example, to use for IRC), or follow the [official instructions](https://certbot.eff.org/instructions) for any web service that you already own.

For example, for an IRC server, run the following command:

```Shell
sudo certbot certonly --standalone --preferred-challenges http -d irc.example.com
```

Replace `irc.example.com` with your actual domain.  
The certificate will be stored as two files …
- `/etc/letsencrypt/live/irc.example.com/fullchain.pem`
- `/etc/letsencrypt/live/irc.example.com/privkey.pem`  
… which you can copy to any location you need.  
These files will be renewed every 90 days, so remember to either update them manually, or add a `crontab` entry to automate the process.
