import { makeStyles, SwipeableDrawer } from '@material-ui/core';
import React from 'react';
import SideBarMenu from './SideBarMenu';

const useStyle = makeStyles(theme=> ({
    MobileDrawer: {
        width: '80vw',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '450px'
        }
    }
}));

const MobileDrawer = ({open, onClose}) => {
    const classes = useStyle();
    return (
        <SwipeableDrawer
            open={open}
            onClose={onClose}
            anchor="right"
        >
            <div className={classes.MobileDrawer}>
                <SideBarMenu onClose={onClose} />
            </div>
        </SwipeableDrawer>
    );
};

export default MobileDrawer;