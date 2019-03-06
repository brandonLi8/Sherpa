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
 * This is a button class that is designed for text on top of it. This uses Node
 * so it supports animations, hover effects, and click functionality.
 *
 * This is a basically a Node with other nodes as children but represents a 
 * button.
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

// modules
import OriginalNode from "../Node/Node.js";
import Assert from "../Assert/Assert.js"

"use strict";

// we must use Node name in order to have node functionality
// call it with TextPushButton:
// import TextPushButton from "...";

// we aren't making a new node
export default class Node extends OriginalNode {
  /**
   * Creates the button node
   * @public
   * @constructor
   *
   * @param {object} options - look at const defaults for information on 
   * all of the defaults
   * 
   * to get the button node call itself the .button property of this class:
   * let buttonNode = new TextPushButton({}).button {node}
   *
   */
  constructor( options ){
    // provide the defaults 
    let defaults = {
      // {string} the text on the node @optional
      text: "Text Button", 

      // {object} the styling ( overriding doesnt delete all of it ) @optional 
      style: { 
        border: "1px solid #222",
        borderRadius: "15px",
        width: "200px",
        height: "50px",
        display: "flex",
        background: "white",
        boxShadow: "0 0 3px 0 rgb( 40, 40, 40 )",
        margin: "auto"
      },

      // {object} the styling on the hover @optional
      hoverStyle: { 
        cursor: "pointer",
        background: "#DDD"
      },

      // {object} the style for the text node @optional 
      textStyle: { 
        fontSize: "20px",
        margin: "auto",
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

    }
    
    let attributes = { ...defaults, ...options };

    // merge the styles 
    attributes.style = { ...defaults.style, ...options.style }
    attributes.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
    attributes.textStyle = { ...defaults.textStyle, ...options.textStyle }

    // create the node!
    super({
      style: attributes.style,
      attributes: {
        id: attributes.id,
        class: attributes.class
      }
    })
    // 'this' is now the button node

    var self = this;

    // add hover styling 
    this.addEventListener( "mouseover", function( event ){ 
      event.stopPropagation();
      self.setStyle( attributes.hoverStyle || {} );
      self.textNode.setStyle( attributes.textHoverStyle || {} );

      if ( attributes.hoverListener ){
        Assert.assert( 
          typeof attributes.hoverListener === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.hoverListener.__proto__.constructor.name );

        attributes.hoverListener()
      }

    } );

    this.addEventListener( "mouseout", function( event ){ 
      event.stopPropagation();

      self.setStyle( attributes.style || {} );
      self.textNode.setStyle( attributes.textStyle || {} )

      if ( attributes.mouseout ){
        Assert.assert( 
          typeof attributes.mouseout === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.mouseout.__proto__.constructor.name );
        attributes.mouseout()
      }

    } );

    // on click listener
    this.addEventListener( "mousedown", function( event ){

      event.stopPropagation()
      if ( attributes.onclick ){
        Assert.assert( 
          typeof attributes.onclick === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.onclick.__proto__.constructor.name );
        attributes.onclick();
      }

    } );
    

    // @public have a seperate text node for more animation flexibility
    this.textNode = new OriginalNode({
      text: attributes.text,
      style: attributes.textStyle
    })

    this.addChildren( this.textNode );
  }

}


