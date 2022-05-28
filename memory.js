var cardFrontData = [];
createCardFront();
var cardBackData = [];
createCardBack();
kaartGenerator();

window.onload = kaartGenerator();

var afmeting = 2; 

var cardA = 0;
var cardB = 0;

var random = false;
var alfabet = false;

// click-event kaarten: 
// Verandert kaart-class
// document.querySelectorAll(".kaart").forEach(n => n.addEventListener("click", () => {
//     n.classList.toggle("kaart-open");
    
//     if(a === 0){
//       a = n;
//     } else {
//       b = n;
//       if (a.innerHtml === b.innerHtml){
//         a.classList.replace("kaart-open", "kaart-gevonden");
//         b.classList.replace("kaart-open", "kaart-gevonden");

//         // Animatie toevoegen
//       }

//       a = 0;
//       b = 0;
//     } 
// }))


// var a = 0;
// var b = 0;

// click-event kaarten: 
// Verandert kaart-class

// function darkMode() {
//     var elemment = document.body;
//     elemment.classList.toggle("dark-mode")
// }

// In progress
//const game = document.querySelector('game');
//game.textContent = '+';
// let kleur = document.querySelector('gesloten').style.backgroundColor.value;
// console.log(kleur);

// document.querySelector("")

// function genDivs (rows, cols) {
//     var e = document.getElementById("game");
//     for (var r = 0; r < rows; r++) {
//       var row = document.createElement("div");
//       row.className = "row";
//       for (var c = 0; c < cols; c++) {
//         var cell = document.createElement("div");
//         if (r == 10 && c == 20)
//           cell.className = "gridsquare begin";
//         else if (r == 10 && c == 40)
//           cell.className = "gridsquare end";
//         else
//           cell.className = "gridsquare";
//         row.appendChild(cell);
//       }
//       e.appendChild(row);
//     }
//   }



//----------------------
// Fetch images from API
//----------------------
var images

//get images work in progress!!!!
function getjson(url, cb) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText))
        }
    }
    xhttp.open("GET", url, true)
    xhttp.send()
}

var imageid;
getjson('https://dog.ceo/api/breeds/image/random', data => {
    imageid = data.image_id;
})

const game = document.querySelector('.game');

//test voor nu zonder api
const getData = () => [];

//----------------------
// Randomize
//----------------------
const randomize = () => {
    const kaartdata = getData();
    kaartdata.sort(() => Math.random() - 0.5);
    console.log(kaartdata);
    return kaartdata;
};

//----------------------
//  Kaarten FRONT
//----------------------
var selectFront = document.getElementById("selectFront");
selectFront.addEventListener("click", () => {
  createCardFront(selectFront.value);
})

function createCardFront(char){

  this.cardFrontData = [];
  console.log("Char: ", char);
  console.log("cardFrontData begin functie: ", this.cardFrontData);
  console.log("afmeting : ", afmeting);

  if(char === "*"){
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      card.innerHTML = "<p> * </p>";
      this.cardFrontData.push(card);
    }
  }else if (char === "-"){
    for (let i = 0; i < (afmeting*afmeting); i++){

      var card = document.createElement("div");
      card.innerHTML = "<p> - </p>";
      this.cardFrontData.push(card);  
    }
  } else if(char === "?"){
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      card.innerHTML = "<p> ? </p>";
      this.cardFrontData.push(card);   
    }
  } else{
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      card.innerHTML = "<p> + </p>";
      this.cardFrontData.push(card);   
    }
  }

  console.log("CardFrontData na functie: ", this.cardFrontData);
  kaartGenerator();
}

//----------------------
//  Kaarten BACK
//----------------------
var selectBack = document.getElementById("selectBack");
selectBack.addEventListener("click", () => {
  createCardBack(selectBack.value);
})

function createCardBack(value){

  this.cardBackData = [];
  console.log("cardBackData begin functie: ", this.cardBackData);

  if(value === "Hondenplaatjes"){

  }else if(value === "Kattenplaatjes"){

  }else if(value === "Niet-bestaande personen"){

  }else{
      const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var characters = shuffle(alphabet);
      console.log("characters na shuffle:", characters);
      var charactersCopy = characters.slice();
      console.log("charcop: ", charactersCopy);
      characters = characters.concat(charactersCopy);
      console.log("chars na concat: ", characters);
  
      // 2 keer geshuffelde array
      characters.sort(() => Math.random() -0.5);
      console.log("Characters na shuffle: ",characters);
  
      for (let i = 0; i < (afmeting*afmeting); i++){
        var card = document.createElement("div");
        card.innerHTML = "<p> " + characters.pop() + " </p>";
        this.cardBackData.push(card);   
      }
    }
    console.log("CardBackData na functie: ",this.cardBackData);
    kaartGenerator();
  }


