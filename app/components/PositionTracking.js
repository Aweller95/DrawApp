//position tracking
var posHistory = {
    maxRecords: 30,
    records: [],
    addPos(x, y) {
      this.records.unshift({ x: Math.round(x), y: Math.round(y) });
      if (this.records.length > this.maxRecords) {
        this.records.pop();
      }
    },
    getDistBetweenTwoCoords(posA, posB) {
      var horizontalDist = posB.x - posA.x;
      var verticalDist = posB.y - posA.y;
      distance = Math.sqrt(horizontalDist ** 2 + verticalDist ** 2);
      return {distance, vector: {x: horizontalDist, y: verticalDist}};
    },
    getTravelDistance() {
      var total = 0;
      for (let i = 1; i < this.records.length; i++) {
        total += this.getDistBetweenTwoCoords(
          this.records[i],
          this.records[i - 1]
        ).distance;
      }
      return total;
    },
    getSpeed() {
      return Math.round(this.getTravelDistance() / this.records.length);
    },
    getVector() {
      return this.getDistBetweenTwoCoords(this.records[0], this.records[this.records.length - 1]).vector;
    }
  };
  //toggle velocity scaling
  var velocityScaling = false;
  function keyPressed() {
    if (keyCode === 83) {
      velocityScaling = !velocityScaling;
    }
  }
  
  function selectBrush(brushName) {
    currentBrush = brushName;
  }