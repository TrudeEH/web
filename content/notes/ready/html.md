---
title: HTML
description: 
date: 2025-02-17T09:11:23+00:00
draft: false
tags:
  - web
author: TrudeEH
showToc: true
---


*HTML* is a markup language: The foundation of every website, as it structures content and provides information such as text, images and other media to the browser.

## Hello World

HTML is not a programming language, only formatting to write a document as. The following 'code' is valid HTML.

```HTML
Hello, world.
```

A more complete solution, however, would be to define a structure for the document.

```HTML
 <!DOCTYPE html>
 <html lang="en">
  <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta http-equiv="X-UA-Compatible" content="ie=edge" />
   <title>Document</title>
  </head>
  <body>
   <p>Hello, world.</p>
  </body>
 </html>
```

HTML uses tags to define a hierarchy. The `<head>` tag defines metadata for the site, such as the page's title, encoding types, and any external resources. The `<body>` tag is the content itself: any paragraphs (`<p>`), images, forms and scripts, to name a few.

> When reading HTML, the browser applies a set of default styles to make it more readable. HTML is **not** the place to style content, however. For example, a common mistake is to use headings based on their size or font weight, instead of their meaning. Everything can all be styled using CSS later, so try to ignore the design when writing HTML, and focus on the content instead.  
> Not all tags hold content, but for those that do, the end of that content is defined with a closing tag: `</tagname>`.

## Basic Tags

|Tag|Description|
|---|---|
|`<!DOCTYPE>`|Document type.|
|`<html>`|Defines an HTML document.|
|`<head>`|Contains metadata/information for the page.|
|`<title>`|Title for the page.|
|`<body>`|Defines the document's body.|
|`<h1> to <h6>`|Defines HTML headings (titles). `<h1>` is the page's title, `<h2>` is the subtitle, and so on.|
|`<p>`|Paragraph.|
|`<br>`|Inserts a single line break.|
|`<hr>`|Defines a thematic change in the content.|
|`<!--...-->`|Comment.|

## Formatting

|Tag|Description|
|---|---|
|`<abbr>`|Abbreviation or acronym.|
|`<address>`|Contact information for the author/owner of a document/article.|
|`<b>`|Bold text.|
|`<bdi>`|Isolates a part of text that might be formatted in a different direction from other text outside it.|
|`<bdo>`|Overrides the current text direction.|
|`<blockquote>`|Defines a section that is quoted from another source.|
|`<cite>`|Defines the title of a work.|
|`<code>`|Block of code.|
|`<del>`|Defines text that has been deleted from a document.|
|`<dfn>`|Specifies a term that is going to be defined within the content.|
|`<em>`|Emphasized text.|
|`<i>`|Defines a part of text in an alternate voice or mood.|
|`<ins>`|Defines a text that has been inserted into a document.|
|`<kbd>`|Keyboard input.|
|`<mark>`|Marked/highlighted text.|
|`<meter>`|Defines a scalar measurement within a known range (a gauge).|
|`<pre>`|Preformatted text.|
|`<progress>`|Represents the progress of a task.|
|`<q>`|Short quotation.|
|`<rp>`|Defines what to show in browsers that do not support ruby annotations.|
|`<rt>`|Defines an explanation/pronunciation of characters (for East Asian typography).|
|`<ruby>`|Defines a ruby annotation (for East Asian typography).|
|`<s>`|Defines text that is no longer correct.|
|`<samp>`|Defines sample output from a computer program.|
|`<small>`|Smaller text.|
|`<strong>`|Important text.|
|`<sub>`|Subscripted text: `2₂`.|
|`<sup>`|Superscripted text: `2²`.|
|`<template>`|Defines a container for content that should be hidden when the page loads.|
|`<time>`|Defines a specific time (or datetime).|
|`<u>`|Defines some text that is unarticulated and styled differently from normal text.|
|`<var>`|Variable.|
|`<wbr>`|Defines a possible line-break.|

## Forms and Input

