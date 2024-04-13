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
    img.src = "./images/mainmenu.png";
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
    instructionsBtn.id = "instructions-btn";
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
            cell.addEventListener("click", playPiece); //place down piece in cell when clicked
            boardDisplay.append(cell);
        }
    }

    const btnCheck = document.querySelector("#home"); //don't need both buttons here, but it has to be this one because it's present @ instructions screen

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

        document.body.append(homeBtn, newGameBtn);
    }

    //custom cursor style element (red will start for now, may change this when i get to the game logic)
    // attempted to just do document.body.style.cursor = "url('./images/redcursor.png')"; but that does not work
    const style = document.createElement("style");
    const rule = document.createTextNode("body { cursor: url('./images/redcursor.png'), auto; }"); //change image size at some point, add cursor to image as well

    style.append(rule);
    document.head.append(style);
} //draw out the board on screen to be used

function mainMenu() {
    document.body.innerHTML = ""; //clear entire body, then reload.
    firstLoad();
}
//not sure if this function is needed (could be another way to achieve result) but it solved my issue.

function clearBoard() {
    drawBoard();
}
//reset game board when button clicked. probably could have called gameStart function instead but I don't need makeBoard again

function instructions() {
    const instructions = document.getElementById("instructions-btn");
    instructions.remove();
    const start = document.getElementById("start");
    start.remove();

    //create instructions div with all text
    const instructionsDiv = document.createElement("div");
    instructionsDiv.id = "instructions";

    const boardDisplay = document.getElementById("game-display");
    boardDisplay.append(instructionsDiv);

    const instructionsTitle = document.createElement("h3");
    instructionsTitle.id = "instructions-title";
    instructionsTitle.textContent = "How To Play:";
    instructionsDiv.append(instructionsTitle);

    const instructionsWords = document.createElement("p");
    instructionsWords.textContent = "Try to line up four of your coloured pieces in a row!";

    const instructionsWords2 = document.createElement("p");
    instructionsWords2.textContent =
        "Take turns selecting the column you'd like to drop your piece into. It will fall to the lowest point in the columnn.";

    const instructionsWords3 = document.createElement("p");
    instructionsWords3.textContent =
        "The first person to get four in a row in any direction (vertical, horizontal, diagonal) wins!";

    const instructionsWords4 = document.createElement("p");
    instructionsWords4.textContent =
        "If all of the slots are filled and nobody has four in a row it will end in a draw.";

    const instructionsWords5 = document.createElement("p");
    instructionsWords5.textContent = "Good luck have fun!";

    instructionsDiv.append(
        instructionsWords,
        instructionsWords2,
        instructionsWords3,
        instructionsWords4,
        instructionsWords5
    );

    //home button
    const homeBtn = document.createElement("div");
    // homeBtn.className = "btn";
    homeBtn.id = "instructions-home-btn";
    homeBtn.textContent = "Main Menu"; //delete later, image probably
    homeBtn.addEventListener("click", mainMenu);

    boardDisplay.append(homeBtn);
}
//displays instructions when clicked. need button to go back to home.

function movementHandler(e) {}
//moves playable piece above columns until dropped into selected. might not even use this, may just have the cursos become the coloured cell and you click to place.

function playPiece() {
    //check to see if something exists on the game page so this function only works when required.
    //i think i would need 2 if statements here depending on colour of cursor as that will determine turn
    console.log("test");
}
//place down a coloured piece

function winCheck() {}
//checks to see if win condition is met - Win Condition: 4 tiles in a row (horizontal, vert, or diag) Need to figure out the logic here.

function drawCheck() {}
//checks for a tie

function displayTurn() {}
//display which player's turn it is

function displayWinner() {}
//display winner

//TODO: the actual game logic
//TODO: Create winner text/display
//TODO: Create display/text for who's turn it is
//TODO: Instructions before game start/selection screen
