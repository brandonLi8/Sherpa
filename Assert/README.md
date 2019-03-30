<!--  
  README.md
  Created by Brandon Li on 3/2/19.
  Copyright © 2019 Brandon Li. All rights reserved. 
-->
Assert
=======
By [Brandon Li](https://github.com/brandonLi8)

## General

Assert is a tester that is usefull to ensure stability and strength in the sructure of your code. For example, putting assert to test the type of arguements is a great way to ensure that everything goes as planned, preventing brittle code.

-----------

Here's a simple example:

```javascript 
// import it
import Assert from "../../Core/Assert.min.js"; // (the path might be different)


// Since it is static, you don't have to make a instance of it.
var variable = ... 
Assert.assert( typeof variable === "number", "error message" ); 
// this will make sure variable is a number type, or it will throw a error

```

## Get Involved

Contact me via <a href="mailto:brandon.li820@icloud.com" target="_blank"> email </a>

Help improve, create a <a href="https://github.com/brandonLi8/Sherpa/issues" target="_blank">New Issue</a>

I used <a href="https://github.com/brandonLi8/Portfolio-Website/blob/master/Style.md" target="_blank"> this </a> style guildine


