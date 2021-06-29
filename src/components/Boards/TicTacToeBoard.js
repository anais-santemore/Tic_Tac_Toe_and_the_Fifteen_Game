import React from 'react';

// My Logical Components
import { status } from "../../logic/GameLogic";
import {
    highlightWins,
    getBoardIcons,
    getBoardHints,
} from "../../logic/BoardLogic";

// My Components
import Square from "./Square";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    board: {
        width: 'min(50vh, 100%)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    row: {
        // border: 'solid purple 1px',
        width: '100%',  
        height: '15vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    
}));

export default function Board(props) {
    const classes = useStyles();    
    const boardNumbers = [2,9,4,7,5,3,6,1,8]
    let moveList = props.moveList
    let gameStatus = status(moveList)


    let boardIcons = getBoardIcons(moveList)
    let boardColors = getBoardColors(moveList)
    
    let squares = []
    boardNumbers.forEach(num => {
        let newSquare =
            <Square
                key={num}
                number={num}
                icon={boardIcons[num]}
                color={boardColors[num]}
                handleBoardClick={props.handleBoardClick}
            />
        squares.push(newSquare);
    })

    return (
        <Box className={classes.board} >
            <Box className={classes.row} >
                {squares.slice(0,3)}
            </Box>
            <Box className={classes.row} >
                {squares.slice(3, 6)}
            </Box>
            <Box className={classes.row} >
                {squares.slice(6, 9)}
            </Box>
        </Box>

        
    )

    function getBoardColors(ml) {
        let gameStatus = status(ml)
        if (gameStatus === "xWins" || gameStatus === "oWins") {
            return highlightWins(ml)
        }
        else if (props.showHints === true) {
            return getBoardHints(ml)
        }
        else {
            return Array(10).fill('noColor')
        }
    }
}




