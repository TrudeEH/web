---
title: Databases [SQL]
description: 
date: 2025-02-17T08:27:35+00:00
draft: false
tags:
  - programming
  - web
author: TrudeEH
showToc: true
---

## Flat-File Databases

A "table" written into a single file. The most common file type for this purpose is `CSV`.  
The `CSV` format reads each line as a row, and each comma-separated value as a column.  
The first row on a `CSV` file is used to describe the data in each column. If a `,` is present on the dataset, surround that entry with `"` to 'escape' it.  
These files can be read and written to using languages like [[c-language]] and [[python]].

## Relational Databases

Instead of using a single table, a relational database can store data in multiple tables, and then define relationships between them.  
Each table must have one column with an unique key that identifies each row.  
![[image94.png]]

### Relationships

#### One-to-one Relationship

In this example, `id` in `shows` corresponds to the `show_id` in the `ratings` table.

#### One-to-many Relationship

`shows` has a one-to-many relationship with `genres`, because a single show entry can have many genders.

#### Many-to-many Relationship

Both the `people` and `writers` table have a field shared with `stars`.

## SQL

`SQL` is a language designed specifically for interfacing with relational databases.  
To use `SQL`, a database is needed, so, for this example, I will use `sqlite3`.

### Create a Database

```Shell
sqlite3 name.db # Create a db file and initialize it.
```

### `sqlite3` Commands

#### Import a `CSV` Table

```SQL
.mode csv
.import name.csv table_name
```

#### General Commands

```SQL
.schema  -- Print all tables and fields (using the commands used for creation)
.schema table -- Show the command used for creating a table
.exit
```

### Base Syntax

```SQL
CREATE TABLE table (column type, ...);              -- Create a new table
SELECT columns FROM table;                          -- Output/Print data
INSERT INTO table (column, ...) VALUES(value, ...); -- Add data
UPDATE table SET column = value WHERE condition;    -- Update values
DELETE FROM table WHERE condition;                  -- Delete data
```

> In `SQL`, there is **NO WAY** to undo actions. Especially when writing or deleting from the database, do not type `;` unless you know exactly what you are doing!

#### Wildcard

```SQL
SELECT * FROM table; -- Outputs every column in the table (wildcard selector)
```

### Functions

#### Math Functions

- `AVG`
- `COUNT`
- `DISTINCT`
- `LOWER`
- `MAX`
- `MIN`
- `UPPER`
- `LOWER`
- `…`

    ```SQL
    SELECT COUNT(*) FROM table; -- Counts the number of rows in a table
    SELECT DISTINCT column from table; -- Show only the unique values in a column
    SELECT COUNT(DISTINCT column) FROM table; -- Count the unique values in a column
    ```

#### Logic Functions

- `GROUP BY`
- `LIKE`
- `LIMIT`
- `ORDER BY`
- `WHERE`
- `…`

```SQL
-- Count every instance of a value in a column
SELECT COUNT(*) FROM table WHERE column = 'string';
-- LIKE is used to select using formatting. '%' selects every character after)
SELECT * FROM favorites WHERE prog_language = 'C' AND problem LIKE "Hello, %"
-- Group all individual rows and display their count
SELECT prog_language, COUNT(*) FROM favorites GROUP BY prog_language;
-- Sort values by their count, ascending.
SELECT prog_language, COUNT(*) FROM favorites GROUP BY prog_language ORDER BY COUNT(*);
-- Sort values by their count, descending.
SELECT prog_language, COUNT(*) FROM favorites GROUP BY prog_language ORDER BY COUNT(*) DESC;
-- Limit the output to a single row (showing the most popular language, in this case)
SELECT prog_language, COUNT(*) FROM favorites GROUP BY prog_language ORDER BY COUNT(*) DESC LIMIT 1;
```

#### Operators

- `AND`
- `OR`

```SQL
-- Using the AND operator to select two values
SELECT * FROM table WHERE column1 = 'a' AND column2 = 'b';
-- AND and OR (' is escaped using '' (' twice))
SELECT * FROM table WHERE prog_language = 'C' AND (problem = 'Hello, World' OR problem = 'Hello, It''s Me');
```

#### Aliases

- `AS`

```SQL
-- The column COUNT(*) will be renamed to 'n'.
SELECT prog_language, COUNT(*) AS n FROM favorites GROUP BY prog_language ORDER BY n DESC;
```

#### Conditions

- `IS`

```SQL
-- Delete all values where timestamp1 is a NULL value.
DELETE FROM favorites WHERE timestamp1 IS NULL;
```

### Data Types

- `BLOB`
- `INTEGER`
- `NUMERIC`
- `REAL`
- `TEXT`
  
- `NULL`
- `NOT NULL`
- `UNIQUE`
  
- `PRIMARY KEY`
- `FOREIGN KEY`

### Relationships

- `IN`
- `JOIN`

#### One-to-one

