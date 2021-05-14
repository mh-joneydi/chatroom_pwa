import { Avatar, Grid, makeStyles } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';

const useStyle = makeStyles( theme=> ({
    avatarContainer: {
        margin: theme.spacing(3,0),
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
            '& #overlay': {
                opacity: 1
            }
        }
    },
    avatar: {
        width: '180px',
        height: '180px',
        backgroundColor: theme.palette.secondary.main,
        color: 'rgba(255,255,255,0.9)',
        fontSize: theme.typography.h1.fontSize,
    },
    overlay: {
        position: 'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        zIndex:'2',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'rgba(100,100,100,0.75)',
        backdropFilter: 'blur(2px)',
        color: '#eee',
        width: 'auto',
        margin: 0,
        transition: 'opacity 0.3s ease',
        opacity: 0
    }
}));

const Profile = ({user:{userInfo,id}}) => {
    const classes = useStyle();
    return (
        <Grid container direction='column'>
            <Grid item container justify='center'>
                <Grid item className={classes.avatarContainer}>
                    <Avatar src={userInfo.avatar} alt={userInfo.name} className={classes.avatar} />
                    <Grid container direction='column' spacing={1} id='overlay' className={classes.overlay} zeroMinWidth>
                        <Grid item>
                            <PhotoCamera />
                        </Grid>
                        <Grid item>
                            تغییر عکس پروفایل
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapUserInfoToProps = state=> ({
    user: state.user
})

export default connect( mapUserInfoToProps, null)(Profile);