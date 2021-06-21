import React, { useState } from 'react';

// My Logical Components
import positionToOutcomeMap from "../pages/positionToOutcomeMap";
import { status, outcome, gameOver, xHasWon, oHasWon, gameDrawn } from "../logic/GameLogic";


// My React Components
import TicTacToeBoard from "../components/TicTacToeBoard";
import CoachPanel from "../components/Panels/CoachPanel";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import '../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100% - 3.6rem)',
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
    let [moveList, setmoveList] = useState(startingPosition);

    // let [showHints, setShowHints] = useState(false);
    let [showHints, setShowHints] = useState(true);

    return (
        <Box className={classes.root} >
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <TicTacToeBoard
                        moveList={moveList}
                        showHints={showHints}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                <CoachPanel
                    moveList={moveList}
                    toggleShowHints={toggleShowHints}
                    handleUndoClick={handleUndoClick}
                />
            </Box>
        </Box>
    )

    
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

        setmoveList(updatedMoveList);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleUndoClick() {
        const shortenedMoveList = moveList.slice(0, moveList.length - 1)
        console.log(`handleUndoClick() removed ${moveList[moveList.length - 1]} . New Shortened history: ${shortenedMoveList}`);
        setmoveList(shortenedMoveList);
    }
    // function handleNewGameClick() {
    //     setmoveList(startingPosition);
    // }
    function toggleShowHints() {
        setShowHints(!showHints)
    }
}
