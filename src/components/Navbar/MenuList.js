import React from 'react';

// React ROUTER
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

// MATERIAL-UI COMPONENTS
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



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
}));



export default function MenuList() {
    const classes = useStyles();
    
    return (
        
        <React.Fragment >

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

            <ListSubheader >
                <Box p={2} />
                <Typography variant='h5' color="textPrimary" >
                    Tic Tac Toe
                </Typography>
            </ListSubheader>

            <ListItem
                key={'rule'}
                button
                component={RouterLink}
                to={{
                    pathname: '/tic_tac_toe_rules',
                }}
            >
                <Icon className={"fas fa-question fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Rules of the Game'}
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
                key={'play_vs_bot'}
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


            <ListSubheader  >
                <Box p={2} />
                <Typography variant='h5' color="textPrimary" >
                    The Fifteen Game
                </Typography>
            </ListSubheader>

            <ListItem
                key={'fifteen_rules'}
                button
                component={RouterLink}
                to={{
                    pathname: '/fifteen_rules',
                }}
            >
                <Icon className={"fas fa-question fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Rules of the Game'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>
            
            <ListItem
                key={'fifteen_vs_human'}
                button
                component={RouterLink}
                to={{
                    pathname: '/fifteen_vs_human',
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
                key={'fifteen_vs_bot'}
                button
                component={RouterLink}
                to={{
                    pathname: '/fifteen_vs_bot',
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
                key={'learn_about_magic_squares'}
                button
                component={RouterLink}
                to={{
                    pathname: '/learn_about_magic_squares',
                }}
            >
                <Icon className={"fas fa-question fa-2x"}
                    classes={{ root: classes.icon }}
                />
                <ListItemText
                    primary={'Learn About Magic Squares'}
                    primaryTypographyProps={{ variant: 'h5' }}
                />
            </ListItem>
            

        </React.Fragment>
    );
}