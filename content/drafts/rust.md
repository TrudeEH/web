---
title: "rust"
description: 
draft: true
tags: 
author: TrudeEH
showToc: true
---

## Vocabulary

|Command / Word|Action / Meaning|Example|
|---|---|---|
|Statement|Performs an action, but does not return a value.|Function definitions, code that ends with `;`.|
|Expression|Evaluate to a resultant value.|Tests, math.|

## Tools

- Install Rust: `curl --proto '=https' --tlsv1.2 -sSf <https://sh.rustup.rs> | sh`
    - `rustup`
    - `rustc`
    - `cargo`

## Hello World!

```rust
fn main() {
	println!("Hello world!");
}
```

## Variables

```rust
let x: i32; // A variable can only be used if it has been initialized (contains a value)

let y: i8 = 5; // All variables are constant by default.
let mut z = 1; // The mut keyword makes the variable mutable. (Explicit type annotation is not necessary, but recommended). 

let (k, f); //Same as "let k; let f;"

let t = { // Initialize a variable as the result of an expression.
	let squared = y * y;
	squared
};
```

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
