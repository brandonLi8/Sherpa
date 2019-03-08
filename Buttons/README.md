<!--  
  README.md
  Created by Brandon Li on 3/2/19.
  Copyright © 2019 Brandon Li. All rights reserved. 
-->
Buttons
=======
By [Brandon Li](https://github.com/brandonLi8)

## What are buttons?

Buttons is a series of lirbaries designed to make buttons easily in vanilla javasript. These buttons support styling on hover and click listeners and animations while maintaining functionality.


## TextPushButton

This is a button class that is designed for text on top of it. This inherits Node.js so it supports animations, hover effects, and click functionality. 

This is a basically a Node with pre-defined children as text and listeners. 

TextPushButton provides a default looking button, but the user can overide  the style, a seperate opbject that the user can default each item, so if you override style it doens't delete all of the style.

The tree looks something like this.
```
   div <- this 
    |
 textnode <- this.textNode ( the node of the text ) 
```

 This sepration of the text and the button allows for animation of just the
text.


## Image Button

This is a button class that is designed for a image on top of it. This inherits Node.js so it supports animations, hover effects, and click functionality.
 
This is a basically a Node with pre-defined children as text and listeners.
 
It  takes a image, its hover image (optional), and text (optional) that is a button. The user will provide the styling and the listener function when the button is pressed 


## CheckButton
This is a node that represents a check with all the listeners alreadymade.

It  takes a label and its listeners as optional and represents a button which the user can toggle on and off.
```
      Div <-  ( the container ) Not the Button!
     /   \
  label  button
           |
          Check <- ( toggled off and on )
```
-----------

Here's a simple example of creating a Button:

```javascript 
// import library
import CheckButton from "../../Sherpa/Buttons/CheckButton.js"

// (your path will be different)

var button = new CheckButton( {
  onclick: function(){ // do something here },
  switch: true,
  label: "this is a switch"
}) // this inherits node!

// Note, in order to display the node, you will have to use ScreenView
// example: var view = new ScreenView( button );
```

## Get Involved

Contact me via <a href="mailto:brandon.li820@icloud.com" target="_blank"> email </a>

Help improve, create a <a href="https://github.com/brandonLi8/Sherpa/issues" target="_blank">New Issue</a>

I used <a href="https://github.com/brandonLi8/Portfolio-Website/blob/master/Style.md" target="_blank"> this </a> style guildine



