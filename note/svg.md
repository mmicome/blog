
Set up

//First we start with some objects we want to move and give them the class "draggable", for example:

<rect class="draggable"
      x="30" y="30"
      width="80" height="80"
      fill="blue" />
<rect class="draggable"
      x="160" y="50"
      width="50" height="50"
      fill="green" />

//This doesn't do very much, but it means we can style the elements with CSS. For example, it's quite important to let the user know that an object can be dragged, and the most common way to indicate that is to change the cursor:

<style>
    .draggable {
        cursor: move;
    }
</style>

 

//When the mouse is moved over any element with the class 'draggable', the cursor will change to a 'move' cursor (normally a hand or crossed arrows).

Selecting an element

//The click-and-drag functionality is split into two obvious events. The first is the click, which is triggered when the left mouse button is pressed down while the cursor is over an object. When this happens, we want to select that object by assigning it to a variable. Perhaps less obviously, we also want to record the position of the mouse so that when it moves, we know by how much it has moved.

//To the elements you want to be able to move, add an onmousedown trigger that calls a function selectElement. It should pass the event, evt, so we know which element triggered it and where the mouse was at the time. For example:

<rect class="draggable"
      x="30" y="30"
      width="80" height="80"
      fill="blue"
      transform="matrix(1 0 0 1 0 0)"
      onmousedown="selectElement(evt)"/>

 

//In order to move the element we also need to add a transform matrix. We could just use transform="translate(0 0)", but using a matrix is more versatile. The matrix is currently set at (1 0 0 1 0 0), which is the equivalent of the identity matrix (so has no effect).

//Now we add the code to deal with selecting the element.

<script type="text/ecmascript"> <![CDATA[
  var selectedElement = 0;
  var currentX = 0;
  var currentY = 0;
  var currentMatrix = 0;

  function selectElement(evt) {
    selectedElement = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
    
      for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
      }

    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
  }
]]> </script>

 

//When we mousedown on the element, we record what element it is and what it's current transformation is (which we save as an array of floats for easy manipulation). We also record the x and y coordinates of the mousedown event because we need to be able to calculate relative mouse movements. Finally, we add an new event trigger for onmousemove, which calls a function, moveElement().

Dragging an element

//The function that deals with moving the element looks like this:

function moveElement(evt){
  dx = evt.clientX - currentX;
  dy = evt.clientY - currentY;
  currentMatrix[4] += dx;
  currentMatrix[5] += dy;
  newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
            
  selectedElement.setAttributeNS(null, "transform", newMatrix);
  currentX = evt.clientX;
  currentY = evt.clientY;
}

 

//This function finds the new coordinates of the mouse and how this position differs from the previously recorded position. It then updates the 4th and 5th (counting from 0) numbers in array representing the selected element's transformation, which corresponds to a translation dx units left and dy units down. The array is used to generate a new matrix which is added to the selected element. Finally, the new position of the mouse is recorded.

Deselecting an element

//If you view the SVG now, you'll be able to select and element and move it, but you won't be able to 'let go' and select a new one. To deselect we add a new function:

function deselectElement(evt){
  if(selectedElement != 0){
    selectedElement.removeAttributeNS(null, "onmousemove");
    selectedElement.removeAttributeNS(null, "onmouseout");
    selectedElement.removeAttributeNS(null, "onmouseup");
    selectedElement = 0;
  }
}

//The function should be fairly self-explanatory, we just remove the onmousemove trigger and set the selectElement variable to 0. It also removes onmouseout and onmouseup triggers, which we haven't yet added. They can be added when the element is selected along with the onmousemove trigger and should call the deselect function, e.g.:

selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");


https://blog.csdn.net/column/details/svg-html5.html
https://blog.csdn.net/starwmx520/article/details/50478167
https://blog.csdn.net/fengguangle/article/details/78019880
https://www.csdn.net/article/1970-01-01/2805736
https://baike.baidu.com/item/%E4%BA%91%E6%8A%80%E6%9C%AF
https://www.cnblogs.com/xiaofeixiang/p/3872142.html
https://www.cnblogs.com/Philoo/archive/2011/11/16/jeasyui_api_datagrid.html
https://www.cnblogs.com/shy1766IT/p/5184888.html
https://www.cnblogs.com/youring2/archive/2013/03/01/2938661.html
http://www.cnblogs.com/tracylin/p/5346314.html
