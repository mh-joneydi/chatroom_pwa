import { Avatar, Grid, IconButton, Link, makeStyles, Typography } from '@material-ui/core';
import { fetch_members } from '../../redux/actions'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Group, MoreVert, Search } from '@material-ui/icons';

const useStyle = makeStyles( theme => ({
    chatHeader: {
        textAlign: 'left',
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        padding: '0.5rem 0.3rem'
    },
    avatar: {
        background: theme.palette.primary.light,
        color: '#fff',
        margin: '0 1rem'
    },
    members: {
        width: '100%',
        fontSize: '0.8rem',
        color: '#bcd',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    member: {
        marginRight: theme.spacing(0.6)
    },
    actionButtons: {
        width: 'fit-content',
        padding: '0 1vw',
        color: '#ddd',
    }
}));

const ChatHeader = ({members, fetch_members, currentUserId}) => {
    const classes = useStyle();
    useEffect(()=> {
        fetch_members(currentUserId);
    },[])
    return (
        <Grid item container wrap='nowrap' alignItems='center' className={classes.chatHeader} component='header'>
            <Grid item>
                <Avatar className={classes.avatar}>
                    <Group />
                </Avatar>
            </Grid>
            <Grid item container direction='column' zeroMinWidth>
                <Grid item component='h3'>
                    گروه چتروم
                </Grid>
                <Grid item container wrap='nowrap' className={classes.members}>
                    {members.map( member=> (
                        <Grid item className={classes.member}>{member.name},</Grid>
                    ))}
                    <Grid item>شما</Grid>
                </Grid>
            </Grid>
            <Grid item container spacing={1} wrap='nowrap' className={classes.actionButtons}>
                <Grid item>
                    <IconButton color='inherit'>
                       <Search/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton color='inherit'>
                       <MoreVert/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapMembersToProps = state => ({
    members: Object.values(state.members),
    currentUserId: state.user.id
})

export default connect(mapMembersToProps, { fetch_members } )(ChatHeader);