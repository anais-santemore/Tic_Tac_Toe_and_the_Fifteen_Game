import React from 'react';

// Custom Components

// MUI Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

// MUI Icons

// Custom Styling
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    buttonArea: {
        // border: 'solid green 1px',
        padding: '1.5rem 0rem',
    },
    button: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        // margin: '0.35rem 0rem',
        width: '100%',
        height: '2.5rem',
        fontSize: '1.1rem',
    },
    selectedButton: {
        color: theme.palette.common.white,
        backgroundColor: 'rgba(46, 107, 18, 1.0)',
    },
    unselectedButton: {
        color: '#999999',
        backgroundColor: 'rgba(46, 107, 18, 0.5)',
    },
    
}));

export default function DifficultyModeButtons(props) {
    const classes = useStyles();

    const moveNumber = props.moveNumber;
    const handleLetBotGoFirstClick = props.handleLetBotGoFirstClick
    const difficultyMode = props.difficultyMode
    const handleDifficultyModeChange = props.handleDifficultyModeChange

    const letBotGoFirstButton = (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleLetBotGoFirstClick()}
            disabled={moveNumber !== 1}
        >
            Let&nbsp;Bot&nbsp;Go&nbsp;First
        </Button>
    );

    let easyButton = (
        <Button
            className={`${classes.button} ${difficultyMode === "easy" ? classes.selectedButton : classes.unselectedButton} `}
            variant={'contained'}
            onClick={() => handleDifficultyModeChange("easy")}
        >
            Easy
        </Button>
    )

    let mediumButton = (
        <Button
            className={`${classes.button} ${difficultyMode === "medium" ? classes.selectedButton : classes.unselectedButton} `}
            variant={'contained'}
            onClick={() => handleDifficultyModeChange("medium")}
        >
            Medium
        </Button>
    )

    let hardButton = (
        <Button
            className={`${classes.button} ${difficultyMode === "hard" ? classes.selectedButton : classes.unselectedButton} `}
            variant={'contained'}
            onClick={() => handleDifficultyModeChange("hard")}
        >
            Hard
        </Button>
    )


    return (
        <Box className={classes.panel}>
            <Container maxWidth='sm'>
                <Grid container spacing={3} className={classes.buttonArea} >
                    <Grid item xs={4}  >
                        {easyButton}
                    </Grid>
                    <Grid item xs={4}  >
                        {mediumButton}
                    </Grid>
                    <Grid item xs={4}  >
                        {hardButton}
                    </Grid>
                    {/* <Grid item xs={6}>
                        {letBotGoFirstButton}
                    </Grid>
                    <Grid item xs={6}>
                        {newGameButton}
                    </Grid> */}
                </Grid>

            </Container>

        </Box>
    )

}