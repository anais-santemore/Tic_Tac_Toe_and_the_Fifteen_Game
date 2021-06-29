import React from 'react';

// MATERIAL-UI COMPONENTS
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    spacerBox: {
        // border: 'solid blue 1px',
        // paddingTop: halfHeight,
        // paddingTop: height,
        paddingTop: '5vh',
        paddingLeft: '99vw',
        // paddingX: '50vw',
        // position: 'absolute',
        // top: 0,
    },
}));


export default function SpacerBox(props) {
    const classes = useStyles();
    return (
        <Box className={classes.spacerBox} />
    )
}

