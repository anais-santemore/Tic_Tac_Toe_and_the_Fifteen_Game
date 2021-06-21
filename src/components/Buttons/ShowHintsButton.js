import React, { useState } from 'react';

// My Components

// MUI Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// MUI Icons
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '2.1rem',
        fontSize: '1rem',
    },
    buttonIcon: {
        marginRight: '1vmin',
        fontSize: 'larger'
        // fontSize: 'min(max(0.7rem, 3vmin), 22px)',
    },


}));

export default function ShowHintsButton(props) {
    const classes = useStyles();
    const toggleShowHints = props.toggleShowHints
    // const showHints = props.showHints // ???? 

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
    

    

