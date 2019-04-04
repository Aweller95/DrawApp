const defaultBGCol = 0;
var r = 0;
var g = 0;
var b = 0;
var brushSize = 30;
var currentBrush = "circle";

//position tracking
var posHistory = {
  maxRecords: 30,
  records: [],
  addPos(x, y){
    this.records.unshift({x: Math.round(x), y: Math.round(y)});
    if(this.records.length > this.maxRecords){
      this.records.pop();
    }
  },
  getDistBetweenTwoCoords(posA, posB){
    var horizontalDist = posB.x - posA.x;
    var verticalDist =  posB.y - posA.y;
    distance = Math.sqrt(horizontalDist**2 + verticalDist**2);
    return distance
  },
  getTravelDistance(){
    var total = 0;
    for(let i = 1; i < this.records.length; i++){
      total += this.getDistBetweenTwoCoords(this.records[i], this.records[i - 1]);
    }
    return total;
  },
  getSpeed(){
    return Math.round(this.getTravelDistance() / this.records.length)
  }
}
//toggle velocity scaling
var velocityScaling = false;
function keyPressed(){
  if(keyCode === 83){
    velocityScaling = !velocityScaling;
  }
}

function selectBrush(brushName) {
  currentBrush = brushName;
}

var brushes = {
  select(brushName) {
    currentBrush = brushName;
  },

  circle: {
    draw(curBrushSize = brushSize) {
      ellipse(mouseX, mouseY, curBrushSize, curBrushSize);
    }
  },

  square: {
    draw(curBrushSize = brushSize) {
      rect(mouseX, mouseY, curBrushSize, curBrushSize);
    }
  },
  triangle: {
    draw(curBrushSize = brushSize) {
      var distToCorner = 0.6 * curBrushSize;
      triangle(
        mouseX + 0,
        mouseY - distToCorner,

        mouseX - distToCorner * Math.cos((30 * Math.PI) / 180),
        mouseY + distToCorner * Math.sin((30 * Math.PI) / 180),

        mouseX + distToCorner * Math.cos((30 * Math.PI) / 180),
        mouseY + distToCorner * Math.sin((30 * Math.PI) / 180)
      );
    }
  },
  sprayPaint: {
    draw() {
      ellipse(mouseX, mouseY, brushSize, brushSize);
    }
  }
};

function squareBrush() {
  rect(mouseX, mouseY, brushSize, brushSize);
}

//Save canvas as .jpg
saveCanvas("DrawApp", ".jpg"); //this func is currently not accepting these params - outputs as untitled.png

//brush size tools

// reduce brush size
function minusBrush() {
  if (brushSize) {
    brushSize -= 1;
    document.getElementById("brushSizeVal").textContent = brushSize;
  }
}

// increase brush size
function plusBrush() {
  if (brushSize < 200) {
    brushSize += 1;
    document.getElementById("brushSizeVal").textContent = brushSize;
  }
}

// Reset color button
function reset() {
  r = 0;
  g = 0;
  b = 0;
  document.getElementById("red").textContent = r;
  document.getElementById("green").textContent = g;
  document.getElementById("blue").textContent = b;
  document.getElementById("colIndicator").style.background = getCurrentColour();
}

// initialises canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(defaultBGCol);
  document.getElementById("colIndicator").style.background = getCurrentColour();
}

//current selected color
function getCurrentColour() {
  return `rgb(${r}, ${g}, ${b})`;
}

//draw function
function draw() {

  // Record the mouse position, get the speed and calculate how much to reduce the brush size by
  posHistory.addPos(mouseX, mouseY);
  var scaleFactor = 1 - Math.min(posHistory.getSpeed() * 0.25 / brushSize, 1);

  fill(r, g, b);
  if (mouseIsPressed) {
    velocityScaling ?
      brushes[currentBrush].draw(brushSize * scaleFactor) :
      brushes[currentBrush].draw();
  }

  if (keyIsPressed) {
    document.getElementById(
      "colIndicator"
    ).style.background = getCurrentColour();
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

      // I don't know how modifier keys work. Probably best not to use them anyway

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
        background(0, 0, 0, 10);
        break;
      default:
        console.log(`You just pressed ${key}`);
    }
  }
}

// Resizes canvas to the size of users window.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}