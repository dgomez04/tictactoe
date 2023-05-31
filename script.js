
// gameBoard controller -> controls logic board and its attributes

const gameBoard = (() => {

    const Board = new Array(9)

    // getTile
    const getTile = (index) =>  Board[index]; 

    // setTile
    const setTile = (index, sign) => Board[index] = sign;
    
    //checkWin -> goes through array to check for winner

    //clear
    const clearBoard = () => {
        for(let i = 0; i < Board.length; i++)
            Board[i] = undefined;
    };

    return {getTile, setTile, clearBoard};
})();

// displayController -> associates display with backend

const displayController = (() => {

    const tileSet = document.querySelectorAll('#gridcontainer > *');

    // checkTile (if getTile != "")
    function checkTile(index) {
        return (gameBoard.getTile(index) != undefined) ? true : false;
    }

    // drawTile -> draw all Tiles
    const drawTiles = () => {
        tileSet.forEach((tile) => {
            tile.textContent = gameBoard.getTile(tile.dataset.key);
        });
    }

    return {checkTile, drawTiles}
})();

// gameController -> controls gameplay, creates players, finds winner

// Player -> sets symbol to be either "x" or "o"

const Player = ((sign) => {
    return {sign}
});
