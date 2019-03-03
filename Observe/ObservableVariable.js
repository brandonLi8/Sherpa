/**
 * Sherpa
 * ObservableVariable.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/19/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 *
 * ## Description:
 * An ObservableVariable is a variable that can be observed for changes.
 * 
 * You have the option to supply listeners to a change to the variable.value 
 * property
 *
 * The user can provide the listener in the constructor.
 * There are methods to remove the listener or change it to another function.
 *
 * When listeners are no longer necessary, it is best to call the removeListener
 * method to avoid leaks.
 *
 * Usage: To change the variable itself, you must use the .value property
 *
 * First you must import it:
 *
 * import ObservableVariable from "../Sherpa/Observe/ObservableVariable";
 * // your path might be different
 *
 * // create a function 
 * let func = ( newValue ) => {
 *   console.log( "change!" )
 * }
 * 
 * // create a instance of the variable
 * var observableVariable = new ObservableVariable( 9, func );
 *
 * observableVariable.value = 5; // this calls func! => "change!"
 *
 * // note: you dont have to provide the listener right away, infact you can add
 * // multiple listeners that will all be called. Listeners can be added any
 * // time
 */

// modules 
import Assert from "../Assert/Assert.js";

"use strict";

export default class ObservableVariable {
  /**
   * @constructor
   *
   * Set up the variable and its initial listener if provided
   * @param {any} value - the value of the variable
   * @param {function} listener - the listener of the function
   * 
   * Note: the value can be set to null or undefined and still work
   * Listeners will be passsed the new value as the paramter
   */
  constructor( value, listener ){
    // make sure that if there is a listener, it is a function
    if ( listener ){
      Assert.assert(
        listener.__proto__.constructor.name === "Function",
        "@param listener must be a function. Instead you provided a " +
        ( ( listener.__proto__.constructor.name ) || null )
      );
    }

    // @private the method called on the variable change
    this.listeners = [ listener ];

    // create a variable to listen to
    var val = value; 

    // define this.value as something that is observable
    Object.defineProperty( 
      this, 
      'value', 
      {
        /**
         * @public
         * Gets the value and returns it
         * @return {any} the value of the variable
         */
        get: function() { 
          return val; 
        },
        /**
         * @public
         * Sets the variable and calls the listener
         * @param {any} set the value to a new value
         */
        set: function( newValue ) {
          val = newValue;
          // call the listener with the newValue as the parameter
          for ( var i = 0; i < this.listeners.length; i++ ){
            if ( this.listeners[ i ] ) this.listeners[ i ]( newValue );
          } 
          
        }
    } );
  }
  /**
   * @public
   * @return {string} - the string format or the value
   */
  toString(){
    if ( this.value )
      return this.value.toString();
    else
      return this.value
  }
  /**
   * @public
   * Add a listener to observe the change of the variable
   * @param {function} newListener - the function called when the value changes
   */
  addListener( listener ){
    Assert.assert(
      listener && listener.__proto__.constructor.name === "Function",
      "@param listener must be a function. Instead you provided a " +
      ( ( listener && listener.__proto__.constructor.name ) || null )
    );
    

    this.listeners.push( listener );
    
  }
  /**
   * @public
   * Remove a specific listener
   * @param {function} - the listener being removed
   * 
   */
  removeListener( listener ){
    Assert.assert(
      listener && listener.__proto__.constructor.name === "Function",
      "@param listener must be a function. Instead you provided a " +
      ( ( listener && listener.__proto__.constructor.name ) || null )
    );
    Assert.assert( 
      this.listeners.includes( listener ),
      "@param listener isn't a listener of this variable: " + this.toString()
    );
    // filter out the listener
    this.listeners = this.listeners.filter( function( value ){
      return value != listener;
    });
  }

}

