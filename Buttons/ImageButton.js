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
 * This is a node that represents a Image button with all the listeners already
 * made.
 *
 * It  takes a image, its hover image (optional), and text (optional)
 * that is a button. The user will provide the styling and the listener function
 * when the button is pressed
 *
 *  img <- root ( the actual button)
 *
 */

"use strict";
// modules
import OriginalNode from "../Node/Node.js";
import Assert from "../Assert/Assert.js"

// usage: import ImageButton from "...";
// Use Node in order for the actual Node class to recognize it.

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
  constructor( options ){
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

    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options };

    // merge the styles
    attributes.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
 

    super({
      type: "img",
      style: attributes.style,
      src: attributes.src,
      attributes: {
        id: attributes.id,
        class: attributes.class
      }
    })

    // alias self for listeners
    var self = this;


    // add hover event listener
    
    this.addEventListener( "mouseover", function( event ){
      // stop propagation to children
      event.stopPropagation();

      self.setStyle( attributes.hoverStyle || {} );
      // call the user provided method with the scope
      if ( attributes.hoverListener ){
        Assert.assert( 
          typeof attributes.hoverListener === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.hoverListener.__proto__.constructor.name 
        );

        attributes.hoverListener();
      } 
        // change the image
      if ( !attributes.hover ) return;

      self.DOMobject.src = attributes.hover;
    } );
    


    // change back to original src on the mouse out
    this.addEventListener( "mouseout", function( event ){
      event.stopPropagation();
      self.setStyle( attributes.style || {} );

      self.DOMobject.src = attributes.src;
      // call the user provided method with the scope
      if ( attributes.mouseout ) {
        Assert.assert( 
          typeof attributes.mouseout === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.mouseout.__proto__.constructor.name 
        );
        attributes.mouseout();
      }
    }
    );

    // add the click listener
    this.addEventListener( "mousedown", function( event ){
      event.stopPropagation();
      if ( attributes.onclick ) {
        Assert.assert( 
          typeof attributes.onclick === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.onclick.__proto__.constructor.name 
        );
        attributes.onclick() 
      }
    }); 

    // @public {object} - the attributes (options)
    // you can overide it to change attributes (animations, images, etc.)
    this.attributes = attributes;

  }

}
