
const tileSet = document.querySelectorAll('#gridcontainer > *');

const modalContainer = document.querySelector('#modalcontainer');

const againBtn = document.querySelector('#againBtn');

// gameBoard controller -> controls logic board and its attributes

const gameBoard = (() => {

    const Board = ["", "", "", "", "", "", "", "", ""];

    const getTile = (index) =>  Board[index]; 

    const setTile = (index, sign) => {
        Board[index] = sign; 
        displayController.updateTiles();
    }

    
    const checkWin = () => {
        const winCombo = [
            [0,1,2], [3,4,5], 
            [6,7,8], [0,3,6], 
            [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]

        let result = false;

        for(let i = 0; i < winCombo.length; i++) {
            let firstTile = gameBoard.getTile(winCombo[i][0]);
            let secondTile = gameBoard.getTile(winCombo[i][1]);
            let thirdTile = gameBoard.getTile(winCombo[i][2]);

            if(firstTile != "" && firstTile == secondTile && firstTile == thirdTile){
                result = true;
                break;
            } 
        }

        return result;
    };

    const clearBoard = () => {
        for(let i = 0; i < Board.length; i++)
            Board[i] = "";

        displayController.updateTiles();

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

    const endRound = () => modalContainer.classList.remove('opacity-0', 'pointer-events-none');

    const playRound = (index) => {
        if(displayController.checkTile = true) {
            let currentPlayer = (round % 2 == 0) ? playerOne : playerTwo;
            gameBoard.setTile(index, currentPlayer.sign);
            round++;

            if(gameBoard.checkWin() == true || round == 9) {
                round = 0;
                endRound();
            }
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

againBtn.addEventListener('click', () => {
    modalContainer.classList.add('opacity-0', 'pointer-events-none');
    gameBoard.clearBoard();

    tileSet.forEach((button) => {
        button.classList.remove('pointer-events-none')
    });
});
