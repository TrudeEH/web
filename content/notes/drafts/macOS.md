---
Status: In progress
Created by: Trude EH
tags:
  - notes
  - os
author: TrudeEH
draft: true
searchHidden: false
showToc: true
title: macOS
---
#todo 

## System Data

System data is anything in the following locations:
- `/Library`
- `/System`
- `~Library`
- `/usr`
- `.hidden_files`

## Memory

- Physical Memory - Total system memory
- Memory Used
    - App Memory - Memory used for apps
    - Wired Memory - System memory
    - Compressed - Memory used by apps, but compressed as it is not immediately needed
- Cached Files - Files saved in memory for faster launching
- Swap Used - Memory stored in the SSD

### Memory Pressure

A measurement of how well macOS is managing the available memory.
- Green/Low: Normal function; No tricks needed.
- Yellow/Medium: There is not enough memory as-is, so macOS is actively compressing and decompressing memory as needed.
- Red/High: Aside from compression, macOS is using the swap heavily.

## Troubleshooting

### System and Apps

|Description|Fix|
|---|---|
|Fix "App X is damaged and can't be opened."|`xattr -c <path/to/application.app>`|
|Disable the Dock autohide delay|Fix:  <br>  <br>`defaults write com.apple.dock autohide-delay -float 0; defaults write com.apple.dock autohide-time-modifier -int 0;killall Dock`  <br>  <br>Restore defaults:  <br>  <br>`defaults delete com.apple.Dock autohide-delay; killall Dock`|
|||
|||

### Gaming

|Issue / Error / Description|Fix|
|---|---|
|Improve Terraria performance (and some other games)|Add `/gldevice:Vulkan` as a launch argument (on Steam).|
|||

### Flash IMG File to Disk

1. `diskutil list` → Find the path to the device (`/dev/XXX`)
2. `diskutil unmount /dev/XXX` → Unmount the disk
3. `sudo dd if=image.img of=/dev/XXX bs=1M oflag=direct,sync status=progress`
