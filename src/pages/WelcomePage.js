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
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        width: '95%',
    }, 
}));

export default function WelcomePage() {
    const classes = useStyles();
    
    return (
        <Container className={classes.root} maxWidth='md' >
            <Box py={3} />
            <Typography align='center' color='textPrimary' component='h1' variant='h2' gutterBottom >
                Tic-Tac-Toe & The Fifteen Game
            </Typography>
            <Grid container>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    A Math Lesson in Disguise
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    Mathematics is not just a bunch of rules to memorize, it is a human endeavor, an expression of our creativity, 
                    a shared inheritance that has been added to by every culture around the world and throughout time. 
                    Humans have been doing math for a long time (about 20 thousand years) and yet the subject is still growing,
                    with new theorems being proven every year. Mathematical proofs can be beautiful and elegant, however, 
                    this can be difficult to pick up on for someone with an untrained eye because proofs are often written in a way 
                    that involves a lot of abstraction and formality.
                </Typography>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Tic-Tac-Toe as an Intro to Proof
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    Proof is the foundation that all Mathematics sits upon, but the practice of writing "proofs" is often
                    taught quite poorly. This results in people never really coming to understand how a proof is different
                    than meerly "showing your work". In American schools, students are typically asked to write their first
                    proofs in the context of a geometry class, at the same time as they are being introduced to a lot of new
                    concepts and vocabulary dealing with similar and congruent triangles.
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    This is a mistake, in my opinion. Proof is such an important foundation that it should be introduced in a
                    context that is simple and familiar. My favorite way to introduce the concept of proof makes use of the
                    classic game Tic Tac Toe. I challenge students to write down a detailed stategy that the first player can
                    use to win everytime. If they have played enough Tic Tac Toe to have realized that the game usually ends in
                    a draw, and they say "There is no such winning strategy!" then I ask them
                    to proove that instead.
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    This can be done with nothing more than pencil and paper! I've done it and I encourage
                    you to give it a try. It will take several pages and it will challenge your ability to organize your thoughts.
                    It's going to take more than just playing lots of games and recording the results. Try making a tree-diagram
                    that maps out all variations. There are shortcuts you can take that will depend on symmetry. You may find it helpful
                    to develop your own shorthand notation for a position. You will certainly need to come up with a precice definition
                    of the word "mistake". 
                    It is essential in the process of becoming an educated person to reflect on what it takes for you to be convinced. 
                    This exercise is a great way to wrap your mind around the difference between a rigorous proof and a reasonable explanation.
                </Typography>
                
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    The Fifteen Game
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    I think it is a mistake to introduce students to the practice of writing "proofs" in the current usual way: 
                    in the context of a highschool geometry class, while simultaneously being introduced to similar and congruent 
                    triangles. Proof should be introduced in a context that is simple and familiar. 
                    My favorite way is to use the classic game Tic Tac Toe. I challenge kids to write down a detailed stategy that the 
                    first player can use to win everytime. If they have played enough Tic Tac Toe to have 
                    realized that the game usually ends in a draw, and they say "There is no such winning strategy!" then I ask them 
                    to proove that instead. (It can be done with pencil and paper, it will take several pages and will challenge 
                    your ability to organize your thoughts. It's much more than just playing lots of games and recording the results.
                    This website includes a different way of expressing this proof in the Play with Coach section.)
                    Once proof is understood in a familiar context, then kids can extend that understanding into whatever domain they 
                    desire. Understanding how to rigorously critique your own argument and data is key to being in conntrol of your own 
                    education.
                </Typography>
                <Box width="100%" mb={3} >
                    <Grid container> 
                        <Grid item xs={12} sm={4} >
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to='/play_vs_human'
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
                                to='/play_vs_bot'
                            >
                                Play Human vs. Bot
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to='/play_with_coach'
                            >
                                Play with Coach
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
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
                
                
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Behind the Scenes
                </Typography>
                <Typography variant='body1' color='textPrimary' className={classes.paragraph}>
                    This lesson is built with code that is open-source and available on my <a href="https://github.com/nolastemgarden">Github</a> account,
                    so if you have something to add, a bug to report, or simply want to see how it works you are welcome to open an issue or &nbsp;
                    <a href="https://github.com/nolastemgarden/tic-tac-toe-and-the-fifteen-game">clone the repository</a>!
                </Typography>
            </Grid>
            <Box p={5} />
        </Container>
    );
}



// Just like a musician expresses their creativity in a song, a mathematician expresses their creativity in a
// logical argument.As with songs, there are proofs that are considered classic, there are those that are seen as
//     modern innovations on the classics, and others that are competely novel.