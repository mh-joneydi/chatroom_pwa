import { Grid, Typography } from '@material-ui/core';
import useStyle from './styles';
import React from 'react';

const ChatHeader = () => {
    const classes = useStyle();
    return (
        <Grid item className={classes.chatHeader}>
            <Typography>هدر چت روم</Typography>
        </Grid>
    );
};

export default ChatHeader;