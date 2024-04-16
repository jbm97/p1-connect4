//Declaring variables

let playerOne = 1; //remove quotes to match playerStart equalities
let playerTwo = 2;
let currentPlayer;
let gameOver = false; //for displaying winner function, will need to have it run when this is changed to true
let board = [];
const rows = 6;
const columns = 7;

//main title image
const mainImg = document.createElement("img");
mainImg.src = "./images/mainpic.png";
mainImg.id = "title-img";

//TODO: Set up CPU? maybe next time...........

//Functions & Dom Manip

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
    removeWinnerDisplay();
}
//starts game

function makeBoard() {
    //set up empty board array when game start is clicked
    //     const board = [];
    //     for (let i = 0; i < rows; i++) {
    //         board.push(Array(columns)); //push to array with length of columns
    //         console.log(board);
    //     }
    //     window.board = board; // global variable for other functions

    //attempt this a different way, want to try and make columns of 6 created instead of 42 cells so it can find lowest cell easier hopefully?
    for (let i = 0; i < columns; i++) {
        // for each column create an array representing the column with 6 empty cells
        const column = [];
        for (let j = 0; j < rows; j++) {
            column.push(null); // Push empty cell
        }
        board.push(column); //push column to board
        // console.log(column);
        // console.log(board); // returns 7 arrays of length 6, i think this is what i'm looking for.
    }
    return board;
}

function drawBoard() {
    const boardDisplay = document.getElementById("game-display");
    boardDisplay.innerHTML = ""; // clear current HTML in game-display div

    gameOver = false; //set this here as well so it resets when New Game is pressed during the game or after someone has won

    //iterate through board to create cells, same loop as previous
    for (let i = 0; i < columns; i++) {
        const columnDiv = document.createElement("div"); //create the column divs (groups of 6) instead of 42 individual cells, need to contain the columns
        columnDiv.className = "column-div";

        for (let j = 0; j < rows; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.addEventListener("click", playPiece); //place down piece in cell when clicked
            columnDiv.append(cell);
        }
        boardDisplay.append(columnDiv);
    }

    const btnCheck = document.querySelector("#home"); //don't need both buttons here, but it has to be this one because it's present @ instructions screen

    // needed to put everything in an if statement below as
    // without it these elements will be created whenever the button is pressed.
    // with the if statement it only makes it when it isn't present.

    //if btncheck does not exist, do this
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
    playerStart(); //choose who starts
    displayTurn(); //display turn at bottom, is this really needed though? you can tell based on cursor
}
//draw out the board on screen to be used

function mainMenu() {
    location.reload(); //just reloads the page, feel like this should make things easier.
}
//not sure if this function is needed (could be another way to achieve result) but it solved my issue.

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
//

function playPiece(e) {
    const clickedCell = e.currentTarget; //target clicked cell. had to add (e) or some parameter in function call

    //create variable that converts HTML collection into an array of cells, then finds the column index of the clicked cell so it can check it after (array for indexOf)
    const index = Array.from(clickedCell.parentNode.parentNode.children).indexOf(
        clickedCell.parentNode
    ); //need another .parentNode here now cause of new div parent
    // console.log(index);

    //find lowest cell
    let lowestCell;
    const columnCell = document.querySelectorAll(`.column-div:nth-child(${index + 1}) .cell`); //select all children with class .column-div in the index. need + 1 or it select's column before due to indexing
    // console.log(columnCell);

    for (let i = columnCell.length - 1; i >= 0; i--) {
        if (columnCell[i].childElementCount === 0) {
            lowestCell = columnCell[i]; //set lowest cell to the lowest empty cell in column index
            // console.log(lowestCell);
            break; //end loop when found
        }
    }

    if (lowestCell) {
        //if cell is empty...
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
            currentPlayer = playerOne; // switch to playerOne after placing the yellow piece
            document.getElementById("game-display").style.cursor =
                "url('./images/redcursor.png'), auto"; // Switch cursor to red for next turn
        }

        // update board array to fix error with winCheck
        // set row index equal to the index of lowest cell
        const indexRow = [...columnCell].indexOf(lowestCell);
        // console.log(indexRow);
        // console.log("columnCell length:", columnCell.length);
        // console.log("Array.from(columnCell):", Array.from(columnCell));
        // console.log("indexOf(lowestCell):", [...columnCell].indexOf(lowestCell));
        board[indexRow][index] = currentPlayer;

        turnCheck();
        winCheck();
        drawCheck();
    }
}
//place down a coloured piece

