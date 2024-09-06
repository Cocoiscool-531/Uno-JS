const hexAbc = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
const numbers = ["0","1","2","3","4","5","6","7","8","9","Skip","Reverse","+2","","+4", ""];
const colors = ["Red", "Yellow", "Blue", "Green", "Wild"];
const deckStd = [];
const hand = [];
const urlParams = new URLSearchParams(window.location.search);
const player = "player"+urlParams.get('player');
const imageContainer = document.getElementById("imageContainer");

let jsonData;
let discard = "";
let discardColor;
let discardNumber;
let deckCur = [];


const sleep = ms => new Promise(r => setTimeout(r, ms));
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function refreshHand(){
    header.innerHTML = "Can Play: " + colors[discardColor] + " " + numbers[discardNumber];
    
    imageContainer.innerHTML = "";

    hand.forEach((card, index) => {
        const img = document.createElement("img");
        img.src = "../media/img/" + card + ".png";
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
    discardImg.src = "../media/img/" + discard + ".png";
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
        isTurn() &&
        handIndex < hand.length &&
        currentCard.charAt(0) == discardColor ||
        currentCard.charAt(0) == 4 ||
        currentCard.charAt(1) == hexAbc[discardNumber]
    ){
        discard = hand.splice(handIndex, 1)[0];
        refreshHand();
        endTurn();
    }
}

async function init(){

  const data = {
    player: player,
    hand: hand, 
    online: true
  };
    
  updateRemoteJson(data);
  
  waitForStart().then(() => {

    console.log("Game Started");

    getDeck();
    
    header.innerHTML = deckCur.join(", ");
    
    console.log("Dealing Hand");
    for (let i = 0; i < 7; i++) {
        hand.push(deckCur.pop());
    }

    discard+=getRandomInt(4).toString();
    discard+=getRandomInt(10).toString();

    deckCur.splice(deckCur.indexOf(discard), 1);
    
    refreshHand()
  });
}

function endGame(){
 const data = {
      player: player,
      hand: [], 
      online: false
    }; 
    updateRemoteJson(data);
   
  
  window.location.href = window.location.pathname.split('/').slice(0, -3).join('/') + '/';


}

async function waitForStart(){
  document.getElementById("discardImg").src = "../media/img/undefined.png";
  document.getElementById("header").innerHTML = "Waiting for game to start";

  let count = 0;
  while(!(await isStart())){
    await sleep(5000);
    count++;
    console.log("Waiting for start at ", count);
  }
  console.log("Game Started at ", count);
}

async function updateLocalJson() {
  try {
    const response = await fetch('http://localhost:3000/get-data');  // URL to your server's endpoint
    jsonData = await response.json();  // Parse the response as JSON
    //console.log('Fetched data:', jsonData);  // Log the fetched get-data
    deckCur = jsonData.data.deck;
    discard = jsonData.data.discard;
    
  } catch (error) {
    console.error('Error fetching data:', error);
    jsonData = {};  // Set jsonData to an empty object on error
  }
}

function updateRemoteJson(data){
  fetch('http://localhost:3000/update-player', {
    method: 'POST',  // HTTP method
    headers: {
      'Content-Type': 'application/json'  // Content-Type header
    },
    body: JSON.stringify(data)  // Convert JavaScript object to JSON string
  })
  .then(response => response.json())  // Parse the JSON response
  .then(result => {
    console.log('Success:', result);  // Log the result from the server
  })
  .catch(error => {
    console.error('Error:', error);  // Handle any errors
  });
}

async function getDeck(){
  await updateLocalJson();  // Wait for data to be fetched
  return jsonData.data.deck;
}

async function isTurn() {
  await updateLocalJson();  // Wait for data to be fetched
  
  if (!jsonData || !jsonData.data) {
    console.error('jsonData is undefined or does not have data');
    return false;
  }
  
  let turn = jsonData.data.turn;
  
  return turn === player;
}

async function isStart() {
  await updateLocalJson();  // Wait for data to be fetched

  if (!jsonData || !jsonData.player1 || !jsonData.player2) {
    console.error('jsonData is undefined or missing player data');
    return false;
  }

  let p1 = jsonData.player1.online;
  let p2 = jsonData.player2.online;
  
  console.log('p1:', p1, 'p2:', p2, 'combo:', p1 && p2);

  return p1 == p2;
}

function endTurn(){
  fetch(`http://localhost:3000/end-turn?player=${player}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

document.addEventListener("DOMContentLoaded", init);
