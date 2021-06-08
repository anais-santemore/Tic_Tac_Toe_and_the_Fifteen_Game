import React, { useState } from 'react';

// My Logical Components
import positionToOutcomeMap from "../pages/positionToOutcomeMap";
import {status, outcome, trioList, gameOver, xHasWon, oHasWon, gameDrawn} from "../logic/GameLogic";

// My Components
import Board from "../components/Board";
import Panel from "../components/Panels/HumanPanel";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import '../styles/TicTacToe.css';
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

    let [moveList, setMoveList] = useState("");
    let [gameNumber, setGameNumber] = useState(1);     // In ODD numbered games X goes first
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.


    console.log(typeof moveList)


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
                    gameNumber={gameNumber}
                    moveNumber={moveList.length + 1}
                    gameOver={gameOver()}
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
        let data = Array(10).fill('_');  // Start with an array representing a board of NINE empty squares

        ml.forEach((squareId, turn) => {
            if (xGoesFirst()) {
                data[squareId] = (turn % 2 === 0) ? 'x' : 'o'
            }
            else {
                data[squareId] = (turn % 2 === 0) ? 'o' : 'x'
            }
        })
        return data;  // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in. 
    }
    function getBoardColors(ml = moveList) {
        let colors = Array(10).fill('noColor')
        if (xWins(ml) || oWins(ml)) {
            colors = highlightWins(ml)
        }
        return colors
    }
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
        else if (ml.length % 2 === 1) {
            return (xGoesFirst()) ? `O goes next.` : `X goes next.`
        }
        else {
            console.error("A call to gameStatus() did not work!");
            return `ERROR`
        }
    }
    function highlightWins(ml) {
        console.assert(!gameOver(), `highlightWins() was called but found that the game is not over`);

        let colors = Array(10).fill('noColor')
        let Xs = xNumbers(ml)
        let Os = oNumbers(ml)
        let winningTrios = trioList.filter(trio =>
            intersect(trio, Xs).length === 3 || intersect(trio, Os).length === 3
        )

        winningTrios.flat().forEach(num => colors[num] = 'win')
        return colors
    }

    ///////////////////////////////////////////////////
    // CLICK HANDLERS
    ///////////////////////////////////////////////////
    function handleSquareClick(squareClicked) {
        if (gameOver()) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (squareAlreadyClaimed(squareClicked)) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveList.concat(squareClicked)
        console.log(`MoveList: ${updatedMoveList}`)

        setMoveList(updatedMoveList);

        if (gameOver(updatedMoveList)) {
            handleGameOver(updatedMoveList)
        }
    }
    function handleUndoClick() {
        const shortenedMoveList = moveList.slice(0, moveList.length - 1)
        console.log(`handleUndoClick() removed ${moveList[moveList.length - 1]} . New Shortened history: ${shortenedMoveList}`);
        setMoveList(shortenedMoveList);
    }
    function handleNewGameClick() {
        const empty = [];
        const nextGameNumber = ++gameNumber;
        setMoveList(empty);
        setGameNumber(nextGameNumber);
    }

    function handleGameOver(ml) {
        console.assert(gameOver(ml) === true, `NO EFFECT. handleGameOver called but the game isn't actually over!`);
        if (xWins(ml)) {
            setRecord([++record[0], record[1], record[2]])
        }
        else if (oWins(ml)) {
            setRecord([record[0], ++record[1], record[2]])
        }
        else if (gameDrawn(ml)) {
            setRecord([record[0], record[1], ++record[2]])
        }
        else {
            console.error(`handleGameOver called with invalid game result!`)
        }
    }

}
