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
} from "../logic/GameLogic";

// My Components
// import Square from "./Square";

// MUI  components
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

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
    square: {
        width: 'min(30%, 15vh)',
        height: '100%',
        margin: '0.0rem 0.3rem',
        backgroundColor: theme.palette.common.white,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    iconX: {
        width: '100%',
        height: '100%',
        color: theme.palette.common.black
    },
    iconO: {
        width: '80%',
        height: '80%',
        color: theme.palette.common.black
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
    let handleSquareClick = props.handleSquareClick

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
        let colors = Array(10).fill('noColor')
        if (gameStatus === "xWins" || gameStatus === "oWins") {
            colors = highlightWins(mls)
        }
        else if (showHints === true) {
            colors = getBoardHints(mls)
        }
        return colors
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
                handleSquareClick={handleSquareClick}  
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



function Row(props) {
    const classes = useStyles();
    const rowId = props.rowId;
    const rowNumbers = props.rowNumbers;
    const boardIcons = props.boardIcons;
    const boardColors = props.boardColors;
    const handleSquareClick = props.handleSquareClick

    let squares = [];
    for (let col = 0; col < 3; col++) {
        let newSquare =
            <Square
                key={rowNumbers[col]}
                number={rowNumbers[col]}
                icon={boardIcons[rowNumbers[col]]}
                color={boardColors[rowNumbers[col]]}
                handleClick={handleSquareClick}
            />;
        squares.push(newSquare);
    }
    return (
        <Box className={classes.row}>
            {squares}
        </Box>
    )
}

function Square(props) {
    const classes = useStyles();
    const number = props.number
    const icon = props.icon
    const color = props.color  // String 'win', 'draw', 'lose', 'unknown', 'claimed',  
    const handleClick = props.handleClick


    let squareIcon;
    switch (icon) {
        case 'x':
            squareIcon = <ClearIcon className={classes.iconX} />
            break;
        case 'o':
            squareIcon = <RadioButtonUncheckedIcon className={classes.iconO} />
            break;
        case '_':
            // squareIcon = null
            squareIcon = <Typography variant='h3' color='textSecondary' >{number}</Typography>;
            break;
        default:
            console.error("Square passed symbol not 'x' 'o' or '_'");
    }

    let className;
    switch (color) {
        case 'unknown':
            className = `${classes.square} ${classes.unknown} `
            break;
        case 'claimed':
            className = `${classes.square} ${classes.claimed} `
            break;
        case 'unclaimed':
            className = `${classes.square} ${classes.unclaimed} `
            break;
        case 'noColor':
            className = `${classes.square} ${classes.noColor} `
            break;
        case 'draw':
            className = `${classes.square} ${classes.draw} `
            break;
        case 'win':
            className = `${classes.square} ${classes.win} `
            break;
        case 'lose':
            className = `${classes.square} ${classes.lose} `
            break;
        default:
            className = `${classes.square} `
    }

    return (
        <Paper
            elevation={4}
            className={className}
            onClick={() => handleClick(number.toString())}
        >
            {squareIcon}
        </Paper>
    )
}