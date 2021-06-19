import React, { useState } from 'react';

import { getParent, gameOver, moveNumber } from "../../logic/GameLogic";


// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// MUI Icons
import UndoIcon from '@material-ui/icons/Undo';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '2.5rem',
        fontSize: '1.1rem',
    },
}));

export default function UndoButton(props) {
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleUndoClick()}
            disabled={props.gameOver || moveNumber(moveList) === 1}
        >
            <UndoIcon className={classes.buttonIcon} />
            Undo
        </Button>
    )
}



