import React, { useState } from 'react';

// My Logical Components
import positionToOutcomeMap from "../pages/positionToOutcomeMap";

// My React Components
import Board from "../components/Board";
import CoachPanel from "../components/Panels/CoachPanel";

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

export default function PlayWithCoach(props) {
    const classes = useStyles();
    const xGoesFirst = true  // X always goes first in Play with Coach Mode

    let startingPosition = ""  // vs []
    let [moveListString, setMoveListString] = useState(startingPosition);

    let [gameNumber, setGameNumber] = useState(1);  
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.
    
    // let [showHints, setShowHints] = useState(false);
    let [showHints, setShowHints] = useState(true);

    const positionMap = positionToOutcomeMap()
    const trioList = generateTrioList()


    return (
        <Box className={classes.root} >
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <Board
                        boardIcons={getBoardIcons(moveListString)}
                        boardColors={getBoardColors(moveListString)}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                <CoachPanel
                    gameNumber={gameNumber}
                    record={record}
                    moveNumber={moveListString.length + 1}
                    gameOver={gameOver(moveListString)}
                    gameStatus={getStatus(moveListString)}
                    commentLabel={getCommentLabel(moveListString)}
                    handleUndoClick={handleUndoClick}
                    toggleShowHints={toggleShowHints}
                />
            </Box>
        </Box>
    );

    //////////////////////////////////////////////////
    // Use a Map instead of an Object for faster lookup of the xdoStatus of each child of a given position
    // 
    // We can safely omit move lists of length 9 from the map because the last move is always forced,
    // There is s 1:1 correspondence between MLs of length 8 and MLs of length 9.
    ////////////////////////////////////////////////////

    function moveListStringToArray(mls) {               // "123" --> [1,2,3]
        return Array.from(mls).map(e => Number(e))
    }
    function moveListArrayToString(mla) {               // [1,2,3] --> "123"
        return mla.toString().replaceAll(",", "")
    }

    

    function getBoardIcons(mls) {
        let data = Array(10).fill('_');  // Start with an array representing a board of NINE empty squares
        moveListStringToArray(mls).forEach((squareId, turn) => {
            if (xGoesFirst) {
                data[squareId] = (turn % 2 === 0) ? 'x' : 'o'
            }
            else {
                data[squareId] = (turn % 2 === 0) ? 'o' : 'x'
            }
        })
        return data; // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in.
    }

    function getBoardColors(mls) {
        let colors = Array(10).fill('noColor')
        if (xHasWon(mls) || oHasWon(mls)) {
            colors = highlightWins(mls)
        }
        return (showHints === true) ? getBoardHints(mls) : colors
    }
    
    
    // TODO
    function getBoardHints(mls) {
        let colors = Array(10).fill('noColor')
        availableNumbers(mls).forEach(num => {
            let outcome = positionMap.get(mls + num.toString())
            colors[num] = getHintColor(outcome)
        })
        console.log(`COLORS: ${colors}`)
        return colors
    }

    function getHintColor(outcome) {
        if (outcome === "draw") {
            return "draw"
        }
        else if (xGoesNext(moveListString)) {
            return (outcome === "xWins") ? "win" : "lose"
        }
        else {
            return (outcome === "oWins") ? "win" : "lose"
        }
    }

    function moveListStringToArray(mls) {               // "123" --> [1,2,3]
        return Array.from(mls).map(e => Number(e))
    }
    function moveListArrayToString(mla) {               // [1,2,3] --> "123"
        return mla.toString().replaceAll(",", "")
    }
    
    // HIGH-LEVEL PANEL HELPERS no params
    function getStatus(mls) {
        if (xHasWon(mls)) {
            return (`X wins!`)
        }
        else if (oHasWon(mls)) {
            return (`O wins!`)
        }
        else if (mls.length === 9) {
            return (`Draw.`)
        }
        else if (xGoesNext(mls)) {
            return (`X's turn.`)
        }
        else if (!xGoesNext(mls)) {
            return (`O's turn.`)
        }
        else {
            console.error("A call to getStatus() did not work!");
            return (`Error in getStatus()`)
        }
    }

    function xHasWon(mls) {
        return sumsOfThree(xNumbers(mls)).includes(15)
    }
    function oHasWon(mls) {
        return sumsOfThree(oNumbers(mls)).includes(15)
    }

    function getCommentLabel(mls) {
        if (gameOver(mls)) {
            return `Game Over: ${getStatus(mls)}`
        }
        // If no moves have been made
        if (mls.length === 0) {
            return `move one`
        }
        else {
            return `not move one`
        }
    }

    // MID-LEVEL HELPERS for getBoardColors() and getBoardHints()
    function highlightWins(mls) {
        console.assert(!gameOver(mls), `highlightWins() was called but found that the game is not over`);
        let colors = Array(10).fill('noColor')
        let Xs = xNumbers(mls)
        let Os = oNumbers(mls)
        let winningTrios = trioList.filter(trio =>
            intersect(trio, Xs).length === 3 || intersect(trio, Os).length === 3
        )

        winningTrios.flat().forEach(num => colors[num] = 'win')
        return colors
    }


    // CLICK HANDLERS
    function handleSquareClick(squareClickedString) {
        if (gameOver(moveListString)) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (moveListString.includes(squareClickedString)) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveListString.concat(squareClickedString)
        console.log(`MoveList: ${updatedMoveList}`)

        setMoveListString(updatedMoveList);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleUndoClick() {
        const shortenedMoveList = moveListString.slice(0, moveListString.length - 1)
        console.log(`handleUndoClick() removed ${moveListString[moveListString.length - 1]} . New Shortened history: ${shortenedMoveList}`);
        setMoveListString(shortenedMoveList);
    }
    function handleNewGameClick() {
        setMoveListString(startingPosition);
    }
    function toggleShowHints() {
        setShowHints(!showHints)
    }


    ///////////////////////////////////////////////////
    // Low Level Helpers
    ///////////////////////////////////////////////////
    function xNumbers(mls) {
        if (xGoesFirst) {
            return moveListStringToArray(mls).filter((move, turn) => turn % 2 === 0)
        }
        else {
            return moveListStringToArray(mls).filter((move, turn) => turn % 2 === 1)
        }
    }
    function oNumbers(mls) {
        if (xGoesFirst) {
            return moveListStringToArray(mls).filter((move, turn) => turn % 2 === 1)
        }
        else {
            return moveListStringToArray(mls).filter((move, turn) => turn % 2 === 0)
        }
    }
    function gameIsWon(mls) {
        return (xHasWon(mls) || oHasWon(mls)) ? true : false
    }
    function gameOver(mls) {
        return (mls.length === 9 || gameIsWon(mls)) ? true : false
    }
    // function oGoesNext(ml) {
    //     if (xGoesFirst) {
    //         return (ml.length % 2 === 1) ? true : false
    //     }
    //     else {
    //         return (ml.length % 2 === 0) ? false : true
    //     }
    // }
    function xGoesNext(ml) {
        if (xGoesFirst) {
            return (ml.length % 2 === 0) ? true : false
        }
        else {
            return (ml.length % 2 === 1) ? false : true
        }
    }
    function getChildren(mls) {
        let children = []
        getValidMoves(mls).forEach(move => children.push(mls + move))
        // this.validMoves(mls).forEach(move => children.push(mls + move))
        return children
    }
    function getValidMoves(mls) {
        if (gameOver(mls)) {
            return []
        }
        else {
            return availableNumbers(mls)
        }
    }
    function getParent(ml) {
        return ml.slice(0, ml.length - 1)
    }
    function intersect(listOne, listTwo) {
        return listOne.filter(item => listTwo.includes(item))
    }
    // function factorial(num) {
    //     console.assert(num >= 0 && num <=9, `Factorial called with a number out of this game's range!`)
    //     let product = 1
    //     for (let i = 1; i <= num; i++) {
    //         product = product * i
    //     }
    //     return product
    // }
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
    function generateTrioList() {
        let trioList = []
        for (let i = 1; i <= 7; i++) {
            for (let j = i + 1; j <= 8; j++) {
                let k = complementOf(i + j)
                if (k > j && k <= 9) {
                    let newTrio = [i, j, k]
                    trioList.push(newTrio)
                }
            }
        }
        return trioList
    }
    function complementOf(sumOfTwo) {
        return (15 - sumOfTwo)
    }
    function availableNumbers(mls) {
        let unclaimedNumbers = [];
        for (let i = 1; i <= 9; i++) {
            if (!mls.includes(i)) {
                unclaimedNumbers.push(i)
            }
        }
        // console.log(`List Empty Squares: ${emptySquaresList}`)
        return unclaimedNumbers;
    }
    // function availableNumbers(mls) {
    //     let availableNumbers = new Set([1,2,3,4,5,6,7,8,9])
    //     for (let i = 0; i < mls.length; i++) {
    //         let num = mls.charAt(i).toNumber()
    //         console.log(`availableNumbers found num ${num} in the mls`);
    //         availableNumbers.delete(num) 
    //     }
    //     console.log(`Available Squares: ${Array.from(availableNumbers)}`)
    //     return Array.from(availableNumbers);
    // }

}


// function inEfficientUnclaimedNumbers(ml) {
//     let unclaimedNumbers = [];
//     for (let i = 1; i <= 9; i++) {
//         if (!ml.includes(i)) {
//             unclaimedNumbers.push(i)
//         }
//     }
//     // console.log(`List Empty Squares: ${emptySquaresList}`)
//     return unclaimedNumbers;
// }