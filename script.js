
// gameBoard controller -> controls logic board and its attributes

const gameBoard = (() => {

    const Board = ["", "", "", "", "", "", "", "", ""]

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

        for(let i = 0; i < winCombo.length; i++) {
            return((gameBoard.getTile(winCombo[i][0]) != "" || gameBoard.getTile(winCombo[i][0]) 
            === gameBoard.getTile(winCombo[i][1] === gameBoard.getTile(winCombo[i][2]))) ? true : false)
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

    const tileSet = document.querySelectorAll('#gridcontainer > *');

    function checkTile(index) {
        return (gameBoard.getTile(index) != undefined) ? true : false;
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
})();

