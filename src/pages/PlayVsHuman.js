import React, { useState } from 'react';


// My Logical Components
import {
    status,
    gameOver,
    xHasWon, 
    oHasWon, 
    gameDrawn,
    xNumbers,
    oNumbers,
    trioList,
    outcomeMap,
    intersect,
    availableNumbers,
    moveListStringToArray
} from "../logic/GameLogic";

// My React  Components
import Navbar from "../components/Navbar/Navbar"
import TicTacToeBoard from "../components/Boards/TicTacToeBoard"
import FifteenBoard from "../components/Boards/FifteenBoard"
import HumanPanel from "../components/Panels/HumanPanel"

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import '../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '97%',
        display: 'flex',
        flexDirection: 'column',
    },
    navbarArea: {
        // border: 'solid blue 1px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: '1 0 5vh',
    },
    boardArea: {
        // border: 'solid green 1px',
        display: 'flex',
        flex: '1 0 50vh',
        justifyContent: 'center',
    },
    panelArea: {
        // border: 'solid red 1px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        display: 'flex',
        flex: '1 0 45vh',
    },
}));


export default function PlayVsHuman(props) {
    const classes = useStyles();

    let [moveList, setMoveList] = useState("");
    let [gameNumber, setGameNumber] = useState(1);     
    let [record, setRecord] = useState([0, 0, 0]);     

    console.assert(props.game === "tic-tac-toe" || props.game === "fifteen-game")
    let board = (props.game === "tic-tac-toe") ? 
        <TicTacToeBoard
            moveList={moveList}

            handleBoardClick={handleBoardClick}
            showHints={false}
        /> : 
        <FifteenBoard
            moveList={moveList}

            handleBoardClick={handleBoardClick}
            showHints={false}

        />

    
    return (
        <Box className={classes.root} >
            <Box className={classes.navbarArea}>
                <Navbar pageTitle={(props.game === "tic-tac-toe") ? "Tic Tac Toe vs. Human" : "15 Game vs. Human"} />
            </Box>
            
            <Box className={classes.boardArea}>
                {board}
            </Box>

            <Box className={classes.panelArea}>
                <HumanPanel
                    game={props.game}
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
    function handleBoardClick(numberClicked) {
        if (gameOver(moveList)) {
            console.log("return without effects from handleBoardClick(). The Game is already over.")
            return;
        }
        if (moveList.includes(numberClicked)) {
            console.log("return without effects from handleBoardClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveList.concat(numberClicked)
        console.log(`MoveList: ${updatedMoveList}`)

        setMoveList(updatedMoveList);

        if (gameOver(updatedMoveList)) {
            handleGameOver(updatedMoveList)
        }
    }
    function handleUndoClick() {
        const shortenedMoveList = moveList.slice(0, moveList.length - 1)
        console.log(`handleUndoClick() removed ${moveList[moveList.length - 1]}. New Shortened history: ${shortenedMoveList}`);
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
