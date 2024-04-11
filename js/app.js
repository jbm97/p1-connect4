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
window.onload = function () {
    firstLoad();
};

//Function set up
function firstLoad() {
    const startBtn = document.getElementById("start");
    startBtn.addEventListener("click", gameStart); // When/if clicked, start the game

    const instructionsBtn = document.getElementById("instructions");
    instructionsBtn.addEventListener("click", instructions); // when/if clicked show instructions
}
//initial display when page is loaded. Selection screen

function gameStart() {
    makeBoard();
    drawBoard();
}
//starts game

function makeBoard() {
    //set up empty board array when game start is clicked
    let board = [];
    for (let i = 0; i < rows; i++) {
        board.push(Array(columns).fill(0));
    }
    window.board = board; // global variable for other functions
}

function drawBoard() {
    const boardDisplay = document.getElementById("gameDisplay");
    boardDisplay.innerHTML = ""; // clear current HTML in gameDisplay div

    for (let row = 0; row < window.board.length; row++) {
        //iterate through board to create cells
        for (let columns = 0; columns < window.board[row].length; columns++) {
            const cell = document.createElement("div");
            cell.className = "cell empty"; // create empty cell w classes for later
            boardDisplay.append(cell);
        }
    }
} //draw out the board on screen to be used

function instructions() {}
//displays instructions when clicked. need button to go back to home.

function movementHandler(e) {}
//moves playable piece above columns until dropped into selected

function playPiece() {}
//place down a coloured piece

function winCheck() {}
//checks to see if win condition is met - Win Condition: 4 tiles in a row (horizontal, vert, or diag) Need to figure out the logic here.

function drawCheck() {}
//checks for a tie

function resetGame() {}
//start fresh game, could be the same as gameStart?

function returnHome() {} //get back to home screen if instructions are clicked

//TODO: Create game tiles/cells
//TODO: Create winner text/display
//TODO: Create display/text for who's turn it is
//TODO: Instructions before game start/selection screen
