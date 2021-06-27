import React from 'react';

// MY COMPONENTS
import MobileMenu from "./MobileMenu";
import SpacerBox from "./SpacerBox";

// Image Imports
import logo from "../../images/nsgLogoSnipped.png";


// MATERIAL-UI COMPONENTS
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';


import { makeStyles } from '@material-ui/core/styles';


// const heightInRem = 3.6;
// const height = `${heightInRem}rem`;
// const halfHeight = `${heightInRem/2}rem`;

const useStyles = makeStyles((theme) => ({
    navbar: {
        width: '100vw',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        zIndex: '1200',
        display: 'flex',
        alignItems: 'flex-end',
        // alignItems: 'stretch',
    },
    logo: {
        width: '10%',
        backgroundImage: `
            url(${logo})  
        `,
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 95%',
    },
    pageTitle: {
        display: 'flex',
        flex: '1 0 70%',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function Navbar(props) {
    const classes = useStyles();
    return (
        <Box className={classes.navbar} >
            <Container maxWidth='md' disableGutters height='inherit' >
                <Box display='flex' justifyContent='center' >
                    <Box className={classes.logo}  />
                    <Box className={classes.pageTitle} >
                        <Typography align='center' variant='h4' noWrap >
                            {props.pageTitle}
                        </Typography>
                    </Box>
                    <Box display='flex' flexBasis='10%' justifyContent='flex-end' >
                        <MobileMenu />
                    </Box>
                </Box>
                
            </Container>
        </Box>
    )
}