```SQL
-- 'shows' table
CREATE TABLE shows (
	id INTEGER,
	title TEXT NOT NULL,
	year NUMERIC,
	episodes INTEGER,
	PRIMARY KEY(id)
);
-- Table connected with a one-to-one relationship with the 'shows' table
CREATE TABLE ratings (
	show_id INTEGER NOT NULL,
	rating REAL NOT NULL,
	votes INTEGER NOT NULL,
	FOREIGN KEY(show_id) REFERENCES shows(id)
);
-- Lists 'show_id', but not the actual names of each show.
SELECT show_id FROM ratings WHERE rating >= 6.0 LIMIT 10;
-- Executes the nested query first, then shows the entries selected on 'shows'
SELECT * FROM shows WHERE id IN 
(SELECT show_id FROM ratings WHERE rating >= 6.0)
LIMIT 10;
-- Join both tables
SELECT title, rating FROM shows JOIN
ratings ON shows.id = ratings.show_id WHERE rating >= 6.0 
LIMIT 10;
```

#### One-to-many

- `ON`

```SQL
CREATE TABLE genres (
	show_id INTEGER NOT NULL,
	genre TEXT NOT NULL,
	FOREIGN KEY(show_id) REFERENCES shows(id)
);

-- Search for all genres for a show
SELECT genre FROM genres WHERE show_id = 
(SELECT id FROM shows WHERE title = 'TitleOfShow');
-- Join tables, to show title alongside genres of a show
SELECT title, genre FROM shows JOIN genres ON shows.id = 
genres.show_id WHERE id = 
(SELECT id FROM shows WHERE title = 'TitleOfShow');
```

#### Many-to-many

![[image95.png]]

```SQL
-- Select every person who starred in a show
SELECT name FROM people WHERE id IN
(SELECT person_id FROM stars WHERE show_id = 
(SELECT id FROM shows WHERE title = 'Some Name'));
-- Joined table with the show name and stars
SELECT title FROM shows JOIN people.name WHERE id IN
(SELECT person_id FROM stars WHERE show_id = 
(SELECT id FROM shows WHERE title = 'Some Name'));
-- Another way to join tables
SELECT title FROM shows, stars, people
WHERE shows.id = stars.show_id
AND people.id = stars.person_id
AND name = 'Name';
```

### Indexes

Load an index of the database into RAM to optimize searches.  
The underneath algorithm is a `B-Tree`, which takes up more space in memory and slightly slows write speed on the database.

```SQL
CREATE INDEX name ON table (column, ...);
.timer ON  -- sqlite3 command to show how long operations take to complete
SELECT * FROM shows WHERE title = 'Name'; -- 0.043s
CREATE INDEX title_index ON shows(title); -- Index title on shows
SELECT * FROM shows WHERE title = 'Name'; -- 0.001s
SELECT name FROM people WHERE id IN
(SELECT person_id FROM stars WHERE show_id = 
(SELECT id FROM shows WHERE title = 'Some Name')); -- 0.215s
CREATE INDEX name_index ON people(name);
CREATE INDEX person_index ON stars(person_id);
SELECT name FROM people WHERE id IN
(SELECT person_id FROM stars WHERE show_id = 
(SELECT id FROM shows WHERE title = 'Some Name')); -- 0.001s
```

### Race Conditions

When `SQL` is integrated with languages such as `Python`, for example, or is being accessed by multiple instances, race conditions may arise.  
For example, consider the following code:  

```Python
...
rows = db.execute("SELECT likes FROM posts WHERE id = ?", id);
likes = rows[0]["likes"]
db.execute("UPDATE posts SET likes = ? WHERE id = ?", likes + 1, id);
```

If this code is executed twice at the same time, instead of adding 2 likes to the database, only one will be added, because the program would read the database in the same state, and then add +1 like to that same, previous state.  
`SQL` provides solutions to this in the form of **transactions**:
- `BEGIN TRANSACTION`
- `COMMIT`
- `ROLLBACK`  
On `Python`, a solution could be:

```Python
db.execute("BEGIN TRANSACTION")
rows = db.execute("SELECT likes FROM posts WHERE id = ?", id);
likes = rows[0]["likes"]
db.execute("UPDATE posts SET likes = ? WHERE id = ?", likes + 1, id);
db.execute("COMMIT")
```

Where the database would be "locked" while the program ran.

### `SQL` Injection Attacks

If a program asks for user input, and that input is then passed over to the database, the user could write special `SQL` syntax to break the query.  
For example:  
If a program takes an email address as input, some user could type: `email@example.com'--`, which marks a comment.  
If the query was similar to the following:

```Python
rows = db.execute(f"SELECT * FROM users WHERE email = '{email}' AND password = {psk}")
```

Replacing values…

```Python
rows = db.execute(f"SELEC * FROM users WHERE email = 'email@example.com'--' AND password = 'password123'")
```

Which would result in the user being able to log in without needing a password.  
The solution to this is to use a library which uses placeholders to insert data in queries.

```Python
rows = db.execute("SELECT * FROM users WHERE email = ? AND password = ?", email, psk)
```
