//const game = document.querySelector('game');
//game.textContent = '+';
// let kleur = document.querySelector('gesloten').style.backgroundColor.value;
// console.log(kleur);

document.querySelectorAll(".kaart").forEach(n => n.addEventListener("click", () => {
    n.classList.toggle("kaart-open");
}))

document.querySelector("")

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