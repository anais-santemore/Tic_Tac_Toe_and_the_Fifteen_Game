import React from 'react';

import {
    Link as RouterLink,
} from "react-router-dom";

// My Components


// MUI  components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'


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
        // margin: 'auto',
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        marginRight: '1.0rem',
    }, 
    
    
}));


export default function WelcomePage() {
    const classes = useStyles();
    
    
    return (
        <Container className={classes.root} maxWidth='md' >
            <Typography align='center' color='textPrimary' component='h1' variant='h2' gutterBottom >
                Tic-Tac-Toe & Proof
            </Typography>
            <Grid container>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Proof: An Expression of Creativity
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    Math is a creative endeavor that focuses on things that can be <em>proven</em> using logic.
                    In the same way a song is an expression of a musician's creativity, a written proof is an expression of a mathematician's creativity.
                    Mathematical proofs can be profoundly beautiful and elegant, however, to the untrained eye, this beauty and elegance can be difficult 
                    to pick up on because proofs often involve a lot of abstraction and formal definitions.
                </Typography>
                
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Tic-Tac-Toe as an Intro to Proof
                </Typography>
                {/* <Typography paragraph align='justify' color='textPrimary' component='body1' variant='body1' gutterBottom >
                    Most math students are first asked to write proofs in the context of a highschool geometry class. Shortly after being introduced to 
                    the concept of triangle similarity, students are asked to write arguements to prove two triangles are similar using Angle-Angle, Side-Side-Side,
                    and Side-Angle-Side similarity. I think this is a mistake. Proof is such an important idea, it should be introduced in a context that is simpler 
                    and much more familiar.
                </Typography> */}
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    Most math students are first asked to write proofs in the context of a highschool geometry class, dealing with triangle similarity.
                    I think this is a mistake. Proof is such an important idea, it should be introduced in a context that is simpler and much more familiar.
                    Most children have played Tic Tac Toe enough times to have realized that the game usually ends in a draw. I challenge them to come up with 
                    a detatailed strategy (for either the first or second player) that will allow them to win every time. Often students think they have found such
                    a winning strategy, and when they tell me that they have I challenge them to use it to beat me. It never works. Eventually, they formulate their 
                    own twist on my original challenge and set out to prove that no win-forcing strategy exists for either player.
                </Typography>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Defining Your Terms
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    In this lesson we will use certain words that we have and intuitive grasp on: mistake, threat, double-attack. We need to go beyond our intuitive 
                    understanding of these words and define them in a precice way. I leave writing and refining these definitions as an exercise for the student. 
                    Keep in mind, a good definition is an "if and only if" statement, it outlines the conditions which are both necessary and sufficient. 
                </Typography>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Proof on Paper
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    It may take you several pages, but you can prove using an exhaustive tree-diagram that in classic Tic-Tac-Toe both players worst case scenario
                    if they avoid making any mistakes is a draw. If you get stuck or want to check your answers, take a look at the "Learn Tic Tac Toe Strategy" page.
                </Typography>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Taking It Further
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    Is it possible for the player who goes first to make a mistake on the first move of the game? 
                    Is is possible for the player who goes second to make a mistake on their first move?
                </Typography>
                
                
                <Box width="100%" mb={3} > 
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/play_tic_tac_toe'
                    >
                        Play Tic-Tac-Toe!
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/learn_tic_tac_toe'
                    >
                        Learn Tic-Tac-Toe
                    </Button>
                </Box>
                
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Behind the Scenes
                </Typography>
                <Typography variant='body1' color='textPrimary' className={classes.paragraph}>
                    This lesson is built with code that is open-source and available on my <a href="https://github.com/nolastemgarden">Github account</a>,
                    so if you have something to add, a bug to report, or simply want to see how it works you are welcome to open an issue or &nbsp;
                    <a href="https://github.com/nolastemgarden/tic-tac-toe-and-the-fifteen-game">clone the repository</a>!
                </Typography>
            </Grid>
            <Box p={5} />
        </Container>
    );
}
