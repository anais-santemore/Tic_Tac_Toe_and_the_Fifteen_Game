import React from 'react';

// My Components

// MUI Icons
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    buttonIcon: {
        fontSize: '1rem',
        // margin: '0rem 0rem 0.8rem',
    },
    hiddenButtonIcon: {
        fontSize: '1rem',
        // margin: '0rem 0rem 0.8rem',
        color: theme.palette.common.black,
    }
}));


export default function TurnArrowIcon(props) {
    const classes = useStyles();
    if ((props.gameStatus === `Player One's Turn` && props.player === "one")
        || (props.gameStatus === `Player Two's Turn` && props.player === "two")) {
        return (<ArrowRightAltIcon className={classes.buttonIcon} />)
    } else {
        return (<ArrowRightAltIcon className={classes.hiddenButtonIcon} />)
    }
}