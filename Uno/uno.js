const hexAbc = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
const numbers = ["0","1","2","3","4","5","6","7","8","9","Skip","Reverse","+2","","+4", ""]
const colors = ["Red", "Yellow", "Blue", "Green", "Wild"]
const deckCur = [];
const deckStd = [];
const hand = [];
let discard = "";
let discardColor;
let discardNumber;

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
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function refreshHand(){
    discardColor = parseInt(discard.charAt(0));
    discardNumber = hexAbc.indexOf(discard.charAt(1));
    
    document.getElementById("header").innerHTML = "Can Play: " + colors[discardColor] + " " + numbers[discardNumber];
    
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";

    hand.forEach((card, index) => {
        const img = document.createElement("img");
        img.src = "media/img/" + card + ".png";
        img.id = "hand" + index;
        img.className = "card";
        img.onclick = () => playCard(index);
        if (img.src.includes("/media/img/undefined.png")) {
            img.classList.add("hidden");
        } else {
            img.classList.remove("hidden");
        }
        imageContainer.appendChild(img);
    });

    // Update the discard image
    const discardImg = document.getElementById("discardImg");
    discardImg.src = "media/img/" + discard + ".png";
}

function drawCard(){
    console.log("drawCard init");
    if(deckCur.length > 0){
        console.log("drawCard drawing");
        hand.push(deckCur.pop());
        refreshHand();
    }
}

function playCard(handIndex){
    let currentCard = hand[handIndex];
    if(
        handIndex < hand.length &&
        currentCard.charAt(0) == discardColor ||
        currentCard.charAt(0) == 4 ||
        currentCard.charAt(1) == hexAbc.indexOf(discardNumber)
    ){
        discard = hand.splice(handIndex, 1)[0];
        refreshHand();
    }
}

function init(){
    createDeck();
    shuffle(deckCur);
    
    document.getElementById("header").innerHTML = deckCur.join(", ");
    
    console.log("Dealing Hand");
    for (let i = 0; i < 7; i++) {
        hand.push(deckCur.pop());
    }

    discard+=getRandomInt(4).toString();
    discard+=getRandomInt(10).toString();

    deckCur.splice(deckCur.indexOf(discard), 1);
    
    refreshHand();
}

function createDeck(){
    
    console.log("Deck Creating");
    for(let i = 0; i < 4; i++){
        deckCur.push(i+"0")
        for(let j = 1; j < 13; j++){
            for(let k = 0; k < 2; k++){
                char1 = i.toString();
                char2 = hexAbc[j];
                toAdd = char1.concat(char2);
                deckCur.push(toAdd);
            }
        }
    }
    deckCur.push("4D","4D","4D","4D","4E","4E","4E","4E");

    console.log("Deck Created");
}

document.addEventListener("DOMContentLoaded", init);