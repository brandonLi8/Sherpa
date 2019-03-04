/**
 * Core
 * ScreenView.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/13/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * File for the screen View
 * Uses ONLY Node.js
 *
 * ## Description of ScreenView:
 * ScreenView is the actual tree being played out.
 * 
 * For example:
 *     Dom -> Html  <- Document
 *             |
 *     Dom -> body
 *             |
 *   Node -> wrapper 
 *            / \
 *   Node -> A   B <- Node
 *          / \
 * Node -> D   E <- Node
 *
 * The advantage of this is that you can add children to a specific id/class.
 * However it will be searched through the root node and not the body.
 *
 */

// modules
import Assert from "../Assert/Assert.js";


"use strict";
export default class ScreenView {
  /**
   * Creates a Screen View
   * @public
   * @constructor
   *
   * @param {Node} rootNode - the rootNode of the screenView
   * this will add this node to the body.
   * @param {object} htmlStyle @optional, you have the chance to overide the 
   * style for the html
   * @param {object} bodyStyle @optional, you have the change the overide the 
   * style for the body
   *
   */ 
  
  constructor( rootNode, htmlStyle, bodyStyle ){
    Assert.assert(
      rootNode && rootNode.__proto__.constructor.name === "Node",
      "@param rootNode must be of node type. Instead it was a " +
      ( ( rootNode && rootNode.__proto__.constructor.name ) || rootNode )
    );
    // provide the default for the screen ( style html )
    var html = {
      maxWidth: "100%",
      overflowX: "hidden",
      height: "100%",
      background: "#26262a",
    };

    // Assert.assert(
    //   htmlStyle || htmlStyle.__proto__.constructor.name === "Node",
    //   "@param rootNode must be of node type. Instead it was a " +
    //   ( ( rootNode && rootNode.__proto__.constructor.name ) || rootNode )
    // );
    // now overide with the user provided styling if they choose to overide
    var htmlStyleOveride = { ...html, ...htmlStyle };
    // provide the default for the screen ( style body )
    var body = {
      maxWidth: "100%",
      height: "100%",
      background: "#FFF",
      margin: 0
    };
    // now overide with the user provided styling if they choose to overide
    var bodyStyleOveride = { ...body, ...htmlStyle };

    // @private
    this.bodyNode = document.getElementsByTagName( "body" )[ 0 ];
    this.htmlNode = document.getElementsByTagName( "html" )[ 0 ];
    // now set the styles
    setStyle( this.bodyNode, bodyStyleOveride );
    setStyle( this.htmlNode, htmlStyleOveride );
    
    function setStyle( node, style ) {
      let keys = Object.keys( style );
      for ( var i = 0; i < keys.length; i++ ){
        node.style[ keys[ i ] ] = style[ keys[ i ] ];
      }
    }
    // @public
    this.rootNode = rootNode;

    rootNode.parent = this.body;

    this.bodyNode.appendChild( rootNode.DOMobject ); // this will display it
  } 
  /**
   * Delete the bond between the body and the root Node
   * @public
   * This will remove it from the display ( the nodes itself wont be disposed )
   */
  dispose(){
    // remove its children
    this.body.innerHTML = "";
    // break the bond
    this.rootNode.parent = null;
  }
  /**
   * add child to a parent inside the tree
   * @public
   *
   * @param {Object} [options] - Object with its attributes.
   * options { all @required
   *   node: {node} - the node object being added
   *   parentType: - the search method ["class", "id"]
   *   parentString: - the id/class name of the parent to search for
   * }
   * This will add it to the first instance of it inside of the root Order list
   */
  addChild( options ){ 
    // append the child to the parent
    let rootOrder = this.rootOrderList
    if ( options.parentType === "class" ){
      rootOrder.filter( node => node.class === options.parentString )
      let parentNode;
      for ( var i = 0; i < rootOrder.length; i++ ){
        if ( rootOrder[ i ].class === options.parentString ){
          parentNode = rootOrder[ i ];
          break;
        }
      }
      if ( !parentNode ) return;
      if ( parentNode.class != options.parentString ) return;
      parentNode.addChild( options.node );
    }
    if ( options.parentType === "id" ){
      rootOrder.filter( node => node.id === options.parentString )
      let parentNode;
      for ( var i = 0; i < rootOrder.length; i++ ){
        if ( rootOrder[ i ].id === options.parentString ){
          parentNode = rootOrder[ i ];
          break;
        }
      }
      if ( !parentNode ) return;
      if ( parentNode.id != options.parentString ) return;
      parentNode.addChild( options.node );
    }
  }
  /**
   * return the root order traversal in a list format
   * @private
   * @recursive
   * @return {array}  the root order representation of the tree
   * For example if the screen view is:
   *       A 
   *      / \
   *     B   C 
   *   / | \
   *  D  E  F
   * then the root order is [ A, B, C, D, E, F ]
   *
   */
  get rootOrderList(){
    // the result array
    let result = [];
    result.push( this.rootNode );
    // automatically push the root node

    // make sure there are children
    if ( !this.rootNode.children.length ) return result;
     
    rootHelper( this.rootNode )
    function rootHelper( node ){
      if ( node.children.length === 0 ) result.push( node );
      for ( var i = 0; i < node.children.length; i++ ){
        rootHelper( node.children[ i ] );
      }
    }
    return result;
  }
}
