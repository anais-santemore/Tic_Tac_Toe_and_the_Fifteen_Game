import React, { useState } from 'react';
// My Components

// MUI  components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


// Custom Styling
import '../../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    commetaryBox: {
        // border: 'solid yellow 1px',
        color: theme.palette.common.white,
        width: '100%',
        padding: '0rem 1.0rem',
        flex: '2 1 10vh',
        // margin: '1rem auto',
    },
}));

// In Play With Coach mode X always goes first

export default function CoachsCommentary(props) {
    const classes = useStyles();

    let [moveList, setMoveList] = useState([]);
    let [xGoesFirst, setXGoesFirst] = useState(true);
    let [gameNumber, setGameNumber] = useState(1);     // In ODD numbered games X goes first
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.
    // let [showHints, setShowHints] = useState(false);
    let [showHints, setShowHints] = useState(true);

    return (
        <Box className={classes.commetaryBox} >
            <Typography align='center' component='p' variant='body1' gutterBottom>
                commentary={getCommentary()}
            </Typography>
        </Box>
    )

    function getCommentary(ml = moveList) {
        // console.log(`getCommentary() called while showCommentary = ${showCommentary}`)
        

        // If no moves have been made
        if (ml.length === 0) {
            return `It may look like X has  9 different options but 
            when you consider symmetry there are really only 3: Center, Edge, or Corner.
            None of X's current options would be mistakes, but nor do any of them lead to a forced win.`
        }

        // If one move has been made
        if (ml.length === 1 && ml[0] === 4) {
            return `The center opening is the most popular because there are more three-in-a-rows that 
            include the center square than any other square.  Though it is sound for X, the center opening 
            is also the easiest for O to defend against.
            Considering symmetry, O really only has two options, edge or corner. 
            One is good and keeps O on track for a draw. The other is bad and opens the door for X to force a win.`
        }
        if (ml.length === 1 && ml[0] !== 4 && ml[0] % 2 === 0) {
            return `The corner opening can lead X to a winning double attack if O makes a mistake on their first move.
            Unfortunately for X, the only sound move that O has in this position is also the most intuitive one.
            Proove this to yourself by going through each of O's losing options and finding a plan for X that guarantees a win.`
        }
        if (ml.length === 1 && ml[0] % 2 === 1) {
            return `The Edge opening is the least commonly played and is the most complex to analyze.
            There are tricks and traps in this position that both players can take advantage of! 
            O has five non-symmetrical options. Don't settle for just finding one move that lets O force a draw, 
            dig into each of the five options and find the ones that maximize the chances X will make a mistake.`
        }

        // If two moves has been made
        // if (ml.length === 2) {
        //     let message = '';
        //     if (thereIsADistantForcedWinCreatingMove()) {
        //         message = `O's first move was a mistake and now X can ensure victory! But how?`
        //     }
        //     else {
        //         let answer = (gameLosingMoves().length > 0) ? 'Yes! So be careful.' : 'No! You\'re safe no matter what.';
        //         message = `O's first move was sound. None of X's current options ensure victory, but do any actually lose?  ${answer}`
        //     }
        //     return message;
        // }

        // If three moves have been made
        // if (ml.length >= 3) {
        //     let message = '';
        //     if (thereIsAnImmediateWin()) {
        //         message = `You have a winning move! Defensive moves are irrelevant.`
        //     }
        //     else if (thisIsADoubleAttack()) {
        //         message = `You cannot win right now and cannot block all of your opponent's threats. Which move led you to from a draw to defeat?`
        //     }
        //     else if (thereIsADoubleAttackCreatingMove()) {
        //         message = `You can set up a winning double attack! Don't settle for empty threats, 
        //         think hard and be sure that you are setting yourself up to win no matter what!`
        //     }
        //     else if (thereIsAnUrgentDefensiveMove()) {
        //         message = `You cannot win right now so you must defend the one key square.`
        //     }

        //     else {
        //         let answer = (gameLosingMoves().length > 0) ?
        //             'Nonetheless, it is possible for you to make a mistake and lose right now. Play carefully!' :
        //             'You\'re on track for a draw no matter what move you play in this position.';
        //         message = `You have neither a winning attack nor an urgent defensive move. ${answer}`
        //     }
        //     return message;
        // }

    }

    

    ///////////////////////////////////////////////////
    // Low Level Helpers
    ///////////////////////////////////////////////////
    
    function oGoesNext(ml) {
        if (xGoesFirst) {
            return (ml.length % 2 === 1) ? true : false
        }
        else {
            return (ml.length % 2 === 0) ? false : true
        }
    }
    function xGoesNext(ml) {
        if (xGoesFirst) {
            return (ml.length % 2 === 0) ? true : false
        }
        else {
            return (ml.length % 2 === 1) ? false : true
        }
    }
    function xWentLast(ml) {
        if (xGoesFirst) {
            return (ml.length % 2 === 1) ? true : false
        }
        else {
            return (ml.length % 2 === 0) ? false : true
        }
    }
    function oWentLast(ml) {
        if (xGoesFirst) {
            return (ml.length % 2 === 0) ? true : false
        }
        else {
            return (ml.length % 2 === 1) ? false : true
        }
    }
    
}
