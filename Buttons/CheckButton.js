/**
 * Portfolio
 * ImageTextButton.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/18/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * This is a node that represents a check with all the listeners already
 * made.
 *
 * It  takes a label and its listeners as optional and represents a button
 * which the user can toggle on and off.
 *
 *      Div <-  ( the container ) Not the Button!
 *     /   \
 *  label  button
 *           |
 *          Check <- ( toggled off and on )
 *
 */

"use strict";
// modules
import OriginalNode from "../Node/Node.min.js";
import Assert from "../Assert/Assert.min.js"
import ObservableVariable from "../Observe/ObservableVariable.min.js"


// usage: import CheckButton from "...";
// Use Node in order for the actual Node class to recognize it.

export default class Node extends OriginalNode {
  /**
   * Creates the button node
   * @public
   * @constructor
   *
   * @param {object} options - optionts overide the defauls
   * visit const defaults to see the defaults
   * 
   * to get the ButtonNode just use the .node property: ex:
   * let button = new CheckButton({}).button
   *
   * to get the container just use the .container property
   */
  constructor( options ) {
    // provide the defaults
    /**
     * Note: for listeners to the check if you want to use your own 
     * scope on the listener create a alias to this with self ie. 
     * var self = this and use self as a refrence to yourself.
     * 'this' inside the listeners will be the checkButton
     */
    const defaults = {
      // {bool} true for switch on, false for switch off
      switch: false,

      // {object} this style of the button, usually for positioining it 
      // @optional
      buttonStyle: {
        border: "2px solid #333",
        borderRadius: "4px",
        background: "#FFF",
        boxShadow: "0 0 1px 0 rgb( 40, 40, 40 )",
        height: "15px",
        width: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },

      // {string} the id of the button@optional
      id: null, 

      // {string} the class of the button @optional
      class: null,

      // {object} this style of the button, usually for coloring
      // not recommended to change positioning
      checkStyle: {
        fontSize: "30px",
        textAlign: "center",
        marginLeft: "6px",
        marginBottom: "3px",
        userSelect: "none"
      },

      // {function} called on the hover @optional
      hoverListener: null,

      // {object} - the style on the hover @optional // not recommended 
      // to change this
      hoverStyle: {
        cursor: "pointer",
      },

      // {object} - the style on the Containerl // not recommended 
      // to change this
      containerStyle: {
        // border: "2px solid red",
        width: "200px",
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        alignItems: "center",

      },

      // {object} - the style on the label // not recommended 
      // to change this
      labelStyle: {
        fontFamily: "Courier",
        paddingLeft: "10px"
      },

      // {string} the label for the check
      label: null,

      // {function} called on the mouseout of the button @optional
      mouseout: null,

      // {function} called on the click of the button @optional
      onclick: null, 

    }
    // merge them with options overriding
    const attributes = { ...defaults, ...options }; 

    // merge the styles
    attributes.hoverStyle = { ...defaults.hoverStyle, ...options.hoverStyle } 
    attributes.containerStyle = { 
      ...defaults.containerStyle, 
      ...options.containerStyle 
    }
    attributes.labelStyle = { ...defaults.labelStyle, ...options.labelStyle }
    attributes.buttonStyle = { ...defaults.buttonStyle, ...options.buttonStyle }

    attributes.checkStyle = { ...defaults.checkStyle, ...options.checkStyle }


    // call the Node to make the container
    super({
      style: attributes.containerStyle
    })

    // @private
    var self = this;
    // @public 
    this.isSwitched = new ObservableVariable( attributes.switch );
    this.isSwitched.addListener( function( newValue ){
      if ( newValue ){
        self.check.setStyle({ display: "" });
      }
      else {
        self.check.setStyle({ display: "none" })
      }
    })
    // when this is changed, the check mark (view) reflects it 

  
    // @public {node} the button
    this.button = new OriginalNode({
      style: attributes.buttonStyle
    })

    // @public {node} the check
    this.check = new OriginalNode({
      text: "✓",
      style: attributes.checkStyle,
    })

    // set the defualt check state
    if ( !this.isSwitched.value === true ) 
      this.check.setStyle({ display: "none" });

    // hover effect
    this.button.addEventListener( "mouseover", function( event ) {
      event.stopPropagation();
      self.setStyle( attributes.hoverStyle || {} )
      // call the user provided method 
      if ( attributes.hoverListener ){ 
        Assert.assert( 
          typeof attributes.hoverListener === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.hoverListener.__proto__.constructor.name 
        );
        attributes.hoverListener(); 
      }
    } );
    
    // hover end
    this.button.addEventListener( "mouseout", function( event ){
      event.stopPropagation();
      // call user provided method
      if ( attributes.mouseout ) {
        Assert.assert( 
          typeof attributes.mouseout === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.mouseout.__proto__.constructor.name 
        );
        attributes.mouseout();
      }
      // reset the style
      self.button.setStyle( attributes.buttonStyle || {} )
    } );

    // click
    this.button.addEventListener( "mousedown", function( event ){
      event.stopPropagation();
      self.isSwitched.value = !self.isSwitched.value;
      if ( attributes.onclick ){
        Assert.assert( 
          typeof attributes.onclick === "function",
          "@param listener must be a Function type. Instead it was a "
          + attributes.onclick.__proto__.constructor.name 
        );
        attributes.onclick();
      }
    }); 
      
    // add the check to the box
    this.button.addChildren( this.check )

    // @public now add the label
    this.label = new OriginalNode({
      text: attributes.label,
      style: attributes.labelStyle
    })

    this.addChildren( this.button, this.label )

    // @public
    this.attributes = attributes;
  }

}