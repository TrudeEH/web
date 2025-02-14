---
Status: Ready
Created by: Trude EH
tags:
  - notes
  - programming
author: TrudeEH
draft: false
searchHidden: false
showToc: true
title: Debugging [GDB]
---

## GDB Debugging

### Compile with Debug Information

To allow `gdb` access to the source code (Provides debug symbols - Do not share publicly as it contains the source code).

```Shell
gcc -g <file>
```

### Look for / Fix Bugs

First, initialize `gdb` with the executable to debug.

```Shell
gdb ./<executable> --tui
```

After `gdb` is ready, we can use the following commands:  

|Command|Description|
|---|---|
|`lay next`|Switch to the next layout (Enables TUI mode if disabled - Allows for reading the code while debugging both in `C` and `ASM`).|
|`ref`|Refresh (if a program prints to the terminal, it can break `gdb`'s interface).`|
|`q`|Quit `gdb`.|
|||
|`b main`|Add a breakpoint at the main function.|
|`b`|Place a breakpoint at the current line.|
|`b <N>`|Place a breakpoint at line `N`.|
|`b +<N>`|Place a breakpoint N lines down.|
|`b <fn>`|Place a breakpoint at `fn` function.|
|`d`|Delete all breakpoints.|
|`d <N>`|Delete breakpoint number `N`.|
|`clear <fn>`|Clear the breakpoint set to `fn` function.|
|||
|`n`|Execute up to the next line in `C`. If a function call is found, execute the function completely.|
|`s`|Execute up to the next line in `C`. (Jump over)|
|`s <N>`|Run `N` lines.|
|`u`|Same as `n`, but if in a loop, execute until the loop exits.|
|`nexti`|Execute up to the next instruction (line in `ASM`).|
|`r`|Run the program until a breakpoint or error is reached.|
|`c`|Continue running the program until a breakpoint or error is reached.|
|||
|`x/i $pc`|Examine the previous instruction (View memory).|
|`info registers`|Read the CPU registers used by the program.|
|`bt`|See the call stack up to the current line. (How we got here, so to speak)|
|`print sizeof(<variable>)`|Check the size of a struct/variable/pointer.|
|`p <var>`|Print variable `var` value.|
|`info break`|List breakpoints.|

## Check for Memory Leaks

Use `valgrind` to check for lost memory.

```Shell
valgrind --leak-check=full ./<executable>
```
