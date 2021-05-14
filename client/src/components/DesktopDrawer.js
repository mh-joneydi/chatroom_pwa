import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import SideBarMenu from './SideBarMenu';

const useStyle = makeStyles(theme=> ({
    desktopDrawer: {
        transition: 'width 0.3s cubic-bezier(1,0,.73,.74)',
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