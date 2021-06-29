import React from 'react';

// import { moveNumber, status } from "../../logic/GameLogic";

// Custom Components
import StatusHeader from './Parts/StatusHeader';
import GameNumber from './Parts/GameNumber';
import TicTacToeRecord from '../../components/Panels/Parts/TicTacToeRecord'
import FifteenRecord from '../../components/Panels/Parts/FifteenRecord'

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

    let record = (props.game === "tic-tac-toe") ?
        <TicTacToeRecord
            playMode="humanVsHuman"
            record={props.record}
            status={props.status}
        /> :
        <FifteenRecord
            playMode="humanVsHuman"
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


