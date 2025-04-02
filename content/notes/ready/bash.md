---
title: Shell Scripting [BASH]
description: 
summary: 
draft: true
tags: 
author: TrudeEH
showToc: true
---

## Bash Language

### Strings

- `""` Defines a string which supports substitutions (`$` and `\`, for example).
- `''` Defines a string, but preserves its actual value (substitutions are treated as regular characters).
- [ANSI Escape Sequences](../../ready/c-language.md#ANSI%20Escape%20Sequences) apply when using `""`.

### Comments

```bash
# comment
```

### Commands

A shell command consists of the command itself, followed by its arguments.

```bash
command "arg1" "arg2"
```

If the first word of a command is a reserved word, bash handles the command, otherwise, it searches for an executable on the system's `$PATH`, a list of directories where a binary could be located.

#### Reserved Words

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|`if`|`then`|`elif`|`else`|`fi`|`time`|
|`for`|`in`|`until`|`while`|`do`|`done`|
|`case`|`esac`|`coproc`|`select`|`function`|
|`{`|`}`|`[[`|`]]`|`!`|

### List of Commands

- `command1 ; command2` Execute command2 after command1, sequentially.
- `command1 &` Execute command1 asynchronously in a subshell.
- `command1 && command2` *AND*: Only execute command2 if command1 returns 0 (success).
- `command1 || command2` *OR*: Only execute command2 if command1 returns a non-zero exit value (failure).

### Loops

#### `until`

```bash
until test-commands; do 
	...
done
```

Execute the code in `...` for as long as `test-commands` return non-zero.

#### `while`

```bash
while test-commands; do 
	...
done
```

Execute `...` for as long as `test-commands` return 0.

#### `for`

Expand `words` and execute `...` for each member in the resultant list, with `name` bound to the current member.

##### Iterate through List

```bash
for item in list; do
	echo $item
done
```

##### C-like Loop

```bash
for (( i=1; i<=10; i++ )); do  
 echo "Loop number:" $i  
done
```

##### Infinite Loop

```bash
for (( ; ; )); do
 echo "Press Ctrl+C to stop..."
done
```

### Conditional Constructs

#### `if`

```bash
if test-commands; then
  ...
elif more-test-commands; then
  ...
else
	...
fi
```

Execute the first `...` if `test-commands` returns 0, and evaluate the next condition otherwise. This process repeats until `else` is found, or one of the `tests` evaluates to a 0.  
Once any `...` executes, the remaining `if` construct is skipped.

#### `case`

```bash
case word in
  p1 | p2 | p3) ... ;;
  p4 | p5 )
	  ... 
	;;
  *) ... ;;
esac
```

Execute the `...` corresponding to the first pattern (`pX`) that matches the `word`.  
The `|` operator separates multiple patterns, and each clause can end with `;;`, `;&` or `;;&`. It's common to use `*` as the default case, since the pattern will always match.

Using `;&` instead of `;;` would cause the next `...` to be executed as well, and `;;&` would test the next clause, instead of immediately exiting.

#### `select`

```bash
PS3="Enter a number: "

select option in entry1 entry2 entry3 entry4 entry5
do
    echo "Selected character: $option"
    echo "Selected number: $REPLY"
done
```

The `select` command generates a menu, displaying each `entryX` in a list. The user is then prompted to select an option (in this case, a number from 1-5), and the resultant `$option` and `$REPLY` are then provided as variables.

Output:

```
1) entry1
2) entry2
3) entry3
4) entry4
5) entry5
Enter a number:
```

#### `((...))`

The arithmetic expression is evaluated according to the rules described below (see [Shell Arithmetic]() TODO link to shell arithmetic).

#### `[...](...)`

Return a status of 0 or 1 depending on the evaluation of the conditional expression expression. Expressions are composed of the primaries described below in [Bash Conditional Expressions](https://www.gnu.org/software/bash/manual/bash.html#Bash-Conditional-Expressions).

#### Combine Expressions

- `( expression )` Returns the value of expression. (Can be used to override precedence).
- `! expression` *NOT* an expression. (`true` if expression is `false`).
- `exp1 && exp2` *AND* - `true` if both expressions are `true`.
- `exp1 || exp2` *OR* - `true` if either expressions are `true`.

#### Grouping Commands

Bash allows for commands to be grouped as a single unit. That way, if the group is redirected, the output of every command in the list is passed to a single stream.

- `( list )` Create a subshell (variables created inside it can't be accessed outside).
- `{ list; }` No subshell is created.

### Functions

```bash
fname() {
	...
}

function fname {
	...
}
```

A function can store a block of code (compound command), so it can be reused by calling its name:

```bash
fname
```

Any variables defined inside the function 

#### Arguments

```bash
fname() {
	echo $1 $2
}

fname "a" "b"
```

#### Scope

```bash
var1='A'
var2='B'

fname () {
  local var1='C'
  var2='D'
  echo "var1: $var1, var2: $var2" # C, D
}

echo "$var1, var2: $var2"       # A, B
fname                           # C, D
echo "var1: $var1, var2: $var2" # A, D
```

Defining a variable inside the function overwrites the global scope. To prevent this, use the `local` keyword.

#### `return`

```bash
fname() {
	return 1;
}

fname
echo $? # 1
```

Use the `return` command to exit the function and return a value.

### Variables (Parameters)

```bash
name="Trude"
echo $name # Trude

name+=" EH"
echo $name # Trude EH
echo ${name}
```

Variables can be of any type, and grow to any needed size.

#### Special Variables

- `$*` Expands to every positional parameter: `$1$2$3`.
- `$@` Expands to every positional parameter, separated by spaces: `"$1" "$2" "$3"`.
- `$#` Number of positional arguments.
- `$?` Exit status of last command / pipeline.
- `$-` Current option flags set by `set`, or by the shell itself.
- `$$` Process ID of the shell. In a subshell, it expands to the process ID of the parent shell.
- `$!` Process ID of the latest job placed into the background.
- `$0` Name of the shell or script.

### Shell Expansions

#### Brace Expansion

```bash
echo a{d,c,b}e # ade ace abe
```

#### Tilde Expansion

- `~` = `$HOME`
- `~+` = `$PWD`
- `~-` = `$OLDPWD`

#### Shell Parameter Expansion

### Builtins ---------------------

Bash doesn't come with any programs such as `cat`, `grep` and `ls` by default, for example. Those 
