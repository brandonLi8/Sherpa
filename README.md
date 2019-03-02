<!--  
  README.md
  Sherpa
  Created by Brandon Li on 2/18/19.
  Copyright © 2019 Brandon Li. All rights reserved. 
-->
Core
=======
By [Brandon Li](https://github.com/brandonLi8)

## General

This is a series of modules made in vanilla javascript that are made in vanilla javascript and are intended to be used. Modules are helpful for simple DOM additions, modifications, and deletions and overall javascript simplicity.

## Node (screen)

Node is a simple DOM object for the view.

For the Document Object Model used in HTML, the output is determined by a tree. Every node has a parent a nodes children will be displayed if the node is being displayed. Typically there is one root node that is passed around.
More information on the root node in the screenview

For example, nodes A, B, C, D and E:
- B is a child of A (thus A is a parent of B)
- C is a child of A (thus A is a parent of C)
- D is a child of C (thus C is a parent of D)
- E is a child of C (thus C is a parent of E)
where A would be the root node. Visual representation:
  A
 / \
B   C
   / \
  D   E

Nodes offer animations, rotations, styling, and drag.

## ScreenView (screen)

ScreenView is a module that is the general DOM tree as a whole in HTML.
For example:
    Dom -> Html  <- Document
            |
    Dom -> body
            |
  Node -> wrapper <- SCREENVIEW
           / \
  Node -> A   B <- Node
         / \
Node -> D   E <- Node

As you can see, the 'wrapper' node is the root to the ScreenView as the body and html are ignored. The user can provide styling for the HTML and Body element.

One advantage of is that you can add children to a specific id/class.
However it will be searched through the root node and not the body.

## Buttons 

Buttons is a collection of button modules that are button nodes. This includes a image button, or a button with a image on top of it and the user provides functions for the events id (hover, hoveroff, click etc.)
This is similar on the TextButton (button with text) and the CheckButton (button with a check)# Umpra