// Shuffle alfabet array
function shuffle(array){
  console.log("Array in shuffle: ", array);
  let currentIndex = array.length,  randomIndex;
  console.log("currentIndex", currentIndex);

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  console.log("arrrray", array);
  console.log("afmeting",afmeting)
  // Pak subarray van geshuffle array met afmeting bord 
  var arraySliced = array.slice(0, ((this.afmeting*this.afmeting) / 2));
  console.log("arraysliced: ", arraySliced);
  return arraySliced;
}


//----------------------
//  Size gameboard
//----------------------
var size = document.getElementById("afmeting");
size.addEventListener("click", () =>  {
    afmeting = size.value;
    console.log("afmeting na klik: ", afmeting);
    createCardFront();
    createCardBack();
    kaartGenerator();
});

//Generate cards
// const kaartGenerator = () => {
//     const kaartData = randomize();

//     kaartData.forEach(item => {
//         const card = document.createElement("div");
//         const front = document.createElement("div");
//         const back = document.createElement("img");
//         card.classList = 'kaart';
//         front.classList = 'kaart--front';
//         back.classList = 'kaart--back';

//----------------------
// Generate cards
//----------------------
function kaartGenerator(){
  
  console.log("cardFrontData in kaartgen: ", this.cardFrontData);
  let height = afmeting + 1;
  console.log("height: ", height);
  console.log("CardFrontData in kaartgenerator: ", this.cardFrontData);
  

  let game = document.getElementById("game");
  game.innerHTML = '<div class="meter" aria-label="Meter" aria-description="Meter die het aantal gevonden kaarten bijhoudt"></div>';
  game.style.setProperty("grid-template-columns","repeat("+afmeting+", 1fr)");
  game.style.setProperty("grid-template-rows","repeat("+height+", 1fr)");
  
  // generate HTML for board squares
  for (let i = 0; i < (afmeting*afmeting); i++) {

    const card = document.createElement("div");
    const front = this.cardFrontData[i];
    console.log(this.cardFrontData[i]);
    const back = this.cardBackData[i];
    
    card.classList = 'kaart';
    front.classList = 'kaart--front';
    back.classList = 'kaart--back';


    // back.src = item.imgSrc;
    game.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
        card.classList.toggle("toggleCard");
        startTimer();
        // checkWin(card);
    })
  }
}

// ----------------------------

// var sum = 0;
// const kaartGenerator = () => {
//     const kaartData = randomize();
    
//     // kaartData.forEach(item => {

//     for(i = 0; i < (afmeting*afmeting); i++){
//         sum = sum + i;
//         const card = document.createElement("div");
//         const front = document.createElement("div");
//         const back = document.createElement("img");
//         card.classList = 'kaart';
//         front.classList = 'kaart--front';
//         back.classList = 'kaart--back';

//         // back.src = item.imgSrc;

//         game.appendChild(card);
//         card.appendChild(front);
//         card.appendChild(back);

//         card.addEventListener('click', (e) => {
//             card.classList.toggle("toggleCard");

//             checkWin(card);
//         })
//     };
//     console.log("sum: "+sum);
// };



// const checkWin = (card) => {

//   if(cardA === 0){
//     let cardA = card;
//   } else {
//     let cardB = card;
//     if (cardA.innerHtml === b.innerHtml){
//       cardA.classList.replace("toggleCard", "kaart--back");
//       cardA.removeEventListener('click');
//       cardB.classList.replace("toggleCard", "kaart--back");
//       cardB.removeEventListener('click');
//       // Animatie toevoegen
//     } else {
//       cardA.classList.toggle("toggleCard");
//       cardB.classList.toggle("toggleCard");
//     }

//     cardA = 0;
//     cardB = 0;
//   } 
// }
        


//----------------------
// Darkmode
//----------------------
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode")
};

//Color picker klaar!!
let kleurInput_gesloten = document.querySelector('#kleur-gevonden');
let kleurInput_open = document.querySelector('#kleur-open');
let kleurInput_gevonden = document.querySelector('#kleur-gevonden');

function changeColour() {
    let kleur1 = kleurInput_gesloten.value;
    let kleur2 = kleurInput_open.value;
    let kleur3 = kleurInput_gevonden.value;
    const element1 = document.querySelectorAll(".kaart--front");
    const element2 = document.querySelectorAll(".kaart--back");

    element1.forEach(function () {
        element1.style.backgroundColor = kleur1;
        console.log("kleur select");
    })
}

//Timer work in progress !!!!
const timer = document.querySelector(".timer");

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }

        timer.innerHTML = hr + ':' + min + ':' + sec;

        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    timer.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}

// function getImages() {
//     fetch('https://picsum.photos/200')
//     .then(respone => respone.text())
//     .then(data => console.log(data));
// }


// getImages();

window.onload = createCardFront();
window.onload = createCardBack();
window.onload = kaartGenerator();