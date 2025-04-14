---
title: Rust
description: 
draft: true
tags: 
author: TrudeEH
showToc: true
summary:
---

## Tools

- Install Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
  - `rustup`
  - `rustc`
  - `cargo`

## Hello World

```rust
fn main() {
  println!("Hello world!"); // Macro to print text
}
```

## Comments

- *Regular comments* which are ignored by the compiler:
  - `// Line comments which go to the end of the line.`
  - `/* Block comments which go to the closing delimiter. */`
- *Doc comments* which are parsed into HTML library documentation:
  - `/// Generate library docs for the following item.`
  - `//! Generate library docs for the enclosing item.`

## Formatted Print

## Primitives (Variables)

### Scalar Types

- Signed integers (default to `i32`): `i8`, `i16`, `i32`, `i64`, `i128` and `isize` (pointer size)
- Unsigned integers: `u8`, `u16`, `u32`, `u64`, `u128` and `usize` (pointer size)
- Floating point (default to `f64`): `f32`, `f64`
- `char` Unicode scalar values like `'a'`, `'α'` and `'∞'` (4 bytes each)
- `bool` either `true` or `false`
- The unit type `()`, whose only possible value is an empty tuple: `()`

### Compound Types

- Arrays: `[1, 2, 3]`
- Tuples: `(1, true)`

### Examples

Variables can either be *type annotated*, or infered by context. By default, a variable is always constant, and can be made mutable with the `mut` keyword. After creating a variable, its data type cannot be changed.

```rust
fn main() {
	let x: i32; // Declare a variable
	
	let a_float: f64 = 1.0;  // Regular annotation
	let an_integer   = 5i32; // Suffix annotation
	
	let default_float   = 3.0; // `f64`
	let default_integer = 7;   // `i32`
	
	// A type can also be inferred from context.
	let mut inferred_type = 12; // Type i64 is inferred from another line.
	inferred_type = 4294967296i64;
	
	let mut mutable = 12; // Mutable `i32`
	mutable = 21;
	
	// Variables can be overwritten with shadowing.
	let mutable = true;
	
	// Array signature consists of Type T and length as [T; length].
	let my_array: [i32; 5] = [1, 2, 3, 4, 5];
	
	// Tuple is a collection of values of different types 
	// and is constructed using parentheses ().
	let my_tuple = (5u32, 1u8, true, -5.04f32);
	
	let (k, f); //Same as "let k; let f;"
	
	let t = { // Initialize a variable as the result of an expression.
		let squared = y * y;
		squared
	};
}
```

> A variable can only be used after it has been initialized (contains a value).

### Literals and Operators

Integers can also be expressed using hexadecimal `0x`, octal `0o` or binary `0b`.  
To improve readability, `_` can be added to numbers: `1_000` is the same as `1000`.  
Scientific e-notation such as `1e6`, `7.4e-4` is also supported, and defaults to `f64`.

The operators available and their precedence are similar to `C`:

```Rust
fn main() {
    println!("1 + 2 = {}", 1u32 + 2); // Integer addition
    println!("1 - 2 = {}", 1i32 - 2); // Integer subtraction
    // Changing `1i32` to `1u32` would causa an integer underflow.

    // Scientific notation
    println!("1e4 is {}, -2.5e-3 is {}", 1e4, -2.5e-3);

    // Short-circuiting boolean logic
    println!("true AND false is {}", true && false);
    println!("true OR false is {}", true || false);
    println!("NOT true is {}", !true);

    // Bitwise operations
    println!("0011 AND 0101 is {:04b}", 0b0011u32 & 0b0101);
    println!("0011 OR 0101 is {:04b}", 0b0011u32 | 0b0101);
    println!("0011 XOR 0101 is {:04b}", 0b0011u32 ^ 0b0101);
    println!("1 << 5 is {}", 1u32 << 5);
    println!("0x80 >> 2 is 0x{:x}", 0x80u32 >> 2);

    // Use underscores to improve readability!
    println!("One million is written as {}", 1_000_000u32);
}
```

---

## Data Types

### Integer Types

|Length|Signed|Unsigned|Unsigned Decimal Length|
|---|---|---|---|
|8-bit|`i8`|`u8`|`0..=255`|
|16-bit|`i16`|`u16`|`0..=65535`|
|32-bit (default)|`i32`|`u32`|`0..=4294967295`|
|64-bit|`i64`|`u64`|`0..=18446744073709551615`|
|128-bit|`i128`|`u128`|`0..=340282366920938463463374607431768211455`|
|arch||||
|(Size of CPU architecture)|`isize`|`usize`|The size of a memory address.|

```rust
let v: u16 = 32_u8 as u16; // Convert an u8 type to u16.
println!("{}", i8::MAX); // Print the largest possible value a data type can hold.
let a = 10_000; // _ is ignored, and is only used to help with readability.
let b = 1 + 0xff + 0o77 + 0b1111_1111; // Various numerical bases are supported.

println!("{}", type_of(&v));
```

### Floating Point Values

|Length|Signed|Unsigned|Unsigned Decimal Length|
|---|---|---|---|
|8-bit|`f8`|`u8`|`0..=255`|
|16-bit|`f16`|`u16`|`0..=65535`|
|32-bit (default)|`f32`|`u32`|`0..=4294967295`|
|64-bit|`f64`|`u64`|`0..=18446744073709551615`|
|128-bit|`f128`|`u128`|`0..=340282366920938463463374607431768211455`|

