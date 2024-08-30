const hexAbc = [
    "0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"
];
const deckCur = [];
const deckStd = [];
const hand = [];

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
async function createDeck(){
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

createDeck();
shuffle(deckCur);
for(let i = 0; i < 7; i++){
    hand.push(deckCur.pop());
    document["deck"+i].src = "/Web-Games/Uno/media/img/"+hand[i]+".png"
}