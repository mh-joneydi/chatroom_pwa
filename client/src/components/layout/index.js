import { AppBar, Container, Grid, IconButton, isWidthUp, Toolbar, Typography, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import ShowAlerts from '../ShowAlerts';
import Footer from './Footer';
import Menu from '@material-ui/icons/Menu';
import DesktopDrawer from '../DesktopDrawer';
import MobileDrawer from '../MobileDrawer';

const useStyle = makeStyles(theme=> ({
    root: {
        flexBasis: '100%',
        [theme.breakpoints.up('sm')]: {
            margin: '1.5rem auto'
        },
        boxShadow: theme.shadows[5],
    },
    toolbarTitle: {
        marginLeft: 'auto',
    },
    main: {
        backgroundColor: theme.palette.background.light,
        flexGrow: 1,
    },
    hide: {
        display: 'none'
    }
}));

const Layout = ({ children, width }) => {
    const classes = useStyle(),
    [open, setOpen] = useState(false),
    closeSideBar = ()=> {
        setOpen(false)
    },
    openSideBar = ()=> {
        setOpen(true)
    };
    return (
        <Grid 
            container 
            wrap='nowrap' 
            component={Container} 
            fixed 
            className={classes.root} 
            disableGutters 
            maxWidth='xl'
        >
            {
                isWidthUp('md', width) ? (
                    <DesktopDrawer 
                        open={open}
                        onClose={closeSideBar}
                    />
                ) : (
                    <MobileDrawer
                        open={open}
                        onClose={closeSideBar}
                    />
                )
            }
            <Grid item container direction='column' zeroMinWidth>
                <Grid item component={AppBar} position='static' color='primary'>
                        <Toolbar>
                            <IconButton 
                                color='inherit' 
                                edge='start' 
                                onClick={openSideBar}  
                                className={open&&classes.hide}
                            >
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6" className={classes.toolbarTitle}>
                                چت روم 
                            </Typography>
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