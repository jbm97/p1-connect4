//Declaring variables

let playerOne = 1; //remove quotes to match playerStart equalities
let playerTwo = 2;
let currentPlayer;
let gameOver; //for displaying winner function, will need to have it run when this is changed to true
let board = []; // feel like i need this for the global variable below
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
    const displayContainer = document.createElement("div");
    displayContainer.className = "display-container";

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

    gameDisplayDiv.append(img, startBtn, instructionsBtn);
    displayContainer.append(gameDisplayDiv);
    document.body.append(displayContainer);
}
//initial display when page is loaded. Selection screen

function gameStart() {
    gameOver = false;
    makeBoard();
    drawBoard();
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
        console.log(column);
        console.log(board); // returns 7 arrays of length 6, i think this is what i'm looking for.
    }
    return board;
}

function drawBoard() {
    const boardDisplay = document.getElementById("game-display");
    boardDisplay.innerHTML = ""; // clear current HTML in game-display div
    boardDisplay.style.marginTop = "150px";
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
        homeBtn.textContent = "Main Menu"; // delete later, going to use an image/image of text
        homeBtn.addEventListener("click", mainMenu);

        const newGameBtn = document.createElement("div");
        newGameBtn.className = "btn";
        newGameBtn.id = "new-game";
        newGameBtn.textContent = "New Game"; // delete later, going to use an image/image of text
        newGameBtn.addEventListener("click", clearBoard);

        //button container
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttonContainer.append(homeBtn, newGameBtn);

        const displayContainer = document.querySelector(".display-container");
        displayContainer.append(buttonContainer);
    }
    playerStart(); //choose who starts
    displayTurn(); //display turn at bottom, is this really needed though? you can tell based on cursor
}
//draw out the board on screen to be used

function mainMenu() {
    gameOver = false;
    document.body.innerHTML = ""; //clear entire body, then reload.
    document.body.style.cursor = "";
    firstLoad();
}
//not sure if this function is needed (could be another way to achieve result) but it solved my issue.

function clearBoard() {
    drawBoard();
    turnCheck();
    gameOver = false;
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
    console.log(index);

    //find lowest cell
    let lowestCell;
    const columnCell = document.querySelectorAll(`.column-div:nth-child(${index + 1}) .cell`); //select all children with class .column-div in the index. need + 1 or it select's column before due to indexing
    console.log(columnCell);

    for (let i = columnCell.length - 1; i >= 0; i--) {
        if (columnCell[i].childElementCount === 0) {
            lowestCell = columnCell[i]; //set lowest cell to the lowest empty cell in column index
            console.log(lowestCell);
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
        console.log(indexRow);
        console.log("columnCell length:", columnCell.length);
        console.log("Array.from(columnCell):", Array.from(columnCell));
        console.log("indexOf(lowestCell):", [...columnCell].indexOf(lowestCell));
        board[indexRow][index] = currentPlayer;

        turnCheck();
        winCheck();
        drawCheck();
    }
}
//place down a coloured piece

function winCheck() {
    //check for vertical wins
    // if 4 of same colour in a vertical column, that colour wins. check every time a piece is placed.
    //can probably have it search thru each column div created before to see if any have 4 of the same index in a row
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
    //if 4 of samecolour in horizontal row, that colour wins. check every time a piece is placed.
    //not entirely sure how to approach this one yet as the logic behind checking vertical columns doesn't work here.
    //might be able to check the columns next to it at the same index?
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < columns; i++) {
            //might need to check @ j - 1, j - 2, etc for going backwards? seems to work fine for now
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
    //if 4 of the same colour in a diagonal direction, that colour wins. check every time placed.
    //if i can do what i want with horizontal this should work too. will have to check the index before and after in the columns beside
}
//checks to see if win condition is met - Win Condition: 4 tiles in a row (horizontal, vert, or diag) Need to figure out the logic here.

function drawCheck() {}
//checks for a tie

function displayTurn() {
    const turnDivCheck = document.querySelector("#turn-div"); //check to see if this exists so it doesn't keep making it every turn
    if (!turnDivCheck) {
        const turnDiv = document.createElement("div");
        turnDiv.id = "turn-div";
        const img = document.createElement("div"); //change to image later, using text for testing
        img.className = "turn-img";

        const displayContainer = document.querySelector(".display-container");

        displayContainer.append(turnDiv);
        turnDiv.append(img);

        turnCheck();
    }
}
//display which player's turn it is at bottom of screen, might get rid of this feature, seems redundant

function turnCheck() {
    const img = document.querySelector(".turn-img");
    if (currentPlayer === playerOne) {
        img.textContent = "Red's Turn";
        img.id = "red-turn";
    } else if (currentPlayer === playerTwo) {
        img.textContent = "Yellow's Turn";
        img.id = "yellow-turn";
    }
}

function displayWinner() {
    //TODO: figure out why this keeps displaying after new game or main menu button press, it should reset gameOver to false so this doesn't come up again.
    if (gameOver === true) {
        if (currentPlayer === 2) {
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

        const winnerText = document.createElement("p");
        winnerText.id = "winner-text";
        winnerText.textContent = `Game Over! ${currentPlayer} has won!`;

        const boardDisplay = document.getElementById("game-display");
        gameOverDiv.append(winnerText);
        boardDisplay.append(gameOverDiv);
        boardDisplay.style.marginTop = "-62px";

        const cell = document.querySelectorAll(".cell");
        cell.onclick = null; //remove event listener

        const turnDisplay = document.getElementById("turn-div");
        turnDisplay.remove();
    }
}
//display winner

//TODO: the actual game logic
//TODO: Create winner text/display
