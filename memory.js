
var afmeting = 2; 
var cardA = 0;
var cardB = 0;

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

function getjson(url, cb) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         cb(JSON.parse(this.responseText)) }
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
const getData = () => [
    {imgSrc: "./images/dog1.jpeg", name: "dog1"},
    {imgSrc: "./images/dog2.jpeg", name: "dog2"},
    {imgSrc: "./images/dog3.jpeg", name: "dog3"},
    {imgSrc: "./images/dog4.jpeg", name: "dog4"},
    {imgSrc: "./images/dog5.jpeg", name: "dog5"},
    {imgSrc: "./images/dog1.jpeg", name: "dog1"},
    {imgSrc: "./images/dog2.jpeg", name: "dog2"},
    {imgSrc: "./images/dog3.jpeg", name: "dog3"},
    {imgSrc: "./images/dog4.jpeg", name: "dog4"},
    {imgSrc: "./images/dog5.jpeg", name: "dog5"},
];

//----------------------
// Randomize
//----------------------
const randomize = () => {
    const kaartdata = getData();
    kaartdata.sort(() => Math.random() -0.5);
    console.log(kaartdata);
    return kaartdata;
};

//----------------------
//  Size gameboard
//----------------------
var size = document.getElementById("afmeting");
size.addEventListener("click", () =>  {
    width = size.value; 
    height = width + 1;
    afmeting = width;

    let game = document.getElementById("game");
    game.innerHTML = '<div class="meter" aria-label="Meter" aria-description="Meter die het aantal gevonden kaarten bijhoudt"></div>';
    game.style.setProperty("grid-template-columns","repeat("+width+", 1fr)");
    game.style.setProperty("grid-template-rows","repeat("+height+", 1fr)");

    kaartGenerator();
    
    console.log("afmeting: ", afmeting);
});


//----------------------
// Generate cards
//----------------------
const kaartGenerator = () => {
  // generate HTML for board squares
  for (let i = 0; i < (afmeting*afmeting); i++) {

    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("img");
    card.classList = 'kaart';
    front.classList = 'kaart--front';
    back.classList = 'kaart--back';

    // back.src = item.imgSrc;
    game.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
        card.classList.toggle("toggleCard");
        checkWin(card);
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
//darkmode klaar!!
//----------------------
function darkMode() {
    var elemment = document.body;
    elemment.classList.toggle("dark-mode")
};

//flippen work in progress!!
// var kaarten = document.querySelectorAll('.kaart');
// console.log("hallo");

// [...kaarten].forEach((kaart)=>{
//   kaart.addEventListener('click', function() {
//     kaart.classList.toggle('is-flipped');
//   });
// });

