import { Grid, IconButton, makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useState } from 'react';
import { SideBarMenuContent } from '../constants'
import Main from './sideBar/Main';
import Profile from './sideBar/Profile';

const useStyle = makeStyles(theme=> ({
    root: {
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    header: {
        padding: theme.spacing(4,1.5,0),
        height: '100px',
        backgroundColor: theme.palette.primary.main,
        color: '#ddd'
    },
    title: {
        padding: theme.spacing(0,1)
    }
}));

const SideBarMenu = ({onClose}) => {
    const classes = useStyle(),
    [content, setContent] = useState(0),
    renderContnet = type=> {
        switch(type) {
            case SideBarMenuContent.PROFILE:
                return <Profile />;
            default:
                return <Main goToProfile={()=>setContent(SideBarMenuContent.PROFILE)} />
        }
    },
    backToMain = ()=> setContent(SideBarMenuContent.MAIN),
    renderHeaderTitle = type=> {
        switch(type) {
            case SideBarMenuContent.PROFILE:
                return 'پروفایل';
            default:
                return 'تنظیمات'
        }
    },
    BackHandler = type=> {
        switch(type) {
            case SideBarMenuContent.MAIN:
                return onClose;
            default:
                return backToMain
        }
    }
    return (
        <Grid 
            container 
            direction='column' 
            className={classes.root} 
        >
            <Grid 
                item 
                alignItems='center' 
                container 
                wrap='nowrap'
                className={classes.header}
            >
                <Grid
                    item 
                    component={IconButton} 
                    color='inherit' 
                    onClick={BackHandler(content)} 
                >
                    <ArrowBack/>
                </Grid>
                <Grid item component='h3' className={classes.title}>
                    { renderHeaderTitle(content) }
                </Grid>
            </Grid>
            <Grid item>
                { renderContnet(content) }
            </Grid>
        </Grid>
    );
};

export default SideBarMenu;