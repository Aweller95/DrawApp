function randomColor() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  document.getElementById("red").textContent = r;
  document.getElementById("green").textContent = g;
  document.getElementById("blue").textContent = b;
  document.getElementById("colIndicator").style.background = getRGBColor();
  displayHex();
}

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

// clean canvas
function cleanScreen() {
  buffer.clear();
  background(0);
}

// Reset color button
function reset() {
  r = 0;
  g = 0;
  b = 0;
  document.getElementById("red").textContent = r;
  document.getElementById("green").textContent = g;
  document.getElementById("blue").textContent = b;
  document.getElementById("colIndicator").style.background = getRGBColor();
}

//Hides / shows brush shapes
function shapes_visibility() {
  var shapes = document.getElementsByClassName("shapes");
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].classList.contains("hidden")) {
      shapes[i].classList.remove("hidden");
    } else {
      shapes[i].classList.add("hidden");
    }
  }
}

// Party mode makes every frame draw a random colour
function partyModeCheck() {
  if (partyMode) {
    buffer.fill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }
}
function togglePartyMode() {
  partyMode = !partyMode;
}

// Fill canvas with current col
function fillCanvas(){
  background(r, g, b);
  buffer.background(r, g, b);
}
