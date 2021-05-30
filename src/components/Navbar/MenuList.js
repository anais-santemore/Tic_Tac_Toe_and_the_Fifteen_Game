import React from 'react';

// React ROUTER
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

// MATERIAL-UI COMPONENTS
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

// ICONS 

const useStyles = makeStyles(theme => ({
    list: {
        width: 'inherit',
        // backgroundColor: theme.palette.primary.dark
        backgroundColor: 'inherit'

    },
    listItem: {
        color: theme.palette.common.white,
    },
    icon: {
        width: '45px',
        color: theme.palette.common.white,
        alignContent: 'center',
        justifyContent: 'center',
    },
    whiteText : {
        color: theme.palette.common.white,
    }
}));



export default function TeachingServicesList() {
    const classes = useStyles();
    
    return (
        
        <React.Fragment className={classes.whiteText} >

            <ListItem
                key={'welcome'}
                button
                component={RouterLink}
                to='/'
            >
                <Icon className={"fas fa-home fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Welcome'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'play_vs_human'}
                button
                component={RouterLink}
                to={{
                    pathname: '/play_vs_human',
                }}
            >
                <Icon className={"fas fa-user-friends fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Play vs. Human'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'play_vs_human'}
                button
                component={RouterLink}
                to={{
                    pathname: '/play_vs_bot',
                }}
            >
                <Icon className={"fas fa-robot fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Play vs. Bot'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>

            <ListItem
                key={'play_with_coach'}
                button
                component={RouterLink}
                to={{
                    pathname: '/play_with_coach',
                }}
            >
                <Icon className={"fas fa-question fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Play with Coach'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>


            {/* <ListItem
                key={'learn about magic squares'}
                className={classes.listItem}
                button
                component={RouterLink}
                to={{
                    pathname: '/magic_squares',
                }}
            >
                <Icon className={"fas fa-question fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Learn about Magic Squares'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem> */}

        </React.Fragment>
    );
}