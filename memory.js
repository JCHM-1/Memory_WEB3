var cardImages = [];
var plaatjes = false;

var afmeting = 2;
let toggled = false;
let lockBoard = false;
let firstCard, secondCard;
var valueA = 0;
var valueB = 0;

var kleurInput_gesloten = document.getElementById("kleur-gesloten").value;
var kleurInput_open = document.getElementById("kleur-open").value;

var selectFront = document.getElementById("selectFront");
var selectBack = document.getElementById("selectBack");
var size = document.getElementById("afmeting");

var cardFrontData = createCardFront();
var cardBackData = alphabet()
// array met objecten, front, back

kaartGenerator();

//----------------------
//  Kaarten FRONT
//----------------------
selectFront.addEventListener("click", () => {
  cardFrontData = createCardFront(selectFront.value);
  kaartGenerator();
});

function createCardFront(char) {
  let cards = [];
  console.log("Char: ", char);
  console.log("cardFrontData begin functie: (moet leeg zijn) " + cards);
  console.log("afmeting : " + afmeting);

  if (char === "*") {
    for (let i = 0; i < afmeting * afmeting; i++) {
      let card = document.createElement("div");
      card.innerHTML = "<p> * </p>";
      cards.push(card);
    }
  } else if (char === "-") {
    for (let i = 0; i < afmeting * afmeting; i++) {
      let card = document.createElement("div");
      card.innerHTML = "<p> - </p>";
      cards.push(card);
    }
  } else if (char === "?") {
    for (let i = 0; i < afmeting * afmeting; i++) {
      let card = document.createElement("div");
      card.innerHTML = "<p> ? </p>";
      cards.push(card);
    }
  } else {
    for (let i = 0; i < afmeting * afmeting; i++) {
      let card = document.createElement("div");
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
  createCardBack(selectBack.value)
})

function alphabet(){
  plaatjes = false;
  let cards = []
  const aantalKaarten = (this.afmeting * this.afmeting) / 2;
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var characters = alphabet.sort(() => Math.random() - 0.5).slice(0, aantalKaarten);
  var charactersCopy = characters.slice();
  characters = characters.concat(charactersCopy);

  // 2 keer geshuffelde array
  characters.sort(() => Math.random() - 0.5);

  for (let i = 0; i < (afmeting * afmeting); i++) {
    var card = document.createElement("div");
    var value = characters.pop()
    card.innerHTML = "<p> " + value + " </p>";
    card.id = value;
    cards.push(card);
  }
  return cards;
}

function createCardBack(value){
  let promises = []
  let urls = []
  let i = 0, j = 0

  if (value === "Hondenplaatjes") {

    for (let i = 0; i < afmeting; i++) {
      promises.push(fetch("https://dog.ceo/api/breeds/image/random").then(response => response.json()))
    }

    return Promise.all(promises).then(data => {

      data.forEach(item => {

        let url = item[Object.keys(item)[0]]
        urls.push(url)
        urls.push(url)
      })

      changeCardBack(urls)
    })

  } else if (value === "Random foto's") {
    for (let i = 0; i < afmeting; i++) {
      promises.push(fetch("https://source.unsplash.com/collection/928423/480x480").then(response => response))
    }

    return Promise.all(promises).then(data => {

      data.forEach(item => {

        urls.push(item.url)
        urls.push(item.url)
      })

      changeCardBack(urls)
    })

  } else if (value === "Niet-bestaande personen") {
    // TODO: werkt nog niet

      for (let i = 0; i < afmeting; i++) {
        promises.push(fetch("https://randomuser.me/api/").then(response =>
          response.json()
          // JSON.parse(response.results.picture.medium)
        ))
      }

      return Promise.all(promises).then(data => {

        data.forEach(item => {
          let url = item.results[0].picture.large
          urls.push(url)
          urls.push(url)
        })

        changeCardBack(urls)
      })
  }
}

function changeCardBack(temp) {
  let i = 0, j = 0
  let deck = document.getElementsByClassName("kaart--back")
  for (let c = 0; c < deck.length; c++) {
    deck.item(c).innerHTML = "<img src=" + temp[c] + " /img>";
    if (i === j) {
      deck.item(c).id = i
      i++
    } else {
      deck.item(c).id = j
      j++
    }
  }
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

function toggleCard() {
  if (lockBoard) {
    return;
  }

  if (this === firstCard) {
    this.classList.toggle("toggleCard");
    toggled = false;
    firstCard = null;
    console.log("komt in eerste if");
    return;
  } else if (!toggled) {
    console.log("komt in tweede if");
    firstCard = this;
    this.classList.toggle("toggleCard");
    toggled = true;
    return;
  }
  console.log("komt na if");
  this.classList.toggle("toggleCard");
  secondCard = this;

  document
    .querySelectorAll(".kaart")
    .forEach((n) => (n.style.pointerEvents = "none"));

  checkWin();
}

//----------------------
// Checkwin
//----------------------
function checkWin() {
  console.log("komt in checkwin");
  let firstCardBack = firstCard.getElementsByClassName("kaart--back")[0];
  let secondCardBack = secondCard.getElementsByClassName("kaart--back")[0];

  let win = firstCardBack.id === secondCardBack.id;

  win ? disableCards() : untoggleCards();
}

function disableCards() {
  console.log("komt in disablecards");
  let kleurInput_gevonden = document.getElementById("kleur-gevonden").value;
  setTimeout(() => {
    firstCard.getElementsByClassName("kaart--back")[0].style.backgroundColor =
      kleurInput_gevonden;
    secondCard.getElementsByClassName("kaart--back")[0].style.backgroundColor =
      kleurInput_gevonden;
    firstCard.removeEventListener("click", toggleCard);
    secondCard.removeEventListener("click", toggleCard);
    resetBoard();
    document
      .querySelectorAll(".kaart")
      .forEach((n) => n.style.removeProperty("pointer-events"));
  }, 1500);
}

function untoggleCards() {
  console.log("komt in untoggleCards");
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.toggle("toggleCard");
    secondCard.classList.toggle("toggleCard");

    resetBoard();
    document
      .querySelectorAll(".kaart")
      .forEach((n) => n.style.removeProperty("pointer-events"));
  }, 1500);
}

