/**
 * Sherpa
 * Assert.js
 *
 * @author Brandon Li <brandon.li820@icloud.com>
 * Created on 2/28/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * File for Assert.js
 *
 * Add a assert method to javascript.
 *
 * Assert is a tester that is usefull to ensure stability and strength in the 
 * sructure of your code. For example, putting assert to test the type of 
 * arguements is a great way to ensure that everything goes as planned.
 *
 * Usage: 
 * first you have to import it: 
 * 
 * import Assert from "../../Core/Assert.js"; (the path might be different)
 * Since it is static, you don't have to make a instance of it.
 *
 * Assert.assert( 5 === 9, "error message" )
 */

"use strict";

export default class Assert {
  /**
   * @static
   * @param {bool}, the thing that is being tested
   * @param {string} message, the message if the assertion failed
   */
  static assert( condition, message ){
    if ( !condition ) {
      message = message || "Assertion failed";
      if ( typeof Error !== "undefined" ) {
        throw new Error( message );
      }
      throw message; 
    }
  }

}

