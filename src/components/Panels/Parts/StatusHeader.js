import React from 'react';

import { status } from "../../../logic/GameLogic";

// Custom Components

// MUI Components
import Typography from '@material-ui/core/Typography';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
// import classes from '*.module.css';
// const useStyles = makeStyles((theme) => ({
//     root: {
//         // border: 'solid yellow 1px',
//         color: theme.palette.common.white,
//     }
// }));

export default function StatusHeader(props) {
    // const classes = useStyles();
    const gameStatus = status(props.moveList);

    function statusMessage(status) {
        switch (status) {
            case "xWins":
                return "Game Over. X Wins!"
            case "oWins":
                return "Game Over. O Wins!"
            case "draw":
                return "Game Over! Draw."
            case "xNext":
                return "It is X's turn."
            case "oNext":
                return "It is O's turn."
            default:
                return "Error";
        }
    }

     
    return (
        <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
            {statusMessage(gameStatus)}
        </Typography>
    )
}


