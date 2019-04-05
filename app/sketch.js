const defaultBGCol = 0;
var r = 0;
var g = 0;
var b = 0;
var brushSize = 30;
var currentBrush = "circle";
var rgb = [r, g, b];

// initialises canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  document.getElementById("colIndicator").style.background = getRGBColor();
  buffer = createGraphics(windowWidth, windowHeight);
  buffer.background(0, 0, 0, 0);
}

//draw function
function draw() {
  buffer.stroke(0, 0, 0);
  buffer.fill(r, g, b);
  image(buffer, 0, 0);

  // Record the mouse position, get the speed and calculate how much to reduce the brush size by
  posHistory.addPos(mouseX, mouseY);
  var scaleFactor = 1 - Math.min((posHistory.getSpeed() * 0.25) / brushSize, 1);

  if (mouseIsPressed) {
    velocityScaling
      ? brushes[currentBrush].draw(brushSize * scaleFactor)
      : brushes[currentBrush].draw();
  }

  if (keyIsPressed) {
    document.getElementById(
      "colIndicator"
    ).style.background = getRGBColor();
    switch (key) {
      // RGB to add more of that colour, EFV to subtract

      // Increase Red
      case "r":
        if (r < 255) {
          r++;
          document.getElementById("red").textContent = r;
        }
        break;

      // Reduce Red
      case "e":
        if (r) {
          r--;
          document.getElementById("red").textContent = r;
        }
        break;

      //Increase Green
      case "g":
        if (g < 255) {
          g++;
          document.getElementById("green").textContent = g;
        }
        break;

      // Reduce Green
      case "f":
        if (g) {
          g--;
          document.getElementById("green").textContent = g;
        }
        break;

      //Increase Blue
      case "b":
        if (b < 255) {
          b++;
          document.getElementById("blue").textContent = b;
        }
        break;

      // Reduce Blue
      case "v":
        if (b) {
          b--;
          document.getElementById("blue").textContent = b;
        }
        break;

      // Increase brush size
      case "=":
        plusBrush();
        break;

      // Reduce brush size
      case "-":
        minusBrush();
        break;

      // Test key
      case "q":
        buffer.background(0, 0, 0, 10);
        break;
      default:
        console.log(`You just pressed ${key}`);
    }
  }
}

// Resizes canvas to the size of users window.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  newBuffer = createGraphics(windowWidth, windowHeight);
  newBuffer.image(buffer, 0, 0, buffer.width, buffer.height);
  buffer = newBuffer;
  background(0);
}