//Declaring variables

const playerOne = "1";
const playerTwo = "2";
const currentPlayer = playerOne;
const gameOver = false;
let board;
const rows = 6;
const columns = 7;

//TODO: Set up CPU?

//Functions & Dom Manip

//Initial Load
window.onload = function() {
    firstLoad();
};

//Function set up
function firstLoad() {}; //initial display when page is loaded. Selection screen

function gameStart() {}; //sets up board and starts game

function movementHandler(e) {}; //moves playable piece above columns until dropped into selected

function playPiece() {}; //place down a coloured piece

function winCheck() {}; //checks to see if win condition is met - Win Condition: 4 tiles in a row (horizontal, vert, or diag) Need to figure out the logic here.

function drawCheck() {}; //checks for a tie

function resetGame() {}; //start fresh game, could be the same as gameStart?


//TODO: Create game tiles
//TODO: Create winner text/display
//TODO: Create display/text for who's turn it is
//TODO: Instructions before game start/selection screen
