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
                    How to Play Tic-Tac-Toe
                </Typography>

                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Setup and Play
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    Tic-Tac-Toe is most commonly played as a paper and pencil game. Two players, one using X's and the other using O's,
                    take turns claiming one cell in a three-by-three grid.
                </Typography>
                <Typography align='left' color='textPrimary' component='h4' variant='h4' gutterBottom >
                    Winning
                </Typography>
                <Typography paragraph align='justify' color='textPrimary' component='p' variant='body1' gutterBottom >
                    Both players seek to get a three-in-a-row, meaning to have thier mark in all three cells in a particular row, column,
                    or diagonal. If the whole grid is filled and neither player has managed to get a three in a row then the game 
                    ends in a draw.
                </Typography>
                

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

                <Box p={5} />
            </Container>
        </React.Fragment>
    );
}
