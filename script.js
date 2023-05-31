
const tileSet = document.querySelectorAll('#gridcontainer > *');

// gameBoard controller -> controls logic board and its attributes

const gameBoard = (() => {

    const Board = ["", "", "", "", "", "", "", "", ""];

    const getTile = (index) =>  Board[index]; 

    const setTile = (index, sign) => Board[index] = sign;
    
    //TO DO: find a way to write the function cleaner
    const checkWin = () => {
        const winCombo = [
            [0,1,2], [3,4,5], 
            [6,7,8], [0,3,6], 
            [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]

        //TO DO: CHECK WIN 
        for(let i = 0; i < winCombo.length; i++) {
            
        }
    };

    const clearBoard = () => {
        for(let i = 0; i < Board.length; i++)
            Board[i] = "";
    };

    return {getTile, setTile, checkWin, clearBoard};
})();

// displayController -> associates display with logic

const displayController = (() => {

    function checkTile(index) {
        return (gameBoard.getTile(index) != "") ? true : false;
    }

    const updateTiles = () => {
        tileSet.forEach((tile) => {
            tile.textContent = gameBoard.getTile(tile.dataset.key);
        });
    }

    return {checkTile, updateTiles}
})();

// Player -> sets symbol to be either "x" or "o"

const Player = ((sign) => {
    return {sign}
});

// gameController -> controls gameplay, playRound

const gameController = (() => {
    const playerOne =  Player('X');
    const playerTwo =  Player('O');

    let round = 0

    const playRound = (index) => {
        if(displayController.checkTile = true) {
            let currentPlayer = (round % 2 == 0) ? playerOne : playerTwo;
            gameBoard.setTile(index, currentPlayer.sign);
            displayController.updateTiles();
            round++;
        }
    }

    return {playRound}

})();

// eventListener for buttons

tileSet.forEach((button) => {
    button.addEventListener('click', () => {
        gameController.playRound(button.dataset.key);
        button.classList.add('pointer-events-none');
    });
});