import React, { useState } from 'react';

import { nextPlayer } from "../../../logic/GameLogic";

// My Components

// MUI  components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


// Custom Styling
// import '../../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    commetaryBox: {
        color: theme.palette.common.white,
        width: '100%',
    },
}));

export default function CoachsCommentary(props) {
    const classes = useStyles();

    let moveList = props.moveList
    let commentLabel = props.commentLabel

    let next = (nextPlayer(moveList) === "xNext") ? "X" : "O"
    let prev = (nextPlayer(moveList) === "xNext") ? "O" : "X"

    return (
        <Box className={classes.commetaryBox} >
            <Typography align='justify' component='p' variant='body1' gutterBottom>
                {getCommentary(commentLabel, next)}
            </Typography>
        </Box>
    )

    function getCommentary(commentLabel, next) {
        console.log(`getCommentary called with commentLabel: ${commentLabel}`);
        
        let comment = `Error in get commentary.  Called with commentLabel: ${commentLabel}`
        switch (commentLabel) {
            case "newGame":
                comment = `New Game. X always goes first. It may look like X has 9 different 
                options but, considering symmetry, there are really only 3: Center, Edge, or Corner. 
                Do any of them set X up to force a win? Is there any move for X that would be a 'mistake'?`
                break;
            case "centerOpening":
                comment = `The Center Opening is the most popular. I think this is because there are more three-in-a-rows that
                include the center square than the edges and corners. Though X is still on track for a draw, the center opening
                is the easiest for O to defend against because, considering symmetry, O really only has two options, edge or corner.
                One is good and keeps O on track for a draw. The other is bad and opens the door for X to force a win.`
                break;
            case "cornerOpening":
                comment = `The Corner Opening can lead X to a winning double attack if O makes a mistake on their first move. 
                O has 5 non-symetrical options in this position, however, the only sound move that O has in this position is also the most
                intuitive one. Proove this to yourself by going through O's 4 losing options and finding a plan that guarantees X 
                a victory in each one.`
                break;
            case "edgeOpening":
                comment = `The Edge Opening is my personal favorite. It is the least commonly played and is the most complex to analyze.
                There are many tricks and traps in this opening that both players can take advantage of!
                O has five non-symmetrical options. Don't settle for just finding one move that lets O guarantee a draw,
                dig into each of the five options and find the ones that maximize the chances X will make a mistake!`
                break;
            case "immediateWin":
                comment = `${next} goes next and has the ability to win immediately! That means ${prev} must have made a mistake 
                earlier in the game. Go back and see if you can find the mistake and choose the better option instead.`
                break;
            case "urgentDefence":
                comment = `${next} goes next and has an urgent defensive move they must make in order to not lose on the next turn!`
                break;
            case "losing":
                comment = `${next} goes next, has no immediate way to win and ${prev} has more than one threat, meaning ${next} cannot 
                defend against them all. Defeat is on its way no matter what ${next} does now. This move is not the mistake though! 
                Go back and find the mistake that allowed ${prev} to create this double attack.`
                break;
            case "doubleAttack":
                comment = `Though ${next} cannot win this turn, they can create a double attack, setting up for a
                guaranteed win on their next turn no matter what ${prev} does. Dont's settle for a move that only creates 
                one threat, you need to make two simultaneous threats in order to win.`
                break;
            case "mistake":
                comment = `A mistake! Before that last move ${prev} was on track for a draw. That last move  
                has given ${next} the opportunity to force a win. ${next} cannot create a double attack quite yet, so they will
                have to look further into the future to see what forced continuations can lead them to making a double attack on
                their next move. Don't settle for a draw anymore! Make the most of your opponent's mistake.`
                break;
            case "missedWin":
                comment = `${next} made the first mistake and gave ${prev} a chance to force a win, but ${prev} replied with
                another mistake and now they have missed missed that chance to win! Look for forcing moves that lead to double
                attacks and you will avoid mistakes like the one ${prev} just made.`
                break;
            case "sound":
                comment = `Good. The last move by ${prev} was "sound" meaning it has not hurt their worst case outcome: previously
                on track for a draw, still on track for a draw.`
                break;
            case "xWins":
                comment = `X has won the game! That means O must have made a mistake along the way.
                Go back and see if you can find it on your own. If not, check the hints. In starting position all squares are Yellow, 
                indicating that no matter which X chooses they will be on track for a draw, at best. When Red squares appear in the hints
                that indicates possible mistakes to avoid. Green squares indicate winning responses to mistakes`
                break;
            case "oWins":
                comment = `O has won the game! That means X must have made a mistake along the way.
                Go back and see if you can find it on your own. If not, check the hints. In starting position all squares are Yellow,
                indicating that no matter which X chooses they will be on track for a draw, at best. When Red squares appear in the hints
                that indicates possible mistakes to avoid. Green squares indicate winning responses to mistakes`
                break;
            case "draw":
                comment = `The game has ended a draw. What did you expect? `
                break;
            default:
                break;
        }
        return comment
 
        

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

    
    
}