function winCheck() {
    //check for vertical wins
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            //only need to check these conditions, for vertical win you can only win top down
            //TODO: currently does not detect a winner if there are 4 in a row in the last column
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
    //use same loop, sort through rows first
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < columns; i++) {
            //might need to check @ j - 1, j - 2, etc for going backwards? seems to work fine for now though
            console.log(i, j, currentPlayer); // this one has the j value reading fine?
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

    //check for diagonal wins (will need for 2 directions, top to bottom and bottom to top)
    //top left to bottom right, only seems to work if it is in columns 1-4
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i <= columns; i++) {
            console.log(i, j, currentPlayer);
            //j value is always reading 0, which gives the error
            if (
                board[i][j] === currentPlayer && //uncaught TypeError here, reading 0. same error as before, but why is this line fine in the previous functions?
                //seems like the issue here is that it's trying to reach values outside of the board that do not exist?
                //this condition is not possible starting from column 4 (index 3) onward, only check for the first 4?
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
    //does not seem to work currently
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i <= columns; i++) {
            if (
                board[i][j] === currentPlayer &&
                board[i - 1][j + 1] === currentPlayer &&
                board[i - 2][j + 2] === currentPlayer &&
                board[i - 3][j + 3] === currentPlayer
            ) {
                gameOver = true;
                displayWinner();
                break;
            }
        }
    }
}
//checks to see if win condition is met - Win Condition: 4 tiles in a row (horizontal, vert, or diag) Need to figure out the logic here.

function drawCheck() {}
//checks for a tie

function displayTurn() {
    const turnDivCheck = document.querySelector("#turn-div"); //check to see if this exists so it doesn't keep making it every turn
    if (!turnDivCheck) {
        const turnDiv = document.createElement("div");
        turnDiv.id = "turn-div";
        const img = document.createElement("img"); //change to image later, using text for testing
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
    //TODO: figure out why this keeps displaying after new game or main menu button press, it should reset gameOver to false so this doesn't come up again.
    if (gameOver === true) {
        removeWinnerDisplay();
        console.log(gameOver); //i don't think it's gameOver, seems to be how the board is storing cells
        if (currentPlayer === 2) {
            //re-reading this confuses me because this should be 1, but switching it makes it show when yellow whens instead.
            currentPlayer = "Red";
            document.getElementById("game-display").style.cursor =
                "url('./images/gameoverred.png'), auto";
        } else if (currentPlayer === 1) {
            currentPlayer = "Yellow";
            document.getElementById("game-display").style.cursor =
                "url('./images/gameoveryellow.png'), auto";
        }
        const gameOverDiv = document.createElement("div");
        gameOverDiv.id = "game-over-div";

        const winnerText = document.createElement("h2");
        winnerText.id = "winner-text";
        winnerText.textContent = `Game Over! ${currentPlayer} has won!`;

        const boardDisplay = document.getElementById("game-display");
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

function removeWinnerDisplay() {
    const gameOverDiv = document.getElementById("game-over-div");
    if (gameOverDiv) {
        gameOverDiv.remove(); //remove the winner message if it exists
    }
}

//TODO: figure out why winner pops up after 1 piece is played after going to menu or starting new game
//TODO: seems like it only happens when the starting player is the winner of the previous game?
//TODO: typeError on line 348, diagonal win check. piece still plays as normal but issue happens every time.
