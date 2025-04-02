---
title: Python
description: 
draft: false
tags:
  - python
  - programming
author: TrudeEH
showToc: true
---

## Python3 [Documentation](https://docs.python.org/3/)

- `number`: Replace with a number.
- `*object`: Any number of objects.
- `[, ndigits]`: Anything between `[]` is optional.

## Run Python Code

Python is an interpreted language. It is not compiled like C.

```Shell
python hello.py
```

Skipping the compiling step makes the language easier to use but at the cost of performance.

## Print

Print information on the console.

```Python
print("hello, world")
answer = "Some Text"
print(f"Your answer is: {answer}") # formatted string (any type)
print("Your answer is: " + answer) # answer must be string
print("Your answer is:", answer) # answer can be any type
print("Same line", end="")
print("!" * 4) # "!!!!
# '' and "" do the same.
```

## Input

Prompt the user for information.

```Python
# String Input
name = input("Prompt: ")
number = int(input("Prompt: "))
name = name.strip() # Remove whitespaces from a string
```

## Variables

Python infers the type of variable automatically.

```Python
answer = "Some Text"
counter = 0
counter = counter + 1
counter += 1
# Counter++ does not exist in Python
```

### Global Variables

Use the global keyword to modify a global variable while outside its scope.

```Python
balance = 0
def deposit(n):
	global balance
	balance += n
```

## Comments

```Python
# Comment
"""
Multi
Line
Comment
"""
```

### Docstring

The documentation for a function.  
This can later be used to generate manuals and documentation Some IDEs do so automatically.

```Python
def code():
	"""
	Does something.
	"""
	...
```

### Type Hints

Type hints are not enforced. These can be read by debuggers, but Python itself allows these types to be violated.

```Python
def meow(n: int) -> None: # -> None indicates that the function does not return a value
	...
number: int = int(input("Number: "))
```

## Data Types

| Data Type Category | Data Types                         |
| ------------------ | ---------------------------------- |
| Text Type          | `str`                              |
| Numeric Types      | `int`, `float`, `complex`          |
| Sequence Types     | `list`, `tuple`, `range`           |
| Mapping Type       | `dict`                             |
| Set Types          | `set`, `frozenset`                 |
| Boolean Type       | `bool`                             |
| Binary Types       | `bytes`, `bytearray`, `memoryview` |
| None Type          | `NoneType`                         |

> `float` types can overflow, much like C, but `int` never does, and instead grows as large as needed to fit a given value.

### Type Conversion

```Python
int("1") # convert to int
float(2) # convert to float
```

### Data Type Functions

```Python
round(5.12) # round a number
round(3.43, 2) # round to the 2nd decimal place
len(list) # length of a list (nº of elements)
```

### Unpack Values

Values can be split using `*`. This method works with lists, dictionaries, and tuples.  
For dictionaries, `*dict` returns key names and `**dict` returns the value names.  
Unpack can also be used when returning values from functions.

```Python
def total(gold, silver, copper):
	return gold * 100 + silver * 10 + copper
coins = [100, 50, 25]
print(total(*coins), "Copper coins")
```

### F Strings

A string that executes formatting.

```Python
f'Some text: {1+1}' # Executes 1+1 and prints "Some text: 2"
f'{z:.2f}' # Variable z is rounded to the 2nd decimal place.
```

### Ranges

Produce a range of numbers.

```Python
range(10) # 1, 2, 3... 10
if 80 <= score < 90:
	code...
```

### Lists

Arrays are flexible in Python, unlike C. Elements can be added and removed at runtime.

```Python
scores = [72, 73, 33]
scores.append(32)
# scores += [43, 45] # Adds a list to another list
average = sum(scores) / len(scores)
print(f"Average: {average}")
scores[1:] \#Slice the list -> From 1 to the end. (Skips element 0)
scores[1:-1] \#Slice the list -> From 1 to the end. (Skips element 0 and last)
```

#### List Comprehension

Create a new list with a function applied to every element of the list.

```Python
words = ["This", "is", "CS50"]
uppercased = [word.upper() for word in words]
print(*uppercased)
```

In this example, every element in `words` is uppercased.  
This feature is useful to filter items as well:

```Python
students = [
	{"name": "Trude", "class": "code"},
	{"name": "Maxs", "class": "art"},
	{"name:" "JCionx", "class": "code"},
]
codeStudents = [
	student["name"] for student in students if student["class"] == "code"
]
```

#### Filter Function

Similar code, but for a more functional oriented programming approach.

```Python
def is_class(s):
	return s["class"] == "code"
coders = filter(is_class, students)
```

### Sets

