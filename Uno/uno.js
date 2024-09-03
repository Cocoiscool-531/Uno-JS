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

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
function refreshHand(){
    document.getElementById("demo").innerHTML = hand.join(", ") + ":" + discard;
    for (let i = 0; i < 15; i++) {
        document.getElementById("hand"+i).src = "Uno/media/img/" + hand[i] + ".png";
    }
}

function playCard(handIndex){
    console.warn("playCard init card at index " + handIndex);
    if(document.getElementById("hand"+handIndex).src != "/Uno/media/img/undefined.png"){
        console.warn("played card at index " + handIndex);
        discard = hand.splice(handIndex, 1)[0];
        refreshHand();
    }
}

function init(){
    createDeck();
    shuffle(deckCur);
    
    document.getElementById("demo").innerHTML = deckCur.join(", ");
    
    console.log("Dealing Hand");
    for (let i = 0; i < 7; i++) {
        hand.push(deckCur.pop());
    }
    discard = deckCur.pop();
    refreshHand();
}

function createDeck(){
    for(let i = 0; i < 4; i++){
        deckCur.push("4D", "4E");
    }
    
    console.log("Deck Creating");
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
    console.log("Deck Created");
}

// Ensure the DOM is fully loaded before running the main function
document.addEventListener("DOMContentLoaded", init);