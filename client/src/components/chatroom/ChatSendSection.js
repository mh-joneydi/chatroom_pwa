import { fade, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Mic, Mood, Send } from '@material-ui/icons';
import React, { useState } from 'react';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';


const useStyle =  makeStyles( theme => ({
    chatSendSection: {
        backgroundColor: theme.palette.primary.main,
        padding: '0.75rem',
        '& button, & label ': {
            color: '#bcd',
            margin: '0 0.4rem',
        }
    },
    inputContainer: {
        margin: '0 0.5rem',
        flexGrow: 1
    },
    
    root: {
        overflow: 'hidden',
        fontSize: '0.9rem',
        borderRadius: '50px',
        backgroundColor: '#fff',
        padding: '0.9rem 1.3rem 0.75rem',
        lineHeight: '20px',
        height: 'auto!important',
        transition: theme.transitions.create('background-color', {duration : 500}),
    },
    focused: {}
}));

const ChatSendSection = ({submit}) => {
    const classes = useStyle(),
    [messageValue, setMessageValue] = useState(''),
    handeSubmit = ()=>{
        submit(messageValue.trim());
        setMessageValue('')
    },
    handleChange = (e)=> {
        setMessageValue(e.target.value)
    }

    return (
        <Grid item container alignItems='center' wrap='nowrap' className={classes.chatSendSection} component='footer'>
            <Grid item >
                <IconButton  size='small'><Mood style={{ fontSize: '1.7rem' }}/> </IconButton>
            </Grid>
            <Grid item>
                <IconButton component='label' size='small'>
                    <AttachFileOutlinedIcon style={{ transform: 'rotate(45deg)', fontSize: '1.7rem' }} /> 
                    <input type='file' style={{ display: 'none' }} />
                </IconButton>
            </Grid>
            <Grid item className={classes.inputContainer}>
                <TextField 
                    value={messageValue} 
                    onChange={handleChange}
                    multiline
                    fullWidth
                    rowsMax={5}
                    InputProps={{ classes, disableUnderline: true }}
                    placeholder='Type a message'
                />
            </Grid>
            <Grid item>
                {
                    !!messageValue.length ? (
                        <IconButton onClick={handeSubmit} size='small'><Send style={{ fontSize: '1.7rem' }} /> </IconButton>
                    ) : (
                        <IconButton  size='small'><Mic style={{ fontSize: '1.7rem' }} /> </IconButton>
                    )
                }
            </Grid>
        </Grid>
    );
};

export default ChatSendSection;