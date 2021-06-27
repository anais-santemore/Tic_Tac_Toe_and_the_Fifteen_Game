import React from 'react';

// MY components
import MenuList from "./MenuList";

// MATERIAL-UI COMPONENTS
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    menu: {
        // border: 'solid red 1px',
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
    },
    drawer: {
        // backgroundColor: theme.palette.primary.main,
        height: 'auto'
    },
    list: {
        width: 'auto',
        fontSize: '0.8rem',
        backgroundColor: theme.palette.primary.main,
        height: '100%'
    },
}));

export default function MobileMenu() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <MenuList />
            </List>
        </Box>
    );

    return (
        <Box className={classes.menu} >
            <Button 
                className={classes.button}
                onClick={toggleDrawer('open', true)}
                aria-controls="simple-menu"
                aria-haspopup="true"
            >
                <MenuIcon fontSize='large' />
            </Button>   
            <Drawer 
                className={classes.drawer}
                classes={{ paper: 'paper'}}
                anchor={'right'} 
                open={state['open']} 
                onClose={toggleDrawer('open', false)}
                onClick={toggleDrawer('open', false)}
            >
                    {list('right')}
            </Drawer>
        </Box>
    );
}