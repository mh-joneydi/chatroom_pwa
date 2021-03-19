import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useState } from 'react';
import useStyle from './styles';


const ChatSendSection = ({submit}) => {
    const classes = useStyle();
    const [messageValue, setMessageValue] = useState('');
    
    const handeSubmit = ()=>{
        submit(messageValue);
        setMessageValue('')
    }
    return (
        <Grid item className={classes.chatSendSection}>
            <TextField value={messageValue} onChange={(e)=> {
                setMessageValue(e.target.value)
            }}/>
            <IconButton onClick={handeSubmit}><Send /> </IconButton>
        </Grid>
    );
};

export default ChatSendSection;