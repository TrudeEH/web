---
Status: Planned
Created by: Trude EH
tags:
  - notes
  - programming
author: TrudeEH
draft: true
searchHidden: false
showToc: true
title: Lua
---
Embedded language.
  #todo 

## Comments

```Lua
-- One-Line comment
--[[ Multi-line
      comment
--]]
```

## Simple Literals

```Lua
local number = 5
local string = "hello, world"
local single = 'same as using \"'
local multiline = [[ Multi
line
string ]]
local yes, no = true, false
local nothing = nil
```

## Functions

Functions can be stored as values.

```Lua
local function hello(name)
	print("Hello", name)
end
local greet = function(name)
	-- .. is string concaternation
	print("Hello " .. name .. "!")
end
-- Calling a function
greet("Trude")
greet "Trude"
```

Functions can also return other functions.

```Lua
local high = function(value)
	return function(value2)
		return value + value2
	end
end
local add_one = high(1)
print("1 + 2 -> ", add_one(2))
```

Functions can return multiple values.

```Lua
local return_four_values = function()
	return 1, 2, 3, 4
end
first, second, third = return_four_values() -- "4" was discarded.
```

Variable arguments.

```Lua
local variable_arguments = function( ... )
	local arguments = { ... }
	for i, v in ipairs({ ... }) do print(i, v) end
end
print(variable_arguments("this", "is", "a", "test"))
```

## Tables

Lua's only data structure. (Also used for maps and lists)

### As lists…

```Lua
local list = { "first", 2, false, function() print("Fourth") end }
print("Lua is 1-indexed:", list[1])
```

### As maps…

```Lua
local t = {
	literal_key = "a string",
	["an expression"] = "also works",
	[function() end] = true
}
print("literal_key     : ", t.literal_key)
print("an expression   : ", t["an expression"]
print("function() end  : ", t[function() end]) -- nothing will be printed here, because each function definition points to a different memory address.
```

### Colon Functions

```Lua
local T = {}
function T.something(self, ... ) end
function T:something( ... ) end -- Same as the previous line
```

### Metatables

```Lua
local vector_mt = {}
vector_mt.__add = function(left, right)
	return setmetatable({
		left[1] + right[1],
		left[2] + right[2],
		left[3] + right[3]
	}, vector_mt)
end
local v1 = setmetatable({ 3, 1, 5 }, vector_mt)
local v2 = setmetatable({ -3, 2, 2}, vector_mt)
local v3 = v1 + v2 -- normally would produce an error, but doesn't, since the __add keyword was used.
print(v3[1], v3[2], v3[3])
```

## Control Flow

### For

#### Lists

```Lua
local favs = { "ThePrimeagen", "ctt", "NoBoilerplate" }
for index = 1, \#favs do -- # is the length operator (does not work on maps!)
	print(index, favs[index])
end
for index, value in ipairs(favs) do -- ipairs return the index and values of that index
	print(index, value)
end
```

#### Maps

```Lua
local favs = { ThePrimeagen = 9.5, NoBoilerplate = "N/A" }
for key, value in pairs(favs) do -- pairs return the index and values of that key
	print(key, value)
end
```

### If

```Lua
local function action(visit_page)
	if visit_page then
		print("Opening new tab...")
	else
		print("Skipping...")
	end
end
-- "falsey": nil, false
action() -- Same as: action(nil)
action(false)
-- Everything else is "truthy"
action(true)
action(0)
action({})
```

## Modules

Modules are just files.

```Lua
-- module.lua
local M = {}
M.some_function = function() end
return M
-- main.lua
local something = require("module")
something.some_function()
```
