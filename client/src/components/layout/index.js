import { AppBar, Container, Grid, IconButton, isWidthUp, SwipeableDrawer, Toolbar, Typography, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import ShowAlerts from '../ShowAlerts';
import Footer from './Footer';
import Menu from '@material-ui/icons/Menu';

const useStyle = makeStyles(theme=> ({
    root: {
        flexBasis: '100%',
        padding : 0,
        [theme.breakpoints.up('sm')]: {
            margin: '1.5rem auto'
        },
        boxShadow: theme.shadows[5]
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    main: {
        backgroundColor: theme.palette.background.light,
        flexGrow: 1,
    },
}));

const Layout = ({ children, width }) => {
    const classes = useStyle(),
    [open, setOpen] = useState(false),
    toggleOpen = ()=> {
        setOpen(!open)
    }
    return (
        <Grid container direction='row' component={Container} fixed className={classes.root}>
                {
                    isWidthUp('sm', width) ? (
                        <Grid item>
                            {/* Drawer Component for Desktop*/}
                        </Grid>
                    ) : (
                        <SwipeableDrawer
                            open={open}
                            onClose={toggleOpen}
                            anchor="right"
                        >
                            {/* Drawer Component for Mobile*/}
                        </SwipeableDrawer>
                    )
                }
                <Grid item container direction='column'>
                    <Grid item component={AppBar} position='static' color='primary'>
                            <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" className={classes.toolbarTitle}>
                                چت روم 
                            </Typography>
                                <IconButton color='inherit' edge='start' onClick={toggleOpen}><Menu/></IconButton>
                            </Toolbar>
                    </Grid>
                    <Grid item container direction='column' className={classes.main} component='main'>
                    <ShowAlerts />
                        {children}
                    </Grid>
                    <Footer />
                </Grid>
        </Grid>
    );
};

export default withWidth()(Layout);