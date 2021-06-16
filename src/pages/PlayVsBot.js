import React, { useState } from 'react';

// My Logical Components
import positionToOutcomeMap from "../pages/positionToOutcomeMap";
import { status, outcome, gameOver, xHasWon, oHasWon, gameDrawn, xNumbers, oNumbers, nextPlayer, winningMoves, urgentDefensiveMoves, selectMoveRandomly, availableNumbers } from "../logic/GameLogic";


// My React Components
import Board from "../components/Board";
import BotPanel from "../components/Panels/BotPanel";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import '../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100% - 3.8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    boardContainer: {
        width: '100%',
        paddingTop: 'min(100%, 50vh)',
        height: '0',
        position: 'relative',
    },
    boardArea: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    },
    panelArea: {
        width: '100%',
        flex: '2 1 35vh',
        margin: '0rem auto',
    },
}));

// In Play With Coach mode X always goes first

export default function PlayVsBot(props) {
    const classes = useStyles();

    const xGoesFirst = true  // X always goes first
    
    let startingPosition = ""  // vs []
    let [moveList, setMoveList] = useState(startingPosition);

    let [humanPlaysX, setHumanPlaysX] = useState(true);
    let [gameNumber, setGameNumber] = useState(1);
    let [record, setRecord] = useState([0, 0, 0]);

    let [difficultyMode, setDifficultyMode] = useState("hard") // In "hard" mode my bot never makes a mistake.

    return (
        <Box className={classes.root} >
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <Board
                        moveList={moveList}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                <BotPanel
                    moveList={moveList}
                    handleNewGameClick={handleNewGameClick}
                    handleBotGoFirstClick={handleBotGoFirstClick}
                />
            </Box>
        </Box>
    )

    function humansNumbers(mls) {  
        return (humanPlaysX) ? xNumbers(mls) : oNumbers(mls)
    }
    function botsNumbers(mls) {  
        return (humanPlaysX) ? oNumbers(mls) : xNumbers(mls)
    }
    function humansGoesNext(mls) {  
        if (humanPlaysX) {
            return (nextPlayer(mls) === "xNext")
        } 
        else {
            return (nextPlayer(mls) === "oNext")
        }
    }
    // function botsNumbers(mls) {  // Human or Bot, Depending on mode
    //     return (humanPlaysX) ? oNumbers(mls) : xNumbers(mls)
    // }


    // CLICK HANDLERS
    function handleSquareClick(squareClickedString) {
        if (gameOver(moveList)) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (moveList.includes(squareClickedString)) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveList.concat(squareClickedString)
        console.log(`MoveList: ${updatedMoveList}`)

        setMoveList(updatedMoveList);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleCardClick(cardClicked) {
        // console.log(`handleCardClick called with cardId: ${cardClicked} `)
        if (humansGoesNext(moveList)) {
            console.warn("NO EFFECT. Be patient, the bot takes a second to move. ")
            return 1
        }
        else if (moveList.includes(cardClicked)) {
            console.warn("NO EFFECT. That number has already been claimed.")
            return 1
        }
        else if (gameOver(moveList)) {
            console.warn("NO EFFECT. The Game is already over.")
            return 1
        }
        else {
            let updatedMoveList = moveList.concat(cardClicked)
            // console.log(`updatedMoveList: ${updatedMoveList} `)
            setMoveList(updatedMoveList)
            if (gameOver(updatedMoveList)) {
                handleGameOver(updatedMoveList)
            } else {
                handleBotsTurn(updatedMoveList)
            }
            return 0
        }
    }
    function handleGameOver(ml) {
        // console.assert(gameIsOver(ml), `NO EFFECT. handleGameOver called but the game isn't actually over!`)
        let result = status(ml)

        if (result === "Game Over. Draw.") {
            setRecord([record[0], record[1], ++record[2]])
        }
        else if (result === "Player Wins!") {
            setRecord([++record[0], record[1], record[2]])
        }
        else if (result === "Bot Wins!") {
            setRecord([record[0], ++record[1], record[2]])
        }
        else {
            console.error(`handleGameOver called with invalid game result: ${result}. `)
        }
    }

    
    
    function handleNewGameClick() {
        setMoveList(startingPosition);
    }

    function handleBotGoFirstClick() {
        console.assert(moveList.length === 0, `handleLetBotGoFirstClick was called but it is not the frst move of the game!`)
        setHumanPlaysX(false)
        handleBotsTurn('') // if the bot is going first the movelist is empty.
    }


    // Find and make a move for the Bot with a slight delay. 
    function handleBotsTurn(ml = moveList) {
        let botMove = getBotMove(ml)
        let updatedMoveList = ml.concat(botMove)
        setTimeout(() => {
            setMoveList(updatedMoveList)
            if (gameOver(updatedMoveList)) {
                console.log("Don't let player move again. Call handleGameOver instead.")
                handleGameOver(updatedMoveList)
                return 1
            }
        }, 800)
    }

    //////////////////////////////////////////////////////////////     
    //  GET  BOT  MOVE  PROTOCOLS
    ////////////////////////////////////////////////////////////// 

    function getBotMove(ml = moveList) {
        if (difficultyMode === "easy") {
            return easyProtocol(ml)
        }
        else if (difficultyMode === "medium") {
            return mediumProtocol(ml)
        }
        else if (difficultyMode === "hard") {
            return hardProtocol(ml)
        }
        else {
            console.error(`getBotMove called with invalid difficulty mode!!!`)
        }
    }

    // In EASY mode: Bot wins immediately if it can and otherwise selects a random move. 
    function easyProtocol(ml) {
        if (winningMoves(ml).length > 0) {
            console.log(`BOT FOUND IMMEDIEATELY WINNING MOVES: ${winningMoves(ml)}`)
            return selectMoveRandomly(winningMoves(ml))
        }
        else {
            return selectMoveRandomly(availableNumbers(ml))
        }
    }

    // In MEDIUM mode, Bot wins immediately if possible.
    // In MEDIUM mode, Bot blocks any immediate threats but does not look any further ahead. 
    function mediumProtocol(ml) {
        let wins = winningMoves(ml)
        let defensiveMoves = urgentDefensiveMoves(ml)
        if (wins.length > 0) {
            console.log(`BOT FOUND IMMEDIATELY WINNING MOVES: ${wins}`)
            return selectMoveRandomly(wins)
        }
        else if (defensiveMoves.length > 0) {
            console.log(`BOT FOUND URGENT DEFENSIVE MOVES: ${defensiveMoves}`)
            return selectMoveRandomly(defensiveMoves)
        }
        else {
            return selectMoveRandomly(availableNumbers(ml))
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



    // BOOLEAN helpers for getStatus() and handleSquareClick()
    function squareIsEmpty(square, ml = moveList) {
        return (!ml.includes(square))
    }



    // function gameDrawn() {
    //     return (history.length >= 9 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }
    // function gameDrawn() {
    //     return (blockedLines().length >= 8 && !wins('x') && !wins('o'));  // Board full and neither player has a win
    // }



    function gameOver(ml = moveList) {
        if (ml.length >= 9) {
            console.log(`gameOver() --> TRUE`)
            return true
        }
        else if (ml.length < 5) {
            console.log(`gameOver() --> FALSE`)
            return false
        }
        else {
            lineData().forEach(line => {
                if (line.xSquares.length === 3 || line.oSquares.length === 3) {
                    console.log(`gameOver() --> TRUE`)
                    return true
                }
            })
            console.log(`gameOver() --> FALSE`)
            return false
        }
    }

}
