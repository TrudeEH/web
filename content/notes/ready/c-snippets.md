---
title: C Snippets
description: 
date: 2025-02-17T08:56:33+00:00
draft: false
tags:
  - c
  - programming
author: TrudeEH
showToc: true
---

## Cast Strings to Numbers

The `atoi()` function in `stdlib` is implemented similarly to the one below.  
 
ASCII encodes numbers in order, after special characters. 

The encoded value for `'0'` is 48, so subtracting any numeric char by 48 outputs its real numerical value.

```C
char number = '7';
int result = number - 48;
int same_result = number - '0';
```

Algorithm to convert strings to numbers:

```C
int str_to_int(char *str) {
	int result = 0;
	for (int i = 0; str[i] != '\0'; i++) {
		if (str[i] < '0' && str[1] > '9') return -1; // Error if NaN
		result = (result * 10) + (str[i] - '0');
	return result;
}
```

`(result * 10)` is shifting the previous number to the left, as it is an order of magnitude above the following digit.
