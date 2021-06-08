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
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        margin: '0.5rem 5%',
        width: '90%',
        height: '3.0rem',
        fontSize: '1.2rem',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
    },


}));

export default function UndoButton(props) {
    const classes = useStyles();
    const moveList = props.moveList
    
    const handleUndoClick = props.handleUndoClick

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