|Tag|Description|
|---|---|
|`<form>`|Defines an HTML form for user input.|
|`<input>`|Defines an input control.|
|`<textarea>`|Defines a multiline input control (text area).|
|`<button>`|Clickable button.|
|`<select>`|Drop-down list.|
|`<optgroup>`|Defines a group of related options in a drop-down list.|
|`<option>`|Defines an option in a drop-down list.|
|`<label>`|Defines a label for an `<input>` element.|
|`<fieldset>`|Groups related elements in a form.|
|`<legend>`|Defines a caption for a `<fieldset>` element.|
|`<datalist>`|List of pre-defined options for input controls.|
|`<output>`|Defines the result of a calculation.|

## Media

|Tag|Description|
|---|---|
|`<img>`|Image.|
|`<map>`|Defines a client-side image map.|
|`<area>`|Defines an area inside an image map.|
|`<canvas>`|Used to draw graphics in real time, via scripting (usually JavaScript).|
|`<figcaption>`|Defines a caption for a `<figure>` element.|
|`<figure>`|Specifies self-contained content.|
|`<picture>`|Defines a container for multiple image resources.|
|`<svg>`|Defines a container for SVG graphics.|
|`<audio>`|Sound content.|
|`<source>`|Defines multiple media resources for media elements (`<video>`, `<audio>` and `<picture>`).|
|`<track>`|Defines text tracks for media elements (`<video>` and `<audio>`).|
|`<video>`|Video or movie.|

## Links

|Tag|Description|
|---|---|
|`<iframe>`|Defines an inline frame.|
|`<a>`|Defines a hyperlink.|
|`<link>`|Defines the relationship between a document and an external resource (most used to link to style sheets).|
|`<nav>`|Navigation links.|

## Lists

|Tag|Description|
|---|---|
|`<menu>`|Alternative unordered list.|
|`<ul>`|Unordered list.|
|`<ol>`|Ordered list.|
|`<li>`|Defines a list item.|
|`<dl>`|Description list|
|`<dt>`|Defines a term/name in a description list.|
|`<dd>`|Defines a description of a term/name in a description list.|

## Tables

|Tag|Description|
|---|---|
|`<table>`|Table.|
|`<caption>`|Defines a table caption.|
|`<th>`|Defines a header cell in a table.|
|`<tr>`|Defines a row in a table.|
|`<td>`|Defines a cell in a table.|
|`<thead>`|Groups the header content in a table.|
|`<tbody>`|Groups the body content in a table.|
|`<tfoot>`|Groups the footer content in a table.|
|`<col>`|Specifies column properties for each column within a `<colgroup>` element.|
|`<colgroup>`|Specifies a group of one or more columns in a table for formatting.|

## Styles and Semantics

|Tag|Description|
|---|---|
|`<style>`|Defines style information for a document.|
|`<div>`|Defines a section in a document.|
|`<span>`|Defines a section in a document.|
|`<header>`|Defines a header for a document or section.|
|`<hgroup>`|Defines a header and related content.|
|`<footer>`|Defines a footer for a document or section.|
|`<main>`|Specifies the main content of a document.|
|`<section>`|Defines a section in a document.|
|`<search>`|Search section.|
|`<article>`|Article.|
|`<aside>`|Defines content aside from the page content.|
|`<details>`|Defines additional details that the user can view or hide.|
|`<dialog>`|Dialog box or window.|
|`<summary>`|Defines a visible heading for the `<details>` element.|
|`<data>`|Adds a machine-readable translation of a given content.|

## Meta

|Tag|Description|
|---|---|
|`<head>`|Contains information for the browser.|
|`<meta>`|Contains metadata for the webpage.|
|`<base>`|Specifies the base URL/target for all relative URLs in a document.|

## Programming

|Tag|Description|
|---|---|
|`<script>`|Client-side script.|
|`<noscript>`|Defines an alternate content for users that do not support client-side scripts.|
|`<object>`|Container for an external resource.|
|`<param>`|Defines a parameter for an object.|
