/**
 * Parallax.js
 * Home.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 3/28/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Parallax is the effect of making a scroll look like there is depth in the 
 * third dimension. This is achieved by making one element scroll at a 
 * different speed than the others.
 *
 * This is a module that allows a node to scroll at a user defined speed
 * compared to the body. This only is only in terms of the body, so if you have
 * a seperate node that scrolls it will not work with this library.
 * 
 * Usage: 
 * It is simple to use this:
 *
 * First, import the module
 * import Parallax from "../Sherpa/Parallax/Parallax.js";
 *
 * Then to make a node have the effect call the static method addEffect
 * Parallax.addEffect( node, -5 );
 * 
 * node will now scroll slower by a factor of 5
 *
 */

"use strict";

import Assert from "../Assert/Assert.js";
export default class Parallax {
  // no need for a constructor, it is static

  /*
   * @static
   * @public
   * @param {node} node - the node that the effect is added on
   * @param {number} factor - the speed of the scroll
   * Add the parallax effect
   */
  static addEffect( node, factor ){
    // node must be type node
    Assert.assert(
      node.__proto__.constructor.name === "Node",
      "@param node must be of node type. Instead it was a " +
      node.__proto__.constructor.name
    );
    // factor must be a number
    Assert.assert(
      factor.__proto__.constructor.name === "Number",
      "@param factor must be of Number type. Instead it was a " +
      factor.__proto__.constructor.name
    );

    // function that gets the position of the node
    function getPosition() {
      if ( window.pageYOffset !== undefined ) {
        return window.pageYOffset;
      } 
      else {
        return ( document.documentElement || 
                 document.body.parentNode || 
                 document.body 
               ).scrollTop;
      }
    }

    // the function called on the scroll
    function onScroll() {
      // exit case
      if ( typeof window.orientation !== "undefined" ) return;

      var scrollPosition = getPosition();
      console.log( "ERehrh")
      node.setStyle({
        transform: "translate3d( 0px, "
                    + ( scrollPosition * factor )
                    + "px, 0px )"
      });
    }

    // add the listener on the scroll 
    window.addEventListener( "scroll", onScroll )
  }
}
