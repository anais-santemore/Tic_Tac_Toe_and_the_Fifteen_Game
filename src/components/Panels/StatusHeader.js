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
    const gameNumber = props.gameNumber;
    const gameStatus = props.gameStatus;
    // const moveNumber = props.moveNumber;

    return (
        <Box className={classes.root}>
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                Game&nbsp;{gameNumber}
            </Typography>
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                {gameStatus}
            </Typography>
        </Box>
    )
}


