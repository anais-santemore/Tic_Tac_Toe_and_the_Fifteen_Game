import React, { useState } from 'react';

// My Logical Components
import positionToOutcomeMap from "../pages/positionToOutcomeMap";
import { status, outcome, gameOver, xHasWon, oHasWon, gameDrawn } from "../logic/GameLogic";


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

