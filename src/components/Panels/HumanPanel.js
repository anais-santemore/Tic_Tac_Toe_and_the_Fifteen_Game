import React from 'react';

// import { moveNumber, status } from "../../logic/GameLogic";

// Custom Components
import StatusHeader from './Parts/StatusHeader';
import GameNumber from './Parts/GameNumber';
import WinLossDrawRecord from "./Parts/WinLossDrawRecord";

import NewGameButton from "../Buttons/NewGameButton";
import UndoButton from "../Buttons/UndoButton";

// MUI Components
import {Box, Grid, Container} from '@material-ui/core';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
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
        flex: '1 0 50%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.0rem',
    },
    controls: {
        // border: 'solid green 1px',
        flex: '1 0 50%',
    },
}));

export default function HumanPanel(props) {
    const classes = useStyles();
    
    function gameOver(s = props.status) {
        return (s === "xWins" || s === "oWins" || s === "draw")
    }
    
    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                <Box display="flex" justifyContent="center" color="textPrimary" >
                    <GameNumber
                        gameNumber={props.gameNumber}
                    />&nbsp;&nbsp;&nbsp;
                    <StatusHeader
                        moveList={props.moveList}
                    />
                </Box>
                <WinLossDrawRecord
                    playMode="humanVsHuman"
                    humanPlaysX={props.humanPlaysX}
                    record={props.record}
                />
            </Box>
            <Grid container spacing={3} className={classes.controls} >
                <Grid item xs={6} >
                    <NewGameButton
                        gameOver={gameOver()}
                        handleNewGameClick={props.handleNewGameClick}
                    />
                </Grid>
                <Grid item xs={6}  >
                    <UndoButton
                        moveList={props.moveList}
                        gameOver={gameOver()}
                        handleUndoClick={props.handleUndoClick}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}


