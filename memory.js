var cardImages = [];

var afmeting = 2; 
var cardA = 0;
var valueA = 0;
var cardB = 0;
var valueB = 0;

var kleurInput_gesloten = document.getElementById('kleur-gesloten').value
var kleurInput_open = document.getElementById('kleur-open').value

var selectFront = document.getElementById("selectFront");
var selectBack = document.getElementById("selectBack");
var size = document.getElementById("afmeting");

var cardFrontData = createCardFront();
var cardBackData = createCardBack();
// array met objecten, front, back

kaartGenerator();

//----------------------
//  Kaarten FRONT
//----------------------
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

    for (let i = 0; i <= afmeting; i++){
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var img = data.message;
    
        var card = document.createElement("div");
        var img2 = document.createElement("img");
        // card.innerHTML = "<img src=" + img + ">";
        img2.src = img
        //card.appendChild(img2);
        // console.log(card);   
        cards.push(card); 
        cards.push(card); 
       
      })

      console.log("einde van honden: ", cards);
    }

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
    const aantalKaarten = (this.afmeting*this.afmeting) / 2;
    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    var characters = alphabet.sort(() => Math.random() -0.5).slice(0,aantalKaarten);
    var charactersCopy = characters.slice();
    characters = characters.concat(charactersCopy);
    
    // 2 keer geshuffelde array
    characters.sort(() => Math.random() -0.5);
  
    for (let i = 0; i < (afmeting*afmeting); i++){
      var card = document.createElement("div");
      var value = characters.pop()
      card.innerHTML = "<p> " + value + " </p>";
      card.id = value;
      cards.push(card);   
    }
      
    }

    return cards;
  }

//----------------------
//  Size gameboard
//----------------------
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

  console.log('backdata in kaartgen:', cardBackData);

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
    front.style.backgroundColor = kleurInput_gesloten;
    back.style.backgroundColor = kleurInput_open;

    card.addEventListener('click', (e) => {
        card.classList.toggle("toggleCard");
        startTimer();
        checkWin(card);
    })
  }
}

//----------------------
// Checkwin
//----------------------
function checkWin(card){
  if(cardA === 0){
    cardA = card
    valueA =  card.getElementsByClassName("kaart--back")[0].id

    console.log("cardA dataset id = ", valueA)

  } else {
    document.querySelectorAll(".kaart").forEach(n => n.style.pointerEvents ="none")

    setTimeout(() => {
      cardB = card
      valueB = card.getElementsByClassName("kaart--back")[0].id
      console.log("cardB dataset id = ", valueB)

      console.log("valueA: ", valueA)
      console.log("valueB", valueB)

      
      
        if (valueA === valueB){
          console.log("Kaarten zijn hetzelfde");

          var kleurInput_gevonden = document.getElementById('kleur-gevonden').value;

          cardA.getElementsByClassName("kaart--back")[0].style.backgroundColor = kleurInput_gevonden
          cardB.getElementsByClassName("kaart--back")[0].style.backgroundColor = kleurInput_gevonden

          cardA = 0;
          cardB = 0;

        }else{
          
            console.log("Kaarten zijn niet hetzelfde");
            cardA.classList.toggle("toggleCard");
            cardB.classList.toggle("toggleCard");

            cardA = 0;
            cardB = 0;
          }

        document.querySelectorAll(".kaart").forEach(n => n.style.removeProperty("pointer-events"))
        document.querySelectorAll(".toggleCard").forEach(n => n.style.pointerEvents ="none")
      }, 1500)
    }
    
  }



//----------------------
// Darkmode
//----------------------
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode")
};

//----------------------
// Randomize
//----------------------
const randomize = () => {
  const kaartdata = this.cardImages;
  kaartdata.sort(() => Math.random() - 0.5);
  return kaartdata;
};

//---------------------------------
// Colour picker
//---------------------------------
function changeColour() {
  kleurInput_gesloten = document.querySelector('#kleur-gesloten').value
  kleurInput_open = document.querySelector('#kleur-open').value;

  document.querySelectorAll(".kaart--front").forEach(n => n.style.backgroundColor = kleurInput_gesloten);
  document.querySelectorAll(".kaart--back").forEach(n => n.style.backgroundColor = kleurInput_open);
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

