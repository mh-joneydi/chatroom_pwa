import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import ShowAlerts from '../ShowAlerts';
import Header from './Header';
import Footer from './Footer';

const useStyle = makeStyles(theme=> ({
    root: {
        flexBasis: '100%',
    },
    main: {
        backgroundColor: theme.palette.background.light,
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        flexGrow: 1,
    },
}));

const Layout = (props) => {
    const classes = useStyle();
    return (
        <Grid id='mainContainer' container direction='column' component={Container} fixed className={classes.root}>
                <Header/>
                <Grid item container direction='column' className={classes.main} component='main'>
                <ShowAlerts />
                    {props.children}
                </Grid>
                <Footer />
        </Grid>
    );
};

export default Layout;