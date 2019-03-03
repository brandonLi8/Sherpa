<!--  
  README.md
  Created by Brandon Li on 3/2/19.
  Copyright © 2019 Brandon Li. All rights reserved. 
-->
Observe
=======
By [Brandon Li](https://github.com/brandonLi8)

## Description:

An ObservableVariable is a variable that can be observed for changes.
 
You have the option to supply listeners to a change to the variable.value property
  
The user can provide the listener in the constructor. There are methods to remove the listener or change it to another function.
  
When listeners are no longer necessary, it is best to call the removeListener method to avoid leaks.

-----------

Here's a simple example:

```javascript 
// First you must import it:
import ObservableVariable from "../Sherpa/Observe/ObservableVariable";
// your path might be different

// create a function 
 let func = ( newValue ) => {
   console.log( "change!" )
 }
 
// create a instance of the variable
var observableVariable = new ObservableVariable( 9, func );
  
observableVariable.value = 5; // this calls func! => "change!"
// note: you dont have to provide the listener right away, infact you can add
// multiple listeners that will all be called. Listeners can be added any time
```

## Get Involved

Contact me via <a href="mailto:brandon.li820@icloud.com" target="_blank"> email </a>

Help improve, create a <a href="https://github.com/brandonLi8/Sherpa/issues" target="_blank">New Issue</a>

I used <a href="https://github.com/brandonLi8/Portfolio-Website/blob/master/Style.md" target="_blank"> this </a> style guildine



