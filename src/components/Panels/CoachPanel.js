import React from 'react';

import { status, outcomeMap, getParent, gameOver } from "../../logic/GameLogic";
import { winningMoves, urgentDefensiveMoves, doubleAttackingMoves } from "../../logic/BotLogic";


// Custom Components
import StatusHeader from './Parts/StatusHeader';
import CoachsCommentary from "./Parts/CoachsCommentary";

import UndoButton from "../Buttons/UndoButton";
import ShowHintsButton from "../Buttons/ShowHintsButton";

// MUI Components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    panel: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    infoArea: {
        flex: '1 0 80%',
        display: 'flex',
        flexDirection: 'column',
    },
    buttonArea: {
        flex: '1 0 20%',
        display: 'flex',
    },
}));

export default function CoachPanel(props) {
    const classes = useStyles();

    function getCommentLabel(mls) {
        // console.log(`getCommentLabel called with moveList: ${mls}`);
        let currentStatus = status(mls)
        let currentOutcome = outcomeMap.get(mls)
        let previousOutcome = outcomeMap.get(getParent(mls));
        // console.log(`Current Outcome ${currentOutcome}`);
        // console.log(`Previous Outcome ${previousOutcome}`);
        let label = "error"
        if (mls.length === 0) {
            label = "newGame"
        }
        else if (mls.length === 1) {
            if (mls.charAt(0) === "5") {
                label = "centerOpening"
            }
            else if (Number(mls.charAt(0)) % 2 === 0) {
                label = "cornerOpening"
            }
            else {
                label = "edgeOpening"
            }
        } 
        else if (winningMoves(mls).length > 0 ) {
            label = "immediateWin"
        }
        else if (urgentDefensiveMoves(mls).length === 1) {          //  Modify this to pre and postpend  "A Mistake!" and "Not all moves are good in this position, choose carefully!"
            label = "urgentDefence"
        }
        else if (urgentDefensiveMoves(mls).length === 2) {
            label = "losing"
        }
        else if (doubleAttackingMoves(mls).length > 0) {
            label = "doubleAttack"
        }
        else if (currentStatus === "xWins") {
            label = "xWins"
        }
        else if (currentStatus === "oWins") {
            label = "oWins"
        }
        else if (currentStatus === "draw") {
            label = "draw"
        }
        else if (previousOutcome === "draw" && currentOutcome === "draw") {
            label = "sound"
        }
        else if (previousOutcome === "draw" && (currentOutcome === "xWins" || currentOutcome === "oWins")) {
            label = "mistake"
        }
        else if (currentOutcome === "draw" && (previousOutcome === "xWins" || previousOutcome === "oWins")) {
            label = "missedWin"
        }
        return label
    }
    let commentLabel = getCommentLabel(props.moveList)

    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                <StatusHeader
                    moveList={props.moveList}
                />
                <CoachsCommentary
                    moveList={props.moveList}
                    commentLabel={commentLabel}
                /> 
            </Box>
            <Grid container spacing={2} className={classes.buttonArea} >
                <Grid item xs={7}   >
                    <ShowHintsButton 
                        showHints={props.showHints}
                        toggleShowHints={props.toggleShowHints}
                    />
                </Grid>
                <Grid item xs={5}  >
                    <UndoButton
                        gameOver={false}
                        moveList={props.moveList}
                        handleUndoClick={props.handleUndoClick}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

