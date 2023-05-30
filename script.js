
// gameBoard controller -> controls logic board and its attributes

const gameBoard = (() => {

    const Board = new Array(9)

    // getTile
    const getTile = (index) =>  Board[index]; 

    // setTile
    const setTile = (index, sign) => Board[index] = sign;
    
    //clear
    const clearBoard = () => {
        for(let i = 0; i < Board.length; i++)
            Board[i] = "";
    };

    return {getTile, setTile, clearBoard};
})();

// displayController -> associates display with backend

// gameController -> controls gameplay, creates players

// Player -> sets symbol to be either "x" or "y"