```rust
assert!(0.1 + 0.2 == 0.3); // False, floating point numbers are subject to imprecision.
assert!(0.1_f32 + 0.2 as f32 == 0.3_f32); // True. f32 is less precise. (Note: Remember that _ are optional and are ignored.)
```

### Boolean Logic

|True|False|
|---|---|
|`true`|`false`|
|`1`|`0`|

```rust
let _f: bool = false; // 1 byte

let t = false;
if !t { println!("t became true") }
```

#### Boolean Operators

- `AND`
- `OR`
- `NOT`

#### Bitwise Operations

Each bit is considered a unit.

|AND|`&`|
|---|---|
|OR|`|
|XOR|`^`|
|LEFT SHIFT|`<<`|
|RIGHT SHIFT|`>>`|

### Characters

```rust
let c1: char = 'a'; // 4 bytes
let c2: char = 'µ'; // Unicode is supported
```

### Unit Type

```rust
let _v: () = (); // () is similar to null. It means nothing. Takes up 0 bytes.
```

## Range

```rust
-3..2       // -3 to 1. 2 is excluded.
'a'..='z'   // a to z. z is included.
```

## Scope

A scope can be created anywhere in the program.

```rust
// Global Scope
let y = 2;

{
	// Local Scope. x is not accessible outside this scope.
	let x = 1;
	println!("{} and {}", x, y);
}
```

If a variable inside the inner scope has the same name as one outside, the latter is shadowed.

## Functions

```rust
fn main() { // No output; Implicit "-> ()".
	sum(3, 2);
}

fn sum(x: i32, y: i32) -> i32 { // Takes 2 numbers as input, and outputs another.
	x + y;
}

fn never_return() -> ! { // "-> !" A function that never returns to the caller. Either panics, or loops forever.
	panic!() // Error.
	unimplemented!() // Use if a function is not implemented yet.
	todo!() // Incomplete.
}
```

Type annotation is required in function definitions.

## Ownership

- Each value has an owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

```rust
{
	let s = "example";
	    |       |
	  Owner   Value
}
// Outside this scope, s is dropped from memory.
```

## Borrowing

- Access data **without taking ownership** of it.
- When borrowing, you are taking a **reference** (pointer) to the data, not the value itself.

**Rules**

- At any given time, you can have either **one mutable reference** or **any number** of **immutable references**.
- References must **always be valid**.

```rust
fn main() {
	let s1 = String::from("hello");
	let len = calculate_length(&s1);
	
	println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
	s.len() // s is a pointer to s1
}
```

Example mutable reference:

```rust
fn main() {
	let mut s = String::from("hello");
	change(&mut s);
}

fn change(some_string: &mut String) {
	some_string.push_str(", world");
}
```

Get the address in memory:

```rust
let x = 5;
let p: &i32 = &x; // Reference to x, reads 5 by println!.

println!("The memory address of x is {:p}", p); // :p reads the raw reference value.
```

Dereference:

```rust
let x = 5;
let p: &i32 = &x; // Reference to x
assert_eq!(5, *p) // Go to the value p points to and read it.
```

The `ref` keyword is an alternate syntax to create a reference:

```rust
let c = 'T';
let r1 = &c;
let ref r2 = c;
```

## Compound Types

Data types made of other types.

### Strings

A `String` is mutable, and is stored on the *stack* with a pointer to the *heap,* where the value is stored.

```rust
let s1 = String::from("hello");
     |                   |
  Pointer      Array stored on the heap
  (usize)
```

#### Copy vs. Move

```rust
// Copy a value
let x = 1;
let y = x;

// Move the pointer value.
let s1 = String::from("hello");
let s2 = s1;
```

Now `s2` also points to the same string as `s1`. This [is not allowed in rust](https://www.notion.so/Rust-14149cf14b4c80ed8f7be5c63490aac2?pvs=21), so `s1` will be dropped. (Passing a string pointer to a function makes the function the new owner of the string).

```rust
// Copy a string (Deep Copy)
let s1 = String::from("hello");
let s2 = s1.clone();
```

In this example, the value in the heap is copied, so both `s1` and `s2` have their own values, and only own their own instance of the string.

#### `String` Vs. `&str`

|Type|Mutability|Ownership|Efficiency|
|---|---|---|---|
|`String`|Mutable; heap|Owns its contents|`-`|
|`&str` (String Slice)|Immutable; stack|Does not own data|`+`|
|`"..."` (String Literal)|Immutable; static storage (Stored inside the compiled program)|Does not own data|`+`; Same as `&str`|

```rust
let s1: String = String::from("hello");
let s2: &str = "Hello";

// Read String Slice
let read_string_slice = &s2[0..1]; // "he"

// Move str to heap to make it mutable.
let s: Box<str> = "hello, world".into(); // .into() converts to the variable type.
let str_again = &s;
```

### Tuples

Store different data types.

```rust
let t: (String, Int) = (String::from("hello"), 14);
```

Reference: [](https://youtu.be/BpPEoZW5IiY?si=1ri40iKdXR4zwp0J&t=8461)[https://youtu.be/BpPEoZW5IiY?si=WiJX41VB55S7Tx17&t=5607](https://youtu.be/BpPEoZW5IiY?si=WiJX41VB55S7Tx17&t=5607)
