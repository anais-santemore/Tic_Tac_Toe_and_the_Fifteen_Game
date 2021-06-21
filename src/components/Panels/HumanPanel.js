import React from 'react';

import { moveNumber } from "../../logic/GameLogic";

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
    
    let gameNumber = props.gameNumber
    let moveList = props.moveList
    let status = props.status
    let record = props.record

    const handleNewGameClick = props.handleNewGameClick
    const handleUndoClick = props.handleUndoClick

    function gameOver(s = status) {
        return (s === "xWins" || s === "oWins" || s === "draw")
    }
    

    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                <GameNumber 
                    gameNumber={gameNumber}
                />
                <StatusHeader
                    moveList={moveList}
                />
                <WinLossDrawRecord
                    playMode="humanVsHuman"
                    humanPlaysX={props.humanPlaysX}
                    record={record}
                />
            </Box>
            <Grid container className={classes.buttonArea} >
                <Grid item xs={12} sm={6}  >
                    <NewGameButton 
                        gameOver={gameOver()}
                        handleNewGameClick={handleNewGameClick} 
                    />

                </Grid>
                <Grid item xs={12} sm={6}   >
                    <UndoButton 
                        moveList={moveList}
                        handleUndoClick={handleUndoClick}
                    />
                </Grid>
                

            </Grid>
        </Container>
    )
}


