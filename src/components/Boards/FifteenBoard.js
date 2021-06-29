import React from 'react';

// My Logical Components
import {
    status,
    numbersInWin,
    moveListStringToArray
} from "../../logic/GameLogic";
import {
    highlightWins,
    getBoardHints,
} from "../../logic/BoardLogic";

// My Components
// import NumCard from "./NumCard";

// MUI  components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    board: {
        width: 'min(100%, 720px)',
        margin: '0 auto',
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
        backgroundColor: theme.palette.playerOne.backgroundColor,
        color: theme.palette.playerOne.text,
    },
    playerTwo: {
        backgroundColor: theme.palette.playerTwo.backgroundColor,
        color: theme.palette.playerTwo.text,
    },
    highlightWins: {
        backgroundColor: theme.palette.primary.main,

    },

}));

// What does the Board NEED to render all 9 number cards? 
// Needs to know each cards num, const in order.
// Needs each cards CLAIM status, X O or _
// Needs bool, if card is part of win. 

export default function FifteenBoard(props) {
    const classes = useStyles();

    let ml = props.moveList
    let gameStatus = status(ml)

    


    function getBoardColors(ml) {      // In the 15-Game Color indicates claimed by who, there is no show hints feature. 
        let data = Array(10).fill('_'); 
        let mla = moveListStringToArray(ml)
        mla.forEach((num, turn) => {
            data[num] = (turn % 2 === 0) ? 'x' : 'o'
        })
        return data
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

    
    

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    let claims = getClaims(ml)  // An Array of 'x' 'o' & '_'
    function getClaims(ml) {
        let data = Array(10).fill('_');
        let mla = moveListStringToArray(ml)
        mla.forEach((num, turn) => {
            data[num] = (turn % 2 === 0) ? 'x' : 'o'
        })
        console.log(`Claims data: ${data}`);
        return data
    }

    let wins = getWins(ml)       // An Array of booleans, true if part of winning trio
    function getWins(ml) {
        let data = Array(10).fill(false)
        numbersInWin(ml).forEach(num => data[num] = true)
        return data
    }

    
    
    let numCards = []
    
    numbers.forEach(num => {
        let newNumCard =
            <Card
                key={num}
                
                num={num}
                claim={claims[num]}
                border={wins[num]}
                handleBoardClick={props.handleBoardClick}
            />
        numCards.push(newNumCard);
    })

    return (
        <Container maxWidth='md' >
            <Box className={classes.board} >
                <Box className={classes.row} >
                    {numCards.slice(0, 5)}
                </Box>
                <Box className={classes.row} >
                    {numCards.slice(5, 9)}
                </Box>
            </Box>
        </Container>

        
    )
}

function Card(props) {
    const classes = useStyles();


    let cardStatusClassName
    switch (props.claim) {
        case 'x':
            cardStatusClassName = `${classes.card} ${classes.playerOne} `
            break;
        case 'o':
            cardStatusClassName = `${classes.card} ${classes.playerTwo} `
            break;
        case '_':
            cardStatusClassName = `${classes.card} `
            break;
        default:
            throw console.error(`Card passed invalid claim: ${props.color}`);
    }



    return (
        <Box number={props.num}
            className = { cardStatusClassName }
            onClick = {() => props.handleBoardClick(props.num)}
            border={(props.border === true) ? 'solid green 8px' : ''}
            borderRadius='1rem'
        >
                <Typography color='inherit' variant='h1' >
                    {props.num}
                </Typography>
        </Box>
    )
}

