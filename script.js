
const tileSet = document.querySelectorAll('#gridcontainer > *');

const modalContainer = document.querySelector('#modalcontainer');

const againBtn = document.querySelector('#againBtn');

const resetBtn = document.querySelector('#resetBtn');

// gameBoard controller -> controls logic board and its attributes

const gameBoard = (() => {

    const Board = ["", "", "", "", "", "", "", "", ""];


    const getTile = (index) =>  Board[index]; 

    const setTile = (index, sign) => {
        Board[index] = sign; 
        displayController.updateTiles();
    }

    const checkDraw = (round) => ((round == 9) ?  true : false);
    

    const checkWin = () => {
        const winCombo = [
            [0,1,2], [3,4,5], 
            [6,7,8], [0,3,6], 
            [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]

        this.result = false;

        for(let i = 0; i < winCombo.length; i++) {
            let firstTile = gameBoard.getTile(winCombo[i][0]);
            let secondTile = gameBoard.getTile(winCombo[i][1]);
            let thirdTile = gameBoard.getTile(winCombo[i][2]);

            if(firstTile != "" && firstTile == secondTile && firstTile == thirdTile){
                this.result = true;
                break;
            } 
        }
    
        return result;
    };

    const getAvailableMoves = (moves) => {
        for(let i = 0; i < Board.length; i++) {
            if(Board[i] == "") {
                moves.push(i);
            }
        }
        return moves;
    }

    const clearBoard = () => {
        for(let i = 0; i < Board.length; i++)
            Board[i] = "";

        displayController.updateTiles();

    };

    return {getTile, setTile, checkWin, checkDraw, getAvailableMoves, clearBoard, Board};
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

// Score utilized for minimax algo.
const Score = (() => {
    if(gameBoard.checkWin() == true && gameController.getCurrentPlayer() == 'X') {
        return 10;
    } else if(gameBoard.checkWin() == true && gameController.getCurrentPlayer() == 'O') {
        return -10;
    } else if(gameBoard.checkDraw == true){
        return 0;
    }
});

//TODO : RUN BOARD INSTEAD OF GETTING AVAILABLE MOVES 
const minimax = ((isMax) => {
    Score();
    let moves = [];
    gameBoard.getAvailableMoves(moves);

    if(isMax) {
        let bestScore = -1000;
        for(let i = 0; i < moves.length; i++) {
            gameBoard.setTile(moves[i], 'O');

            bestScore = Math.max(bestScore, minimax(false));

            gameBoard.setTile(moves[i], '');
        }

        return bestScore;
        
    } else {

        let bestScore = 1000;

        for(let i = 0; i < moves.length; i++) {
            gameBoard.setTile(moves[i], 'O');

            // runs recursively and chooses the minimum value;
            bestScore = Math.min(bestScore, minimax(true));

            gameBoard.setTile(moves[i], '');
        }

        return bestScore;

    }
});

const getBestMove = (() => {
    let bestMove;
    let bestScore = -10000;
    let moves = [];

    gameBoard.getAvailableMoves(moves);

    //evaluate every single space
    for(let i = 0; i < moves.length; i++) {
        //sets value
        gameBoard.setTile(moves[i], 'O')

        //evals value
        moveScore = minimax(false);

        //undo move
        gameBoard.setTile(moves[i], "");

        if(moveScore > bestScore) {
            bestMove = moves[i];
            bestScore = moveScore;
        }
    }
    
    return bestMove;
});


// gameController -> controls gameplay, playRound

const gameController = (() => {
    const playerOne =  Player('X');
    const playerAI =  Player('O');

    let round = 0;

    const getCurrentPlayer = () => (round % 2 == 0) ? playerOne.sign : playerAI.sign;
     

    const endRound = () => modalContainer.classList.remove('opacity-0', 'pointer-events-none');

    const playRound = (index) => {
        if(displayController.checkTile = true) {
            gameBoard.setTile(index, getCurrentPlayer());
            round+= 1;
    
            let move = getBestMove();
            gameBoard.setTile(move, getCurrentPlayer());
            round+= 1;
            
            tileSet.forEach((button) => {
                if(button.dataset.key == move) {
                    button.classList.add('pointer-events-none')
                }
            });
    

            if(gameBoard.checkWin() == true || gameBoard.checkDraw(round) == true) {
                round = 0;
                endRound();
            }
        }
    }

    resetBtn.addEventListener('click', () => {
        round = 0;
        gameBoard.clearBoard();
    
        tileSet.forEach((button) => {
            button.classList.remove('pointer-events-none')
        });
    });

    return {playRound, getCurrentPlayer}
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

