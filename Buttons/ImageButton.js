/**
 * Portfolio
 * ImageTextButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/13/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This is a button class that is designed for a image on top of it. This
 * inherits Node.js so it supports animations, hover effects, and click
 * functionality.
 *
 * This is a basically a Node with pre-defined children as text and listeners.
 *
 *
 * It  takes a image, its hover image (optional), and text (optional)
 * that is a button. The user will provide the styling and the listener function
 * when the button is pressed
 *
 *  img <- root ( the actual button)
 *
 */

"use strict";


/**
 * Because Node checks contructor name, we must call this class Node.
 *
 * But you should call it with TextPushButton:
 * import TextPushButton from "...";
 */


// modules
// this is the original node (Node.js)
import OriginalNode from "../Node/Node.min.js";
import Assert from "../Assert/Assert.min.js"



// Again, this class is called Node, but it is really a TextPushButton

// inherit from the original node, but you shouldnt create a instance with the 
// same parameters as Node (different constructors)
export default class Node extends OriginalNode {
  /**
   * Creates the button node
   * @public
   * @constructor
   *
   * @param {object} options - optiont overide the defauls
   * visit const defaults to see the defaults
   * 
   */
  constructor( options ) {
    // provide the defaults
    const defaults = {

      // {object} this style of the button, usually for positioining it 
      style: null, // @optional

      // {string} the id of the button@optional
      id: null, 

      // {string} the class of the button @optional
      class: null,

      // {string} the src of the button @required!
      src: null, 

      // {string} the src of the button @optional
      hover: null, 

      // {function} called on the hover @optional
      hoverListener: null,

      // {object} - the style on the hover @optional
      hoverStyle: {
        cursor: "pointer"
      },

      // {function} called on the mouseout of the button @optional
      mouseout: null,

      // {function} called on the click of the button @optional
      onclick: null,

      // {object} the object with all of the 'attributes' of the node
      // ie. r, and anything else!
      attributes: null

    }
    // merge them with defaults with user-provided options overriding  
    const newOptions = { ...defaults, ...options };
    // merge the styles 
    newOptions.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
    // don't need to merge the text hover style because it is null;

    // reset it back to options
    options = newOptions;

    super({
      type: "img",
      style: options.style,
      src: options.src,
      attributes: options.attributes,
      id: options.id,
      class: options.class
    })

    // alias self for listeners
    var self = this;


    // add hover event listener
    this.addEventListener( "mouseover", function( event ){
      // stop propagation to children
      event.stopPropagation();
      self.setStyle( options.hoverStyle || {} );
      // call the user provided method with the scope
      if ( options.hoverListener ){
        Assert.assert( 
          typeof options.hoverListener === "function",
          "@param listener must be a Function type. Instead it was a "
          + options.hoverListener.__proto__.constructor.name 
        );

        options.hoverListener();
      } 
        // change the image
      if ( !options.hover ) return;

      self.DOMobject.src = options.hover;
    } );
    


    // change back to original src on the mouse out
    this.addEventListener( "mouseout", function( event ){
      event.stopPropagation();
      self.setStyle( options.style || {} );

      self.DOMobject.src = options.src;
      // call the user provided method with the scope
      if ( options.mouseout ) {
        Assert.assert( 
          typeof options.mouseout === "function",
          "@param listener must be a Function type. Instead it was a "
          + options.mouseout.__proto__.constructor.name 
        );
        options.mouseout();
      }
    }
    );

    // add the click listener
    this.addEventListener( "mousedown", function( event ){
      event.stopPropagation();
      if ( options.onclick ) {
        Assert.assert( 
          typeof options.onclick === "function",
          "@param listener must be a Function type. Instead it was a "
          + options.onclick.__proto__.constructor.name 
        );
        options.onclick() 
      }
    }); 

    // @public {object} - the options (options)
    // you can overide it to change options (animations, images, etc.)
    this.options = options;

  }

}