Similar to a list, but can only contain unique items.

```Python
values = set(1, 1, 1, 2)
print(values) # 1, 2
```

### Dictionaries

A list, but instead of using an index, uses keywords.

```Python
students = {
	"Key1": "Value",
	"Key2": "Value",
	"Key3": "Value",
}
print(students["Key1"])
```

#### Loop over Dictionary

```Python
for student in students:
	print(student)           # Iterates over keys.
	print(students[student]) # Iterates over values.
```

#### Dictionary Comprehension

Filter dictionaries.

```Python
students = ["Trude", "Maxs", "JCionx"]
# Classic for
coders = []
for student in students:
	coders.append({"name": student, "class": "code"})
# List comprehension (3 dicts in a list)
coders = [{"name": student, "class": "code"} for student in students]
# Dict comprehension (1 dict with name: class for all 3)
coders = {student: "code" for student in students}
```

### Hashtable

```Python
table = [
	{"Key1": "Value", "Key2": "Value", "Key3": "Value"},
	{"Key1": "Value", "Key2": "Value", "Key3": "Value"},
	{"Key1": "Value", "Key2": "Value", "Key3": "Value"},
	{"Key1": "Value", "Key2": "Value"},
]
print(table[0]["Key2"])
for tab in table:
	print(tab["Key1"]) # Print all Key1 values.
```

## Conditions

### IF

```Python
if x < y:
	print("x is less than y")
elif x > y:
	print("x is greater than y")
else:
	print("x is not less than y")
if test in numbers:
	code...
```

`()` are optional in the condition.

### `:=` Operator

Syntax sugar to integrate an assignment operator with an IF statement.  
**Without it**

```Python
matches = 1 == 1
if matches:
	print(matches) # True
```

**With it**

```Python
if matches := 1 == 1:
	print(matches) # True
```

## Loops

### While

```Python
while True:
	print("meow")
i = 0
while i < 3:
	print("meow")
	i += 1
```

### For

#### Loop through an Array

```Python
for _ in [0, 1, 2]:
	print("Hello World.")
# _ throws away the value (no variable).
```

#### Loop through a Range

```Python
for i in range(3):
	print("Loops from 0 - 3")
```

#### Loop through an Array, Using Its Value as the Index

```Python
students = ["one", "two", "three"]
for student in students:
	print(student)
```

#### Enumerate

Iterate over a sequence, and get the current value and index.

```Python
students = ["Trude", "Maxs", "JCionx"]
for i, student in enumerate(students):
	print(i + 1, student)
```

### Map

Execute a function on every element of a list.  
Takes two arguments:
- Name of a function
- Data structure to apply the function on

```Python
words = ["This", "is", "CS50"]
uppercased = map(str.upper, words)
print(*uppercased)
```

### Keywords

- `break`: leave the loop
- `continue`: skip to next iteration

## Libraries

```Python
import lib
lib.component(...)
from lib import component
component(...)
```

### Packages

