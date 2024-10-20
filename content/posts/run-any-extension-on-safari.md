---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "JCionx"
title: "Run Any Extension on Safari"
date: 2024-10-20T17:13:36+01:00
tags: ["safari","macos","browser"]
description: "Use extensions from Chrome and Firefox on Safari natively."
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

Have you ever considered trying out Safari, but soon discovered that it lacks your preferred Chrome or Firefox extensions? I had this same issue.

Apple has introduced a user-friendly tool called Safari Web Extension Converter. This tool simplifies the process of converting Chrome or Firefox extensions to Safari.

Let's explore how we can convert a Chrome or Firefox extension to work with Safari!

## Downloading the Source Code of the Extension

The first step to convert your extension is to download its source code first.
Paste the link of your extension in [this website](https://robwu.nl/crxviewer/) and Download the source code of the extension.

## Converting the Extension with Xcode

1. First you need Xcode to be able to convert the extension. Download Xcode from the [App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12/).
2. Extract the extension source code.
3. Open the Terminal app and run the following command: `xcrun safari-web-extension-converter --macos-only /path/to/extension/folder`
4. Xcode will launch after the command.
5. Click the Play icon on the top left of the Xcode window and wait for the extension to compile.
6. Close the App after it opens.

## Enabling the Extension

1. Open Safari and go to the Settings.
2. Go to the **Advanced** tab and enable **Show features for web developers**.
3. Go to the **Developer** tab and enable **Allow unsigned extensions**.
4. Now go to the **Extensions** tab and enable your extension.

You should now have your Chrome or Firefox extension on Safari!

Keep in mind that you need to enable the **Allow unsigned extensions** option every time you fully quit Safari.

As an example, I converted a Chrome extension I couldn't live without to Safari, and published it to my [GitHub](https://github.com/JCionx).