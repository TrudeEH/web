---
tags:
  - networking
  - notes
  - tools
author: TrudeEH
draft: false
showToc: true
title: Encryption [GPG]
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
