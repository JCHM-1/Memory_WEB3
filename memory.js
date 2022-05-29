var cardImages = [];

var afmeting = 2; 
var cardA = 0;
var valueA = 0;
var cardB = 0;
var valueB = 0;

var cardFrontData = createCardFront();
var cardBackData = createCardBack();
// array met objecten, front, back
kaartGenerator();

//----------------------
// Randomize
//----------------------
const randomize = () => {
    const kaartdata = this.cardImages;
    kaartdata.sort(() => Math.random() - 0.5);
    return kaartdata;
};

//----------------------
//  Kaarten FRONT
//----------------------
var selectFront = document.getElementById("selectFront");
selectFront.addEventListener("click", () => {
  cardFrontData = createCardFront(selectFront.value);
  kaartGenerator();
})

function createCardFront(char){

  var cards = [];
  console.log("Char: ", char);
  console.log("cardFrontData begin functie: (moet leeg zijn) "+ cards);
  console.log("afmeting : "+ afmeting);

  if(char === "*"){
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      card.innerHTML = "<p> * </p>";
      cards.push(card);
    }
  }else if (char === "-"){
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      card.innerHTML = "<p> - </p>";
      cards.push(card);  
    }
  } else if(char === "?"){
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      card.innerHTML = "<p> ? </p>";
      cards.push(card);   
    }
  } else{
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      card.innerHTML = "<p> + </p>";
      cards.push(card);   
    }
  }
  return cards;
}

//----------------------
//  Kaarten BACK
//----------------------
var selectBack = document.getElementById("selectBack");
console.log(selectBack.value);
selectBack.addEventListener("click", () => {
  cardBackData = createCardBack(selectBack.value);
  kaartGenerator();
})

function createCardBack(value){
  var cards = [];
  let times = document.querySelector('#afmeting');

  if(value === "Hondenplaatjes"){
    var url = "https://dog.ceo/api/breeds/image/random";
    let i = 0;
    while (i < (times.value)){
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var img = data.message;
    
        // var card = document.createElement("div");
        //var img2 = document.createElement("img");
        // card.innerHTML = "<img src=" + img + ">";
        //img2.src = img
        //card.appendChild(img2);
        // console.log(card);   
      })
      var card = document.createElement("div");
      card.innerHTML = "<img src=" + img + ">";

      cards.push(card); 
      cards.push(card); 
      console.log(card); 
      i++;
    }
    console.log('card data:')
    console.log(cards)  
  }else if(value === "Random foto's"){
    var url = "https://source.unsplash.com/collection/928423/480x480";
    let i = 0;
    while (i < (times.value)){
      fetch(url)
      .then((response) => {
        return response;
      })
      .then((data) => {
        var img = data.url;
        cards.push(img);
        cards.push(img);
      })
      i++;
    }
  }else if(value === "Niet-bestaande personen"){
    var url = "https://randomuser.me/api/";
    let i = 0;
    while (i < (times.value)){
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var img = data.results[0].picture.medium;
        cards.push(img);
        cards.push(img);
      })
      i++;
    } 
  } else {
      const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var characters = shuffle(alphabet);
      console.log("chars = "+ characters);
      var charactersCopy = characters.slice();
      characters = characters.concat(charactersCopy);
      
      // 2 keer geshuffelde array
      characters.sort(() => Math.random() -0.5);
    
      for (let i = 0; i <= (afmeting*afmeting); i++){
        var card = document.createElement("div");
        var value = characters.pop()
        card.innerHTML = "<p> " + value + " </p>";
        card.id = value;
        cards.push(card);   
      }
    }

    return cards;
  }


// Shuffle alfabet array
function shuffle(array){
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  // Pak subarray van geshuffle array met afmeting bord 
  let aantalKaarten = (this.afmeting*this.afmeting) / 2;
  var arraySliced = array.slice(0, aantalKaarten);

  return arraySliced;
}


//----------------------
//  Size gameboard
//----------------------
var size = document.getElementById("afmeting");
size.addEventListener("click", () =>  {
    afmeting = size.value;
    console.log("afmeting na klik: ", afmeting);
    cardFrontData = createCardFront();
    cardBackData = createCardBack();
    kaartGenerator();
});

