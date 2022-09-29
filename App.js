var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
  "--74-1--5",
  "2---6----",
  "------7-1",
  "-5-6-----",
  "--------4",
  "--62--1-7",
  "9---7---2",
  "-7--3----",
  "8----5--3",
];

var solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "678532941",
  "812945763",
];

window.onload = function () {
  setGame();
};

function setGame() {
  //Populating digits from 1 to 9;
  for (let i = 1; i <= 9; i++) {
    //creating div list from 1 to 9;
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  //Putting values to Board 9*9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();

      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }

      if (c == 3 || c == 6) {
        tile.classList.add("vertical-line");
      }

      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").appendChild(tile);
    }
  }
}

//Setting the function to check ths condition
function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

//Adding some values to the suduko; also emptying out the same;
function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }
    this.innerText = numSelected.id;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
    }
  }
}

//******Timer Function*******

//Initialize variable to store the values
var hour = 0,
  sec = 0,
  min = 0;

var dispHour = 0,
  dispMin = 0,
  dispSec = 0;

//Initially value will stands to "0"
var timeoutId = null;
var check = "stop";

//Implement timer function
function timer() {
  sec++;

  if (sec / 60 == 1) {
    min++;
    sec = 0;

    if (min / 60 == 1) {
      hour++;
      min = 0;
    }
  }

  //Converting the values into the string; also apply conditions to increment
  //seconds, minutes and hours values;

  if (sec < 10) {
    dispSec = "0" + sec.toString();
  } else {
    dispSec = sec.toString();
  }

  //for minutes
  if (min < 10) {
    dispMin = "0" + min.toString();
  } else {
    dispMin = min.toString();
  }

  //for hours
  if (hour < 10) {
    dispHour = "0" + hour.toString();
  } else {
    dispHour = hour.toString();
  }

  document.getElementById("timer").innerHTML =
    dispHour + ":" + dispMin + ":" + dispSec;
}

//implementing the function to start the timer.
function start() {
  if (check === "stop") {
    timeoutId = window.setInterval(timer, 1000);
    document.getElementById("start").innerHTML = "Stop";
    check = "start";
  } else {
    window.clearInterval(timeoutId);
    document.getElementById("start").innerHTML = "Start";
    check = "stop";
  }
}

//function to reset the timer, once excuted.
function reset() {
  window.clearInterval(timeoutId);
  (sec = 0), (min = 0), (hour = 0);
  document.getElementById("timer").innerHTML = "00:00:00";
  document.getElementById("start").innerHTML = "Start";
}

