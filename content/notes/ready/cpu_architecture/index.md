---
title: CPU Architecture
description: 
draft: false
tags:
  - computer-science
author: TrudeEH
showToc: true
---

## Components

### Registers

We can combine registers to reduce the amount of wires needed.  
![image8](image8.png)  
Using a data bus (wiring at the top) and a binary decoder, we can select which register to read/write to.

### Memory

![image9](image9.png)

## Assembly

Assembly is a human-friendly representation of code: binary values that a computer can understand.  
![image10](image10.png)  
An assembler converts ASM instructions into machine code, which is given to the CPU as input.

### Arithmetic Operations

For example, a simple computer architecture could use `00` to represent arithmetic operations.  
![image11](image11.png)  
To decide which type of operation to execute (subtraction, multiplication, addition, etc), the 3rd and 4th bits could be used.  
![image12](image12.png)  
Using a [index](ready/binary_operations/index.md), we can build an inefficient, but simple circuit to do this.  
![image13](image13.png)  
This type of circuit is an Arithmetic Logic Unit (ALU).

### Memory Operations

Of course, assembly can also provide instructions to store or load values.  
![image14](image14.png)

#### Load

```Assembly
LOAD R2 1000 ;Load into register 2 the value in the memory address 1000
```

![image15](image15.png)

#### Store

```Assembly
STORE R1 0110 ;Store the value in register 1 into the 0110 memory address
```

![image16](image16.png)

#### Select Which Instruction to Execute (first 2 bits)

To decide which operation to execute, a binary decoder can be used.  
![image17](image17.png)  
For memory operations, the 3rd and 4th bits are used to select which register to use.  
![image18](image18.png)  
The last 4 bits represent the memory address to read/write to.  
![image19](image19.png)

### Instruction Register

For the instruction to be given, it is stored in a special register: An Instruction Register.  
![image20](image20.png)

### Optimization

We can use a single Binary Decoder instead of two, to achieve the same result. (Optimization on the right pane)  
![image21](image21.png)  
Different architectures can have the exact same functionality, while being implemented differently, or even having different instructions. This is why code that is compiled for Intel x64 is not compatible with ARM or RISC-V.

## Control Unit

We can finally add the ALU (Arithmetic Logic Unit) we built before into the new circuit, like so:  
![image22](image22.png)  
The gray trapezoids are multiplexers:  
![image23](image23.png)  
The output value is then stored in a temporary register, before replacing the first operand register's value.  
The component we just built to control the `ALU` is part of a `Control Unit`. The full `control unit` is very complex, as it needs to handle every possible instruction. (So far, we have seen how to implement the `ALU` and `RAM`.)  
![image24](image24.png)  
Each register in the `CU` has a specific purpose, unlike `RAM`, which can be used to store any values.  
![image25](image25.png)  
To read the first instruction, the `CU` will **fetch** data from the first address in memory.  
![image26](image26.png)  
After **fetching**, the `CU` will **decode** the instruction: interpret the bit sequence in the `instruction register`, to send the necessary signals to the components that will **execute** the instruction. We can finally load instructions into the instruction register.  
![image27](image27.png)  
Then, the `CU` increments 1 byte, to point the `address register` to the next instruction. (Modern architectures increment different values, as the instruction set is more complex)  
If the instruction is an arithmetic operation, the steps are similar. The ALU stores the output in a temporary register, which overwrites the register 0 with the result. The result can then be stored in `RAM`.  
![image28](image28.png)

## Load a Program Into Memory

So far, we can store instructions in memory, but it is also necessary to store values, besides from the instructions themselves.  
For example:  
![image29](image29.png)  
This program uses 2 numeric values. The first 2 instructions load these values into the registers, and then, these values are added together and stored in another memory address. The final instruction, `HALT`, marks the end of the program, to make sure the `CU` does not attempt to read the number 20 as an instruction.  
If the program is extended, all memory addresses must be altered. To fix this issue, we can instead store values at the end of the memory stack.  
![image30](image30.png)

## Conditions and Loops

To create a loop, we can simply jump to a smaller address in memory.  
![image31](image31.png)  
Internally, the `JMP` command overwrites the Address Register, making it so that the next CPU **cycle** *fetches* the chosen memory address, instead of the next one.  
![image32](image32.png)

### Flags

Sometimes, we might want to loop only if a certain condition is met.  
For context, imagine subtracting a number from itself. In this case, the ALU will provide some extra information, using 1 bit registers called `flags`.  
![image33](image33.png)  

| N   | Flag         | Description                                               |
| --- | ------------ | --------------------------------------------------------- |
| 0   | **O**verflow | When a number is too large to fit in the output register. |
| 1   | **Z**ero     | When the result is zero.                                  |
| 0   | **N**egative | When a number is negative.                                |

This additional information can be used to make decisions, and make **conditional jumps** possible.  

| ASM            | Command       | Description                                                                                                                                                                               |
| -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JMP_OFW XXXX` | Jump Overflow | Overwrites the `Address Register` with the value `XXXX` if the `O_FLAG` is **ON**. If the flag is **OFF**, the `Address Register`'s value is incremented by **1**.                        |
| `JMP_ZRO XXXX` | Jump Zero     | Overwrites the `Address Register` with the value `XXXX` if the `Z_FLAG` is **ON**. If the flag is **OFF**, the `Address Register`'s value is incremented by **1**.                        |
| `JMP_NEG XXXX` | Jump Negative | Overwrites the `Address Register` with the value `XXXX` if the `N_FLAG` is **ON**. If the flag is **OFF**, the `Address Register`'s value is incremented by **1**.                        |
| `JMP_ABV XXXX` | Jump Above    | Overwrites the `Address Register` with the value `XXXX` if **neither** the `Z_FLAG` nor `N_FLAG` are **ON**. If either is **ON,** the `Address Register`'s value is incremented by **1**. |

Comparing two numbers is the same as subtracting them.  

$$a - 5 = b$$

| **b** is negative | **b** is zero | **b** is positive |
| ----------------- | ------------- | ----------------- |
| then              | then          | then              |
| a < 5             | a == 5        | a > 5             |

For example:  
![image34](image34.png)  
An `IF` statement works in the exact same way, but without the need to loop:  
![image35](image35.png)  
Note: These instructions are not from any real architecture. These are examples for this simple, custom architecture.

## Clock

The final piece of the puzzle is the clock. A clock can give us time before a circuit loops.  
![image36](image36.png)  
This is necessary, because energy travels extremely quickly, and so, all memory would be reset before we could even use the stored values. Each clock tick corresponds to an action the `CU` performs (fetch, decode and execute).  
A `Data FLIP-FLOP`, for example, uses the clock to store data, acting as the manual `RESET` input.  
![image37](image37.png)  
This circuit can be used to build a single bit register.  
![image38](image38.png)  
To generate a clock pulse, we can use a circuit similar to this one:  
![image39](image39.png)
