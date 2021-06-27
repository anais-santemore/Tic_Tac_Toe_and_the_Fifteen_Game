import React from 'react';

// My Logical Components
import {
    status,
    numbersInWin,
    xNumbers,
    oNumbers,
    trioList,
    outcomeMap,
    intersect,
    availableNumbers,
    moveListStringToArray
} from "../../logic/GameLogic";
import {
    highlightWins,
    getBoardIcons,
    getBoardHints,
} from "../../logic/BoardLogic";

// My Components
import NumCard from "./NumCard";

// MUI  components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    board: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    row: {
        // border: 'solid purple 1px',
        width: '100%',
        height: '22vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    card: {
        width: '18%',
        margin: '0 1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,

    },
    playerOne: {
        backgroundColor: theme.palette.info.main,
        color: 'white',
    },
    playerTwo: {
        // backgroundColor: theme.palette.success.main,
        backgroundColor: theme.palette.playerOne,


    },
    highlightWins: {
        backgroundColor: theme.palette.primary.main,

    },

}));

export default function Board(props) {
    const classes = useStyles();
    let moveList = props.moveList
    let gameStatus = status(moveList)

    function getBoardColors(mls) {      // In the 15-Game Color indicates claimed by who, there is no show hints feature. 
        let data = Array(10).fill('_'); 
        let mla = moveListStringToArray(mls)
        mla.forEach((squareId, turn) => {
            data[squareId] = (turn % 2 === 0) ? 'x' : 'o'
        })
        return data;  // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in. 
    }
    // function getBoardColors(mls) {
    //     if (gameStatus === "xWins" || gameStatus === "oWins") {
    //         return highlightWins(mls)
    //     }
    //     else if (props.showHints === true) {
    //         return getBoardHints(mls)
    //     }
    //     else {
    //         return Array(10).fill('noColor')
    //     }
    // }

    // function highlightWins(ml) {
    //     let colors = Array(10).fill('noColor')
    //     let Xs = xNumbers(ml)
    //     let Os = oNumbers(ml)
    //     let winningTrios = trioList.filter(trio =>
    //         intersect(trio, Xs).length === 3 || intersect(trio, Os).length === 3
    //     )
    //     winningTrios.flat().forEach(num => colors[num] = 'win')
    //     return colors
    // }
    

    const boardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let boardColors = getBoardColors(moveList)

    let numCards = []
    boardNumbers.forEach(num => {
        let newNumCard =
            <NumCard
                key={num}
                num={num}
                color={boardColors[num]}
                cardStatus={boardColors[num]}
                handleBoardClick={props.handleBoardClick}
            />
        numCards.push(newNumCard);
    })

    return (
        <Box className={classes.board} >
            <Box className={classes.row} >
                {numCards.slice(0, 5)}
            </Box>
            <Box className={classes.row} >
                {numCards.slice(5, 9)}
            </Box>
        </Box>

        // <Grid container className={classes.board}>
        //     {squares}
        // </Grid>
    )
}