//----------------------
// Generate cards
//----------------------
function kaartGenerator(){
  
  let height = afmeting + 1;
  
  let game = document.getElementById("game");
  game.innerHTML = '<div class="meter" aria-label="Meter" aria-description="Meter die het aantal gevonden kaarten bijhoudt"></div>';
  game.style.setProperty("grid-template-columns","repeat("+afmeting+", 1fr)");
  game.style.setProperty("grid-template-rows","repeat("+height+", 1fr)");

  console.log('dit is backdata:');
  console.log(cardBackData);

  // generate HTML for board squares
  for (let i = 0; i < (afmeting*afmeting); i++) {

    const card = document.createElement("div");
    const front = cardFrontData[i];
    const back = cardBackData[i];
    
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
        checkWin(card);
    })
  }
}

//----------------------
// Darkmode
//----------------------
function checkWin(card){
  if(cardA === 0){
    cardA = card
    valueA =  card.getElementsByClassName("kaart--back")[0].id

    console.log("cardA dataset id = ", valueA)

  } else {
    document.querySelectorAll(".kaart").forEach(n => n.style.pointerEvents ="none")

    cardB = card
    valueB = card.getElementsByClassName("kaart--back")[0].id
    console.log("cardB dataset id = ", valueB)

    console.log("valueA: ", valueA)
    console.log("valueB", valueB)
    setTimeout(() => {
      if (valueA === valueB){

        
        console.log("Kaarten zijn hetzelfde");
         cardA.style.pointerEvents ="none"
         cardB.style.pointerEvents ="none"

          cardA = 0;
          cardB = 0;

      }else{
        
          console.log("Kaarten zijn niet hetzelfde");
          cardA.classList.toggle("toggleCard");
          cardB.classList.toggle("toggleCard");

          cardA = 0;
          cardB = 0;
        }
      }, 1500)
      document.querySelectorAll(".kaart").forEach(n => n.style.removeProperty("pointer-events"))
  }
}

//----------------------
// Darkmode
//----------------------
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode")
};

//---------------------------------
// Colour picker
//---------------------------------
let kleurInput_gesloten = document.querySelector('#kleur-gevonden');
let kleurInput_open = document.querySelector('#kleur-open');
let kleurInput_gevonden = document.querySelector('#kleur-gevonden');

function changeColour() {
  let kleur1 = kleurInput_gesloten.value;
  let kleur2 = kleurInput_open.value;
  let kleur3 = kleurInput_gevonden.value;
  const element1 = document.querySelectorAll(".kaart--front");

  for (const element of element1) {
      element.style.backgroundColor = kleur1;
  }
}

//---------------------------------
// Timer
//---------------------------------
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

//----------------------
// Fetch images from API
//----------------------
// function getImages() {
//     console.log("werkt wel woef");
//     let times = document.querySelector('#afmeting');
//     let optie_img = document.querySelector('#selectBack');
//     if (optie_img.value === "Hondenplaatjes"){
//       var url = "https://dog.ceo/api/breeds/image/random";
//       let i = 0;
//       while (i < (times.value)){
//         fetch(url)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           var img = data.message;
//           this.cardImages.push(img);
//           this.cardImages.push(img);
//           console.log(this.cardImages);
//           console.log(this.cardBackData);
//         })
//         i++;
//       }  
//     } if (optie_img.value === "Random foto's"){
//       var url = "https://source.unsplash.com/collection/928423/480x480";
//       let i = 0;
//       while (i < (times.value)){
//         fetch(url)
//         .then((response) => {
//           return response;
//         })
//         .then((data) => {
//           var img = data.url;
//           this.cardImages.push(img);
//           this.cardImages.push(img);
//           console.log(this.cardImages);
//         })
//         i++;
//       }  
//     } if (optie_img.value === "Niet-bestaande personen"){
//       var url = "https://randomuser.me/api/";
//       let i = 0;
//       while (i < (times.value)){
//         fetch(url)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           var img = data.results[0].picture.medium;
//           this.cardImages.push(img);
//           this.cardImages.push(img);
//           console.log(this.cardImages);
//         })
//         i++;
//       } 
//     }
// }


// [ { imgSrc: "", name: "bla bla bla"} ]

// getImages();

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
