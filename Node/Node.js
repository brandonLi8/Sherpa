/**
 * Sherpa
 * Node.js
 *
 * @author Brandon Li <brandon.li820@icloud.com>
 * Created on 2/12/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * File for Node.js
 * Supported for DOM
 *
 * ## Description of nodes:
 *
 * For the Document Object Model used in HTML, the output is determined by a
 * tree. Every node has a parent a nodes children will be displayed if the node
 * is being displayed. Typically there is one root node that is passed around.
 *
 * For example, nodes A, B, C, D and E:
 * - B is a child of A (thus A is a parent of B)
 * - C is a child of A (thus A is a parent of C)
 * - D is a child of C (thus C is a parent of D)
 * - E is a child of C (thus C is a parent of E)
 * where A would be the root node. Visual representation:
 *   A
 *  / \
 * B   C
 *    / \
 *   D   E
 *
 * Additionally, in this case:
 * - D is a 'descendant' of A
 * (due to the C being a child of A, and D being a child of C)
 * - A is an 'ancestor' of D (due to the reverse)
 * - C's 'subtree' is C, D and E,
 *  which consists of C itself and all of its descendants.
 *
 *
 * ## Creating nodes
 *
 * Generally, there are two types of nodes:
 * - Nodes that don't display anything, but serve as a container for other nodes
 * - Nodes that display content, but ALSO serve as a container
 *
 * When a node is created with the default Node constructor, e.g.:
 *   cont node = new Node();
 * then that node WILL NOT display anything by itself.
 *
 * IMPORTANT:
 * Node.js is used for creating nodes. It is only used for adding a node to a
 * new node. This means you must have the pointer to the node itself and its
 * child.
 *
 * If you want to add a node to a ID or a ClassName or a document type
 * (body etc.) you must use ScreenView.js
 *
 * ScreenView.js should be used for creating the basic tree as it creates the
 * root.
 *
 * To make a 'childNode' become a 'parentNode', the typical way is to call
 * addChild():
 *   parentNode.addChildren( childNode );
 *
 * To remove this connection, you can call:
 *   parentNode.removeChildren( childNode );
 *
 * ## Events
 * The user must provide the functions when a event is triggered.
 * Use the addEventListener method. Event types are the same as the default
 * document events ie mousedown, keydown, etc.
 *
 *
 * ## API
 *
 * node.addChildren( node1, node2 etc... ) - this will add a child to the node
 * if the current node is in the document object model than the children will
 * be displayed
 *
 * node.removeChildren( node1, etc... ) - this will remove the connection
 * bewteen the parent node and the children that are provided
 *
 * node.removeAllChildren() - remove all the children of the parent
 *
 * addEventListener( "keydown", function ) - adds events to the nodes
 *
 * dispose() - remove the connection to its children and its parent
 *
 * node.parentDOM - get the parent DOM object
 * node.parentNode - the parent node 
 * node.id - the id to the node
 * node.class - the class to the node
 * 
 * node.setStyle({
 *   border: "2px solid black"
 * })
 * change the style of the node
 *
 * node.setUpDrag() - makes the node draggable
 * 
 *
 * ANIMATIONS: 
 * Animations are possible with node but you must use "./Animations.js"
 *
 * Paired with the module, you can animate the nodes. 
 *
 * You can reset the animation of the node with node.resetAnimation();
 *
 */

// modules
import Assert from "../Assert/Assert.js"

