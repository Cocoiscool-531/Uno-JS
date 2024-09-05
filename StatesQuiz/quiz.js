// Array with all the us states as their USPS 2 letter code
const statesAbr = [ 
"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
"HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
"MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
"SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
]
// Array with all the us states as their full name
const statesFull = [
"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
"Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
"North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]
// Array with all the us states as their file path
const statesImg = [
"/media/img/AL.png", "/media/img/AK.png", "/media/img/AZ.png", "/media/img/AR.png", "/media/img/CA.png", "/media/img/CO.png", "/media/img/CT.png", "/media/img/DE.png", "/media/img/FL.png", "/media/img/GA.png",
"/media/img/HI.png", "/media/img/ID.png", "/media/img/IL.png", "/media/img/IN.png", "/media/img/IA.png", "/media/img/KS.png", "/media/img/KY.png", "/media/img/LA.png", "/media/img/ME.png", "/media/img/MD.png",
"/media/img/MA.png", "/media/img/MI.png", "/media/img/MN.png", "/media/img/MS.png", "/media/img/MO.png", "/media/img/MT.png", "/media/img/NE.png", "/media/img/NV.png", "/media/img/NH.png", "/media/img/NJ.png",
"/media/img/NM.png", "/media/img/NY.png", "/media/img/NC.png", "/media/img/ND.png", "/media/img/OH.png", "/media/img/OK.png", "/media/img/OR.png", "/media/img/PA.png", "/media/img/RI.png", "/media/img/SC.png",
"/media/img/SD.png", "/media/img/TN.png", "/media/img/TX.png", "/media/img/UT.png", "/media/img/VT.png", "/media/img/VA.png", "/media/img/WA.png", "/media/img/WV.png", "/media/img/WI.png", "/media/img/WY.png"
]

let audioQuestions = []
let mapQuestions = []
let questionTypeRange = [0, 1]
let currentQuestion = 0;
let totalQuestions = 100;
let screenState = "";


const sleep = ms => new Promise(r => setTimeout(r, ms));
function shuffleArray(array) {
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

function init(){
  mapQuestions = statesAbr;
  audioQuestions = statesAbr;
  shuffleArray(mapQuestions);
  shuffleArray(audioQuestions);
}

/*
States:
0: Starting
1: Post Question - Correct
2: Post Question - Incorrect
3: Map Question
4: Audio Question
*/

function refreshPage(state){
  switch(state){
    case 0:
      document.getElementById("header").innerHTML = "Welcome to the States Quiz!";

      break;
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
  }
}

document.addEventListener("DOM_CONTENT_LOADED", start)