import React from 'react';

// Custom Components

// MUI Components
import Button from '@material-ui/core/Button';

// MUI Icons

// Custom Styling
import '../../styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '2.5rem',
        fontSize: '1.1rem',
    },
}));

export default function DifficultyModeButtons(props) {
    const classes = useStyles();

    const moveNumber = props.moveNumber;
    const handleLetBotGoFirstClick = props.handleLetBotGoFirstClick

    
    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleLetBotGoFirstClick()}
            disabled={moveNumber !== 1}
        >
            Let&nbsp;Bot&nbsp;Go&nbsp;First
        </Button>
    )

}