"use strict";
export default class Node {
  /**
   *
   * Creates a Node with options that can overide the defaults. The defaults
   * is a object type that describes the type of node.
   * The defaults are in the constructor as this.defaults = { ...
   * Everything in the options can override the defualts.
   * @public
   * @constructor
   *
   * @param {Object} [options] - Object with its attributes.
   *
   */
  constructor( options ) {
    // make sure the options is a object
    Assert.assert(
      typeof options === "object",
      "@param Options must be a object type"
    );
    // the defualts
    const defaults = {
      // {string} @optional the type of the object ie. (div, img, etc.)
      type: "div",
      // {string} @optional the text inside (null means no text)
      text: null,
      // {string} @optional the innerHtml (null means no text)
      innerHTML: null,
      // {object} @optional style the node. Use conventional javascript styling.
      style: null,
      // **ONLY** on type "img" @optional {string} the src for the image
      src: null,
      // {boolean} is it draggable?
      draggable: false,
      // {function} only on draggable = true, function called on drag
      drag: null,
      // {function} only on draggable = true, function called on drag release
      dragClose: null,
      // {nameSpace} usually for svg's
      nameSpace: null, 
      // {string} @optional the id for the node
      id: null,
      // {string} @optional the class for the node
      class: null,

      // {object} the object with all of the 'attributes' of the node
      // ie. r and anything else!
      attributes: null
    };

    // merge them with user provided options overriding
    options = { ...defaults, ...options };

    // @public {object} the options to the node.
    this.options = options;

    // make sure that the node type is a string
    Assert.assert(
      typeof options.type === "string",
      "@param Options.type must be a string type. Instead it is a "
      + ( options.type && options.type.__proto__.constructor.name || 'null' )
    );

    // create node with javascript api

    // @public {DOM} - the actual DOM object inside
    if ( options.nameSpace ){ // for svg with nameSpace
      this.DOMobject = document.createElementNS( 
        options.nameSpace,
        options.type 
      );
    }
    else { // for everthing else
      this.DOMobject = document.createElement( 
        options.type 
      );
    }

    // set id
    if ( options.id ){ 
      this.DOMobject.setAttribute( "id", options.id );
    }
    // set class
    if ( options.class ){
      this.DOMobject.className = options.class;
    }

    // create the text child
    if ( options.text ) {
      // make sure that it is a valid string
      Assert.assert(
        options.text.__proto__.constructor.name === "String",
        "@param Options.text must be of String type. Instead it was a "
        + options.text.__proto__.constructor.name
      );
      // create the text node and add it
      var textNode = document.createTextNode( options.text );
      this.DOMobject.appendChild( textNode );
    }

    // create the innerHTML
    if ( options.innerHTML ) {
      // make sure that it is a valid string
      Assert.assert(
        options.innerHTML.__proto__.constructor.name === "String",
        "@param Options.innerHTML must be of String type. "
        + " Instead it was a " 
        + options.innerHTML.__proto__.constructor.name
      );
      // make it the innerHTML
      this.DOMobject.innerHTML = options.innerHTML;
    }

    // set style
    if ( options.style ) {
      this.setStyle( options.style );
    }

    // @public {array} the children of this node
    this.children = [];

    // @public {node} the parrent of the node
    this.parent = null;

    // On image nodes set the image if given
    if ( options.src && options.type === "img" ) {
      Assert.assert(
        options.src.__proto__.constructor.name === "String",
        "@param Options.src must be of String type. Instead it was a "
        + options.src.__proto__.constructor.name
      );
      // javascript will check that it is a legit image
      this.DOMobject.src = options.src;
    }

    if ( options.draggable && options.draggable === true )
      this.setupDrag();

    // now add the attributes to the node
    if ( options.attributes ){
      let keys = Object.keys( options.attributes );
      // loop through and add each attribute
      for ( var i = 0; i < keys.length; i++ ) {
        var attribute = keys[ i ];
        this.DOMobject.setAttribute( 
          attribute,
          options.attributes[ attribute ]
        );
      }
    }

    // @public {animation} the animation of this node
    this.animation = null;
    // note: nodes can only have one animation at a time
  }
  /**
   * @public
   * Add NODES to this node
   * @param {Node} children - the nodes being addeed
   *
   * Usage: node.addChildren( node1, node2 )
   * for adding one child, just provide one parameter
   * @return {Node} - Returns 'this' reference, for chaining
   */
  addChildren( ...children ) {
    // loop through each provided child and add it
    for ( var i = 0; i < children.length; i++ ) {
      var addedNode = children[ i ]
      // must be type node
      Assert.assert(
        addedNode.__proto__.constructor.name === "Node",
        "@param otherNode must be of node type. Instead you tried adding a " +
        addedNode.__proto__.constructor.name
      );
      // if it is already one of our children, ignore;
      if ( this.children.includes( addedNode ) ) continue;

      this.children.push( addedNode ); // add it to the list first
      addedNode.parent = this; // set the addedNodes parent to 'this'
      // add it to the actual DOM
      this.DOMobject.appendChild( addedNode.DOMobject );
    }
    return this; // allow chaining
  }
  /**
   * @public
   * Remove a child
   * @param {node} removedChildren - the nodes being removed
   *
   * Usage: node.addChildren( node1, node2 )
   * for adding one child, just provide one parameter
   *
   * This doesn't technically dispose the memory of the children, rather remove
   * the connections between the children and this node. This node is left in
   * the heap and javascript handles the memory.
   * 
   * @returns {Node} - Returns 'this' reference, for chaining
   */
  removeChildren( ...removedChildren ) {
    for ( var i = 0; i < removedChildren.length; i++ ) {
      var node = removedChildren[ i ]
      // make sure we are removing a node
      Assert.assert(
        node && node.__proto__.constructor.name === "Node",
        "@param node must be of node type. Instead you tried removing a " +
        ( ( node && node.__proto__.constructor.name ) || null )
      );
      // make sure that it is a child of ours
      Assert.assert(
        this.children.includes( node ), 
        "Cannot remove child as the given node isn't a child of this node"
      );

      // remove it from the list
      this.children.splice( this.children.indexOf( node ), 1 );
      this.DOMobject.removeChild( node.DOMobject );
      node.parent = null;
    }
    return this; // allow chaining
  }
  /**
   * @public
   * Remove all children associated with this node
   * This doesn't technically dispoe the memory of the children, rather remove
   * the connections between the children and this node. 
   *
   * @returns {Node} - Returns 'this' reference, for chaining
   */
  removeAllChildren() {
    // children have to exist first
    if ( this.children.length == 0 ) return;
    this.removeChildren( ...this.children );
    return this; // allow chaining
  }
  /**
   * @public
   * Create a event listener
   * @param {String} event - the event ie. (keydown etc.)
   * @param {function} callBack - event caled when event happens
   */
  addEventListener( event, callBack ) {
    this.DOMobject.addEventListener( event, callBack );
  }
  /**
   * @public
   * Remove itself by dispposing ( children preserved ).
   * This will remove the connection to all it's children and its connection to
   * the parent. 
   *
   * Technically the children are preserved, but if this node is part of the DOM
   * this children will no longer be displayed but can be re-added if you have
   * a pointer to it.
   */
  dispose() {
    if ( !this.parent ) return;
    this.removeAllChildren();
    if ( this.parent == document.getElementsByTagName( "body" )[0] ) {
      this.parent.removeChild( this.DOMobject );
      this.parent = null;
      return;
    }
    this.parent.removeChild( this );
    this.parent = null;
  }
  /**
   * @public
   * Get the parent DOM OBJECT
   * @return {DOM} - the dom element
   */
  get parentDOM() {
    return this.DOMobject.parentElement;
  }
  /**
   * @public
   * Get the parent NODE
   * @return {Node} - the node element
   */
  get parentNode() {
    return this.parent;
  }
  /**
   * @public
   * get the id
   * @return {string} - the id of the node
   */
  get id() {
    return this.DOMobject.id;
  }
  /**
   * @public
   * get the class
   * @return {string} - the class of the node
   */
  get class() {
    return this.DOMobject.className;
  }
  /**
   * @public
   * change the style of the node;
   * @param {object} options - the attributes that are changing
   */
  setStyle( style ) {
    if ( !style ) return;
    let keys = Object.keys( style );
    for ( var i = 0; i < keys.length; i++ ) {
      this.DOMobject.style[ keys[ i ] ] = style[ keys[ i ] ];
    }
  }
  
