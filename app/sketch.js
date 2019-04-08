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
  document.getElementById('hex').textContent = fullColorHex(r, g, b);
}

//draw function
function draw() {
  buffer.stroke(0, 0, 0);
  buffer.fill(r, g, b);
  image(buffer, 0, 0);

  // Record the mouse position, get the speed and calculate how much to reduce the brush size by
  posHistory.addPos(mouseX, mouseY);
  var scaleFactor = 1 - Math.min((posHistory.getSpeed() * 0.5) / brushSize, 1);

  if (mouseIsPressed) {
    velocityScaling
      ? brushes[currentBrush].draw(brushSize * scaleFactor)
      : brushes[currentBrush].draw();
  }

  if (keyIsPressed) {
    document.getElementById("colIndicator").style.background = getRGBColor();
    keybinds[key]();
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