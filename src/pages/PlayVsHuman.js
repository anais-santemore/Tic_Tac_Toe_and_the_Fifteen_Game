import React, { useState } from 'react';

import '../styles/TicTacToe.css';

// My Components
import Board from "../components/Board";
import Panel from "../components/Panels/HumanPanel";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        // border: 'solid purple 1px',
        width: '100%',
        height: 'calc(100% - 3.8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    boardContainer: {
        // border: 'solid orange 1px',
        width: '100%',
        paddingTop: 'min(100%, 50vh)',
        height: '0',
        position: 'relative',
    },
    boardArea: {
        // border: 'solid yellow 1px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',

    },
    panelArea: {
        // border: 'solid yellow 1px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        width: '100%',
        // width: '50vh',
        padding: '1.0rem',
        flex: '2 1 35vh',
        margin: '0rem auto',

    },
}));


export default function PlayVsHuman() {
    const classes = useStyles();

    let [moveList, setMoveList] = useState([]);
    let [gameNumber, setGameNumber] = useState(1);     // In ODD numbered games X goes first
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.


    return (
        <Box className={classes.root} >
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <Board
                        boardIcons={getBoardIcons()}
                        boardColors={getBoardColors()}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                <Panel
                    gameStatus={gameStatus()}
                    record={record}
                    handleUndoClick={handleUndoClick}
                    handleNewGameClick={handleNewGameClick}
                />
            </Box>
        </Box>
    )

    ///////////////////////////////////////////////////
    // Board and Panel Rendering Helpers
    ///////////////////////////////////////////////////

    function getBoardIcons(ml = moveList) {
        let data = Array(9).fill('_');  // Start with an array representing a board of NINE empty squares

        ml.forEach((squareId, turn) => {
            if (turn % 2 === 0) {
                data[squareId] = 'x';
            }
            else {
                data[squareId] = 'o';
            }
        })
        return data;  // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in. 
    }


    function getBoardColors(ml = moveList) {
        return Array(9).fill('noColor');
    }


    
    ///////////////////////////////////////////////////
    // Game Over & Helpers
    ///////////////////////////////////////////////////
    function gameOver(ml) {
        if (ml.length < 5) {
            return false
        }
        else if (ml.length === 9 || xWins(ml) || oWins(ml)) {
            return true
        }
        else {
            return false
        }
    }
    function xWins(ml) {
        return sumsOfThree(xNumbers(ml)).includes(15)
    }
    function oWins(ml) {
        return sumsOfThree(oNumbers(ml)).includes(15)
    }
    function gameDrawn(ml) {
        return (ml.length === 9 && !xWins(ml) && !oWins(ml))
    }

    ///////////////////////////////////////////////////
    // Movelist Filters
    ///////////////////////////////////////////////////

    function emptySquares(ml) {
        let emptySquaresList = [];
        for (let i = 0; i < 9; i++) {
            if (!ml.includes(i)) {
                emptySquaresList.push(i)
            }
        }
        // console.log(`List Empty Squares: ${emptySquaresList}`)
        return emptySquaresList;
    }
    function unclaimedNumbers(ml) {
        let unclaimedNumbers = [];
        for (let i = 1; i <= 9; i++) {
            if (!ml.includes(i)) {
                unclaimedNumbers.push(i)
            }
        }
        // console.log(`List Empty Squares: ${emptySquaresList}`)
        return unclaimedNumbers;
    }
    function xNumbers(ml) {
        if (xGoesFirst()) {
            return ml.filter((move, turn) => turn % 2 === 0)
        }
        else {
            return ml.filter((move, turn) => turn % 2 === 1)
        }
    }
    function oNumbers(ml) {
        if (oGoesFirst()) {
            return ml.filter((move, turn) => turn % 2 === 0)
        }
        else {
            return ml.filter((move, turn) => turn % 2 === 1)
        }
    }

    ///////////////////////////////////////////////////
    // Whose Turn --> gameNumber is 1-indexed and x goes first in game 1.
    ///////////////////////////////////////////////////
    function xGoesFirst() {
        return gameNumber % 2 === 1
    }
    function oGoesFirst() {
        return gameNumber % 2 === 0
    }


    ///////////////////////////////////////////////////
    // Low Level Helpers
    ///////////////////////////////////////////////////
    function intersect(listOne, listTwo) {
        return listOne.filter(item => listTwo.includes(item))
    }
    function sumsOfThree(moveSet) {
        let sums = []
        if (moveSet.length < 3) {
            return sums
        }
        for (let i = 0; i < moveSet.length - 2; i++) {
            for (let j = i + 1; j < moveSet.length - 1; j++) {
                for (let k = j + 1; k < moveSet.length; k++) {
                    let sum = moveSet[i] + moveSet[j] + moveSet[k]
                    sums.push(sum)
                }
            }
        }
        return sums
    }

    
    
    // HIGH-LEVEL PANEL HELPERS no params
    function gameStatus(ml = moveList) {
        if (xWins(ml)) {
            return (`X wins!`)
        }
        else if (oWins(ml)) {
            return (`O wins!`)
        }
        else if (gameDrawn(ml)) {
            return (`Draw.`)
        }
        else if (ml.length === 0) {
            return (xGoesFirst()) ? `X goes first this game.` : `O goes first this game.`
        }
        else if (ml.length % 2 === 0) {
            return (xGoesFirst()) ? `X goes next.` : `O goes next.`
        }
        else {
            console.error("A call to gameStatus() did not work!");
            return `ERROR`
        }
    }


    
    // MID-LEVEL HELPERS for getBoardColors() and getBoardHints()
    function highlightWins() {
        console.assert(!gameOver(), `highlightWins() was called but found that the game is not over`);

        let highlightedSquares = Array(9).fill('noColor')
        let data = lineData()


        if (data.xSquares.length === 3) {
            let squaresToHighlight = data.xSquares
            squaresToHighlight.forEach(square => {
                highlightedSquares[square] = 'win';
            });
        }


        return highlightedSquares;
    }

    // function highlightWins() {
    //     console.assert(!gameOver(), `highlightWins() was called but found that the game is not over`);

    //     let highlightedSquares = Array(9).fill('noColor')

    //     let winner = (wins('x')) ? 'x' : 'o';
    //     // let lines = lines(winner);
    //     linesWithThree(winner).forEach(line => {
    //         squaresInLine(line).forEach(square => {
    //             highlightedSquares[square] = 'win';
    //         });
    //     });
    //     return highlightedSquares;
    // } 



    function threatCreatingMoves(ml = moveList) {
        // This list may contain duplicates. A squareId that appears twice creates two separate two-in-a-line threats.
        const player = myTurn(ml);
        const threatCreatingMoves = [];
        linesWithOnlyOne(ml).forEach((line) => {
            squaresInLine(line).forEach((square) => {
                if (squareIsEmpty(square, ml)) {                 // Don't add an already claimed square to the list of therat creating moves!
                    threatCreatingMoves.push(square);
                }
            })
        })
        // console.log(`Player '${player}' can create threats on the following squares: ${threatCreatingMoves}`)
        return threatCreatingMoves;
    }




    // DEFINITION: thisMoveIsForced IFF player who moved last has one unblocked threat and player whose turn it is has none.
    function thisMoveIsForced(ml = moveList) {
        let isForced = (!thereIsAnImmediateWin(ml) && thereIsAnUrgentDefensiveMove(ml))
        // console.log(`In position: ${moveList} The next move is forced: ${isForced}`)
        return (isForced);
    }

    // DEFINITION: ForcingMoves are the moves that give the opponent an urgentDefensiveMove and no immediateWin to take presidence over it.
    function forcingMoves(ml = moveList) {
        let forcingMoves = [];
        emptySquares(ml).forEach(testSquare => {
            let hypotheticalHistory = ml.concat(testSquare);
            if (thisMoveIsForced(hypotheticalHistory)) {
                forcingMoves = forcingMoves.concat(testSquare)
            }
        })
        // console.log(`forcingMoves found these: ${forcingMoves}`)
        return forcingMoves;
    }


    // DEFINITION: A move that creates a position where you have one threat and your opponent has none &&
    //             once your opponent responds with their one urgentDefensiveMove you are left with the ability to create a double attack. 
    function distantForcedWinCreatingMoves(ml = moveList) {
        let distantForcedWinCreatingMovesList = [];
        // There cannot be a distantForcedWinCreatingMove unless there are at least 5 empty squares and playerTwo has has a chance to make an error on their first move.
        if (ml.length < 2 || ml.length > 4) {
            return distantForcedWinCreatingMovesList;
        }
        // To force a win you must force the first reply ... 
        forcingMoves(ml).forEach(forcingMove => {
            // ... and ensure the forced reply leaves you able to create a double attack.
            let hypotheticalHistory = ml.concat(forcingMove);
            if (urgentDefensiveMoves(hypotheticalHistory).length !== 1) {
                console.error(`There are ${urgentDefensiveMoves(hypotheticalHistory).length} urgentDefensiveMoves in the hypotheticalHistory being examined by distantForcedWinCreatingMoves.`)
            }
            let urgentDefensiveMove = urgentDefensiveMoves(hypotheticalHistory)[0];
            hypotheticalHistory = hypotheticalHistory.concat(urgentDefensiveMove);
            // console.log(`The one urgent defensive move is ${urgentDefensiveMove} leading to position: ${hypotheticalHistory}`);
            if (thereIsADoubleAttackCreatingMove(hypotheticalHistory)) {
                distantForcedWinCreatingMovesList = distantForcedWinCreatingMovesList.concat(forcingMove);
            }
        })
        console.log(`distantForcedWinCreatingMoves() found the following list: ${distantForcedWinCreatingMovesList}`)
        return distantForcedWinCreatingMovesList;
    }
    function thereIsADistantForcedWinCreatingMove(ml = moveList) {
        // There cannot be a distantForcedWinCreatingMove unless there are at least 5 empty squares and playerTwo has has a chance to make an error on their first move.
        // return (moveList.length > 2 && moveList.length < 5 && distantForcedWinCreatingMoves(moveList).length > 0)
        return (distantForcedWinCreatingMoves(ml).length > 0)
    }



    // Check if each of the squares that is is still empty is a losing Move
    function gameLosingMoves(ml = moveList) {  // This function should ONLY be called by getBoardHints when there are no forced Win Creating Moves
        let gameLosingMoves = [];
        emptySquares().forEach(square => {
            let hypotheticalHistory = ml.concat(square);
            if (thereIsAForcedWin(hypotheticalHistory)) {
                console.log(`I think I found a forced win after the moves: ${hypotheticalHistory}`)
                gameLosingMoves = gameLosingMoves.concat(square)
            }
        })
        console.log(`gameLosingMoves() found the following list: ${gameLosingMoves}`)
        return gameLosingMoves;
    }



    // CLICK HANDLERS
    function handleSquareClick(squareClicked) {
        if (gameOver()) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (!squareIsEmpty(squareClicked)) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveList.concat(squareClicked)
        console.log(`MoveList: ${updatedMoveList}`)

        setMoveList(updatedMoveList);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleUndoClick() {
        const shortenedMoveList = moveList.slice(0, moveList.length - 1)
        console.log(`handleUndoClick() removed ${moveList[moveList.length - 1]} . New Shortened history: ${shortenedMoveList}`);
        setMoveList(shortenedMoveList);
    }
    function handleNewGameClick() {
        setMoveList([]);
    }
    

    // TURN HELPERS
    // High-Level Methods that need to know whose turn it is can deduce that info by using these helpers to look at the history directly, rather than having to be invoked with a player param. 
    function myTurn(ml = moveList) {
        return (moveList.length % 2 === 0) ? 'x' : 'o';
    }
    function notMyTurn(ml = moveList) {
        return (ml.length % 2 === 0) ? 'o' : 'x';
    }
    function other(player) {
        if (player !== 'o' && player !== 'x') { console.error(`other(player) called with invalid player: ${player}`) }
        return (player === 'o') ? 'x' : 'o';
    }


    // LOW-LEVEL HELPERS
    // need to be told which player you care about b/c they may be used on EITHER the player whose turn it is or the other player.
    function squaresClaimedByPlayer(player, ml = moveList) {
        // let history = (alteredHistory === undefined) ? history : alteredHistory

        if (player === 'x') {
            return ml.filter((squareId, index) => index % 2 === 0);
        }
        else if (player === 'o') {
            return ml.filter((squareId, index) => index % 2 === 1);
        }
        else {
            console.error(`Method squaresClaimedByPlayer() called with invalid player: ${player}`)
            return undefined;
        }
    }




    function lineCountsFor(player, ml = moveList) {
        // Based on the history state, return an array of 8 ints 0-3 indicating the number of X's or O's in each row, col, and diagonal
        // const player = myTurn(moveList); 
        let lines = Array(8).fill(0);

        squaresClaimedByPlayer(player, ml).forEach(square => {
            // Update Row
            const row = Math.floor(square / 3)    // number 0, 1, or 2
            lines[row]++;

            // Update Col
            const col = (square % 3)            // number 0, 1, or 2  +3 to account for the three indexes set asside for rows
            lines[col + 3]++;

            // UpSlash ?
            if (square === 2 || square === 4 || square === 6) {
                lines[6]++
            }

            // DownSlash ?
            if (square === 0 || square === 4 || square === 8) {
                lines[7]++
            }
        });
        // console.log(`Status: ${status}`)
        return lines;
    }

    function lineCounts(ml = moveList) {
        // Line Indices 0,1,2 represent the three rows top to bottom.
        // Line Indices 3,4,5 represent the three columns left to right.
        // Line Indices 6,7 represent the upslash and downslash diagonals respectivly.
        // The 3-element array in each represents the number of X's and O's in that line, respectively.
        let lines = Array(8).fill([0, 0, 0]);

        ml.forEach((squareId, turn) => {
            let player = (turn % 2 === 0) ? 'x' : 'o'

            let row = Math.floor(squareId / 3)    // number 0, 1, or 2
            let col = (squareId % 3) + 3           // number 0, 1, or 2  +3 to account for the three indexes set aside for rows

            if (player === 'x') {
                lines[row][0]++
                lines[col][0]++
                if (squareId === 2 || squareId === 4 || squareId === 6) {  // upslash
                    lines[6][0]++
                }
                if (squareId === 0 || squareId === 4 || squareId === 8) {  // downslash
                    lines[7][0]++
                }
            }
            else {
                lines[row][1]++
                lines[col][1]++
                if (squareId === 2 || squareId === 4 || squareId === 6) {  // upslash
                    lines[6][1]++
                }
                if (squareId === 0 || squareId === 4 || squareId === 8) {  // downslash
                    lines[7][1]++
                }
            }
        });
        // console.log(`Status: ${status}`)
        return lines;
    }

    function intersect(listOne, listTwo) {
        let intersection = listOne.filter(number => listTwo.includes(number))
        return intersection;
    }

    function unclaimed(ml = moveList) {
        let unclaimed = [];
        for (let i = 0; i < 9; i++) {
            if (!ml.includes(i)) {
                unclaimed = unclaimed.concat(i)
            }
        }
        return unclaimed;
    }

    function lineData(ml = moveList) {
        let lineData = []

        let xSquares = ml.filter((square, turn) => turn % 2 === 0)
        let oSquares = ml.filter((square, turn) => turn % 2 === 1)
        // let unclaimed = unclaimed(ml)

        for (let lineId = 0; lineId < 8; lineId++) {
            let mySquares = squaresInLine(lineId)
            let thisLinesData = {
                'lineId': lineId,
                'xSquares': intersect(mySquares, xSquares),
                'oSquares': intersect(mySquares, oSquares),
                'unclaimed': intersect(mySquares, unclaimed(ml))
            }
            lineData[lineId] = thisLinesData
        }
        console.log(`LINE DATA: ${lineData}`)
        return lineData
    }


    function thereIsAForcedWin(ml = moveList) {
        const thereIsAForcedWin = (thereIsAnImmediateWin(ml)
            || thereIsADoubleAttackCreatingMove(ml)
            || thereIsADistantForcedWinCreatingMove(ml))
        // console.log(`immediateWins(moveList).length: ${immediateWins(moveList).length}`)
        // console.log(`thereIsADistantForcedWinCreatingMove(moveList).length: ${distantForcedWinCreatingMoves(moveList)ngth}`)
        console.log(`forcedWinCreatingMoves based on the moveList: ${ml} ==>  ${distantForcedWinCreatingMoves(ml)}`)
        console.log(`thereIsAForcedWin for the current player: ${thereIsAForcedWin}`)
        return thereIsAForcedWin;
    }



    function linesWithThree(player, ml = moveList) {
        let linesList = [];
        // console.log(`lineCountsFor : ${lineCountsFor(player)}`)
        lineCountsFor(player, ml).forEach((count, line) => {
            if (count === 3) {
                linesList.push(line)
            }
        })
        // console.log(`linesWithThree() called for player '${player}'. List: ${linesList}`)
        return linesList;
    }

    function linesWithOnlyTwo(player, ml = moveList) {
        let linesList = [];
        lineCountsFor(player, ml).forEach((count, line) => {
            if (count === 2 && lineCountsFor(other(player), ml)[line] === 0) {
                linesList.push(line)
            }
        })
        // console.log(`List Unblocked Twos for player '${player}': ${list}`)
        return linesList;
    }

    function linesWithOnlyOne(ml = moveList) {
        const player = myTurn(ml);
        let linesList = [];
        lineCountsFor(player, ml).forEach((count, line) => {
            if (count === 1 && lineCountsFor(other(player), ml)[line] === 0) {
                linesList.push(line)
            }
        })
        // console.log(`List Unblocked Ones for player '${player}' based on moveList ${moveList} ==> ${linesList}`)
        return linesList;
    }
    // function emptyLines(ml = moveList) {
    //     let linesList = [];
    //     lineCountsFor('x', ml).forEach((count, line) => {
    //         if (count === 0 && lineCountsFor('o', ml)[line] === 0) {
    //             linesList.push(line)
    //         }
    //     })
    //     console.log(`List Empty Lines: ${linesList}`)
    //     return linesList;
    // }
    function blockedLines(ml = moveList) {
        let linesList = [];
        lineCountsFor('x', ml).forEach((count, line) => {
            if (count > 0 && lineCountsFor('o', ml)[line] > 0) {
                linesList.push(line)
            }
        })
        console.log(`List Blocked Lines: ${linesList}`)
        return linesList;
    }
    function allLines() {
        // Top Row, Middle Row, Bottom Row, 
        // Left Column, Middle Column, Right Column,
        // Upslash Diagonal, Downslash Diagonal
        return [0, 1, 2, 3, 4, 5, 6, 7]
    }




    // list the squareIds that fall in a given lineId
    function squaresInLine(lineId) {
        // console.log(`getSquares() was called with lineId: ${lineId}`)
        let squareIds;
        switch (lineId) {
            case 0:
                squareIds = [0, 1, 2];  // x / 3 < 1
                break;
            case 1:
                squareIds = [3, 4, 5];  // (x / 3).floor() === 1
                break;
            case 2:
                squareIds = [6, 7, 8]; // (x / 3) > 1
                break;
            case 3:
                squareIds = [0, 3, 6];  // congruent to 0 mod 3
                break;
            case 4:
                squareIds = [1, 4, 7];  // congruent to 1 mod 3
                break;
            case 5:
                squareIds = [2, 5, 8];  // congruent to 2 mod 3
                break;
            case 6:
                squareIds = [2, 4, 6];  // diagonal
                break;
            case 7:
                squareIds = [0, 4, 8];  // congruent to 0 mod 4
                break;
            default:
                console.error(`squaresInLine() was called with an invalid lineId.`)
        }
        return squareIds;

    }



    // BOOLEAN helpers for gameStatus() and handleSquareClick()
    function squareIsEmpty(square, ml = moveList) {
        return (!ml.includes(square))
    }



    // function gameDrawn() {
    //     return (history.length >= 9 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }
    // function gameDrawn() {
    //     return (blockedLines().length >= 8 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }



    
    }

}
