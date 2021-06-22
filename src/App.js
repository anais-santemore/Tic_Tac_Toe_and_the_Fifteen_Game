import React from 'react';
import {
    HashRouter as Router,
    Link as RouterLink,
    Route,
    Switch
} from "react-router-dom";

import logo from './logo.svg';
import './styles/App.css';

// My Components & Pages
import Navbar from './components/Navbar/Navbar';
import WelcomePage from "./pages/WelcomePage";

// TIC TAC TOE
import PlayVsHuman from './pages/PlayVsHuman';
import PlayVsBot from './pages/PlayVsBot';
import PlayWithCoach from './pages/PlayWithCoach';

// FIFTEEN GAME
import FifteenVsHuman from './pages/FifteenVsHuman';
import FifteenVsBot from './pages/FifteenVsBot';
// import MagicSquares from "./pages/MagicSquares";

// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

// THEMING
import theme from "./theme";
import {
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.common.black,

        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'stretch',
        overflowY: 'scroll',
        overflowX: 'hidden',

    },
    container: {
        // maxWidth='md' --> max-width: 960px;
        backgroundColor: theme.palette.common.black,
        height: '95vh',
        display: 'flex',
        flexDirection: 'column',
    },
    
}))


export default function App() {
    const classes = useStyles();
    const [pageTitle, setPageTitle] = React.useState("Welcome");
  
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Box className={classes.root} >
                    <Container className={classes.container} maxWidth='md' disableGutters>  
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <Navbar pageTitle={"Welcome"} />
                                    <WelcomePage />
                                </Route>

                                <Route path="/play_vs_human">
                                    <Navbar pageTitle={"Play Human vs. Human"} />
                                    <PlayVsHuman />
                                </Route>

                                <Route path="/play_vs_bot">
                                    <Navbar pageTitle={"Play Human vs. Bot"} />
                                    <PlayVsBot />
                                </Route>

                                <Route path="/play_with_coach">
                                    <Navbar pageTitle={"Play with Coach"} />
                                    <PlayWithCoach />
                                </Route>    


                                <Route path="/fifteen_vs_human">
                                    <Navbar pageTitle={"Play Human vs. Human"} />
                                    <FifteenVsHuman />
                                </Route>

                                <Route path="/fifteen_vs_bot">
                                    <Navbar pageTitle={"Play Human vs. Bot"} />
                                    <FifteenVsBot />
                                </Route>

                                {/* <Route path="/magic_squares">
                                    <Navbar pageTitle={"Learn about Magic Squares"} />
                                    <MagicSquares />
                                </Route> */}

                            </Switch>
                        </Router>
                    </Container>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

