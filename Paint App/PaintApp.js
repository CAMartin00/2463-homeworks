// Cameron Martin, February 2022
// Paint App Assignment

/* !!! The palette cannot be hidden (see keyPressed() comment), so this variable is unused !!! */
// Bool for determining if the Palette should be drawn
//let paletteDrawn = true;

// Array of color names for use when drawing and selecting color
let colors = ['red','orange','yellow','green','cyan','blue','magenta','brown','white','black'];

// Index of current color for drawing
let currentColor = 0;

// % of the screen width the palette covers
let paletteWidth = .1;

function setup() 
{

  // Create canvas size of window
  createCanvas(windowWidth,windowHeight);
}

// Draw the palette
function drawPalette()
{

  // Draw palette background
  fill(220);
  rect(0,0,paletteWidth*width, height);
  
  // Loop through colors array
  for(let i = 0; i < colors.length; i++)
    {

      // Set c to the current color and draw color swatch on palette
      let c = color(colors[i]);
      fill(c);
      rect(.125*paletteWidth*width,
           .01*height+.1*i*height,
           .75*paletteWidth*width,
           .08*height);
    }
}

function draw() 
{

  /* !!! This code would handle the drawing when the palette is visible versus not, however,
  the palette cannot be hidden (see keyPressed() comment), so this code remains incomplete
  and commented out. !!! */
  // When the palette is visible...
  /*if(paletteDrawn == true)
  {*/

    // When the mouse is pressed...
    if(mouseIsPressed)
    {

      // ... Outside of the palette...
      if(mouseX > paletteWidth*width)
      {

        // ... Draw a line in the currently selected color
        let mC = color(colors[currentColor]);
        stroke(mC);
        strokeWeight(4);
        line(mouseX,mouseY,pmouseX,pmouseY);

        // Recent stroke color and weight
        stroke(0);
        strokeWeight(1);
      }

      // ... Inside of the palette...
      else
      {

        // ... And inside the horizontal margins of the swatches 
        if(mouseX > .125*paletteWidth*width && mouseX < .875*paletteWidth*width)
        {

          // ... Loop through the colors array
          for(let i = 0; i < colors.length; i++)
          {

            // When the mouse is in a color swatch...
            if(mouseY > .01*height + .1*i*height && mouseY < .09*height + .1*i*height)
            {

              // ... Set the current color to the color swatch's color
              currentColor = i;
            }
          }
        }
      }
    }

    // Draw the palette
    drawPalette();
  /*}*/
}

/* !!! As the background hides the user's lines, hiding the palette has become much more difficult.
So, this function is currently disabled. If a solution is found, the code will be enabled. !!! */
// Toggle whether the palette is drawn on key-stroke
/* function keyPressed()
{
    if(paletteDrawn == true) 
      {
        paletteDrawn = false;
      }
      else 
      {
        paletteDrawn = true;
      }
} */