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





// In progress

//const game = document.querySelector('game');
//game.textContent = '+';
// let kleur = document.querySelector('gesloten').style.backgroundColor.value;
// console.log(kleur);

// document.querySelector("")

function genDivs (rows, cols) {
    var e = document.getElementById("game");
    for (var r = 0; r < rows; r++) {
      var row = document.createElement("div");
      row.className = "row";
      for (var c = 0; c < cols; c++) {
        var cell = document.createElement("div");
        if (r == 10 && c == 20)
          cell.className = "gridsquare begin";
        else if (r == 10 && c == 40)
          cell.className = "gridsquare end";
        else
          cell.className = "gridsquare";
        row.appendChild(cell);
      }
      e.appendChild(row);
    }
  }