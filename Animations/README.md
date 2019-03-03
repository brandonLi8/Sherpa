<!--  
  README.md
  Created by Brandon Li on 3/2/19.
  Copyright © 2019 Brandon Li. All rights reserved. 
-->
Animations (web-animations api)
=======
By [Brandon Li](https://github.com/brandonLi8)

## What are animations?

Animations use the web-animations api, a new JS API for driving animated content on the web. It unifies the animation features of SVG and CSS, animations allow for declaritive, powerful, high-performance animation capabilities to developers.

## What is this library?

This library is a collection of already made animations along with the option to make a custom animation. This is meant to be used alongside Node, a library in Sherpa (Node.js) to easily work with animations.

-----------

Here's a simple example of a animation that jiggles a node on a hover:

```javascript 
// import libraries!
import Node from "../../Sherpa/Node/Node.js";
import Animations from "../../Sherpa/Animations/Animations.js"
// (your path will be different)

var node = new Node({
  style: {
    margin: "auto",
    border: "2px solid red" 
  },
  attributes: {
    id: "id"
  },
  text: "node"
})

// Note, in order to display the node, you will have to use ScreenView
// example : var view = new ScreenView( node );

// now add the animations
node.addEventListener( "mouseover", function(){
  Animations.jiggle({ // Animations is static
    node: node,
    deltaX: "5px",
    deltaY: "0px",
    duration: 400, // milliseconds
  })
})

// reset the animation using Node api on the mouseout
node.addEventListener( "mouseout", function(){
  node.resetAnimation();
})
```

## Get Involved

Contact me via <a href="mailto:brandon.li820@icloud.com" target="_blank"> email </a>

Help improve, create a <a href="https://github.com/brandonLi8/Sherpa/issues" target="_blank">New Issue</a>

I used <a href="https://github.com/brandonLi8/Portfolio-Website/blob/master/Style.md" target="_blank"> this </a> style guildine

### Credit

Web Animations as of now aren't natively supported on other browsers. I used <a href="https://github.com/web-animations/web-animations-js/tree/master" target="_blank"> this </a> repo (apache 2.0) which provides support to other browsers, allowing Animations in every browser.


