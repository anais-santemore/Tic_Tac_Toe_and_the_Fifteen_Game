import React from 'react'
import {
    HashRouter as Router,
    Link as RouterLink,
    Route,
    Switch
} from "react-router-dom"

import logo from './logo.svg'
import './styles/App.css'

// My Components & Pages
import Navbar from './components/Navbar/Navbar'
import WelcomePage from "./pages/WelcomePage"

// PLAY MODES
import TicTacToeRules from './pages/TicTacToeRules'
import FifteenRules from './pages/FifteenRules'
import PlayVsHuman from './pages/PlayVsHuman'
import PlayVsBot from './pages/PlayVsBot'
import PlayWithCoach from './pages/PlayWithCoach'
// import MagicSquares from "./pages/MagicSquares"

// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

// THEMING
import theme from "./theme"
import {
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles'



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
        height: '100vh',
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
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                {/* <Navbar pageTitle={"Welcome"} /> */}
                                <WelcomePage />
                            </Route>

                            <Route path="/tic_tac_toe_rules">
                                <TicTacToeRules />
                            </Route>

                            <Route path="/fifteen_rules">
                                <FifteenRules />
                            </Route>

                            <Route path="/play_vs_human">
                                <PlayVsHuman game={"tic-tac-toe"} />
                            </Route>

                            <Route path="/play_vs_bot">
                                {/* <Navbar pageTitle={"Play Human vs. Bot"} /> */}
                                <PlayVsBot game={"tic-tac-toe"}  />
                            </Route>

                            <Route path="/play_with_coach">
                                {/* <Navbar pageTitle={"Play with Coach"} /> */}
                                <PlayWithCoach game={"tic-tac-toe"} />
                            </Route>    

                            <Route path="/fifteen_vs_human">
                                <PlayVsHuman game={"fifteen-game"} />
                            </Route>

                            <Route path="/fifteen_vs_bot">
                                {/* <Navbar pageTitle={"Play Human vs. Bot"} /> */}
                                <PlayVsBot game={"fifteen-game"} />
                            </Route>

                            {/* <Route path="/magic_squares">
                                <Navbar pageTitle={"Learn about Magic Squares"} />
                                <MagicSquares />
                            </Route> */}

                        </Switch>
                    </Router>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

