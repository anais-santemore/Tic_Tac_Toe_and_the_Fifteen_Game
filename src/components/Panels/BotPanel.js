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

    const learnButtons = (
        <React.Fragment>
            <UndoButton />
            <ShowHintsButton
                toggleShowHints={toggleShowHints}
            />

        </React.Fragment>
    )
    function gameOver(s = status) {
        return (s === "xWins" || s === "oWins" || s === "draw")
    }

    const playButtons = (
        <React.Fragment>
            <NewGameButton handleNewGameClick={handleNewGameClick} />
            <HelpModal />
        </React.Fragment>
    )

    return (
        <Box className={classes.panel}>
            <Box className={classes.infoArea} >
                {(mode === 'learn') ? commentaryBoard : scoreBoard}
            </Box>
            <Box className={classes.controls} >
                {(mode === 'learn') ? learnButtons : playButtons}
            </Box>
        </Box>
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

function ShowHintsButton(props) {
    const classes = useStyles();
    const toggleShowHints = props.toggleShowHints

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => toggleShowHints()}
        >
            <HelpOutlineIcon className={classes.buttonIcon} />
            Show Hints
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

function HelpButton(props) {
    const classes = useStyles();
    const handleUndoButtonClick = props.handleUndoButtonClick


    return (
        <Box className={classes.button} >
            <HelpModal />
        </Box>
    )
}

function SettingsButton(props) {
    const classes = useStyles();
    const handleUndoButtonClick = props.handleUndoButtonClick


    return (
        <Box className={classes.button} >
            <TicTacToeSettingsModal
                showMoves={props.showMoves}
                showCommentary={props.showCommentary}
                toggleShowMovesSwitch={props.toggleShowMovesSwitch}
                toggleShowCommentarySwitch={props.toggleShowCommentarySwitch}
            />
        </Box>
    )
}
