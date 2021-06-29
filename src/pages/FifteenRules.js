import React from 'react';

import {
    Link as RouterLink,
} from "react-router-dom";

// My Components
import Navbar from "../components/Navbar/Navbar"

// MUI  components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        // borderRight: 'solid black 1rem',
        width: '100%',
        minHeight: 'calc(100vh - 4rem)',

        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.common.white,
        padding: '1.0rem',
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        width: '95%',
    },
}));

export default function FifteenRulesPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position='sticky' >
                <Navbar pageTitle={"Tic Tac Toe and the 15 Game"} />
            </AppBar>
            <Container className={classes.root} maxWidth='md' >


                <Typography align='center' color='textPrimary' component='h1' variant='h2' gutterBottom >
                    How to Play the Fifteen Game
                </Typography>
                
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Setup and Play
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    The Fifteen Game can be played with cards numbered one through nine, or with paper and pencil. 
                    Two players take turns claiming one card per turn, either by picking up the card or by circling the number
                    with thier color if playing with paper and pencil. 
                </Typography>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Winning
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    The first player to collect a set of three cards that add up to exactly fifteen wins. It is possible to get a total 
                    of 15 with two, four, or five cards but none of these count as a win. Going over 15 also does not win the game. 
                    If you collect extra cards you may simply ignore them when looking for sets of threee that win. If all nine cards are
                    claimed and neither player has managed to get a three-card set that adds up to 15 then the game ends in a draw.
                </Typography>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Examples
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    It is possible to collect two cards that add up up to 15, for example 6 and 9, or 7 and 8 but these two-card 
                    combinations do not win the game. Similarly, a four card set such as 1-2-3-9, does not win the game even though
                    it adds up to 15. The three card set 6-7-8 does not win because it exceeds 15 and the goal of the game is to 
                    reach exactly 15. Examples of winning sets: 1-5-9, 2-6-7, 3-4-8. Any of these winning combinations would still count 
                    if the player had additional cards not listed. 
                </Typography>

                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Using the Fifteen Game in Math Class
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    The Fifteen Game is a fantastic way to help young students build fluency with foundation addition facts. 
                    Though the math required to play is simple enough to be accessible to young children, the game can still provide 
                    a challenge to most adults. Don't believe me? Try and beat my Bot!
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    The Fifteen Game only takes a few minutes to play, making it an ideal brain-break activity. 
                    You can also set up a tournament bracket and have a whole class championship fit into one day. 
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    At a higher level, this game can serve as a gateway to combinatorial thinking: How many winning three-card sets are there?
                </Typography>

                <Grid container>
                    <Grid item xs={12} sm={4} >
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to='/fifteen_vs_human'
                        >
                            Play Human vs. Human
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to='/fifteen_vs_bot'
                        >
                            Play Human vs. Bot
                        </Button>
                    </Grid>
                    
                </Grid>
                    
                <Box p={5} />
            </Container>
        </React.Fragment>
    );
}
