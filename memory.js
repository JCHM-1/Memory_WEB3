const token = window.localStorage.getItem('token') === 'undefined' ? false : window.localStorage.getItem('token')
let data = ''
let ingelogd = false

console.log(token)
function JWTtoJSON(token){
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload)
}
console.log(token)
fetch_scores()

function checkLogin(){
  if(!ingelogd) {
    if (token) {
      data = JWTtoJSON(token)

      const currentDate = new Date();
      const exp = new Date(data.exp * 1000)

      document.getElementById('btnLogin').innerHTML = 'logout'
      ingelogd = true

      if (exp <= currentDate) {
        ingelogd = false
        window.localStorage.removeItem('token')
        document.getElementById('btnLogin').innerHTML = 'login'

        window.alert('Uitgelogd')
      }
    }
  }
  return ingelogd
}

checkLogin()

var plaatjes = false
let isWin = false
let toggled = false;
var afmeting = 2
let countWins = 0;
let firstCard, secondCard;
let congrats = `
  <div class="popup" id="popup">
      <h2><span>Gefeliciteerd</span> </h2>
       <p> <span>Alle kaarten zijn gevonden!</span></p>
      <button onclick="newGame();">Nieuw spel</button>
  </div>    
`;


var kleurInput_gesloten = document.getElementById("kleur-gesloten").value;
var kleurInput_open = document.getElementById("kleur-open").value;

var selectFront = document.getElementById("selectFront");
var selectBack = document.getElementById("selectBack");
var size = document.getElementById("afmeting");

var cardFrontData = createCardFront();
var cardBackData = alphabet()
// array met objecten, front, back
kaartGenerator()

//----------------------
//  Kaarten FRONT
//----------------------
selectFront.addEventListener("click", () => {
  cardFrontData = createCardFront(selectFront.value);
  kaartGenerator();
});

function createCardFront(char) {
  if(typeof char === 'undefined'){
    char = "+"
  }
  let cards = [];
  console.log("Char: ", char);
  console.log("cardFrontData begin functie: (moet leeg zijn) " + cards);
  console.log("afmeting : " + afmeting);


  for (let i = 0; i < afmeting * afmeting; i++) {
    let card = document.createElement("div");
    card.innerHTML = "<p> " + char + " </p>";
    cards.push(card);
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

  let characters = alphabet.sort(() => Math.random() - 0.5).slice(0, aantalKaarten);
  let charactersCopy = characters.slice();
  characters = characters.concat(charactersCopy);

  // 2 keer geshuffelde array
  characters.sort(() => Math.random() - 0.5);

  for (let i = 0; i < (afmeting * afmeting); i++) {
    let card = document.createElement("div");
    let value = characters.pop()
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

      for (let i = 0; i < afmeting; i++) {
        promises.push(fetch("https://randomuser.me/api/").then(response => response.json()))
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
  cardBackData = alphabet();
  kaartGenerator();
  [firstCard, secondCard] = [null, null];
});

function toggleCard() {
  if( firstCard != null && secondCard != null){
    untoggleCards()
  }

  if (this === firstCard) {
    return;
  } else if (!toggled) {
      console.log("komt in toggled")
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

  if(win){

    disableCards()
  } else {
    document
        .querySelectorAll(".kaart")
        .forEach((n) => n.style.removeProperty("pointer-events"));
    return
  }

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

    [firstCard, secondCard] = [null, null];
    [isWin, countWins, toggled] = [true, countWins+1, false];

    document
        .querySelectorAll(".kaart")
        .forEach((n) => n.style.removeProperty("pointer-events"));

    if(countWins === afmeting){
      document.getElementById("game").innerHTML += congrats;

    }
  }, 1500);
}

function untoggleCards() {
  console.log("komt in untoggleCards");
  [isWin, toggled] = [true, false];


    firstCard.classList.toggle("toggleCard");
    secondCard.classList.toggle("toggleCard");

    [firstCard, secondCard] = [null, null];



    document
        .querySelectorAll(".kaart")
        .forEach((n) => n.style.removeProperty("pointer-events"));

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


function login()
{
  if(ingelogd){
    ingelogd = false
    window.localStorage.removeItem('token')
    document.getElementById('btnLogin').innerHTML = 'login'
  } else {
    window.open("login.html")
  }

}

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

function newGame() {
  location.reload();
}

function sendPrefsBackend(){
  if(ingelogd){
    let kleurInput_gesloten = document.querySelector("#kleur-gesloten").value;
    let kleurInput_open = document.querySelector("#kleur-open").value;

    let backPrefs = selectBack.value

    let object = `{"id":${data.sub},"api":"${backPrefs}","color_found":"${kleurInput_open}","color_closed":"${kleurInput_gesloten}"}`

    console.log(data.sub)
    fetch(`http://localhost:8000/api/player/${data.sub}/preferences`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: object
    })
        .then(resp => {if(resp.status == 204){window.alert("gelukt")}})
  } else {
    window.alert("Je bent nog niet ingelogd")
  }





}

function fetch_scores() {
  fetch("http://localhost:8000/scores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((json) => add_scores(json));
}
  

function add_scores(data) {
  const items = data;

  function compare(b, a) {
    if (a.score < b.score) {
      return -1;
    }
    if (a.score > b.score) {
      return 1;
    }
    return 0;
  }
  items.sort(compare);

  let element = document.getElementById("get_scores");
  for (let i = 0; i < items.length; i++) {
    var li = document.createElement("li");
    var text = document.createTextNode(
      items[i].username + " " + items[i].score
    );
    li.appendChild(text);
    element.appendChild(li);
  }
}

function set_Email() {
  if(ingelogd) {
    id = data.sub
    email = document.getElementById('email').value
    console.log(token)
    fetch(`http://localhost:8000/api/player/${id}/email`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: `{"email": "${email}"}`
    }).then((res) => console.log(res));
    window.alert('Email changed to' + ' ' + email)
  } else {
    window.alert("Je bent niet ingelogd")
  }
  
}