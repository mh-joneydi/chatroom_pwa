import { AppBar, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import Menu from '@material-ui/icons/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth';

const useStyle = makeStyles({
    toolbarTitle: {
        flexGrow: 1,
    },
})

const Header = () => {
    const classes = useStyle();
    return (
            <Grid item component={AppBar} position='static' color='primary'>
                    <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.toolbarTitle}>
                        چت روم 
                    </Typography>
                        <IconButton color='inherit' component={Link} to='/'><Home/></IconButton>
                        <Auth/>
                        <IconButton color='inherit' edge='start'><Menu/></IconButton>
                    </Toolbar>
            </Grid>
    );
};

export default Header;


