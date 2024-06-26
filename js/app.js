//Declaring variables

let playerOne = 1; 
let playerTwo = 2;
let currentPlayer;
let gameOver = false;
let board = [];
const rows = 6;
const columns = 7;

//main title image
const mainImg = document.createElement("img");
mainImg.src = "./images/mainpic.png";
mainImg.id = "title-img";

//---Functions & Dom Manip---//

//Initial Load
window.onload = firstLoad;

//Function set up

function firstLoad() {
    //make main game display/board
    const displayContainer = document.createElement("div");
    displayContainer.className = "display-container";

    const gameDisplayDiv = document.createElement("div");
    gameDisplayDiv.id = "game-display";
    gameDisplayDiv.style.marginTop = "20px";

    //main menu background image
    const img = document.createElement("img");
    img.src = "./images/mainmenu.png";
    img.id = "homePic";

    //make start button
    const startBtn = document.createElement("div");
    startBtn.className = "btn";
    startBtn.id = "start";
    const startBtnImg = document.createElement("img");
    startBtnImg.src = "./images/startgame.png";
    startBtnImg.className = "home-buttons";
    startBtn.append(startBtnImg);
    startBtn.addEventListener("click", gameStart);

    //make instructions button
    const instructionsBtn = document.createElement("div");
    instructionsBtn.className = "btn";
    instructionsBtn.id = "instructions-btn";
    const instructionsBtnImg = document.createElement("img");
    instructionsBtnImg.src = "./images/instructions.png";
    instructionsBtnImg.className = "home-buttons";
    instructionsBtn.append(instructionsBtnImg);
    instructionsBtn.addEventListener("click", instructions);

    gameDisplayDiv.append(img, startBtn, instructionsBtn);
    displayContainer.append(mainImg, gameDisplayDiv);
    document.body.append(displayContainer);
}
//initial display when page is loaded. Selection screen

function gameStart() {
    gameOver = false;
    makeBoard();
    drawBoard();
    turnCheck();
}
//starts game

function makeBoard() {
    for (let i = 0; i < columns; i++) {
        const column = [];
        for (let j = 0; j < rows; j++) {
            column.push(null); // Push empty cell
        }
        board.push(column); //push column to board

    }
    return board;
}

function drawBoard() {
    const boardDisplay = document.getElementById("game-display");
    boardDisplay.innerHTML = ""; 

    gameOver = false;

    for (let i = 0; i < columns; i++) {
        const columnDiv = document.createElement("div");
        columnDiv.className = "column-div";

        for (let j = 0; j < rows; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.addEventListener("click", playPiece);
            columnDiv.append(cell);
        }
        boardDisplay.append(columnDiv);
    }

    const btnCheck = document.querySelector("#home"); 

    //if btncheck does not exist
    if (!btnCheck) {
        const homeBtn = document.createElement("div");
        homeBtn.className = "btn";
        homeBtn.id = "home";
        homeBtn.addEventListener("click", mainMenu);
        const mainMenuBtnImg = document.createElement("img");
        mainMenuBtnImg.id = "main-menu-btn-img";
        mainMenuBtnImg.src = "./images/mainmenubutton.png";
        homeBtn.append(mainMenuBtnImg);

        const newGameBtn = document.createElement("div");
        newGameBtn.className = "btn";
        newGameBtn.id = "new-game";
        newGameBtn.addEventListener("click", clearBoard);
        const newGameBtnImg = document.createElement("img");
        newGameBtnImg.id = "new-game-btn-img";
        newGameBtnImg.src = "./images/newgamebutton.png";
        newGameBtn.append(newGameBtnImg);

        //button container
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttonContainer.append(homeBtn, newGameBtn);

        const displayContainer = document.querySelector(".display-container");
        displayContainer.append(buttonContainer);
        displayContainer.prepend(mainImg);
        mainImg.style.marginTop = "10px";
    }
    playerStart(); 
    displayTurn();
}
//draw out the board on screen to be used

function mainMenu() {
    location.reload(); 
}
// main menu button function

function clearBoard() {
    board = [];
    makeBoard();
    drawBoard();
    turnCheck();
}
//reset game board when button clicked. probably could have called gameStart function instead but I don't need makeBoard again

function instructions() {
    const instructions = document.getElementById("instructions-btn");
    instructions.remove();
    const start = document.getElementById("start");
    start.remove();

    homePic.style.filter = "blur(4px)";

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
    homeBtn.className = "btn";
    homeBtn.id = "instructions-home-btn";
    const mainMenuBtnImg = document.createElement("img");
    mainMenuBtnImg.id = "main-menu-btn-img";
    mainMenuBtnImg.src = "./images/mainmenubutton.png";
    homeBtn.append(mainMenuBtnImg);
    homeBtn.addEventListener("click", mainMenu);

    boardDisplay.append(homeBtn);
}
//displays instructions when clicked. need button to go back to home.

function playerStart() {
    const playerStart = Math.floor(Math.random() * 2) + 1; // without +1 it seems like it's not as random, but it probably is the same

    if (playerStart === 1) {
        document.getElementById("game-display").style.cursor =
            "url('./images/redcursor.png'), auto"; // i guess this does work, needs auto @ end. updated these to only show when hover game board instead of body.
        currentPlayer = playerStart;
    } else if (playerStart === 2) {
        document.getElementById("game-display").style.cursor =
            "url('./images/yellowcursor.png'), auto";
        currentPlayer = playerStart;
    }

    displayTurn();
}
//determines who is starting

