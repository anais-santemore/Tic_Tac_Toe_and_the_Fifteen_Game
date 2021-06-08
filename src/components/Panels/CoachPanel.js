import React from 'react';

import { status, getParent } from "../../logic/GameLogic";


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
}));

export default function CoachPanel(props) {
    const classes = useStyles();

    let moveList = props.moveList
    let commentLabel = props.commentLabel;
    let toggleShowHints = props.toggleShowHints
    let handleUndoClick = props.handleUndoClick
    
    let currentStatus = status(moveList);
    let previousStatus = status(getParent(moveList));

    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                <StatusHeader
                    moveList={moveList}
                />
                <CoachsCommentary
                    moveList={moveList}
                    commentLabel={commentLabel}
                /> 
            </Box>
            <Grid container className={classes.buttonArea} >
                <Grid item xs={12} sm={6}  >
                    <UndoButton 
                        gameOver={false}
                        moveList={moveList}
                        handleUndoClick={handleUndoClick}
                    />
                </Grid>
                <Grid item xs={12} sm={6}   >
                    <ShowHintsButton 
                        toggleShowHints={toggleShowHints}
                    />
                </Grid>


            </Grid>
        </Container>
    )
}

