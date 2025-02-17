---
title: Logic Gates
description: 
draft: false
tags:
  - electronics
  - computer-science
author: TrudeEH
showToc: true
---

## NOT

Invert the input.  
![image42](image42.png)

### Truth Table

|**Input**|**Output**|
|---|---|
|0|1|
|1|0|

## AND

Output `1` only when both inputs are `1`.  
![image43](image43.png)

### Truth Table

|A|**B**|**Output**|
|---|---|---|
|0|0|0|
|0|1|0|
|1|0|0|
|1|1|1|

## OR

Output `1` if at least one input is `1`.  
![image44](image44.png)

### Truth Table

|A|**B**|**Output**|
|---|---|---|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|1|

## NAND

An `AND` gate followed by a `NOT` gate.  
![image45](image45.png)

### Truth Table

|A|**B**|**Output**|
|---|---|---|
|0|0|1|
|0|1|1|
|1|0|1|
|1|1|0|

## NOR

An `OR` gate followed by a `NOT` gate.  
![image46](image46.png)

### Truth Table

|A|**B**|**Output**|
|---|---|---|
|0|0|1|
|0|1|0|
|1|0|0|
|1|1|0|

## XOR

Either input is `1`, exclusively.  
![image47](image47.png)  
![image48](image48.png)

### Truth Table

|A|**B**|**Output**|
|---|---|---|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|0|

## XNOR

Inverted `XOR`.  
![image49](image49.png)

### Truth Table

|A|**B**|**Output**|
|---|---|---|
|0|0|1|
|0|1|0|
|1|0|0|
|1|1|1|

## Implementation Examples

### NOT

![image50](image50.png)

### AND

![image51](image51.png)  
![image52](image52.png)

### OR

![image53](image53.png)