  /**
   * Sets up the node to be draggable. Usually the node has to have the position
   * "absolute" or position "fixed".
   * 
   * Dragging events will propogate down its tree respectively.
   * @public
   */
  setupDrag() {
    let node = this.DOMobject;
    let options = this.options;
    // keep track of positions
    var position1 = 0,
        position2 = 0,
        position3 = 0,
        position4 = 0;
    // start drag event listener
    node.onmousedown = dragMouseDown;

    function dragMouseDown( event ) {
      event = event || window.event;
      event.preventDefault();
      // mouse cursor
      position3 = event.clientX;
      position4 = event.clientY;

      document.onmouseup = closeDrag;
      document.onmousemove = drag;
    }

    function drag( event ) {
      event = event || window.event;
      event.preventDefault();
      // new position
      position1 = position3 - event.clientX;
      position2 = position4 - event.clientY;
      position3 = event.clientX;
      position4 = event.clientY;
      node.style.top = node.offsetTop - position2 + "px";
      node.style.left = node.offsetLeft - position1 + "px";
 
      call( options.drag ); // call user provided drag method
    }

    function closeDrag() {
      // on the release
      document.onmouseup = null; // remove event listeners
      document.onmousemove = null;

      
      call( options.dragClose );
    }
    // calls a function, checks that it is function and calls it
    function call( func ) {
      if ( func ) {
        Assert.assert(
          typeof func === "function",
          "@param drag functions must be a function"
        )
        func() // call user provided drag method
      }
    }
  }
  /**
   * @public
   * Reset the animation to put the node in the original spot before the
   * animation
   */
  resetAnimation(){
    if ( this.animation ) this.animation.cancel();
  }
}
