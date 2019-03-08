<!--  
  README.md
  Created by Brandon Li on 3/2/19.
  Copyright © 2019 Brandon Li. All rights reserved. 
-->
Node
=======
By [Brandon Li](https://github.com/brandonLi8)

## What are nodes?

For the Document Object Model used in HTML, the output is determined by a
tree. Every node has a parent a nodes children will be displayed if the node
is being displayed. Typically there is one root node that is passed around.

For example, nodes A, B, C, D and E:
- B is a child of A (thus A is a parent of B)
- C is a child of A (thus A is a parent of C)
- D is a child of C (thus C is a parent of D)
- E is a child of C (thus C is a parent of E)
where A would be the root node. Visual representation:
```
  A
 / \
B   C
   / \
  D   E
```

Additionally, in this case:
- D is a 'descendant' of A
  (due to the C being a child of A, and D being a child of C)
- A is an 'ancestor' of D (due to the reverse)
- C's 'subtree' is C, D and E,
  which consists of C itself and all of its descendants.

## What is this library?

This library is another representation of a Node that is easy to use. Nodes are supported with drag, styling, animations with the animate api, and events with the javascript Document Object Model api.

-----------

Here's a simple example of creating a node:

```javascript 
// import library
import Node from "../../Sherpa/Node/Node.js";
// (your path will be different)

var node = new Node({
  style: { // you can directly style it
    margin: "auto",
    border: "2px solid red",
    position: "absolute" 
  },
  draggable: true, //this makes it so you can drag it!
  attributes: { // any attributes go here
    id: "id"
  },
  text: "node" // the text that goes inside it
})

// Note, in order to display the node, you will have to use ScreenView
// example: var view = new ScreenView( node );
```

## Get Involved

Contact me via <a href="mailto:brandon.li820@icloud.com" target="_blank"> email </a>

Help improve, create a <a href="https://github.com/brandonLi8/Sherpa/issues" target="_blank">New Issue</a>

I used <a href="https://github.com/brandonLi8/Portfolio-Website/blob/master/Style.md" target="_blank"> this </a> style guildine



