const defaultBGCol = 0;


var r = 0;
var g = 0;
var b = 0;
var brushSize = 30;
var currentBrush = 'circle';

var resetButton = document.getElementById('reset');
resetButton.onclick = reset;

var subtractBrush = document.getElementById('subtract');
var addBrush = document.getElementById('add');

function selectBrush(brushName) {
  currentBrush = brushName;
}

var brushes = {
  circle: {
    draw() {
      ellipse(mouseX, mouseY, brushSize, brushSize)
    },
    select() {
      selectBrush('circle');
    }
  },

  square: {
    draw() {
      rect(mouseX, mouseY, brushSize, brushSize)
    },
    select() {
      selectBrush('square');
    }
  },
  triangle: {
    draw() {
      triangle(
        mouseX + 0,
        mouseY - brushSize,

        mouseX - brushSize * Math.cos(30 * Math.PI / 180),
        mouseY + brushSize * Math.sin(30 * Math.PI / 180),

        mouseX + brushSize * Math.cos(30 * Math.PI / 180),
        mouseY + brushSize * Math.sin(30 * Math.PI / 180)
      )
    },
    select() {
      selectBrush('triangle');
    }
  },
  sprayPaint: {
    draw() {
      ellipse(mouseX, mouseY, brushSize, brushSize)
    }
  },
  



};

squareBrush.onclick = squareBrush;
triangleBrush.onclick = triangleBrush


subtractBrush.onclick = minusBrush;
addBrush.onclick = plusBrush;

function squareBrush() {
  rect(mouseX, mouseY, brushSize, brushSize)
}

function minusBrush() {
  brushSize -= 1;
  document.getElementById('brushSizeVal').textContent = brushSize
}

function plusBrush() {
  brushSize += 1;
  document.getElementById('brushSizeVal').textContent = brushSize
}

function reset() {
  r = 0;
  g = 0;
  b = 0;
  document.getElementById('red').textContent = r;
  document.getElementById('green').textContent = g;
  document.getElementById('blue').textContent = b;
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(defaultBGCol)
  document.getElementById('colIndicator').style.background = getCurrentColour();
}

function getCurrentColour() {
  return (`rgb(${r}, ${g}, ${b})`);
}

function draw() {

  fill(r, g, b)
  if (mouseIsPressed) {
    brushes[currentBrush].draw();
  }

  if (keyIsPressed) {
    document.getElementById('colIndicator').style.background = getCurrentColour();
    switch (key) {
      // RGB to add more of that colour, EFV to subtract
      case 'r':
        if (r < 255) {
          r++;
          document.getElementById('red').textContent = r;
        }
        break;
      case 'e':
        if (r) {
          r--;
          document.getElementById('red').textContent = r;
        }
        break;

      case 'g':
        if (g < 255) {
          g++;
          document.getElementById('green').textContent = g;
        }
        break;
      case 'f':
        if (g) {
          g--;
          document.getElementById('green').textContent = g;
        }
        break;


      case 'b':
        if (b < 255) {
          b++;
          document.getElementById('blue').textContent = b;
        }
        break;
      case 'v':
        if (b < 255) {
          b--;
          document.getElementById('blue').textContent = b;
        }
        break;

      // I don't know how modifier keys work. Probably best not to use them anyway
      case '=':
        plusBrush();
        break;
      case '-':
        minusBrush();
        break;
      case 'q':
        background(0, 0, 0, 10)
        break;
      default:
        console.log(`You just pressed ${key}`);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}