function playPiece(e) {
    const clickedCell = e.currentTarget;

    const index = Array.from(clickedCell.parentNode.parentNode.children).indexOf(
        clickedCell.parentNode
    ); 

    //find lowest cell
    let lowestCell;
    const columnCell = document.querySelectorAll(`.column-div:nth-child(${index + 1}) .cell`);

    for (let i = columnCell.length - 1; i >= 0; i--) {
        if (columnCell[i].childElementCount === 0) {
            lowestCell = columnCell[i];
            break;
        }
    }

    if (lowestCell) {
        if (currentPlayer === playerOne) {
            const redCell = document.createElement("img");
            redCell.src = "./images/redcell.png";
            redCell.className = "red-cell";
            lowestCell.append(redCell);
            currentPlayer = playerTwo; // switch to playerTwo after placing the red piece
            document.getElementById("game-display").style.cursor =
                "url('./images/yellowcursor.png'), auto"; // Switch cursor to yellow for next turn
        } else if (currentPlayer === playerTwo) {
            const yellowCell = document.createElement("img");
            yellowCell.src = "./images/yellowcell.png";
            yellowCell.className = "yellow-cell";
            lowestCell.append(yellowCell);
            currentPlayer = playerOne; 
            document.getElementById("game-display").style.cursor =
                "url('./images/redcursor.png'), auto"; 
        }

        const indexRow = [...columnCell].indexOf(lowestCell);
        board[indexRow][index] = currentPlayer;

        turnCheck();
        winCheck();
        drawCheck();
    }
}
//place down a coloured piece

function winCheck() {
    //check for vertical wins
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (
                board[i][j] === currentPlayer &&
                board[i + 1][j] === currentPlayer &&
                board[i + 2][j] === currentPlayer &&
                board[i + 3][j] === currentPlayer
            ) {
                gameOver = true;
                displayWinner();
                break;
            }
        }
    }

    //check for horizontal wins
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (
                board[i][j] === currentPlayer &&
                board[i][j + 1] === currentPlayer &&
                board[i][j + 2] === currentPlayer &&
                board[i][j + 3] === currentPlayer
            ) {
                gameOver = true;
                displayWinner();
                break;
            }
        }
    }

    //check for diagonal wins
    //top left to bottom right
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= columns; j++) {
            if (
                board[i][j] === currentPlayer &&
                board[i + 1][j + 1] === currentPlayer &&
                board[i + 2][j + 2] === currentPlayer &&
                board[i + 3][j + 3] === currentPlayer
            ) {
                gameOver = true;
                displayWinner();
                break;
            }
        }
    }
    //bottom left to top right
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= columns; j++) {
            if (
                board[i][j] === currentPlayer &&
                board[i + 1][j - 1] === currentPlayer &&
                board[i + 2][j - 2] === currentPlayer &&
                board[i + 3][j - 3] === currentPlayer
            ) {
                gameOver = true;
                displayWinner();
                break;
            }
        }
    }
}
//checks to see if win condition is met - Win Condition: 4 tiles in a row (horizontal, vert, or diag)

function drawCheck() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            //if there is an empty cell, the game is not a tie and is still going
            if (board[i][j] === null) {
                return;
            }
        }
    }
    displayDraw();
}
//checks for a tie

function displayTurn() {
    const turnDivCheck = document.querySelector("#turn-div");
    if (!turnDivCheck) {
        const turnDiv = document.createElement("div");
        turnDiv.id = "turn-div";
        const img = document.createElement("img"); 
        img.className = "turn-img";

        const displayContainer = document.querySelector(".display-container");

        displayContainer.append(turnDiv);
        turnDiv.append(img);

        turnCheck();
    }
}
//display which player's turn it is at bottom of screen, might get rid of this feature, seems redundant
//i'll keep it, looks kinda cool

function turnCheck() {
    const img = document.querySelector(".turn-img");
    if (currentPlayer === playerOne) {
        img.src = "./images/redturn.png";
        img.id = "red-turn";
    } else if (currentPlayer === playerTwo) {
        img.src = "./images/yellowturn.png";
        img.id = "yellow-turn";
    }
}

function displayWinner() {
    const boardDisplay = document.getElementById("game-display");

    if (gameOver === true) {
        if (currentPlayer === 2) {
            currentPlayer = "Red";
            boardDisplay.style.cursor = "url('./images/gameoverred.png'), auto";
        } else if (currentPlayer === 1) {
            currentPlayer = "Yellow";
            boardDisplay.style.cursor = "url('./images/gameoveryellow.png'), auto";
        }
        const gameOverDiv = document.createElement("div");
        gameOverDiv.id = "game-over-div";

        const winnerText = document.createElement("h2");
        winnerText.id = "winner-text";
        winnerText.textContent = `Game Over! ${currentPlayer} has won!`;

        gameOverDiv.append(winnerText);
        boardDisplay.append(gameOverDiv);

        const cells = document.querySelectorAll(".cell");
        cells.forEach(function (cell) {
            cell.removeEventListener("click", playPiece); //remove event listener, feel like i tried this before and it didn't work
        });

        const turnDisplay = document.getElementById("turn-div");
        turnDisplay.remove();
    }
}
//display winner

function displayDraw() {
    const boardDisplay = document.getElementById("game-display");

    boardDisplay.style.cursor = "url('./images/gameoverblue.png'), auto";

    const gameOverDiv = document.createElement("div");
    gameOverDiv.id = "game-over-div";

    const winnerText = document.createElement("h2");
    winnerText.id = "winner-text";
    winnerText.textContent = `Game Over. Nobody wins!`;

    const turnDisplay = document.getElementById("turn-div");
    turnDisplay.remove();

    gameOverDiv.append(winnerText);
    boardDisplay.append(gameOverDiv);
}
