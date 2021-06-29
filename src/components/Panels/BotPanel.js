import React from 'react';

// Custom Components
import GameNumber from '../../components/Panels/Parts/GameNumber'
import StatusHeader from '../../components/Panels/Parts/StatusHeader'
import TicTacToeRecord from '../../components/Panels/Parts/TicTacToeRecord'
import FifteenRecord from '../../components/Panels/Parts/FifteenRecord'


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

    function gameOver(s = props.status) {
        return (s === "xWins" || s === "oWins" || s === "draw")
    }

    let record = (props.game === "tic-tac-toe") ?
        <TicTacToeRecord
            playMode="humanVsBot"
            humanGoesFirst={props.humanGoesFirst}
            record={props.record}
            status={props.status}
        /> :
        <FifteenRecord
            playMode="humanVsBot"
            humanGoesFirst={props.humanGoesFirst}
            record={props.record}
            status={props.status}
        />
    
    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                <Box display="flex" justifyContent="center" color="textPrimary" >
                    <GameNumber 
                        gameNumber={props.gameNumber}
                    />&nbsp;&nbsp;&nbsp;
                    <StatusHeader 
                        game={props.game}
                        moveList={props.moveList}
                        humanGoesFirst={props.humanGoesFirst}
                    />
                </Box>
                {record}
            </Box>
            <Grid container spacing={2} className={classes.controls} >
                <Grid item xs={12}  >
                    <DifficultyModeButtons 
                        difficultyMode={props.difficultyMode}
                        handleDifficultyModeChange={props.handleDifficultyModeChange}
                    />
                </Grid>
                <Grid item xs={6}   >
                    <NewGameButton
                        gameOver={gameOver(props.status)}
                        handleNewGameClick={props.handleNewGameClick}
                    />
                </Grid>
                <Grid item xs={6}    >
                    <BotGoFirstButton 
                        gameOver={false}
                        moveList={props.moveList}
                        handleBotGoFirstClick={props.handleBotGoFirstClick}
                    />
                </Grid>


            </Grid>
        </Container>
    )

    

}


