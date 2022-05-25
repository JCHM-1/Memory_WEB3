
var a = 0;
var b = 0;

// click-event kaarten: 
// Verandert kaart-class
document.querySelectorAll(".kaart").forEach(n => n.addEventListener("click", () => {
    n.classList.toggle("kaart-open");
    
    if(a === 0){
      a = n;
    } else {
      b = n;
      if (a.innerHtml === b.innerHtml){
        a.classList.replace("kaart-open", "kaart-gevonden");
        b.classList.replace("kaart-open", "kaart-gevonden");

        // Animatie toevoegen
      }

      a = 0;
      b = 0;
    } 
}))

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


//get images
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

//randomize
const randomize = () => {
    const kaartdata = getData();
    kaartdata.sort(() => Math.random() -0.5);
    console.log(kaartdata);
    return kaartdata;
};

//Generate cards
const kaartGenerator = () => {
    const kaartData = randomize();
    
    kaartData.forEach(item => {
        const card = document.createElement("div");
        const front = document.createElement("div");
        const back = document.createElement("img");
        card.classList = 'kaart';
        front.classList = 'kaart--front';
        back.classList = 'kaart--back';

        back.src = item.imgSrc;

        game.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle("toggleCard");
        })
    });

};

kaartGenerator();

//darkmode klaar!!
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

