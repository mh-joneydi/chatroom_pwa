import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import SideBarMenu from './SideBarMenu';

const useStyle = makeStyles(theme=> ({
    desktopDrawer: {
        transition: 'width 0.35s cubic-bezier(0.85,.3,.0,.85)',
        maxHeight: '100vh',
        [theme.breakpoints.up(1300)]: {
            maxHeight: 'calc(100vh - 3rem)',
        },
        width: 0,
        '&.open': {
            width: '500px',
            borderRight: '1px solid #bcd',
        }
    }
}));

const DesktopDrawer = ({open, onClose}) => {
    const classes = useStyle();
    return (
        <Grid item className={`${classes.desktopDrawer} ${open?'open':''}`}>
            <SideBarMenu onClose={onClose} />
        </Grid>
    );
};

export default DesktopDrawer;