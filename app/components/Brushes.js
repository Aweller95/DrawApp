// Brushes
var brushes = {
  select(brushName) {
    currentBrush = brushName;
  },

  circle: {
    draw(curBrushSize = brushSize) {
      // ellipse(mouseX, mouseY, curBrushSize, curBrushSize);
      buffer.ellipse(mouseX, mouseY, curBrushSize);
    }
  },

  square: {
    draw(curBrushSize = brushSize) {
      // rect(mouseX, mouseY, curBrushSize, curBrushSize);
      buffer.rect(
        mouseX - curBrushSize / 2,
        mouseY - curBrushSize / 2,
        curBrushSize,
        curBrushSize
      );
    }
  },

  triangle: {
    draw(curBrushSize = brushSize) {
      var distToCorner = 0.6 * curBrushSize;
      // triangle(
      buffer.triangle(
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
    draw(curBrushSize = brushSize) {
      var angle = Math.random() * 2 * Math.PI; // radians
      var dist = (Math.random() * curBrushSize) / 2;
      var radialScaleFactor = 1 - (dist / curBrushSize);
      
      var maxDotSize = Math.round(0.2 * curBrushSize);
      var scaledDotSize = Math.round(maxDotSize * radialScaleFactor);
      
      var x_offset = Math.cos(angle) * dist;
      var y_offset = Math.sin(angle) * dist;

      buffer.ellipse(mouseX + x_offset, mouseY + y_offset, scaledDotSize);
    },
  }
};

function getRandomPos(size) {
  x = Math.random() * size;
  y = Math.random() * size;
  return { x, y };
}
