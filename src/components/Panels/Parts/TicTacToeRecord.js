import React from 'react';

// Custom Components

// MUI Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    record: {
        color: theme.palette.common.white,
        margin: '0rem 35%',
        width: '30%',
        height: '4.5rem',
        fontSize: '1.1rem',
    },

}));

export default function TicTacToeRecord(props) {
    const classes = useStyles();

    let playerOne = ""
    let playerTwo = ""
    if (props.playMode === "humanVsHuman") {
        playerOne = "Player X"
        playerTwo = "Player O"
    }
    else if (props.playMode === "humanVsBot") {
        if (props.humanGoesFirst) {
            playerOne = "X Human"
            playerTwo = "O Bot"
        }
        else {
            playerOne = "O Human"
            playerTwo = "X Bot"
        }
    }
    else {
        console.error(`WinLossDrawRecord tried to render with invalid playMode prop: ${props.playMode}`)
    }

    return (
        <Box className={classes.record} >
            <Grid container >
                <Grid item xs={9}>
                    <Typography color="textPrimary" align='left' component='h3' variant='h5' noWrap >
                        {playerOne}:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography color="textPrimary" align='right' component='h3' variant='h5' noWrap >
                        {props.record[0]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={9}>
                    <Typography color="textPrimary" align='left' component='h3' variant='h5' noWrap >
                        {playerTwo}:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography color="textPrimary" align='right' component='h3' variant='h5' noWrap >
                        {props.record[1]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={9}>
                    <Typography color="textPrimary" align='left' component='h3' variant='h5' noWrap >
                        Draw:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography color="textPrimary" align='right' component='h3' variant='h5' noWrap >
                        {props.record[2]}
                    </Typography>
                </Grid>
            </Grid>

        </Box>
    )
}