function resetBoard() {
  [toggled, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//----------------------
// Generate cards
//----------------------
function kaartGenerator() {
  let height = afmeting + 1;
  let game = document.getElementById("game");
  game.innerHTML =
    '<div class="meter" aria-label="Meter" aria-description="Meter die het aantal gevonden kaarten bijhoudt"></div>';
  game.style.setProperty(
    "grid-template-columns",
    "repeat(" + afmeting + ", 1fr)"
  );
  game.style.setProperty("grid-template-rows", "repeat(" + height + ", 1fr)");
  console.log("carBackData in kaartgen = ", cardBackData);

  // generate HTML for board squares
  let i = 0;
  for (item of cardBackData) {
    const card = document.createElement("div");
    const front = cardFrontData[i];
    const back = cardBackData[i];

    card.classList = "kaart";
    front.classList = "kaart--front";
    back.classList = "kaart--back";

    // back.src = item.imgSrc;
    game.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    front.style.backgroundColor = kleurInput_gesloten;
    if (!plaatjes) {
      back.style.backgroundColor = kleurInput_open;
    }

    card.addEventListener("click", toggleCard);
    i++;
  }
}

// if(firstCard === 0){
//   document.querySelectorAll(".toggleCard").forEach(n => n.style.pointerEvents ="none")
//   firstCard = card
//   valueA =  card.getElementsByClassName("kaart--back")[0].id

//   console.log("cardA dataset id = ", valueA)

// } else {
//   document.querySelectorAll(".kaart").forEach(n => n.style.pointerEvents ="none")
//   secondCard = card

//   setTimeout(() => {

//     valueB = card.getElementsByClassName("kaart--back")[0].id
//     console.log("cardB dataset id = ", valueB)

//     console.log("valueA: ", valueA)
//     console.log("valueB", valueB)

//     if (valueA === valueB){
//       console.log("Kaarten zijn hetzelfde");

//       firstCard.getElementsByClassName("kaart--back")[0].style.backgroundColor = kleurInput_gevonden
//       secondCard.getElementsByClassName("kaart--back")[0].style.backgroundColor = kleurInput_gevonden

//       firstCard = 0;
//       secondCard = 0;

//     }else{

//         console.log("Kaarten zijn niet hetzelfde");
//         firstCard.classList.toggle("toggleCard");
//         secondCard.classList.toggle("toggleCard");

//         firstCard = 0;
//         secondCard = 0;
//       }

//       document.querySelectorAll(".kaart").forEach(n => n.style.removeProperty("pointer-events"))
//       document.querySelectorAll(".toggleCard").forEach(n => n.style.pointerEvents ="none")
//     }, 1500)
//   }

//----------------------
// Darkmode
//----------------------
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

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
  kleurInput_gesloten = document.querySelector("#kleur-gesloten").value;
  kleurInput_open = document.querySelector("#kleur-open").value;

  document
    .querySelectorAll(".kaart--front")
    .forEach((n) => (n.style.backgroundColor = kleurInput_gesloten));
  document
    .querySelectorAll(".kaart--back")
    .forEach((n) => (n.style.backgroundColor = kleurInput_open));
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
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr == 0) {
      hr = "0" + hr;
    }

    timer.innerHTML = hr + ":" + min + ":" + sec;

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
