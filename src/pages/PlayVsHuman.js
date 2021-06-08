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
                        moveList={moveList}
                        status={status(moveList)}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                <Panel
                    gameNumber={gameNumber}
                    record={record}
                    moveList={moveList}
                    status={status(moveList)}
                    handleUndoClick={handleUndoClick}
                    handleNewGameClick={handleNewGameClick}
                />
            </Box>
        </Box>
    )

    
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
