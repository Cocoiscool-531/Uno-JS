const hexAbc = [
    "0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"
];
const deckCur = [];
const deckStd = [];
const hand = [];
let discard = "";

const sleep = ms => new Promise(r => setTimeout(r, ms));
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
function refreshHand(){
    document.getElementById("demo").innerHTML = hand.join(", ") + ":" + discard;
    for (let i = 0; i < 15; i++) {
        document.getElementById("hand"+i).src = "/Web-Games/Uno/media/img/" + hand[i] + ".png";
    }
}

function playCard(handIndex){
    if(document.getElementById("hand"+handIndex).src != "/Uno/media/img/undefined.png"){
        discard = hand.splice(handIndex, 1)[0];
        refreshHand();
    }
}

function init(){
    createDeck();
    shuffle(deckCur);
    
    // Update the demo element with shuffled deck
    document.getElementById("demo").innerHTML = deckCur.join(", ");
    
    // Deal 7 cards into the hand
    for (let i = 0; i < 7; i++) {
        hand.push(deckCur.pop());
        // Make sure the image paths are correct
    }
    discard = deckCur.pop();
    refreshHand();
}

function createDeck(){
    for(let i = 0; i < 4; i++){
        deckCur.push("4D", "4E");
    }
    
    document.getElementById("demo").innerHTML = "Creating deck...";
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 13; j++){
            for(let k = 0; k < 2; k++){
                char1 = i.toString();
                char2 = hexAbc[j];
                toAdd = char1.concat(char2);
                deckCur.push(toAdd);
            }
        }
    }
    document.getElementById("demo").innerHTML = "Deck Created";
}

// Ensure the DOM is fully loaded before running the main function
document.addEventListener("DOMContentLoaded", init);