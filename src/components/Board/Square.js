import React from 'react';

// My Logical Components

// My Components

// MUI  components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    square: {
        width: '31%',
        height: '100%',
        backgroundColor: theme.palette.common.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconX: {
        width: '100%',
        height: '100%',
        color: theme.palette.common.black
    },
    iconO: {
        width: '80%',
        height: '80%',
        color: theme.palette.common.black
    },
    noColor: {
        backgroundColor: '#ddd',
    },
    win: {
        backgroundColor: '#3B3'
    },
    draw: {
        backgroundColor: '#FF3'
    },
    lose: {
        backgroundColor: '#F44'
    },
}));

export default function Square(props) {
    const classes = useStyles();
    const number = props.number
    const handleBoardClick = props.handleBoardClick

    let squareIcon;
    switch (props.icon) {
        case 'x':
            squareIcon = <ClearIcon className={classes.iconX} />
            break;
        case 'o':
            squareIcon = <RadioButtonUncheckedIcon className={classes.iconO} />
            break;
        case '_':
            squareIcon = <Typography variant='h3' color='textSecondary' ></Typography> // 
            break;
        default:
            console.error("Square passed symbol not 'x' 'o' or '_'");
    }

    let className;
    switch (props.color) {
        case 'unknown':
            className = `${classes.square} ${classes.unknown} `
            break;
        case 'claimed':
            className = `${classes.square} ${classes.claimed} `
            break;
        case 'unclaimed':
            className = `${classes.square} ${classes.unclaimed} `
            break;
        case 'noColor':
            className = `${classes.square} ${classes.noColor} `
            break;
        case 'draw':
            className = `${classes.square} ${classes.draw} `
            break;
        case 'win':
            className = `${classes.square} ${classes.win} `
            break;
        case 'lose':
            className = `${classes.square} ${classes.lose} `
            break;
        default:
            className = `${classes.square} `
    }

    return (
        <Paper
            number={props.number}
            elevation={4}
            className={className}
            onClick={() => handleBoardClick(number.toString())}
        >
            {squareIcon}
        </Paper>
    )
}