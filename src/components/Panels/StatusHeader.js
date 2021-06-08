import React, { useState } from 'react';

// Custom Components

// MUI Components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
// import classes from '*.module.css';
const useStyles = makeStyles((theme) => ({
    root: {
        // border: 'solid yellow 1px',
        color: theme.palette.common.white,
    }
}));

export default function StatusHeader(props) {
    const classes = useStyles();
    
    const playMode = props.playMode
    const gameNumber = props.gameNumber;
    const status = props.status;

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

    function GameNumber(props) {
        if (playMode === "PlayWithCoach") {
            return null
        } 
        else {
            return (
                <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                    Game&nbsp;{gameNumber}
                </Typography>
            )
        }
    }
    
    return (
        <Box className={classes.root}>
            <GameNumber 
                playMode={playMode}
                gameNumber={gameNumber}
            />
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                {statusMessage(status)}
            </Typography>
        </Box>
    )
}


