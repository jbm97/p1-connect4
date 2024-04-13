//Declaring variables

const playerOne = "1";
const playerTwo = "2";
const currentPlayer = playerOne;
const gameOver = false;
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
    //make main game display/board
    const gameDisplayDiv = document.createElement("div");
    gameDisplayDiv.id = "game-display";

    //main menu background image
    const img = document.createElement("img");
    img.src = "https://connect-4.io/data/image/options/connect4banner.jpg";
    img.setAttribute("height", "600px");
    img.setAttribute("width", "700px");
    img.id = "homePic";

    //make start button
    const startBtn = document.createElement("div");
    startBtn.textContent = "Start Game";
    startBtn.className = "btn";
    startBtn.id = "start";
    startBtn.addEventListener("click", gameStart);

    //make instructions button
    const instructionsBtn = document.createElement("div");
    instructionsBtn.textContent = "How To Play";
    instructionsBtn.className = "btn";
    instructionsBtn.id = "instructions";
    instructionsBtn.addEventListener("click", instructions);

    gameDisplayDiv.append(img);
    gameDisplayDiv.append(startBtn);
    gameDisplayDiv.append(instructionsBtn);
    document.body.append(gameDisplayDiv);
}
//initial display when page is loaded. Selection screen

function gameStart() {
    makeBoard();
    drawBoard();
}
//starts game

function makeBoard() {
    //set up empty board array when game start is clicked
    const board = [];
    for (let i = 0; i < rows; i++) {
        board.push(Array(columns)); //push to array with length of columns
    }
    window.board = board; // global variable for other functions
}

function drawBoard() {
    const boardDisplay = document.getElementById("game-display");
    boardDisplay.innerHTML = ""; // clear current HTML in game-display div

    for (let row = 0; row < window.board.length; row++) {
        //iterate through board to create cells
        for (let columns = 0; columns < window.board[row].length; columns++) {
            const cell = document.createElement("div");
            cell.className = "cell empty"; // create empty cell w classes for later. might not need this, may use images instead.
            boardDisplay.append(cell);
        }
    }

    const btnCheck = document.querySelector("#home"); //only need to do this for one button. if one is present so is the other.

    // needed to put everything in an if statement below as
    // without it these elements will be created whenever the button is pressed.
    // with the if statement it only makes it when it isn't present.

    if (!btnCheck) {
        const homeBtn = document.createElement("div");
        homeBtn.className = "btn";
        homeBtn.id = "home";
        homeBtn.textContent = "Main Menu"; // delete later, going to use an image/image of text
        homeBtn.addEventListener("click", mainMenu); // this does not work as intended yet. may need to make a new function

        const newGameBtn = document.createElement("div");
        newGameBtn.className = "btn";
        newGameBtn.id = "new-game";
        newGameBtn.textContent = "New Game"; // delete later, going to use an image/image of text
        newGameBtn.addEventListener("click", clearBoard);

        const body = document.body;
        body.append(homeBtn, newGameBtn);
    }
} //draw out the board on screen to be used

function mainMenu() {
    document.body.innerHTML = ""; //clear entire body, then reload
    firstLoad();
}

function clearBoard() {
    drawBoard();
}
//reset game board when button clicked. probably could have called gameStart function instead but I don't need makeBoard again

function instructions() {}
//displays instructions when clicked. need button to go back to home.

function movementHandler(e) {}
//moves playable piece above columns until dropped into selected. might not even use this, may just have the cursos become the coloured cell and you click to place.

function playPiece() {}
//place down a coloured piece

function winCheck() {}
//checks to see if win condition is met - Win Condition: 4 tiles in a row (horizontal, vert, or diag) Need to figure out the logic here.

function drawCheck() {}
//checks for a tie

function displayWinner() {}
//display winner

function returnHome() {} //get back to home screen if instructions are clicked

//TODO: Create winner text/display
//TODO: Create display/text for who's turn it is
//TODO: Instructions before game start/selection screen
