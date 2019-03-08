/**
 * Sherpa
 * Animations.js
 *
 * @author Brandon Li <brandon.li820@icloud.com>
 * Created on 3/1/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * File for Animations.js
 * Supported for Nodes only
 *
 * ## Description of animations:
 *  Animations are a collection of methods that allow the user to make a node
 *  animate when called (for example on a hover). This will provide some of the
 *  basic animations like jiggle, vibrate, enlarge.
 *
 * ## Usage:
 * First you have to had a node that is being displayed:
 * import Node form ".../Node" (your path might be different)
 * var Node = new Node({});
 *
 * then you have to have Animations imported and call animations
 * import Animations from ".../Animations" (your path might be different)
 * 
 * call the static methods of Animations
 * Animations.jiggle({
 *   node: Node, // @required
 *   duration: 200, // milliseconds
 *   deltaX: "5px", // any string
 *   deltaY: "0",
 * }); 
 * 
 * This will return the animation, which can used to call the .cancel() to 
 * return this to the original state 
 *
 * This will jiggle the Node for 2 seconds at a inital changeX of 5px and will
 * not move vertically at all.
 *
 * This is supported for all browsers thanks to web-animations:
 * https://github.com/web-animations/web-animations-js/tree/master (apache 2.0)
 * This module allows this to animate on all browsers!
 *
 * For more information, please refer to the the README.md (same directory)
 */

import Assert from "../Assert/Assert.js";

/**
 * This is supported for all browsers thanks to web-animations:
 * https://github.com/web-animations/web-animations-js/tree/master (apache 2.0)
 * This module allows this to animate on all browsers!
 *
 * Load the script and add it to the head to be used
 */

