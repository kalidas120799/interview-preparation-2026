# What is HTML?

HTML stands for Hypertext Markup Language. It is the standard markup language used for creating web pages.

# Basic building blocks of HTML?

The basic building blocks of HTML are tags, which are used to structure and define the content of a web page.

# DOCTYPE declaration in HTML?

The DOCTYPE declaration is used to specify the version of HTML

# Difference between HTML elements, tags, and attributes?

- An HTML element is a fundamental building block of a web page
- HTML tags are used to define the beginning and end of an HTML element brackets (< and >)
- HTML attributes provide additional information about an HTML element id, class, src, alt

# Head tag in HTML?

The head tag is used to contain meta-information about the HTML document

# Body tag in HTML?

Is used to define the main content of the HTML document

# Div tag in HTML?

Is commonly used for layout and organization purposes

# Semantic HTML?

Semantic HTML refers to using HTML elements that convey the meaning and structure of your web content

`<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`

# CSS (Cascading Style Sheets)

Is a simply designed language intended to simplify the process of making web pages presentable.

CSS saves time, Easy Maintenance, Search Engines, Offline Browsing

# CSS box-sizing property?

Is used to control how the width and height of an element are calculated

# CSS flexbox layout?

Is a flexible box layout model that allows you to create responsive and flexible layouts

# CSS grid layout?

Is a two-dimensional layout model that allows you to create complex grid-based layouts

# Flex layout vs grid layout

| Flex | Grid |
|---|---|
| designed for single dimension | designed for two dimension |
| creating responsive designs | creating grid-based designs |

# Script tag in HTML?

Is used to embed or reference JavaScript code within an HTML document.

# Inline vs external JavaScript?

| Inline | External |
|---|---|
| directly embedded within the HTML document | is saved in a separate .js file and linked to the HTML document |

# Media queries?

Is allow developers to create stylesheets that adapt to different devices, making websites more accessible and user-friendly across a wide range of devices

- Smartphones `@media only screen and (max-width: 576px)`
- Tablets `@media only screen and (min-width: 576px) and (max-width: 992px)`
- Desktops `@media only screen and (min-width: 992px)`

# DOM Events

The DOM events are actions that can be performed on HTML elements. When an event occurs, it triggers a JavaScript function

- Click => onclick, ondblclick,
- Load => onload, onunload
- Change => onblur, onchange, onfocus, onscroll, onkeypress, onkeyup
- Submit => onsubmit

# addEventListener

The JavaScript addEventListener() method is used to attach an event handler function/events to an HTML element

```js
myDiv.addEventListener(event, function)
```

# Document Object Model

## DOM?

The DOM defines the logical or tree-like structure of the web page or document. In the tree, each branch ends in a node, and each node contains objects

## HTML DOM?

HTML creates the web page's structure, and JavaScript adds interaction to the web page by manipulating the HTML elements.

JavaScript can't interact directly with HTML elements. So, whenever a web page loads in the browser, it creates a DOM.

## DOM methods

Are used to perform a particular action on HTML elements

```js
addEventListener(event, function), getElementById("idName"), getElementsByClassName("className"), getElementsByTagName("div"),
querySelector("#idName .className"), querySelectorAll("className"), createElement("div"), appendChild(newDiv), removeChild(childElement),
setAttribute("class", "newClass"), classList.add("active"), classList.remove("active")
```

# Browser Object Model (BOM)

The Browser Object Model (BOM) in JavaScript refers to the objects provided by the browsers to interact with them

- window => history, location, open, navigator, screen, alert, confirm
- history => length, back, forward, go
- Navigator

# Element

An element is a fundamental building block of a web page, representing different types of content or functionality. Each element is defined by an opening tag, content, and a closing tag

Eg: `<div></div>`

# CSS frameworks

Bootstrap, Semantic UI, Tailwind CSS, material ui

# Syntax of CSS

```css
selector { 
    Property: value; 
}
```

# CSS Selectors?

CSS Selectors are used to selecting HTML elements based on their element name, id, attributes

It can select one or more elements simultaneously

# Margin and padding

- Margin is used to create space around elements
- padding is used to create space around elements inside the border
- can set the margin property to auto
- cannot set the padding property to auto.

# CSS box model

Is a container that contains multiple properties including borders, margin, padding

Used to create the design and layout of web pages

# display: "none" and display: "hidden"

- display: "none" property is used to specify whether an element is exist or not on the website
- display: 'hidden' property is used to specify whether an element is visible or not in a web document

# Position property

Fixed, Static, Relative, Absolute, Sticky

# CSS overflow

visible, hidden, scroll, auto

# Pseudo-classes in CSS?

It can be combined with a CSS selector to add an effect to existing elements

selector: hover, active, focus, visited

# Pseudo-elements in CSS?

Is used to add style to specified parts of an element.

selector::before, after, first-letter, first-line
