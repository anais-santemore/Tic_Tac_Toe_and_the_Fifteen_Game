import React from 'react';

// Custom Components

// MUI Components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    

}));

export default function WinLossDrawRecord(props) {
    const classes = useStyles();

    const record = props.record
    const playMode = props.playMode

    let playerOne = ""
    let playerTwo = ""
    if (playMode === "humanVsHuman") {
        playerOne = "Player X"
        playerTwo = "Player O"
    } 
    else if (playMode === "humanVsBot") {
        playerOne = "Human X"
        playerTwo = "Bot O"
    }
    else {
        console.error(`WinLossDrawRecord tried to render with invalid playMode prop: ${playMode}`)
    }
    
    return (
        <React.Fragment>
            <Typography align='center' component='h3' variant='h5' noWrap >
                {playerOne}: &ensp;{record[0]}
            </Typography>
            <Typography align='center' component='h3' variant='h5' noWrap >
                {playerTwo}: &ensp;{record[1]}
            </Typography>
            <Typography align='center' component='h3' variant='h5' noWrap gutterBottom>
                Draw: &emsp; &ensp;  {record[2]}
            </Typography>
        </React.Fragment>
    )
}


