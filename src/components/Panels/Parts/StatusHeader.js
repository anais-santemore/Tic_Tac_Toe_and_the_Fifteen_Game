import React from 'react';

import { status } from "../../../logic/GameLogic";

// MUI Components
import Typography from '@material-ui/core/Typography';

export default function StatusHeader(props) {
    const gameStatus = status(props.moveList);

    function statusMessage(status) {
        if (props.game === 'tic-tac-toe') {
            switch (status) {
                case "xWins":
                    return "Game Over. X Wins!"
                case "oWins":
                    return "Game Over. O Wins!"
                case "draw":
                    return "Game Over! Draw."
                case "xNext":
                    return "It is X's turn."
                case "oNext":
                    return "It is O's turn."
                default:
                    return "Error";
            }
        }
        else if (props.game === 'fifteen-game') {
            switch (status) {
                case "xWins":
                    return "Game Over. Red Wins!"
                case "oWins":
                    return "Game Over. Blue Wins!"
                case "draw":
                    return "Game Over! Draw."
                case "xNext":
                    return "It is Red's turn."
                case "oNext":
                    return "It is Blue's turn."
                default:
                    return "Error";
            }
        }
    }

    return (
        <Typography color="textPrimary" align='center' component='h1' variant='h4' noWrap gutterBottom>
            {statusMessage(gameStatus)}
        </Typography>
    )
}


