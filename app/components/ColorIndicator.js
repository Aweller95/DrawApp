var rgbToHex = function(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(r, g, b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return "#" + red + green + blue;
};

//current selected color
function getRGBColor() {
  return `rgb(${r}, ${g}, ${b})`;
}

//set hex display text
function displayHex() {
  document.getElementById('hex').textContent = fullColorHex(r, g, b);
}