A package is a collection of libraries in the same directory, often built by other developers.  
You can download user packages on [pypi.org](http://pypi.org/).

#### Install Packages with Pip

`pip` is a package manager for Python.

```Bash
pip install package
```

### Useful Libraries

- `random` Generate random numbers
    - `shuffle`
    - `choice`
    - `randint`
- `statistics`
    - `mean`
- `requests` Web requests (similar to `curl`) useful for interfacing with APIs

#### APIs

APIs usually communicate in JSON.

```Python
import requests, sys
import json
response = requests.get("<https://itunes.apple.com/search?entity=song(...)>")
print(response.json()) # Print respose formatted for json (as a py dictionary))
print(json.dumps(response.json(), indent=2)) # Print response indented to read easily.
o = response.json()
for result in o["results"]:
	print(result["trackName"]) # Print all songs in the response
```

### Create Custom Library

```Python
# LIBRARY: lib.py file
def main():
	hello("world")
def hello(name):
	print(f"hello, {name}")
# Only call main if ran from the command line. Not as a library.
if __name__ == "__main__":
	main()
```

```Python
# MAIN CODE: main.py file
from lib import hello
hello("trude")
```

## Functions

```Python
def hello(name):
	print(f'Hello {name}')
hello("trude")
```

### Default Values

```Python
def hello(to='world'):
	print("hello,", to)
hello() # hello, world
hello('trude') # hello, trude
```

### Main Function

```Python
def main():
	# main code ...
# other fucntions ...
main()
```

### Generator Function (Yield)

Return one value at a time, without ending the function, and then loop again.  
Useful when working with a large amount of logic that takes a long time to execute.

```Python
def sheep(n):
	for i in range(n):
		yield "SHEEP" * i
```

`yield` returns an iterator that allows the program to handle one element at a time and not lose track.

### Command Line Arguments

```Python
from sys import argv
if len(argv) == 2:
	print(f"Hello, {argv[1]}")
else:
	print("Hello World.")
# argv[0] is the program name
# List all arguments
for arg in argv:
	print(arg)
```

#### Flags

To support commands like: `python file.py -n 2`

```Python
import argparse
parser = argparse.ArgumentParser(description="Meow like a cat")
parser.add_argument("-n", default=1, type=int, help="number of times to meow")
args = parser.parse_args()
for _ in range(args.n): # .n is the -n flag
	print("meow")
```

#### Allow Function to Take Any Number of Arguments (Unpack)

```Python
def f(*args, **kwargs):
	print("Positional: ", args)
	print("Named: ", kwargs)
f(100, 50, 25) # Positional: (100, 50, 25)
f(100, 50, 25, 5) # Positional: (100, 50, 25, 5)
f(gold=10, silver=20, copper=1) # Named: {'gold': 10, 'silver'20 ...}
```

### Pass Functions as Arguments

```Python
def get_name(student):
	return student["name"] # Sort by student name
for student in sorted(students, key=get_name):
	...
```

#### Lambda Function

Pass a function without having to give it a name.

```Python
for student in sorted(students, key=lambda student: student["name"]):
	...
```

## Exceptions

```Python
# Int
try: # Try to execute
	x = int(input("What's your number?"))
except ValueError: # If error is ValueError
	print("Not a number.")
except: # If error
	print("Unknown Error.")
else: # If success
	print(f"Your number+1 is {x + 1}")
```

```Python
try:
	...
except:
	pass # Catch the error, but then ignore it.
```

## Operators

### Comparison Operators

- `<`
- `>`
- `≤`
- `≥`
- `≠`
- `==`

### Logic Operators

- `and`
- `or`

```Python
s = input("Do you agree?")
if s == 'y' or s == 'Y' or s == "Yes" or s == "yes":
	(...)
# This can be improved:
s = input("Do you agree?").lower()
if s in ['y', 'yes']:
	(...)
```

## Scope

1. Program
2. Function (Variables in loops and IFs are global to the function)

## Exit with Error Codes

```Python
from sys import exit
exit(1) # Exit with error code 1
exit("Failed for some reason")
```

## Unit Tests

Helper code to test the main code and (hopefully) catch bugs before they can reach production.

### Manual Tests

**Main code**

```Python
def main():
	x = int(input("X value: "))
	print(f"X^2 is {square(x)}")
def square(n):
	return(n * n)
if __name__ = "__main__":
	main()
```

**Test code (Using IF)**

```Python
from file import square
def main():
	test_square()
def test_square():
	if square(2) != 4:
		print("2 squared was not 4.")
	if square(3) != 9:
		print("3 squared was not 9.")
if __name__ == "__main__":
	main()
```

**Improved test code (Using assert)**

```Python
from file import square
def main():
	test_square()
def test_square():
	try:
		assert square(2) == 4
	except AssertionError:
		print("2 squared was not 4.")
	try:
		assert square(3) == 9
	except AssertionError:
		print("3 squared was not 9.")
if __name__ == "__main__":
	main()
```

### **Pytest**

`pytest` is an external program that simplifies python's unit testing.

```Python
import pytest
from file import square
def test_square():
	assert square(2) == 4
	assert square(3) == 9
	assert square(-2) == 4
	assert square(-3) == 9
	assert square(0) == 0
def test_str(): # Verify that an error will happen for a str
	with pytest.raises(TypeError):
		square("cat")
```

Test with `pytest`:

```Shell
pytest test_file.py
```

> A function with side effects (doesn't return a value) can't be tested.

## File I/O

### Write to a File (Replace)

```Python
name = "trude"
file = open("name.txt", "w")
file.write(name)
file.close()
```

### Append to a File (Add)

```Python
name = "trude"
file = open("name.txt", "a")
file.write(name)
file.close()
```

### Open a File and close Automatically

```Python
name = "trude"
with open("name.txt", "a") as file:
	file.write(name) \\#File is only open in this scope
```

### Read a File

`"r"` is optional when reading.

```Python
with open("name.txt", "r") as file:
	lines = file.readlines() # Return all lines as a list
for line in lines:
	print(line.rstrip()) # Print all lines and remove \\n separating each line
```

#### Better Code for Reading Every line

```Python
with open("name.txt") as file:
	for line in file:
		print(line.rstrip())
```

#### Sort File Lines

```Python
names = []
with open("name.txt") as file:
	for line in file:
		names.append(line.rstrip())
for name in sorted(names):
	print(f"Hello, {name}")
```

### CSV Files

#### Read

**Python**

```Python
import csv
students = []
with open("students.csv") as file:
	reader = csv.reader(file)
	for name, home in reader:
		students.append({"name": name, "home": home})
for student in students:
	print(f"{student['name]"} is from {student['home']}")
```

**CSV File**

```Plain
trude, myHome
maxs, hisHome
jcionx, anotherHome
```

#### Dict Reader

Ignores column order and doesn't break the program if new columns are added. It is recommended to **always** use `**DictReader**` **instead of** `**Reader**`**.**  
**Python**

```Python
import csv
students = []
with open("students.csv") as file:
	reader = csv.DictReader(file)
	for row in reader:
		students.append({"name": row["name"], "home": row["home"]})
for student in students:
	print(f"{student['name]"} is from {student['home']}")
```

**CSV File**

```Plain
name, home
trude, myHome
maxs, hisHome
jcionx, anotherHome
```

#### Write

```Python
import csv
name = 'trude'
home = 'myHome'
with open("students.csv", "a") as file:
	writer = csv.writer(file)
	writer.writerow([name, home])
```

#### Dict Writer

```Python
import csv
name = 'trude'
home = 'myHome'
with open("students.csv", "a") as file:
	writer = csv.DictWriter(file, fieldnames=["name", "home"])
	writer.writerow({"name": name, "home": home})
```

### Other Formats

- TXT
- CSV
- JSON
- BINARY
    - Images (PIL library)

#### Animated GIF Program

```Python
from PIL import Image
items = ["image1.png", "image2.png"]
images = []
for item in items:
	image = Image.open(item)
	images.append(image)
images[0].save(
	"images.gif", save_all=True, append_images=[images[1]], duration=200, loop=0
)
```

## Regular Expressions (regex)

Define patterns for comparisons.

```Python
import re
email = input("Email Address: ").strip()
if re.search(r"^.+@.+\\.edu$", email, re.IGNORECASE):
	print("Email is valid.")
else:
	print("Email is not valid.")
```

### Regular Expression Symbols

- `.` any character except a newline
- 0 or more repetitions
- `+` 1 or more repetitions
- `?` 0 or 1 repetition
- `\\` escape character
- `{m}` m repetitions
- `{m,n}` m-n repetitions (range)
- `^` match the start of the string
- `$` match the end of the string
- `[]` set of characters
- `[^]` complementing the set
- `\\d` decimal digit
- `\\D` not a decimal digit
- `\\s` whitespace characters
- `\\S` not a whitespace character
- `\\w` word character, numbers and underscore
- `\\W` not a word character
- `A|B` either A or B
- `(…)` a group
- `(?:…)` non-capturing version  
Always use `r"string"` (raw string) so python won't interpret `\\` as a special character.

### RE Lib Flags

- `re.IGNORECASE`
- `re.MULTILINE`
- `re.DOTALL`

### Examples

#### Regular Expression for Email Validation

```Python
import re
regex = re.compile(r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
def isValid(email):
    if re.fullmatch(regex, email):
      print("Valid email")
    else:
      print("Invalid email")
```

[More regular expressions](https://www.labnol.org/internet/regular-expressions-forms/28380/)  
`compile` caches the query to make new lookups faster.  
When a regular expression becomes too complex, the rule of thumb is to **use a library instead**.

## Object-Oriented Programming: OOP

### Tuple

An immutable (constant) list.

```Python
tuple = (val1, val2)
```

#### Return More than One Value from a Function

```Python
def get_student():
	n = input("Name: ")
	h = input("House: ")
	return n, h
name, house = get_student()
print(name)
student = get_student()
print(student[0])
```

To make the values mutable, return a list instead.

```Python
return [item1, item2]
```

### Class

Classes are 'blueprints' for data; They define custom data types.  
For example, you can use a class to represent a real-world entity.

#### Basic Class

```Python
class Student:
	... # '...' is a valid placeholder
student = Student  # Create an object from the Student class
student.name = "trude" # Add a new instance variable
student.house = "myHome"
print(student.name) # 'trude'
```

#### Attributes

```Python
class Student:
	def __init__(self, name, house): # Initialization function
		self.name = name
		self.house = house
name = 'trude'
house = 'myHome'
student = Student(name, house)
```

- `self` is the object created from the class definition.
- When an object is created, the `__init__` function is executed.

#### Attributes Error Handling

```Python
class Student:
	def __init__(self, name="Unknown", house): # Initialization function
		if not name:
			raise ValueError("Missing name") # Create and output a custom error
		if house not in ["myHome", "yourHome", "hisHome"]:
			raise ValueError("Invalid house")
		self.name = name
		self.house = house
```

#### Change what Happens when an Object is Printed

```Python
class Student:
	def __init__(self, name, house): # Initialization function
		self.name = name
		self.house = house
	def __str__(self):
		return f"A Student - {self.name}"
student = Student("trude", "myHome")
print(student) # "A Student - trude"
```

#### Methods

```Python
class Mage:
	def __init__(self, name, clan, element): # Initialization function
		self.name = name
		self.clan = clan
		self.element = element
	def castElement(self):
		match self.element:
			case "Fire":
				return "FIRE SPELL"
			case "Water":
				return "Water SPELL"
			case "Earth":
				return "Earth SPELL"
			case "Air":
				return "AIR SPELL"
			case _:
				return "NO SPELL"
mage = Mage("trude", "magicINC", "Fire")
print(mage.castElement())
```

#### Properties

Dot notation (`student.name = ""`) can bypass any data validation. To avoid this, make attributes constant.  
A constant attribute is referred to as a property.

```Python
class Mage:
	def __init__(self, name, clan, element): # Initialization function
		self.name = name
		self.clan = clan
		self.element = element
	# Getter (function to get house attribute)
	@property # Indicates that this is a getter
	def clan(self):
		return self._clan # Add _ to avoid name collision.
	# Setter (function to set a value)
	@clan.setter # Indicates that this is a setter
	def clan(self, clan):
		if clan not in ["magicINC", "spellInator", "glyphGens"]:
			raise ValueError("Invalid Clan")
		self._clan = clan
mage = Mage("trude", "spellInator", "Fire")
mage.clan = "not-a-clan"
```

#### Example

```Python
class Mage:
	...
def main():
	mage = get_mage()
	print(f"{mage.name} from {mage.clan}")
def get_mage():
	mage = Mage()
	mage.name = "trude"
	mage.clan = "spellInator"
	return mage
if __name__ == "__main__":
	main()
```

#### Class Methods

A method that relates to the class itself, and doesn't depend on the objects individually.

```Python
import random
class Hat:
	def __init__(self):
		self.clans = ["magicINC", "spellInator", "glyphGen"]
	def sort(self, name):
		print(name "is in", random.choice(self.clans))

hat = Hat()
hat.sort("Trude")
```

#### Class Variables

- `self.var` A variable unique for each object
- `var` A variable shared with all objects

```Python
class Hat:
	clans = ["magicINC", "spellInator", "glyphGen"]
	@classmethod
	def sort(cls, name):
		print(name "is in", random.choice(cls.clans))
Hat.sort("Trude")
```

A class method is a method global to the class, instead of created for each object. It relates to the data type (class) itself.

#### Example

```Python
class Mage:
	...
	@classmethod
	def get(cls):
		name = input("Name: ")
		clan = input("Clan: ")
		return cls(name, clan) # name and clans are returned to the class as self.name and self.clan.
	...
def main():
	mage = Mage.get()
	print(mage)
if __name__ == "__main__":
	main()
```

### Inheritance

Inherit code from a parent class to avoid code duplication.

```Python
class Person:
	def __init__(self, name)
		if not name:
			raise ValueError("Missing name")
		self.name = name
class Student(Person): # Pass Person to Student
	def __init__(self, name, house):
		super().__init__(name) # Execute Person's __init__ method.
		self.house = house
	...
class Professor(Person):
	def __init__(self, name, subject):
		super().__init__(name)
		self.subject = subject
	...
person = Person("Random Guy")
student = Student("Trude", "myHome")
professor = Professor("Someone", "Math")
```

### Operator Overloading

Customize what an operator does with a Class.
- `__add__` Behavior of '+' operator.

```Python
class Vault:
	def __init__(self, gold=0, silver=0, copper=0):
		self.gold = gold
		self.silver = silver
		self.copper = copper
	def __str__(self):
		return f"{self.gold} Gold, {self.silver} Silver, {self.copper} Copper."
	def __add__(self, other):
		gold = self.gold + other.gold
		silver = self.silver + other.silver
		copper = self.copper + other.copper
		return Vault(gold, silver, copper)
trude = Vault(100, 50, 25)
jcionx = Vault(25, 50, 100)
print(trude) # 100 Gold, 50 Silver, 25 Copper
print(jcionx) # 25b Gold, 50 Silver, 100 Copper
total = trude + jcionx
print(total) # 125b Gold, 100 Silver, 125 Copper
```
