import React from 'react';

// Custom Components
import StatusHeader from './StatusHeader';
import CoachsCommentary from "./CoachsCommentary";

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

export default function HumanPanel(props) {
    const classes = useStyles();

    const gameNumber = props.gameNumber;

    const gameOver = props.gameOver;
    const moveNumber = props.moveNumber; 
    const gameStatus = props.gameStatus;


    // const commentLabel = props.commentary;
    const commentLabel = props.commentLabel;



    const showHints = props.showHints
    const toggleShowHints = props.toggleShowHints

    const handleNewGameClick = props.handleNewGameClick
    const handleUndoClick = props.handleUndoClick


    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                <StatusHeader
                    gameNumber={gameNumber}
                    gameStatus={gameStatus}
                />
                <CoachsCommentary
                    gameStatus={gameStatus}
                    commentLabel={commentLabel}
                    // gameStatus={gameStatus}
                /> 
            </Box>
            <Grid container className={classes.buttonArea} >
                <Grid item xs={12} sm={6}  >
                    <UndoButton 
                        gameOver={gameOver}
                        moveNumber={moveNumber}
                        handleUndoClick={handleUndoClick}
                    />
                </Grid>
                <Grid item xs={12} sm={6}   >
                    <ShowHintsButton 
                        gameOver={gameOver}
                        toggleShowHints={toggleShowHints}
                    />
                </Grid>


            </Grid>
        </Container>
    )
}

