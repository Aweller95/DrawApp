var colDict = {
  r: 'red',
  g: 'green',
  b: 'blue'
}

function modifyColVal(col, type){
  if(type == 'add'){
    window[col]++;
    document.getElementById(colDict[col]).textContent = window[col];
  } else {
    window[col]--;
    document.getElementById(colDict[col]).textContent = window[col];
  }
  displayHex();
}

const keybinds = {
  r: function(){
    modifyColVal('r', 'add');
  },
  e: function(){
    modifyColVal('r', 'subtract');
  },
  g: function(){
    modifyColVal('g', 'add');
  },
  f: function(){
    modifyColVal('g', 'subtract');
  },
  b: function(){
    modifyColVal('b', 'add');
  },
  v: function(){
    modifyColVal('b', 'subtract');
  },
 '=': function(){
    plusBrush()
 },
  '-': function(){
    minusBrush()
  },
  q: function(){
    buffer.background(0, 0, 0, 10);
  },
  ' ': function(){
    togglePartyMode()
  },
  a: function(){
    randomColor();
  },
}