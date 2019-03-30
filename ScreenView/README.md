<!--  
  README.md
  Created by Brandon Li on 3/2/19.
  Copyright © 2019 Brandon Li. All rights reserved. 
-->
ScreenView
=======
By [Brandon Li](https://github.com/brandonLi8)

## Description

ScreenView is a module that is the general DOM tree as a whole in HTML.
For example:
```
    Dom -> Html  <- Document
            |
    Dom -> body
            |
  Node -> wrapper <- SCREENVIEW
           / \
  Node -> A   B <- Node
         / \
Node -> D   E <- Node
```

As you can see, the 'wrapper' node is the root to the ScreenView as the body and html are ignored. The user can provide styling for the HTML and Body element.

One advantage of is that you can add children to a specific id/class.
However it will be searched through the root node and not the body.


-----------

Here's a simple example:

```javascript 
// import libraries!
import Node from "../../Sherpa/Node/Node.min.js";
import ScreenView from "../../Sherpa/ScreenView/ScreenView.min.js"
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

var screenView = new ScreenView( node ); 
// node will now be displayed!
```

## Get Involved

Contact me via <a href="mailto:brandon.li820@icloud.com" target="_blank"> email </a>

Help improve, create a <a href="https://github.com/brandonLi8/Sherpa/issues" target="_blank">New Issue</a>

I used <a href="https://github.com/brandonLi8/Portfolio-Website/blob/master/Style.md" target="_blank"> this </a> style guildine

