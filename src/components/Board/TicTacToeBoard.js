import React from 'react';

// My Logical Components
import { 
    status,
    xNumbers, 
    oNumbers, 
    trioList, 
    outcomeMap,
    intersect, 
    availableNumbers,
    moveListStringToArray
} from "../../logic/GameLogic";

// My Components
import Square from "./Square";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    board: {
        // border: 'solid green 1px',
        width: '50vh', 
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        // border: 'solid purple 1px',
        width: '95%',  
        height: '31%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}));

export default function Board(props) {
    const classes = useStyles();    
    const boardNumbers = [2,9,4,7,5,3,6,1,8]
    let moveList = props.moveList
    let gameStatus = status(moveList)

    function getBoardIcons(mls) {
        let data = Array(10).fill('_');  // Start with an array representing a board of NINE empty squares
        let mla = moveListStringToArray(mls)
        mla.forEach((squareId, turn) => {
            data[squareId] = (turn % 2 === 0) ? 'x' : 'o'
        })
        return data;  // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in. 
    }
    function getBoardColors(mls) {
        if (gameStatus === "xWins" || gameStatus === "oWins") {
            return highlightWins(mls)
        }
        else if (props.showHints === true) {
            return getBoardHints(mls)
        }
        else {
            return Array(10).fill('noColor')
        }
    }

    function highlightWins(ml) {
        let colors = Array(10).fill('noColor')
        let Xs = xNumbers(ml)
        let Os = oNumbers(ml)
        let winningTrios = trioList.filter(trio =>
            intersect(trio, Xs).length === 3 || intersect(trio, Os).length === 3
        )
        winningTrios.flat().forEach(num => colors[num] = 'win')
        return colors
    }
    function getBoardHints(mls) {
        let colors = Array(10).fill('noColor')
        availableNumbers(mls).forEach(num => {
            let outcome = outcomeMap.get(mls + num.toString())
            colors[num] = getHintColor(outcome)
        })
        console.log(`COLORS: ${colors}`)
        return colors
    }

    function getHintColor(outcome) {
        if (outcome === "draw") {
            return "draw"
        }
        else if (gameStatus === "xNext") {
            return (outcome === "xWins") ? "win" : "lose"
        }
        else if (gameStatus === "oNext") {
            return (outcome === "oWins") ? "win" : "lose"
        }
        else {
            console.error(`Error in Get Hint Color`);
        }
    }

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

        // <Grid container className={classes.board}>
        //     {squares}
        // </Grid>
    )
}




