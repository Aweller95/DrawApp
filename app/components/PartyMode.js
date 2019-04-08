function partyModeCheck(){
  if(partyMode){
    buffer.fill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }
}

function togglePartyMode(){
  partyMode = !partyMode;
}