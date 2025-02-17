---
tags:
  - computer-science
  - notes
author: TrudeEH
draft: true
showToc: true
title: Assembly
---

#todo

## Assembler/Compiler

- `gcc` GNU C Compiler (The package includes `as` (assembler) and `ld` (linker))

```Shell
as <file.asm> -o <output.o> # Assemble
gcc -o <output_file> <output.o> -nostdlib -static # Link using gcc
ld <output.o> # Link using ld
```

## Hello World

```Assembly
.global _start
.intel_syntax noprefix
_start:
	// sys_write (Print to stdout)
	mov rax, 1
	mov rdi, 1
	lea rsi, [hello_world]
	// Buffer length
	mov rdx, 14
	syscall
	// sys_exit (safely end the program with a re turn code)
	mov rax, 60
	// Exit with code 0
	mov rdi, 0
	syscall
	
hello_world:
	// ASCII, zero delimited
	.asciz "Hello, World!\n"
```

To know which system calls we can execute and which values needed for the registers, refer to [this table](https://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/).
