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
        // flex: '1 0 50%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.0rem 1.0rem 2.0rem',
    },
    controls: {
        // border: 'solid green 1px',
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
                <Box display="flex" justifyContent="center" color="textPrimary" >
                    <GameNumber 
                        gameNumber={gameNumber}
                    />&nbsp;&nbsp;&nbsp;
                    <StatusHeader 
                        moveList={moveList}
                    />
                </Box>
                <WinLossDrawRecord
                    playMode="humanVsBot"
                    humanPlaysX={props.humanPlaysX}
                    record={record}
                />
            </Box>
            <Grid container spacing={3} className={classes.controls} >
                <Grid item xs={12}  >
                    <DifficultyModeButtons 
                        difficultyMode={props.difficultyMode}
                        handleDifficultyModeChange={props.handleDifficultyModeChange}
                    />
                </Grid>
                <Grid item xs={6}   >
                    <NewGameButton
                        gameOver={gameOver(props.status)}
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


