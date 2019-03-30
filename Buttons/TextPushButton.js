/**
 * Portfolio
 * TextPushButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/14/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 *
 * This is a button class that is designed for text on top of it. This inherits
 * Node.js so it supports animations, hover effects, and click functionality.
 *
 * This is a basically a Node with pre-defined children as text and listeners.
 *
 * TextPushButton provides a default looking button, but the user can overide 
 * the style, a seperate opbject that the user can default each item, so
 * if you override style it doens't delete all of the style.
 *
 * The tree looks something like this.
 *    div <- this 
 *     |
 *  textnode <- this.textNode ( the node of the text ) 
 *
 * This sepration of the text and the button allows for animation of just the
 * text.
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
   * Creates the Button itself
   * @public
   * @constructor
   *
   * @param {object} options - the attributes to the button
   * Look at const defaults for information on all of the defaults
   *
   */
  constructor( options ){
    // provide the defaults 
    let defaults = {
      // {string} the text on the node @optional
      text: "Text Button", 
      // {object} the styling ( overriding doesn't delete all of it ) @optional 
      style: { 
        border: "1px solid #222",
        margin: "auto",
        width: "100px",
        opacity: "1",
        fontSize: "20px",
      },

      // {object} the styling on the hover @optional
      hoverStyle: { 
        cursor: "pointer",
        opacity: "0.5"
      },

      // {object} the style for the text node @optional 
      textStyle: { 
        textAlign: "center",
      },

      // {object} the style for the text on the button hover @optional 
      textHoverStyle: null,

      // {string}the id of the button @optional 
      id: null, 

      // {string} the class of the button @optional 
      class: null,

      // {function} the function called on the click 
      onclick: null,

      // {function} the function called on the hover 
      hoverListener: null,

      // {function} the function called on the mouseout of the hover
      mouseout: null,

      // {object} the object with all of the 'attributes' of the node
      // ie. r, and anything else!
      attributes: null,

      // set the href of the text button ( only for links ) @options
      href: null,
    }

    const newOptions = { ...defaults, ...options };
    // merge the styles 
    newOptions.style = { ...defaults.style, ...options.style }
    newOptions.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
    newOptions.textStyle = { ...defaults.textStyle, ...options.textStyle }
    // don't need to merge the text hover style because it is null;

    // reset it back to options
    options = newOptions;


    // create the node!
    super({
      type: "a",
      style: options.style,
      attributes: options.attributes,
      id: options.id,
      class: options.class,
      href: options.href
    })

    // 'this' is now the button node
    var self = this;

    // add hover styling 
    this.addEventListener( "mouseover", function( event ){ 
      event.stopPropagation();
      self.setStyle( options.hoverStyle );
      self.textNode.setStyle( options.textHoverStyle );

      if ( options.hoverListener ){
        Assert.assert( 
          typeof options.hoverListener === "function",
          "@param listener must be a Function type. Instead it was a "
          + options.hoverListener.__proto__.constructor.name );

        options.hoverListener()
      }

    } );

    this.addEventListener( "mouseout", function( event ){ 
      event.stopPropagation();
      self.setStyle( options.style || {} );
      self.textNode.setStyle( options.textStyle || {} )

      if ( options.mouseout ){
        Assert.assert( 
          typeof options.mouseout === "function",
          "@param listener must be a Function type. Instead it was a "
          + options.mouseout.__proto__.constructor.name );
        options.mouseout()
      }

    } );

    // on click listener
    this.addEventListener( "mousedown", function( event ){

      event.stopPropagation()
      if ( options.onclick ){
        Assert.assert( 
          typeof options.onclick === "function",
          "@param listener must be a Function type. Instead it was a "
          + options.onclick.__proto__.constructor.name );
        options.onclick();
      }

    } );
    

    // @public {node} have a seperate text node for more animation flexibility
    this.textNode = new OriginalNode({
      text: options.text,
      style: options.textStyle
    })

    this.addChildren( this.textNode );

    this.options = options;
    
  }

}


