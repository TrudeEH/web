---
title: C Language
description: The C Programming Language
summary: The C Programming Language
draft: false
tags:
  - c
  - programming
author: TrudeEH
showToc: true
---

## Tools

- `indent` (format code)
- `gcc` / `clang` (compile code)
- `man <function/topic>` (read documentation)
- `tldr <command>` (quick command usage examples)
- `valgrind` (Look for memory leaks)
- `valgrind —tool=massif` (check a program's RAM usage)
    - View the output with `Massif-Visualizer`
- `gdb` (debugger)
    - `gdb —args <program>` (if the program has command line args)
    - Type `run` to start debugging, and `backtrace` for error details.
- `file` Check file information and, if it is an executable, compilation details.
- `perf stat -r 10 -d <program>` Benchmark a program.

## Data Types and Variables

The binary length of each data type depends on the CPU, OS, and compiler, but in general, they follow the C specifications. To check the exact values for your platform, see `limits.h`.

| Type          | C SPEC    | x64 Linux (Example) |
| ------------- | --------- | ------------------- |
| `char`        | ≥ 8 bits  | 8 bits              |
| `short`       | ≥ 16 bits | 16 bits             |
| `int`         | ≥ 16 bits | 32 bits             |
| `long`        | ≥ 32 bits | 64 bits             |
| `long long`   | ≥ 64 bits | 64 bits             |
| `float`       |           | 32 bits             |
| `double`      |           | 64 bits             |
| `long double` |           | 128 bits            |

| Unsigned Bytes (8 bits) | Maximum Decimal Value                               |
| ----------------------- | --------------------------------------------------- |
| 1                       | 255                                                 |
| 2                       | 65.535                                              |
| 4                       | 4.294.967.295                                       |
| 8                       | 18.446.744.073.709.551.615                          |
| 16                      | 340.282.366.920.938.463.463.374.607.431.768.211.455 |
| 32                      | 1.157 × 10^76                                       |

Examples

```C
char a = 'C';      // single character    %c ''
char b[] = "Trude" // array of characters %s ""
unsigned int // Unsigned. The number must be positive.
int          // Signed. Negative and positive numbers.
char f = 100;                 // %d (number) %c (character)
unsigned char g = 255;        // %d (number) %c (character)
short h = 32767;              // %d
unsigned short i = 65535;     // %d
int j = 2147483647;           // %d
unsigned int k = 4294967295;  // %u
long long l = ...             // %lld
unsigned long long m = ...32U // %llu
float c = 3.141592;           // %f
double d = 3.141592653589793; // %lf
```

### Format Specifiers

These format codes indicate which data type is being used. They are needed for `printf` and `scanf`, for example.

| `%`    | Description                                 |
| ------ | ------------------------------------------- |
| `%%`   | `%`                                         |
| `%-`   | left align                                  |
| `%.1`  | decimal precision                           |
| `%1`   | minimum field width                         |
| `%c`   | character                                   |
| `%d`   | signed integer of base 10                   |
| `%e`   | scientific notation                         |
| `%f`   | float                                       |
| `%hd`  | small decimal (short)                       |
| `%hhd` | very small decimal (char)                   |
| `%i`   | integer of any base (detects automatically) |
| `%lf`  | double                                      |
| `%o`   | octal (base 8)                              |
| `%p`   | address/pointer                             |
| `%s`   | string (array of characters)                |
| `%u`   | unsigned integer of base 10                 |
| `%x`   | hexadecimal (base 16)                       |

```C
float item1 = 5.75;
printf("Item1: %-8.2\n", item1);
```

## Numbers

`C` handles multiple numeric bases.

```C
int x = 255;  // Decimal
int y = 0xff; // Hexadecimal
int z = 0b10; // Binary (not native for C, but GCC and Clang support this syntax)
```

### Type Casting

Convert a type into another.

```C
int x = 1, y = 10;
float z = (float) x / (float) y;
```

## ANSI Escape Sequences

Escape sequences are used to allow typing characters in a string that would otherwise be interpreted as `C` instructions.

| Seq    | Name               | Description                                                                            |
| ------ | ------------------ | -------------------------------------------------------------------------------------- |
| `\a`   | Alarm or Beep      | It is used to generate a bell sound in the C program.                                  |
| `\b`   | Backspace          | It is used to move the cursor one place backward.                                      |
| `\f`   | Form Feed          | It is used to move the cursor to the start of the next logical page.                   |
| `\n`   | New Line           | It moves the cursor to the start of the next line.                                     |
| `\r`   | Carriage Return    | It moves the cursor to the start of the current line.                                  |
| `\t`   | Horizontal Tab     | It inserts some whitespace to the left of the cursor and moves the cursor accordingly. |
| `\v`   | Vertical Tab       | It is used to insert vertical space.                                                   |
| `\\`   | Backlash           | Use to insert backslash character.                                                     |
| `\'`   | Single Quote       | It is used to display a single quotation mark.                                         |
| `\"`   | Double Quote       | It is used to display double quotation marks.                                          |
| `\?`   | Question Mark      | It is used to display a question mark.                                                 |
| `\ooo` | Octal Number       | It is used to represent an octal number.                                               |
| `\xhh` | Hexadecimal Number | It represents the hexadecimal number.                                                  |
| `\0`   | `NULL`             | It represents the NULL character.                                                      |
| `\e`   | Escape sequence    | It represents the ASCII escape character.                                              |
| `\s`   | Space Character    | It represents the ASCII space character.                                               |
| `\d`   | Delete Character   | It represents the ASCII DEL character.                                                 |

## Constants

Add `const` before a variable declaration to prevent the value from being changed.

```C
const float PI 3.14159;
```

## Macros

### Object-Like Macros

Another alternative to `const` is to use `define`.

```C
#define MAX 9
int test = MAX;

#undef MAX     # Delete the macro
#define MAX 11 # Create a new macro with the same name
```

This command replaces the 'MAX' word with '9', using the preprocessor (before compiling); No memory is required.

### Function-Like Macros

Function-Like Macros behave in the same way as previous macros, but they can accept arguments to replace in the final code:

```c
#define Max(a,b)  ((a)>(b)) ? (a):(b))
int i = Max(4,5);
```

In this example, the code pre-compiles to:

```c
int i = ((4)>(5)) ? (4):(5));
```

Read the [GNU's C Preprocessor](https://gcc.gnu.org/onlinedocs/cpp/) manual for more details.

> Macros have no type safety checks, so, if possible, avoid using them. To build the final C code (before it is compiled), use `gcc -E`.

## Arithmetic Operators

```C
// +  (addition)
// -  (subtraction)
// *  (multiplication)
// /  (division)
// %  (modulus / remainder)
// ++ (increment)
// -- (decrement)
int x = 1;
int y = 2;
int z = x + y; // 3
// Augmented assignment operators
x++; // x = x + 1
y--; // y = y - 1
x+=2; // x = x + 2
x*=2; // x = x * 2
```

## Control Flow

### Boolean Values

In `C`, there are no `true` or `false` keywords, so integers are used instead.
- `0` usually represents `false`.
- Any non-zero value (`1`, `-1`, etc…) represents `true`.

### IF Statement

```C
if(a == 1) printf("A is 1.\\n");
```

Use `{}` for multiple items.

```C
if(age == 18){
	printf("You are 18.");
}
else if(age < 0){
	printf("You haven't been born yet.");
}
else{
	printf("You are not 18.");
}
```

### Switch Statement

Generally faster than `IF` when over 5 cases.

```C
switch(grade){
	case 'A':
		printf("perfect.\n");
		break;
	case 'B':
		printf("good.\n");
		break;
	case 'C':
		printf("okay.\n");
		break;
	case 'D':
		printf("meh.\n");
		break;
	case 'F':
		printf("failed.\n");
		break;
	default:
		printf("Enter only valied grades.\n");
}
// If break; is missing, the next case is also executed.
```

## Operators

### Logical Operators

#### AND (`&&`)

```C
if(temp >= 0 && temp <= 30){
	printf("\nThe weather is good.")
}
```

#### OR (`||`)

```C
if(temp <= 0 || temp >= 30){
	printf("\nThe weather is good.")
}
```

#### NOT (`!`)

```C
if(!(temp <= 0 || temp >= 30)){
	printf("\nThe weather is bad.")
}
```

##### **NOT** Truth Table

| `condition` | `!(condition)` |
| ----------- | -------------- |
| 1           | 0              |
| 0           | 1              |

### Ternary Operator

Shorthand syntax for if/else when assigning or returning a value.

```C
// (condition) ? value if true : value if false
int max = (x > y) ? x : y;
```

### Bitwise Operators

Special operators used in bit-level programming. (Logic gates)

```C
int x = 6;  // 6  = 00000110
int y = 12; // 12 = 00001100
int z = 0;  // 0  = 00000000
z = x & y;  // AND         - 00000100 (4)
z = x | y;  // OR          - 00001110 (14)
z = x ^ y;  // XOR         - 00001010 (10)
z = x << 1; // Left Shift  - 00001100 (12) (Shift all bits to the left.)
z = x >> 1; // Right Shift - 00000011 (3)  (Shift all bits to the right.)
```

## Functions

Functions are snippets of code that can be reused multiple times across the same file. These can receive multiple arguments as input, but can only return a single value.

```C
void myFunction(); // Function Prototype
int main() {
	myFunction(); // Call function
	return 0;
}
void myFunction() { // Function Definition
	//...
}
```

### Arguments

```C
void greet(char x[], int y);
int main() {
	char name[] = "Trude";
	int age = 132;
	greet(name, age);
}
void greet(char x[], int y) {
	printf("\nHello %s, you are %d years old.", x, y);
}
```

### Return Values

```C
double square(double x);
int main() {
	double x = square(3.14);
	printf("%lf", x);
	return 0;
}
double square(double x) {
	return x * x;
}
```

### Recursion

A function can call itself, creating a loop.

```C
int i = 0;
void plusOne(int n) {
	printf("%d", n);
	if (n < 10000) plusOne(n);
}
```

### Function Prototypes

Function declaration without a body, before `main()`.  
Prototypes ensure that calls to a function are made with the correct arguments, and allow functions to be defined after the function call.

```C
void hello(char[], int); // Function Prototype
int main() {
	hello(//...);
	return 0;
}
void hello(char name[], int age){
	//...
}
```

> **Note:** Many C compilers don't check for parameter matching, so missing arguments can lead to unexpected behavior.
> 
> Function prototypes flag errors when arguments are missing.
> 
> While not necessary if functions are declared before `main()`, using prototypes first and then declaring functions after `main()` improves readability and aids debugging.

## Loops

### For Loop

Loop through an interval.

```C
for(int i = 0; i < 10; i++){
	printf("%d\n", I); //0-9
}
//Multiple initial variables
for(int i = 0, int y = 1; i < 10; i++){
	printf("%d\n", I); //0-9
}
```

### While Loop

Loop until a condition is met.

```C
while(test == 1){
	printf("Test is not 1.\n");
}
```

### Do While Loop

Run the code once, then repeat until a condition is met.

```C
do {
	printf("Enter a number above 0: ");
	scanf("%d", &number)
} while (number > 0);
```

### Endless Loop

```C
while (true) {
	...
}
```

### Continue & Break Statements

- `continue` - Skips rest of code and forces the next iteration of the loop.
- `break` - Exits a loop/switch.

## Structs

Structs can group values. They are similar to classes, but can't hold methods.  
Being able to group variables avoids repetition and name collision (when two variables have the same name).

```C
struct Player {
	char name[12];
	int score;
};
int main(){
	struct Player player1;
	struct Player player2;
	strcpy(player1.name, "Trude");
	player1.score = 4;
	strcpy(player2.name, "JCionx");
	player2.score = 7;
	player1.score; //4
}
```

### Arrays of Structs

```C
struct Student {
	char name[12];
	float gpa;
};
int main() {
	struct Student s1 = {"Peter", 3.0};
	struct Student s2 = {"Jean", 4.0};
	struct Student s3 = {"David", 2.5};
	struct Student students[] = {s1, s2, s3};
	printf("%f\n", students[0].gpa); // Print the student 1 gpa.
	return 0;
}
```

## Typedef

Create a shortcut for a type of data.

```C
typedef char user[25];
int main() {
	user user1 = "Trude";
}
```

Typedef can be used to simplify structs.

```C
typedef struct {
	char name[25];
	char password[12];
	int id;
} User;

int main(){
	User user1 = {"Trude", "hello123", 12335};
}
```

## Nul Character

```C
\0 // This character represents 00000000 and marks the end of a string.
// Same as 0x0 and null.
```

## Command-Line Arguments

- `argc` is the number of arguments in `argv`.
- `argv[0]` is the name of the program, all others are the user arguments (the entire command used to initialize the program is stored).

```C
int main(int argc, char argv[]) {
	if (argc == 2) {
		printf("hello, %s\n", argv[1]);
	} else {
		printf("You need to add 1 argument.\n");
		return 1;
	}
	return 0;
}
```

## Enums

Enums are a list of constant values that help make programs more readable.  
Enums are treated as integers.

```C
// enum Day{Sun, Mon, Tue, Wed, Thu, Fri, Sat}; (This enum starts from 0 to 6.)
enum Day{Sun = 1, Mon = 2, Tue = 3, Wed = 4, Thu = 5, Fri = 6, Sat = 7};
int main(){
	enum Day today = Sun;
	if(today == Sun || today == Sat){
		printf("It's the weekend.");
	}
}
```

## Memory Management

- `a` - A variable
- `&a` - The address of the variable `a` in memory. (The formatter is `%p`)
- `int *p` - A pointer. Holds the memory address of another variable. (8 bits usually, depends on the CPU architecture (max RAM supported).
- `*p` - Dereference a pointer. Returns the value in the address stored. (go to address's variable)

```C
int age = 21;
int *pAge = &age;
int valueOfAge = *pAge;
printf("%p and %p are the same.", &age, pAge);
```

> A pointer must be `int`, as it stores a memory address.

### Strings

Strings are arrays of characters.  
A string can be returned as a memory address.  
A string ends in `\0`, the null character.

```C
/* Use char[] when:
		- The maximum string length is known.
		- No need to modify the whole string.
		- No need to pass the string to a function [that modifies it]
*/
char name[] = "Trude"; // 6 bits on stack memory.
name[0] = 'T'; // Elements of an array can be modified.
/* Use char* when:
		- The maximum string length is NOT known.
		- The string will later be modified.
		- The string will be passed to a function [that modifies it].
*/
const char *name = "Trude"; // 8 bits in stack + 6 bits read-only.
name = "TrudeEH"; // Pointers can be overwritten.
name++; // rudeEH - Works because the pointer is shifted to the next value.
peintf("%c\n", *(name+1)); // Prints 'r'.
printf("%c\n", name[1]); // Works with both for reading.
printf("%s\n", name);    // Print a string.
// The string in memory:
// [T][r][u][d][e][\\0]
// The memory address of T is stored.
```

### String Operations

#### Compare String

```C
#include <stdio.h>
#include <string.h>
char s* = "Trude";
char t* = "Trude";
if (strcmp(s, t) == 0) {
	printf("Same string.");
}
```

#### Copy String (`malloc` example) Manually

```C
#include <stdlib.h>
char *s = "Trude";
char *t = malloc(strlen(s) + 1);
// 2 variables are declared, so strlen isn't called with every iteration.
for (int i = 0, n = strlen(s) + 1; i < n; i++) {
	t[i] = s[i];
)
//...
free(t);
```

#### Copy String (string.h)

```C
#include <stdlib.h>
#include <string.h>
char *s = "Trude";
char *t = malloc(strlen(s) + 1);
strcpy(t, s);
//...
free(t);
```

Note: Use `valgrind` to detect memory leaks (lack of `free()`)

> **Always** initialize variables to a value, or random garbage values may be still in the variable's memory address.

### Input

#### Get Integer

```C
#include <stdio.h>
int main(void){
	int x;
	scanf("%i", &x);
}
```

#### Get String (Length is Known, safe)

`scanf` reads up to a whitespace.

```C
#include <stdio.h>
int main(void){
	char s[4];
	scanf("%4s", s);  //No &, s is an address already.
}
```

`fgets` reads whitespaces.

```C
#include <stdio.h>
#include <string.h>
char name[25];
fgets(name, 25, stdin); // name of variable, max size, input.
name[strlen(name)-1] = '\0'; // removes the line break fgets adds. String library is required.
```

## Files

### Write to a File

```C
#include <stdio.h>
int main() {
	FILE *file = fopen("test.txt", "w"); // w - overwrite / a - append
	fprintf(file, "Some Text");
	fclose(file);
	return 0;
}
```

### Delete a File

```C
#include <stdio.h>
int main() {
	if(remove("test.txt") == 0){
		printf("File removed.\n");
	} else {
		printf("Failed to delete file.\n");
	}
	return 0;
}
```

### Read a File

```C
#include <stdio.h>
int main() {
	FILE *pF = fopen("test.txt", "r") // r - read.
	char buffer[255]; // Will hold 1 line of the file.
	if(pF == NULL){
		printf("File does not exist.");
		return 1;
	}
	fgets(buffer, 255, pF);
	printf("%s", buffer); // Print first line of file. Use in a while loop to print all of them.
	fclose(pF);
	return 0;
}
```

File manipulation accepts relative and absolute file paths.
