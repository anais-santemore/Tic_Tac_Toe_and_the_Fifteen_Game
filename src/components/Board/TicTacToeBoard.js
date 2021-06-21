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
        // border: 'solid blue 1px',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',  // The lesser of full and the height of the board area. 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0.3rem',
        // margin: '1rem 0.0rem',
    },
    row: {
        // border: 'solid blue 1px',
        width: '100%',
        height: '30%',
        margin: '0.3rem 0.0rem',

        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },

    unknown: {
        backgroundColor: '#bbf',
    },
    noColor: {
        // backgroundColor: '#FFF',  // This is used for Hints turned off mode.
        backgroundColor: '#ddd',
    },
    claimed: {
        backgroundColor: '#eee',
    },
    unclaimed: {
        backgroundColor: '#ddd',
    },
    win: {
        backgroundColor: '#3B3'
    },
    draw: {
        // backgroundColor: '#55bb00',
        backgroundColor: '#FF3'
    },
    lose: {
        // backgroundColor: '#88ee33'
        backgroundColor: '#F44'
    },
    prev: {
        backgroundColor: '#3B3'
    },
    next: {
        // backgroundColor: '#88ee33'
        backgroundColor: '#F44'
    },

}));

export default function Board(props) {
    const classes = useStyles();    
    const boardNumbers = [2,9,4,7,5,3,6,1,8]
    // const boardIcons = props.boardIcons;
    // const boardColors = props.boardColors; // Array of 9 strings 'noColor', 'unclaimed', 'claimed', 'win', 'draw', 'lose'.
    let moveList = props.moveList
    let showHints = props.showHints
    // let handleSquareClick = props.handleSquareClick
    let handleCardClick = props.handleCardClick


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

    
    let rows = [];
    for (let row = 0; row < 3; row++) {
        let newRow =
            <Row
                key={row}
                rowId={row}
                rowNumbers={boardNumbers.slice(3 * row, 3 * (row + 1))}
                boardIcons={getBoardIcons(moveList)}
                boardColors={getBoardColors(moveList)}
                // handleSquareClick={handleSquareClick}
                handleCardClick={handleCardClick}

            />
        ;
        rows.push(newRow);
    }
    return (
        <Box className={classes.board}>
            {rows}
        </Box>
    )
}



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




