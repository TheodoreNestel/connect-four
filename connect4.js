/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  
  // first index here is [0][0];
  for(let i=0; i < HEIGHT; i++){

    board.push(new Array(WIDTH));
    
  }

  console.log(board);

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  
  const htmlBoard = document.querySelector("#board");


  
  // selects the top row in the dom 
  let top = document.createElement("tr");
  //sets the HTML names so you can select them later 
  top.setAttribute("id", "column-top");
  //adds an event listener to listen for click on top 
  top.addEventListener("click", handleClick);


  for (let x = 0; x < WIDTH; x++) {

    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);

  }

  htmlBoard.append(top);

  

  //tldr uses the setup values to create HTML elements and uses the for loop increment to give them unique IDS
  for (let y = 0; y < HEIGHT; y++) {

    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {

      const cell = document.createElement("td");

      cell.setAttribute("id", `${x}-${y}`);

      row.append(cell);

    }
    // adds it to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  
  // this needs to return how many cells in that row are occupied

  //TODO

  //iterates through the rows going down only changing the y position on the array set up so [0][0],[1][0],[2][0] etc
  for(let i = board.length-1; i >= 0; i--){



    if(!board[i][x]){

      board[i][x] = currPlayer;
      return i;

    }
  

  }
 

  return null;

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
 
  const newPiece = document.getElementById(`${x}-${y}`);

  


  newPiece.insertAdjacentHTML("afterbegin",`<div class='piece player-${currPlayer}'></div>`);

  
}

/** endGame: announce game end */

function endGame(msg) {

 alert(msg);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  // get x from ID of clicked cell
  if (checkForWin()) {
    return endGame("The game is Over Refresh the page to start again");
  }

  let x = evt.target.id;

  
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);

  console.log(y);

  if (y === null) {

    return 
  }

  


  // place piece in board and add to HTML table
  
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  currPlayer = (currPlayer === 1) ? 2 : 1;


  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
