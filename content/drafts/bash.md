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
- [ANSI Escape Sequences](c-language.md#ANSI%20Escape%20Sequences) apply when using `""`.

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

#### `[[...]]`

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

- `${var}` Braces are required if the variable is positional and over one digit, or if it is followed by a character that is not part of its name.
- `${!var}` Access the value of `var`, and checks if it is the name of another variable. If so, expands that variable. (Pointer)
- `${var:-word}` If `var` is null or unset, use the `word` value instead.
- `${var:=word}` If `var` is null or unset, set its value to `word`. (Good for default values)
- `${var:?word}` If `var` is null or unset, `word` is written to the standard error, and the shell, if not interactive, exits.
- `${var:+word}` Use the `word` value if `var` is not unset or null. 
- `${var:offset:length}` Offset `var` and return the desired length. (Cut strings)
- `${@:offset:length}` Same as before, but with positional arguments.
- `${!word*}` Access the value of all variables whose names begin with `word`. Use `@` instead of `*` to separate the result to separate words.
- `${!var[*]}` Expand all indices (keys) in an array. (Not values;`@` also works).
- `${#var}` Length of a variable's value.
- `${var#word}` If `word` is found in `var`, return the remaining text *after* it appears for the *first* time. Otherwise, print the entire variable.
- `${var##word}` If `word` is found in `var`, return the remaining text *after* it appears for the *last* time. Otherwise, print the entire variable.
- `${var%word}` If `word` is found in `var`, return the remaining text *before* it appears for the *first* time. Otherwise, print the entire variable.
- `${var%%word}` If `word` is found in `var`, return the remaining text *before* it appears for the *last* time. Otherwise, print the entire variable.
- `${var/pattern/word}` Read `var`'s value, then replace *the first* occurrence of `pattern` with `word`.
- `${var//pattern/word}` Read `var`'s value, then replace *all* occurrences of `pattern` with `word`.
- `${var/#pattern/word}` Replace `pattern` with `word`, only if `pattern` is at the *beginning* of `var`.
- `${var/%pattern/word}` Replace `pattern` with `word`, only if `pattern` is at the *end* of `var`.
- `${var^word}` Convert the *first* character that matches `word` to *uppercase*.
- `${var^^word}` Convert *all* characters that match `word` to *uppercase*.
- `${var,word}` Convert the *first* character that matches `word` to *lowercase*.
- `${var,,word}` Convert *all* characters that match `word` to *lowercase*.
- `${var@X}` Replace `X` with one of the following operators:
	- `U` Uppercase.
	- `u` Uppercase first character.
	- `L` Lowercase.
	- `Q` Quote in a format that can be reused as input.
	- `E` Expand escape sequences.
	- `P` Expand the value as if it was a prompt string.
	- `A` Generate the variable declaration command for `var`.
	- `K` Output key-value pairs, suitable for generating the source array.
	- `a` Output the flags corresponding to `var`'s attributes.
	- `k` Same as `K`, but separates keys and values using spaces, making it easier to loop through them.

#### Command Substitution

```bash
echo "$(command)"
echo "`command`"
```

Execute a command and substitute itself with the command's result.

#### Arithmetic Expansion

```bash
echo "$(( expression ))"
```

Performs an arithmetic expression and substitutes itself with the result.

#### Process Substitution

```bash
cat <(command) >(command)

cat <(cat /etc/hostname) >(gzip > output.gz)
```

The `<()` substitution executes the command asynchronously, stores the result in a temporary file (in `/tmp/`), and substitutes itself with the temporary file's path.

The `>()` substitution is also executed asynchronously, and creates a temporary file with the command's output, then passes it to the next program's input.

> Neither `cat` nor `gzip` are `bash` commands ('builtins'), but external programs.

#### Pattern Matching

- `*` Matches any string.
- `?` Matches any single character.
- `[...]` Matches any of the enclosed characters, and supports ranges. (`[a-z]`)
- `?(pattern-list)` Matches zero or one of the given patterns.
- `*(pattern-list)` Matches zero or more occurrences of the given patterns.
- `+(pattern-list)` Matches one or more occurrences of the given patterns.
- `@(pattern-list)` Matches one of the given patterns.
- `!(pattern-list)` Matches anything except the given patterns.

### Redirections

- `command > dest` Redirect the output of a command to a destination: A file, device, command, list, etc.
- `command >> dest` Append to the destination instead of overwriting.
- `command < file` Provide a file as input.
- `command 2> dest` Redirect the error output of a command.
- `command &> dest` or `command >& dest` Redirect both input and output.
- `command 2>&1` Redirect Standard Error to Standard Output.
- `command > /dev/null` Discard the output.

It is also possible to provide strings as input directly:

```bash
cat <<< "String!"

cat << EOF
Multi-line
string
EOF
```

### Shell Builtin Commands

This section is an introduction to every command available in `bash`.  
To learn more about some command, run `help command`.

#### Bourne Shell Commands

- `: arguments` Do nothing beyond expanding arguments and performing redirections.
- `. file` Read and execute commands from `file`.
- `break` Exit from a loop. (Adding a number as an argument selects which enclosing loop to exit from.)
- `cd directory` Change the current directory to `directory`. If `directory` is...
	- ` ` -> `$HOME`
	- `..` -> Parent directory
	- `-` -> `$OLDPWD`
- `continue` Skip to the next iteration of a loop. (Also supports loop number as an argument.)
- `eval arguments` Arguments are concatenated together and executed as a single command.
- `exec command` Replaces the shell without creating a new process, and executes the command.
- `exit` Exit the shell. (Optionally, add a return status.)
- `export name` Make a variable available to child processes. `export` can also handle functions and assignment.
- `getopts "optstring" var` Parse positional parameters (script arguments).
- `hash` List the full paths to executables cached by the shell (to accelerate future queries)
- `pwd` Print the full pathname of the current directory.
- `return value` Exit a function and return `value`. If no value is provided, returns the last exit status of the last command executed in the function.
- `shift value` Shift the positional parameters to the left by `value`. If no value is provided, shift by 1.
- `test` or `[]` Evaluate a condition and return 0 if `true`, or 1 if `false`:
- `times` Print the user and system times used by the shell and its children.
- `trap "command" signal` Execute a command, if one of the following signals are received: (The `SIG` prefix is optional)
	- `SIGINT` Interrupt signal (usually generated by pressing Ctrl+C).
	- `SIGTERM` Termination signal (Request to terminate).
	- `SIGKILL` Kill signal (Forceful termination; Cannot be trapped).
	- `SIGQUIT` Quit signal.
	- `SIGUSR1` and `SIGUSR2` User-defined signals.
	- `SIGCHLD` Child process terminated.
	- `0` or `EXIT` Executes when the shell exits.
	- `DEBUG` Executes before every simple command.
	- `RETURN` Executes each time a shell function or a script executed with the `.` or `source` builtins finishes executing.
	- `ERR` Executes whenever any pipeline, list, or command returns a non-zero exit status.
- `umask` Defines which permissions should be removed from newly created files.
- `unset` Remove a variable or function name. (Use `-f` to remove the actual function definition)

#### Bash Commands

- `alias` Prints the list of aliases or defines new ones (with `alias name=value`).
- `bind` Displays or sets key and function bindings for Readline.
- `builtin` Executes a shell builtin command, bypassing any function with the same name.
- `caller` Returns context information of the current active subroutine call.
- `command` Executes a command, ignoring any shell function with the same name. (If the `-v` option is supplied, prints a description of `command`.)
- `declare` Declares variables with various attributes (typeset is a synonym).
- `echo` Outputs its arguments to the standard output.
- `enable` Enables or disables shell builtin commands.
- `help` Provides helpful information about shell builtins.
- `let` Evaluates arithmetic expressions.
- `local` Creates a variable with a scope local to the function.
- `logout` Exits a login shell with an optional exit status.
- `mapfile` Reads lines from input into an indexed array (readarray is a synonym).
- `printf` Prints formatted output to the standard output.
- `read` Reads a line of input and splits it into words based on IFS.
- `readarray` Reads lines from input into an indexed array (synonym for mapfile).
- `set` Set or unset values of shell options and positional parameters
- `shopt` Change additional shell optional behavior.
- `source` Executes commands from a file in the current shell environment.
- `type` Describes how the shell interprets a given command name.
- `ulimit` Controls resource limits for processes created by the shell.
- `unalias` Removes defined aliases, with an option to remove all.

### Shell Variables

#### Bourne Shell Variables

- `CDPATH` Search path directories for the `cd` command.
- `HOME` Current user's home directory, default for `cd`.
- `IFS` Characters used to separate fields during word splitting.
- `MAIL` File/directory Bash checks for mail if `MAILPATH` is unset.
- `MAILPATH` Colon-separated list of files/directories to check for mail.
- `OPTARG` Value of the last option argument processed by `getopts`.
- `OPTIND` Index of the last option argument processed by `getopts`.
- `PATH` Colon-separated list of directories searched for commands.
- `PS1` Primary prompt string displayed interactively.
- `PS2` Secondary prompt string for continued commands.

#### Bash Variables

- `_` Pathname of invoked shell/script, or last argument of previous command.
- `BASH` Full pathname used to execute the current Bash instance.
- `BASHOPTS` Colon-separated list of enabled shell options (via `shopt`).
- `BASHPID` Process ID of the current Bash process (can differ from `$$`).
- `BASH_ALIASES` Associative array mapping alias names to values.
- `BASH_ARGC` Array of parameter counts for each function/script in the call stack (requires `extdebug`).
- `BASH_ARGV` Array of all parameters in the current call stack (requires `extdebug`).
- `BASH_ARGV0` Name of the shell or script (`$0`); assigning to it also sets `$0`.
- `BASH_CMDS` Associative array mapping hashed commands to their full paths.
- `BASH_COMMAND` Command currently being executed or about to be executed.
- `BASH_COMPAT` Sets the shell's compatibility level (e.g., 4.2 or 42).
- `BASH_ENV` Path to a script read before executing a non-interactive script.
- `BASH_EXECUTION_STRING` Command argument passed via the `-c` invocation option.
- `BASH_LINENO` Array of line numbers where functions in `FUNCNAME` were invoked.
- `BASH_LOADABLES_PATH` Search path for dynamically loadable builtins (`enable -f`).
- `BASH_REMATCH` Array holding results from regex matching (`=~`) in `[[...]]`.
- `BASH_SOURCE` Array of source filenames where functions in `FUNCNAME` are defined.
- `BASH_SUBSHELL` Incremented for each subshell level; initial value is 0.
- `BASH_VERSINFO` Readonly array detailing the Bash version components.
- `BASH_VERSION` String containing the full version number of Bash.
- `BASH_XTRACEFD` File descriptor where trace output (`set -x`) is sent.
- `CHILD_MAX` Maximum number of exited child statuses the shell remembers.
- `COLUMNS` Terminal width, used by `select` and set on `SIGWINCH` if `checkwinsize` is on.
- `COMP_CWORD` Index in `COMP_WORDS` array of the word containing the cursor.
- `COMP_LINE` The current command line being completed.
- `COMP_POINT` Index of the cursor position within the current command line (`COMP_LINE`).
- `COMP_TYPE` Integer indicating the type of completion being attempted (TAB, ?, !, @, %).
- `COMP_KEY` The key (or sequence) that invoked the completion function.
- `COMP_WORDBREAKS` Characters Readline uses to delimit words for completion.
- `COMP_WORDS` Array of individual words in the current command line for completion.
- `COMPREPLY` Array where completion functions place possible matches.
- `COPROC` Array holding file descriptors for an unnamed coprocess.
- `DIRSTACK` Array containing the current directory stack (`dirs`).
- `EMACS` If set to `t` at startup, indicates running in Emacs, possibly disabling line editing.
- `ENV` Script executed when an interactive shell starts in POSIX mode.
- `EPOCHREALTIME` Seconds since the Unix Epoch, with microsecond precision (float).
- `EPOCHSECONDS` Seconds since the Unix Epoch (integer).
- `EUID` Numeric effective user ID of the current user (readonly).
- `EXECIGNORE` Patterns of filenames to ignore during `PATH` command lookup.
- `FCEDIT` Default editor used by `fc -e`.
- `FIGNORE` Suffixes to ignore during filename completion.
- `FUNCNAME` Array of function names currently on the execution call stack.
- `FUNCNEST` Maximum function nesting level; exceeding it aborts the command.
- `GLOBIGNORE` Patterns of filenames to ignore during pathname expansion (globbing).
- `GROUPS` Array containing the group IDs the current user belongs to.
- `histchars` Characters controlling history expansion (`!`), quick substitution (`^`), and comments (`#`).
- `HISTCMD` History number (index) of the current command in the history list.
- `HISTCONTROL` Controls how commands are saved (ignorespace, ignoredups, ignoreboth, erasedups).
- `HISTFILE` File where command history is saved (default `~/.bash_history`).
- `HISTFILESIZE` Maximum number of lines stored in the history file.
- `HISTIGNORE` Patterns matching command lines that should not be saved in history.
- `HISTSIZE` Maximum number of commands remembered in the current shell's history list.
- `HISTTIMEFORMAT` `strftime` format for displaying timestamps with history entries.
- `HOSTFILE` File (like `/etc/hosts`) used for hostname completion.
- `HOSTNAME` Name of the current host.
- `HOSTTYPE` String describing the system architecture (e.g., `x86_64-linux-gnu`).
- `IGNOREEOF` Number of consecutive EOF characters (Ctrl+D) needed to exit an interactive shell.
- `INPUTRC` Readline initialization file (overrides `~/.inputrc`).
- `INSIDE_EMACS` Similar to `EMACS`, indicates running within an Emacs shell buffer.
- `LANG` Default locale category setting.
- `LC_ALL` Overrides `LANG` and all other `LC_` locale settings.
- `LC_COLLATE` Locale for string sorting and pattern matching ranges/classes.
- `LC_CTYPE` Locale for character interpretation and classification in patterns.
- `LC_MESSAGES` Locale for translating double-quoted strings starting with `$`.
- `LC_NUMERIC` Locale category for number formatting.
- `LC_TIME` Locale category for date and time formatting.
- `LINENO` Current line number within the script or function being executed.
- `LINES` Terminal height, used by `select` and set on `SIGWINCH` if `checkwinsize` is on.
- `MACHTYPE` System type string in `cpu-company-system` format (similar to `HOSTTYPE`).
- `MAILCHECK` How often (seconds) Bash checks for mail (default 60).
- `MAPFILE` Default array variable used by `mapfile` if no name is given.
- `OLDPWD` Previous working directory, set by `cd`.
- `OPTERR` If set to 1, `getopts` displays error messages.
- `OSTYPE` String describing the operating system (e.g., `linux-gnu`).
- `PIPESTATUS` Array containing exit statuses of commands in the last foreground pipeline.
- `POSIXLY_CORRECT` Enables POSIX mode if set at startup or during execution.
- `PPID` Process ID of the shell's parent process (readonly).
- `PROMPT_COMMAND` Command(s) executed just before displaying the primary prompt (`PS1`).
- `PROMPT_DIRTRIM` Number of trailing directory components shown in `\w` and `\W` prompts.
- `PS0` Prompt string displayed after reading a command but before executing it (interactive shells).
- `PS3` Prompt string used by the `select` command.
- `PS4` Prompt string prefixed to commands echoed during execution tracing (`set -x`).
- `PWD` Current working directory, set by `cd`.
- `RANDOM` Returns a random integer between 0 and 32767; assigning seeds the generator.
- `READLINE_ARGUMENT` Numeric argument passed to a Readline command bound via `bind -x`.
- `READLINE_LINE` Contents of the Readline line buffer (for `bind -x`).
- `READLINE_MARK` Position of the mark (saved point) in the Readline buffer (for `bind -x`).
- `READLINE_POINT` Position of the insertion point in the Readline buffer (for `bind -x`).
- `REPLY` Default variable used by `read` if no name is given.
- `SECONDS` Number of seconds since the shell was started; assigning resets the counter.
- `SHELL` Full pathname to the current user's login shell.
- `SHLVL` Shell nesting level, incremented for each new Bash instance started.
- `SRANDOM` Returns a 32-bit pseudo-random number (cannot be seeded).
- `TIMEFORMAT` Format string controlling output of the `time` keyword.
- `TMOUT` Default timeout (seconds) for `read` and `select`; idle timeout for interactive shells.
- `TMPDIR` Directory used for creating temporary files.
- `UID` Numeric real user ID of the current user (readonly).

### Parse Arguments

```bash
while getopts "ab:c" opt; do
  case "$opt" in
    a)
      echo "Option -a was specified"
      ;;
    b)
      value="$OPTARG"
      echo "Option -b was specified with value: $value"
      ;;
    c)
      echo "Option -c was specified"
      ;;
    \?)
      echo "Invalid option: -$OPTIND" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTIND requires an argument." >&2
      exit 1
      ;;
  esac
done

shift $((OPTIND - 1))

echo "Remaining arguments: $@"
```

> To enable silent error reporting, add `:` at the beginning of the `getopts`' `optstring`.

## Bash Startup Files

6.2 Bash Startup Files https://www.gnu.org/software/bash/manual/bash.html#What-is-Bash_003f
