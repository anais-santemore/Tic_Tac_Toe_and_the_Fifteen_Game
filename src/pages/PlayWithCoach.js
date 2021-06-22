import React, { useState } from 'react';

// My Logical Components
// import positionToOutcomeMap from "../pages/positionToOutcomeMap";
import { gameOver } from "../logic/GameLogic";

// My React Components
import TicTacToeBoard from "../components/Board/TicTacToeBoard";
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boardArea: {
        padding: '0.7rem',
        width: 'min(55vh, 100%)',
        height: '55vh',
        display: 'flex',
        justifyContent: 'center',
    },
    panelArea: {
        width: '100%',
        height: '45vh',
    },
}));

// In Play With Coach mode X always goes first

export default function PlayWithCoach(props) {
    const classes = useStyles();
    const xGoesFirst = true  // X always goes first in Play with Coach Mode

    let startingPosition = ""  // vs []
    let [moveList, setmoveList] = useState(startingPosition);

    let [showHints, setShowHints] = useState(false);
    // let [showHints, setShowHints] = useState(true);

    return (
        <Box className={classes.root} >
            {/* <SpacerBox /> */}
            <Box py={1} />
            <Box className={classes.boardArea}>
                <TicTacToeBoard
                    moveList={moveList}
                    showHints={showHints}
                    handleBoardClick={handleBoardClick}
                />
            </Box>
            <Box className={classes.panelArea}>
                <CoachPanel
                    moveList={moveList}
                    showHints={showHints}
                    toggleShowHints={toggleShowHints}
                    handleUndoClick={handleUndoClick}
                />
            </Box>
        </Box>
    )

    
    // CLICK HANDLERS
    function handleBoardClick(squareClicked) {
        if (gameOver(moveList)) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (moveList.includes(squareClicked)) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveList.concat(squareClicked)
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
