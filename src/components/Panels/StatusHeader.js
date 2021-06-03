import React, { useState } from 'react';

// Custom Components

// MUI Components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Custom Styling
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles((theme) => ({
    
// }));

export default function StatusHeader(props) {
    // const classes = useStyles();
    const gameNumber = props.gameNumber;
    const gameStatus = props.gameStatus;
    // const moveNumber = props.moveNumber;

    return (
        <Box>
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                Game Number:&nbsp;{gameNumber}
            </Typography>
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                {gameStatus}
            </Typography>
        </Box>
    )
}


