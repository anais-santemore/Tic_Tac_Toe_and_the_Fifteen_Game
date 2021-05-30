// Status Panel for the Tic-Tac-Toe Game

import React, { useState } from 'react';

// Custom Components
import HelpModal from "../HelpModal";
import TicTacToeSettingsModal from "../TicTacToeSettingsModal";

// MUI Components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


import ReplayIcon from '@material-ui/icons/Replay';
import UndoIcon from '@material-ui/icons/Undo';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    panel: {
        // border: 'solid orange 1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    infoArea: {
        // border: 'solid red 1px',
        flex: '1 0 55%',
        display: 'flex',
        flexDirection: 'column',
        // padding: '1.0rem 2.0rem 0.0rem ',

    },
    buttonArea: {
        // border: 'solid red 1px',
        flex: '1 0 45%',
        display: 'flex',
        // padding: '1.0rem 2.0rem 0.0rem ',

    },
    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        margin: '0.5rem 5%',
        width: '90%',
        height: '3.0rem',
        fontSize: '1.2rem',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
    },
    

}));

export default function HumanPanel(props) {
    const classes = useStyles();
    
    const gameNumber = props.gameNumber;
    const record = props.record;


    const gameOver = props.gameOver;
    const moveNumber = props.moveNumber;
    const gameStatus = props.gameStatus;
    const commentary = props.commentary;

    const handleNewGameClick = props.handleNewGameClick
    const handleUndoClick = props.handleUndoClick

    
    const scoreBoard = (
        <React.Fragment>
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                Game Number:&nbsp;{gameNumber} 
            </Typography>
            <Typography align='center' component='h1' variant='h4' noWrap gutterBottom>
                {gameStatus}
            </Typography>
            <Typography align='center' component='h3' variant='h5' noWrap >
                Player X: &ensp;{props.record[0]}
            </Typography>
            <Typography align='center' component='h3' variant='h5' noWrap >
                Player O: &ensp;{props.record[1]}
            </Typography>
            <Typography align='center' component='h3' variant='h5' noWrap gutterBottom>
                Draw: &emsp; &emsp;  {props.record[2]}
            </Typography>
        </React.Fragment>
    )


    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                {scoreBoard}
            </Box>
            <Grid container className={classes.buttonArea} >
                <Grid item xs={12} sm={6}  >
                    <NewGameButton handleNewGameClick={handleNewGameClick} />

                </Grid>
                <Grid item xs={12} sm={6}   >
                    <UndoButton gameOver={gameOver}
                        moveNumber={moveNumber}
                        handleUndoClick={handleUndoClick}
                    />
                </Grid>
                

            </Grid>
        </Container>
    )
}


function UndoButton(props) {
    const classes = useStyles();
    const gameOver = props.gameOver
    const moveNumber = props.moveNumber
    const handleUndoClick = props.handleUndoClick
    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleUndoClick()}
        // disabled={gameOver || moveNumber < 1}
        >
            <UndoIcon className={classes.buttonIcon} />
            Undo
        </Button>
    )
}


function NewGameButton(props) {
    const classes = useStyles();
    const handleNewGameClick = props.handleNewGameClick;

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleNewGameClick()}
        // disabled={!props.gameOver}
        >
            <ReplayIcon className={classes.buttonIcon} />
            New&nbsp;Game
        </Button>
    )
}
