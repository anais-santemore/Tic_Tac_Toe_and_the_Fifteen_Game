import React from 'react';

// Custom Components
import StatusHeader from './StatusHeader';
import WinLossDrawRecord from "./WinLossDrawRecord";

import NewGameButton from "../Buttons/NewGameButton";
import UndoButton from "../Buttons/UndoButton";

// MUI Components
import {Box, Grid, Container} from '@material-ui/core';

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
    const record = props.record;


    const gameOver = props.gameOver;
    const moveNumber = props.moveNumber;
    const gameStatus = props.gameStatus;

    const handleNewGameClick = props.handleNewGameClick
    const handleUndoClick = props.handleUndoClick

    
    return (
        <Container maxWidth='sm' className={classes.panel} >
            <Box className={classes.infoArea} >
                <StatusHeader
                    gameNumber={gameNumber}
                    moveList={moveList}
                    status={status}
                />
                <WinLossDrawRecord
                    playMode="humanVsHuman"
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
                        gameOver={gameOver()}
                        moveNumber={moveNumber()}
                        // moveNumber={6}
                        handleUndoClick={handleUndoClick}
                    />
                </Grid>
                

            </Grid>
        </Container>
    )
}