export default class Animations {
  // no consructor, Animations is a collection of static methods
  consructor(){
    var script = document.createElement( "script" );
    script.src = "./Sherpa/Animations/BrowserSupport/web-animations.min.js"
    document.head.appendChild( script );
  };
  /**
   * Uses Web Animations API
   * Animates the node with a curom animation
   * @public
   * @param options {
   *    node: @required {node}
   *    animation: @required {Array}
   *    timing: @required {object}
   * }
   * @return {animation} - the animation object
   *
   * The animation property of the object desribes where the animation goes
   * The timing describes the looping/ timing of the animation
   * Example Usage:
   * .animate({
   *   node: node,
   *   animation: [
   *     { transform: "translateY( 0 )" },
   *     { transform: "translateY( -80% )" }
   *   ],  // this moves it upwards
   *   timing: {
   *     fill: "forwards", // keeps it still at the end
   *     duration: 500 // milliseconds
   *   }
   */
  static animate( options ) {
    // must provide a option
    Assert.assert(
      typeof options === "object",
      "@param Options must be a object type"
    );
    let node = options.node;
    // make sure that the user provides a node
    Assert.assert(
      node && node.__proto__.constructor.name === "Node",
      "@param options.node must be of node type and is required. Instead it was"
      + " a " + ( ( node && node.__proto__.constructor.name ) || null )
    );
    
    let animation = node.DOMobject.animate( options.animation, options.timing );
    node.animation = animation;

    return animation;
  }
  /**
   * @public
   * Animate by moving the node.
   * @param {object} options - the options to the animations
   * options {
   *  node: {node} @required,
   *  duration: duration of the animation, @optional
   *  deltaY: {string} ex: "5px" @optional
   *  deltaX: {string} ex: "5px" @optional
   *  fill: {string} @optional
   *  timingOptions: {} ex {interations...} @optional
   * }
   * Look at the defaults in the method -> const defaults = {...
   */
  static move( options ) {
    let defaults = {
      node: null, // @required
      duration: 200, // @optional
      deltaY: "5px",  // @optional
      deltaX: "5px", // @optional
      fill: "forwards",
      timingOptions: {} //the options for the animations (ex: iterations...)
    }
    options = { ...defaults, ...options }

    let node = options.node;
    // make sure that the user provides a node
    Assert.assert(
      node && node.__proto__.constructor.name === "Node",
      "@param options.node must be of node type and is required. Instead it was"
      + " a " + ( ( node && node.__proto__.constructor.name ) || null )
    );
    return this.animate({
      node: node,
      animation: [ // animation that moves it
        { transform: "translate( 0 )" },
        { transform: "translate(" 
                     + options.deltaX 
                     + "," 
                     + options.deltaY 
                     + ")" }
      ],  
      timing: {
        fill: options.fill,
        duration: options.duration,
        ...options.timingOptions
      }

    })
  }
  /**
   * @public
   * Animate by jiggling the node.
   * @param {object} options - the options to the animations
   * options {
   *  node: {node} @required,
   *  duration: duration of the jiggle, @optional
   *  deltaY: {string} ex: "5px" @optional this is the max jiggle in this
   *  direction
   *
   *  deltaX: {string} ex: "5px" @optional this is the max jiggle in the X
   *  direction
   *
   *  fill: {string} @optional
   *  timingOptions: {} ex: "iterations" ... @optional
   * }
   * Look at the defaults in the method -> const defaults = {...
   */
  static jiggle( options ) {
    let defaults = {
      node: null, // @required
      duration: 200, // @optional
      deltaY: "5px",  // @optional
      deltaX: "5px", // @optional
      fill: "forwards",
      timingOptions: {} //the options for the animations (ex: iterations...)
    }
    options = { ...defaults, ...options }

    let node = options.node;
    // make sure that the user provides a node
    Assert.assert(
      node && node.__proto__.constructor.name === "Node",
      "@param options.node must be of node type and is required. Instead it was"
      + " a " + ( ( node && node.__proto__.constructor.name ) || null )
    );
    return this.animate({
      node: node,
      animation: [ // animation that moves it
        { transform: "translate(" 
                     + "calc(" + options.deltaX + " * -0.6 )"
                     + "," 
                     + "calc(" + options.deltaY + " * -0.6 )"
                     + ")" },
        { transform: "translate(" 
                     + "calc(" + options.deltaX + " * 1 )"
                     + "," 
                     + "calc(" + options.deltaY + " * 1 )"
                     + ")" },
        { transform: "translate(" 
                     + "calc(" + options.deltaX + " * -1 )"
                     + "," 
                     + "calc(" + options.deltaY + " * -1 )"
                     + ")" },
        { transform: "translate(" 
                     + "calc(" + options.deltaX + " * 0.6 )"
                     + "," 
                     + "calc(" + options.deltaY + " * 0.6 )"
                     + ")" },

      ],  
      timing: {
        fill: options.fill,
        duration: options.duration,
        ...options.timingOptions
      }

    })
  }
  /**
   * @public
   * Animate by enlarging the node.
   * @param {object} options - the options to the animations
   * options {
   *  node: {node} @required,
   *  duration: duration of the enlargment, @optional
   *  resize: as percentage of the new size {number} @required
   *
   *  fill: {string} @optional
   *  timingOptions: {} ex: "iterations" ... @optional
   * }
   * Look at the defaults in the method -> const defaults = {...
   */
  static enlarge( options ) {
    let defaults = {
      node: null, // @required
      duration: 200, // @optional
      resize: 120,
      fill: "forwards",
      timingOptions: {} //the options for the animations (ex: iterations...)
    }
    options = { ...defaults, ...options }

    let node = options.node;
    // make sure that the user provides a node
    Assert.assert(
      node && node.__proto__.constructor.name === "Node",
      "@param options.node must be of node type and is required. Instead it was"
      + " a " + ( ( node && node.__proto__.constructor.name ) || null )
    );

    return this.animate({
      node: node,
      animation: [ // animation that moves it
        { transform: "translate( 0 )" },
        { transform: "scale(" 
                     + options.resize / 100 
                     + "," + options.resize / 100 + ")" },
      ],  
      timing: {
        fill: options.fill,
        duration: options.duration,
        ...options.timingOptions
      }

    })
  }
  /**
   * @public
   * Animate by first flippling the node, then increasing the margin to give
   * the effect of it enlarging aswell
   * @param {object} options - the options to the animations
   * options {
   *  node: {node} @required,
   *  duration: duration of the enlargment, @optional
   *  amount: amount to go out {number} @required
   *
   *  fill: {string} @optional
   *  timingOptions: {} ex: "iterations" ... @optional
   * }
   * Look at the defaults in the method -> const defaults = {...
   * It is not recommended to have the node start off with padding.
   */
  static iconHover( options ) {
    let defaults = {
      node: null, // @required
      duration: 200, // @optional
      amount: "25px",
      fill: "forwards",
      timingOptions: {} //the options for the animations (ex: iterations...)
    }
    options = { ...defaults, ...options }

    let node = options.node;
    // make sure that the user provides a node
    Assert.assert(
      node && node.__proto__.constructor.name === "Node",
      "@param options.node must be of node type and is required. Instead it was"
      + " a " + ( ( node && node.__proto__.constructor.name ) || null )
    );
    let nodePadding = node.DOMobject.style.padding || "0px"
    let nodeMargin = node.DOMobject.style.margin || "0px"
    let amount = options.amount
    // make the animation, this gets ugly :)
    let keyFrames = [ 
      { 
        transform: "rotate( 0deg )",
        offset: 0,
        padding: nodePadding, // keep it where it is originally
        margin: nodePadding,
      },
      { 
        transform: "rotate( 360deg )",
        offset: 0.35,
        padding: "calc( " + nodePadding + " + " + amount + " / 2 )",
        margin: "calc( (" + nodeMargin + " - " + amount + " / 2 ) )",
      },
      { 
        transform: "rotate( 360deg )",
        transform: "translateX( 1px )",
        padding: "calc( " + nodePadding + " + " + amount + "  )",
        margin: "calc( (" + nodeMargin + " - " + amount + "  ) )",
        offset: 0.42
      },
      { 
        transform: "scale( 1.13 )",
        transform: "translateX( -1px )",
        transform: "rotate( 360deg )",
        padding: "calc( " + nodePadding + " + " + amount + "  )",
        margin: "calc( (" + nodeMargin + " - " + amount + "  ) )",
        offset: 0.60,
      },
      { 
        transform: "scale( 1.2 )",
        transform: "translateX( 0px )",
        transform: "rotate( 360deg )",
        padding: "calc( " + nodePadding + " + " + amount + " / 5 )",
        margin: "calc( (" + nodeMargin + " - (" + amount + " / 5 ) ) )",
        offset: 1,
      },
    ]
    return this.animate({
      node: node,
      animation: keyFrames,
      timing: {
        fill: options.fill,
        duration: options.duration,
        ...options.timingOptions
      }

    })
  }
  /**
   * @public
   * Animate by fading the node (change the opacity)
   * @param {object} options - the options to the animations
   * options {
   *  node: {node} @required,
   *  duration: duration of the animation, @optional
   *  opacity: {string} @required the new opacity after the animation
   *  fill: {string} @optional
   *  timingOptions: {} ex {interations...} @optional
   * }
   * Look at the defaults in the method -> const defaults = {...
   */
  static fade( options ) {
    let defaults = {
      node: null, // @required
      duration: 200, // @optional
      opacity: "0.5",
      fill: "forwards",
      timingOptions: {} //the options for the animations (ex: iterations...)
    }
    options = { ...defaults, ...options }

    let node = options.node;
    // make sure that the user provides a node
    Assert.assert(
      node && node.__proto__.constructor.name === "Node",
      "@param options.node must be of node type and is required. Instead it was"
      + " a " + ( ( node && node.__proto__.constructor.name ) || null )
    );
    return this.animate({
      node: node,
      animation: [ // animation that moves it
        { opacity: node.DOMobject.style.opacity || "1.0" },
        { opacity: options.opacity }
      ],  
      timing: {
        fill: options.fill,
        duration: options.duration,
        ...options.timingOptions
      }

    })
  }

}


