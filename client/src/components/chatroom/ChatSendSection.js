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
        color: '#fff',
        overflow: 'hidden',
        fontSize: '0.9rem',
        borderRadius: '50px',
        backgroundColor: fade(theme.palette.primary.light, 0.7),
        padding: '0.8rem 1.2rem',
        height: 'auto!important',
        transition: theme.transitions.create('background-color', {duration : 500}),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.light, 0.8),
        },
        '&$focused': {
            backgroundColor: fade(theme.palette.primary.light, 0.8),
        },
    },
    focused: {}
}));

const ChatSendSection = ({submit}) => {
    const classes = useStyle(),
    [messageValue, setMessageValue] = useState(''),
    handeSubmit = ()=>{
        submit(messageValue);
        setMessageValue('')
    },
    handleChange = (e)=> {
        setMessageValue(e.target.value)
    }

    return (
        <Grid item container alignItems='center' className={classes.chatSendSection}>
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