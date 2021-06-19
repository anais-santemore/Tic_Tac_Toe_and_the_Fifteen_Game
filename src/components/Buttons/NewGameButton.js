import React, { useState } from 'react';

// My Components

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// MUI Icons
import ReplayIcon from '@material-ui/icons/Replay';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        margin: '0.5rem 5%',
        width: '90%',
        height: '3.0rem',
        fontSize: '1.2rem',
    },
}));

export default function NewGameButton(props) {
    const classes = useStyles();
    const handleNewGameClick = props.handleNewGameClick;

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleNewGameClick()}
            disabled={!props.gameOver}
        >
            <ReplayIcon className={classes.buttonIcon} />
            New&nbsp;Game
        </Button>
    )
}



