import React from 'react';

// Custom Components
import TurnArrowIcon from './TurnArrowIcon';

// MUI Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    record: {
        color: theme.palette.common.white,
        margin: '0rem 25%',
        width: '50%',
        height: '4.5rem',
        fontSize: '1.1rem',
    },
    recordRow: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center'
    },
    colorTileOne: {
        width: '1.2rem',
        height: '1.2rem',
        borderRadius: '15%',
        margin: '0 .5rem 0 auto',
        backgroundColor: theme.palette.playerOne.backgroundColor
    },
    colorTileTwo: {
        width: '1.2rem',
        height: '1.2rem',
        borderRadius: '15%',
        margin: '0 .5rem 0 auto',
        backgroundColor: theme.palette.playerTwo.backgroundColor
    }
}));

function ColorTile(props) {
    const classes = useStyles();

    return (props.player === "playerOne") ?
        <Box className={classes.colorTileOne} /> :
        <Box className={classes.colorTileTwo} />
}

export default function FifteenRecord(props) {
    const classes = useStyles();


    let playerOneName = ""
    let playerTwoName = ""
    if (props.playMode === "humanVsHuman") {
        playerOneName = "Player One"
        playerTwoName = "Player Two"
    }
    else if (props.playMode === "humanVsBot") {
        playerOneName = "Human"
        playerTwoName = "Bot"
    }
    else {
        console.error(`WinLossDrawRecord tried to render with invalid playMode prop: ${props.playMode}`)
    }

    
    let playerOneSymbol = ""
    let playerTwoSymbol = ""
    if (props.playMode === "humanVsHuman") {
        playerOneSymbol = <ColorTile player='playerOne' />
        playerTwoSymbol = <ColorTile player='playerTwo' />
    }
    else if (props.playMode === "humanVsBot") {
        if (props.humanGoesFirst === true) {
            playerOneSymbol = <ColorTile player='playerOne' />
            playerTwoSymbol = <ColorTile player='playerTwo' />
        }
        else {
            playerOneSymbol = <ColorTile player='playerTwo' />
            playerTwoSymbol = <ColorTile player='playerOne' />
        }
    }
    else {
        console.error(`WinLossDrawRecord tried to render with invalid playMode prop: ${props.playMode}`)
    }
    

    return (
        <Box className={classes.record} >
            <Grid container className={classes.recordRow}>
                {/* <Grid item xs={2}>
                    <TurnArrowIcon
                        status={props.status}
                    />
                </Grid> */}
                <Grid item xs={2}>
                    {playerOneSymbol}
                </Grid>
                <Grid item xs={8}>
                    <Typography color="textPrimary" align='left' component='h3' variant='h5' noWrap >
                        {playerOneName}:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography color="textPrimary" align='right' component='h3' variant='h5' noWrap >
                        {props.record[0]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.recordRow}>
                {/* <Grid item xs={2}>
                    <TurnArrowIcon
                        status={props.status}
                    />
                </Grid> */}
                <Grid item xs={2}>
                    {playerTwoSymbol}
                </Grid>
                <Grid item xs={8}>
                    <Typography color="textPrimary" align='left' component='h3' variant='h5' noWrap >
                        {playerTwoName}:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography color="textPrimary" align='right' component='h3' variant='h5' noWrap >
                        {props.record[1]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.recordRow}>
                {/* <Grid item xs={2}>

                </Grid> */}
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    <Typography color="textPrimary" align='left' component='h3' variant='h5' noWrap >
                        Draw:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography color="textPrimary" align='right' component='h3' variant='h5' noWrap >
                        {props.record[2]}
                    </Typography>
                </Grid>
            </Grid>

        </Box>
    )
}

