import React from 'react';

// My Logical Components

// My Components

// MUI  components
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    numCard: {
        margin: '0.3rem',
        width: '15%',
        // maxWidth: '120px',
        height: 'calc(100% - 0.6rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '500%',
        fontWeight: 'bold',
        color: theme.palette.common.black,
    },
    playerOne: {
        backgroundColor: theme.palette.info.main,
        color: 'white',
    },
    playerTwo: {
        backgroundColor: theme.palette.success.main,

    },
    highlightWins: {
        backgroundColor: theme.palette.primary.main,

    },
}));

export default function NumCard(props) {
    const classes = useStyles();


    const id = props.id
    const cardStatus = props.cardStatus;  // unclaimed, playerOne, or playerTwo
    const num = props.num


    let cardStatusClassName
    switch (props.cardStatus) {
        case 'x':
            cardStatusClassName = `${classes.numCard} ${classes.playerOne} `
            break;
        case 'o':
            cardStatusClassName = `${classes.numCard} ${classes.playerTwo} `
            break;
        case '_':
            cardStatusClassName = `${classes.numCard} `
            break;
        default:
            throw console.error("number card passed invalid status");
    }
    
    

    return (
        <Paper
            number={props.number}
            elevation={4}
            className={cardStatusClassName}
            onClick={() => props.handleBoardClick(props.number.toString())}
        >
            <Typography color="textSecondary" >
                {num}
            </Typography>
        </Paper>
    )
}