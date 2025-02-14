---
tags:
  - notes
  - programming
  - web
author: TrudeEH
draft: false
showToc: true
title: Flask
---
Flask is a web framework for Python. It facilitates the creation of web apps (dynamic web pages).

## Run Flask

Flask comes with its own server for debugging purposes, which can be started with:

```Bash
flask run
```

## Folder Structure

```Bash
app.py               # main code
requirements.txt     # required libraries
static/              # files that never change
templates/           # dynamic files
```

## "Hello, name" — Example App

**templates/index.html**

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name = "viewport" content="initial-scale=1, width=device-width">
		<title>Hello</title>
	</head>
	<body>
		hello, {{ name_placeholder }} <!-- Jinja template -->
	</body>
</html>
```

**app.py**  
`http://website.domain/?name=Trude`

```Python
from flask import Flask, render_template, request
app = Flask(__name__)
# When user visits / (the website root), load index.html.
# If the key name exists, store the value in a variable. If not, store world.
@app.route("/")
def index():
	name = request.args.get("name", "world")
	return render_template("index.html", name_placeholder=name)
```

## HTML Form

### Sample App

**templates/index.html**

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name = "viewport" content="initial-scale=1, width=device-width">
		<title>Hello</title>
	</head>
	<body>
		<form>
			<input autocomplete="off" autofocus name="name" placeholder="Name" type="text">
			<button type="submit">Greet</button>
		</form>
	</body>
</html>
```

**app.py**  
`http://website.domain/?name=Trude`

```Python
from flask import Flask, render_template, request
app = Flask(__name__)
# When user visits / (the website root), load index.html.
# If the key name exists, store the value in a variable. If not, store world.
@app.route("/")
def index():
	name = request.args.get("name", "world")
	return render_template("index.html", name_placeholder=name)
```

### Custom Route

Both the form and /greet works.  
**templates/index.html**

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name = "viewport" content="initial-scale=1, width=device-width">
		<title>Hello</title>
	</head>
	<body>
		<form action="/greet" method="get">
			<input autocomplete="off" autofocus name="name" placeholder="Name" type="text">
			<button type="submit">Greet</button>
		</form>
	</body>
</html>
```

**templates/greet.html**

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name = "viewport" content="initial-scale=1, width=device-width">
		<title>Hello</title>
	</head>
	<body>
		hello,{{name}}
	</body>
</html>
```

**app.py**  
`http://website.domain/?name=Trude`

```Python
from flask import Flask, render_template, request
app = Flask(__name__)
# When user visits / (the website root), load index.html.
# If the key name exists, store the value in a variable. If not, store world.
@app.route("/")
def index():
	name = request.args.get("name", "world")
	return render_template("index.html", name_placeholder=name)
@app.route("/greet")
def greet():
	return render_template("greet.html", name=request.args.get("name", "world"))
```

### Avoid HTML Repetition

Use a layout instead of copying blocks.  
**templates/index.html**

```HTML
{% extends "layout.html" %}
{% block body %}
		<form action="/greet" method="get">
			<input autocomplete="off" autofocus name="name" placeholder="Name" type="text">
			<button type="submit">Greet</button>
		</form>
{% endblock %}
```

**templates/greet.html**

```HTML
{% extends "layout.html" %}
{% block body %}
		hello, {{name}}
{% endblock %}
```

**templates/layout.html**

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name = "viewport" content="initial-scale=1, width=device-width">
		<title>Hello</title>
	</head>
	<body>
		{% block body %}{% endblock %}
	</body>
</html>
```

**app.py**  
`http://website.domain/?name=Trude`

```Python
from flask import Flask, render_template, request
app = Flask(__name__)
# When user visits / (the website root), load index.html.
# If the key name exists, store the value in a variable. If not, store world.
@app.route("/")
def index():
	name = request.args.get("name", "world")
	return render_template("index.html", name_placeholder=name)
@app.route("/greet")
def greet():
	return render_template("greet.html", name=request.args.get("name", "world"))
```

### Hide Sensitive Requests from the URL

Use post instead of get.  
**templates/index.html**

```HTML
{% extends "layout.html" %}
{% block body %}
		<form action="/greet" method="post">
			<input autocomplete="off" autofocus name="name" placeholder="Name" type="text">
			<button type="submit">Greet</button>
		</form>
{% endblock %}
```

**templates/greet.html**

```HTML
{% extends "layout.html" %}
{% block body %}
		hello, {{name}}
{% endblock %}
```

**templates/layout.html**

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name = "viewport" content="initial-scale=1, width=device-width">
		<title>Hello</title>
	</head>
	<body>
		{% block body %}{% endblock %}
	</body>
</html>
```

**app.py**  
`http://website.domain/greet`  
The name doesn't appear in the URL anymore.

```Python
from flask import Flask, render_template, request
app = Flask(__name__)
# When user visits / (the website root), load index.html.
# If the key name exists, store the value in a variable. If not, store world.
@app.route("/")
def index():
	name = request.args.get("name", "world")
	return render_template("index.html", name_placeholder=name)
@app.route("/greet", methods=["POST"])
def greet():
	return render_template("greet.html", name=request.form.get("name", "world"))
```

### Combine Routes to save Resources

GET is always the default.  
POST is used to send information to the server.  
**templates/index.html**

```HTML
{% extends "layout.html" %}
{% block body %}
		<form action="/" method="post">
			<input autocomplete="off" autofocus name="name" placeholder="Name" type="text">
			<button type="submit">Greet</button>
		</form>
{% endblock %}
```

**templates/greet.html**

```HTML
{% extends "layout.html" %}
{% block body %}
		hello, {{name}}
{% endblock %}
```

**templates/layout.html**

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name = "viewport" content="initial-scale=1, width=device-width">
		<title>Hello</title>
	</head>
	<body>
		{% block body %}{% endblock %}
	</body>
</html>
```

**app.py**  
`http://website.domain/`

```Python
from flask import Flask, render_template, request
app = Flask(__name__)
# When user visits / (the website root), load index.html.
# If the key name exists, store the value in a variable. If not, store world.
@app.route("/", methods=["GET, POST"])
def index():
	if request.method == "GET":
		return render_template("index.html")
	elif request.method == "POST":
		return render_template("greet.html", name=request.form.get("name", "world"))
```

## Cookies - Session

Used to store data and to recognize the user.
- Server → Client
    - `Set-Cookie session=value`
- Client → Server
    - `Cookie session`

```Python
from flask import session
# Configure app
app = Flask(__name__)
# Configure session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
# Redirect to login if no cookie exists
@app.route("/")
def index():
	if not session.get("name"):
		return redirect("/login")
	return render_template("index.html")
# EXAMPLES
# session is a dictionary
session["cart"] = []
books = db.execute("SELECT * FROM books WHERE id IN (?)", session["cart"])
```
