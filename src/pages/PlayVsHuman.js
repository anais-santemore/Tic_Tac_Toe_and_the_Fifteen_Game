import React, { useState } from 'react';

// My Logical Components
import {status, gameOver, xHasWon, oHasWon, gameDrawn} from "../logic/GameLogic";

// My React  Components
import TicTacToeBoard from "../components/TicTacToeBoard";
import Panel from "../components/Panels/HumanPanel";

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

    return (
        <Box className={classes.root} >
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <TicTacToeBoard
                        moveList={moveList}
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
        if (gameOver(moveList)) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (moveList.includes(squareClicked.toString())) {
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

    function handleGameOver(mls) {
        // console.assert(gameOver(ml) === true, `NO EFFECT. handleGameOver called but the game isn't actually over!`);
        if (xHasWon(mls)) {
            setRecord([++record[0], record[1], record[2]])
        }
        else if (oHasWon(mls)) {
            setRecord([record[0], ++record[1], record[2]])
        }
        else if (gameDrawn(mls)) {
            setRecord([record[0], record[1], ++record[2]])
        }
        else {
            console.error(`handleGameOver called with invalid game result!`)
        }
    }

}
