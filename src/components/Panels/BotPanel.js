import React from 'react';

import { status, outcomeMap, getParent, winningMoves, urgentDefensiveMoves, doubleAttackingMoves } from "../../logic/GameLogic";

// Custom Components
import GameNumber from '../../components/Panels/Parts/GameNumber'
import StatusHeader from '../../components/Panels/Parts/StatusHeader'
import WinLossDrawRecord from '../../components/Panels/Parts/WinLossDrawRecord'

import DifficultyModeButtons from "../../components/Buttons/DifficultyModeButtons";
import NewGameButton from '../../components/Buttons/NewGameButton'
import BotGoFirstButton from '../../components/Buttons/BotGoFirstButton'
 
// MUI Components
import { Box, Grid, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


import ReplayIcon from '@material-ui/icons/Replay';

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
        flex: '1 0 65%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.0rem 2.0rem 0.0rem ',
    },
    controls: {
        // border: 'solid green 1px',
        flex: '1 0 35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

}));

export default function BotPanel(props) {
    const classes = useStyles();

    let gameNumber = props.gameNumber
    let moveList = props.moveList
    let status = props.status
    let record = props.record

    let handleNewGameClick = props.handleNewGameClick
    let handleBotGoFirstClick = props.handleBotGoFirstClick


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
                    record={record}
                />
            </Box>
            <Grid container spacing={3} className={classes.buttonArea} >
                <DifficultyModeButtons />
            </Grid>

            <Grid container spacing={3} className={classes.buttonArea} >
                <Grid item xs={12} sm={6}  >
                    <NewGameButton
                        gameOver={gameOver()}
                        handleNewGameClick={handleNewGameClick}
                    />

                </Grid>
                <Grid item xs={12} sm={6}   >
                    <BotGoFirstButton 
                        gameOver={false}
                        moveList={moveList}
                        handleBotGoFirstClick={handleBotGoFirstClick}
                    />
                </Grid>


            </Grid>
        </Container>
    )

    

}


