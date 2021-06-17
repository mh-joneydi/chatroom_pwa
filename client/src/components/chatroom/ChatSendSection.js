import { Collapse, fade, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Close, Mic, Mood, Send } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import Picker from 'emoji-picker-react';
import { cancelReply } from '../../redux/actions'
import { connect } from 'react-redux';
import { scrollWithCondition } from '../../Methods';


const useStyle =  makeStyles( theme => ({
    chatSendSection: {
        backgroundColor: theme.palette.primary.main,
        padding: '0.6rem',
        '& button, & label ': {
            color: '#bcd',
            margin: '0 0.4rem',
        },
        '& button:disabled': {
            color: theme.palette.common.white
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
        padding: '0.85rem 1.3rem',
        lineHeight: '20px',
        height: 'auto!important',
        transition: theme.transitions.create('background-color', {duration : 500}),
    },
    chatReplyBar: {
        padding: '0.5rem 0.6rem',
        '& button': {
            margin: '0 0.4rem',
        },
    },
    repliedMessage: {
        padding: theme.spacing(1.2,2),
        marginRight: '0.5rem',
        marginLeft: '65px',
        backgroundColor: fade(theme.palette.grey[200], 0.5),
        borderRadius: theme.shape.borderRadius,
        borderLeft: `4px solid ${theme.palette.secondary.main}`,
        fontSize: '0.8rem',
        overflow: 'hidden',
        '& h4': {
            marginBottom: theme.spacing(0.5),
            color: theme.palette.secondary.main
        },
        '& pre': {
            fontFamily: 'inherit',
            maxHeight: '40px',
            width: '100%',
            overflow: 'hidden',
            lineHeight: '20px',
            color: theme.palette.grey[600],
            textOverflow: 'ellipsis',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
        },
    }
}));

const ChatSendSection = ({submit, selfId, replyMessage, cancelReply}) => {
    const classes = useStyle(),
    inputRef = useRef(),
    [messageValue, setMessageValue] = useState(''),
    [emojiOpen, setEmojiOpen] = useState(false),
    handleToggle = () => {
        setEmojiOpen((prevOpen) => !prevOpen);
        focusInput();
    },
    focusInput = ()=>inputRef.current.focus(),
    handleChange = (e)=> {
        setMessageValue(e.target.value)
    },
    onEmojiClick = (e, emojiObject)=> {
        setMessageValue(messageValue+emojiObject.emoji);
        focusInput();
    },
    [replyOpen, setReplyOpen] = useState(false),
    closeReplyBar = ()=> {
        setReplyOpen(false);
        setTimeout(cancelReply, 350);
    },
    
    handeSubmit = ()=>{
        submit(messageValue.trim());
        setMessageValue('');
        setEmojiOpen(false);
        closeReplyBar();
        focusInput();
        scrollWithCondition(true);
    };
    useEffect(()=> {
        setReplyOpen(!!replyMessage);
        focusInput();
    }, [replyMessage]);

    return (
        <footer>
            <Collapse in={emojiOpen}>
                <Picker 
                    onEmojiClick={onEmojiClick} 
                    disableSearchBar 
                    disableSkinTonePicker 
                    native 
                    preload
                    pickerStyle={{ boxShadow: 'none', fontFamily: 'sahel', width: '100%' }} 
                    groupNames={{
                        smileys_people: 'صورتک ها',
                        animals_nature: 'حیوانات و طبیعت',
                        food_drink: 'خوردنی و آشامیدنی',
                        travel_places: 'سفر به مکان ها',
                        activities: 'بازی و سرگرمی',
                        objects: 'اشیاء',
                        symbols: 'نماد ها',
                        flags: 'پرچم ها',
                        recently_used: 'اخیرا استفاده شده',
                    }}
                />
            </Collapse>
            <Collapse in={replyOpen} dir='rtl'>
                { replyMessage&&
                    <Grid container wrap='nowrap' alignItems='center' className={classes.chatReplyBar}>
                        <Grid item>
                            <IconButton onClick={closeReplyBar} size='small'>
                                <Close/>
                            </IconButton>
                        </Grid>
                        <Grid item container direction='column' className={classes.repliedMessage} zeroMinWidth>
                            <Grid item component='h4'>{selfId===replyMessage.from.id?'شما':replyMessage.from.name}</Grid>
                            <Grid item component='pre'>{replyMessage.message}</Grid>
                        </Grid>
                    </Grid>
                }
            </Collapse>
            <Grid item container alignItems='center' wrap='nowrap' className={classes.chatSendSection}>
                { emojiOpen&&
                    <Grid item >
                        <IconButton size='small' onClick={handleToggle}><Close style={{ fontSize: '1.7rem' }}/> </IconButton>
                    </Grid>
                }
                <Grid item >
                    <IconButton size='small' onClick={handleToggle} disabled={emojiOpen}><Mood style={{ fontSize: '1.7rem' }}/> </IconButton>
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
                        inputRef={inputRef}
                        fullWidth
                        rowsMax={5}
                        InputProps={{ classes, disableUnderline: true }}
                        placeholder='Type a message'
                    />
                </Grid>
                <Grid item>
                    {
                        !!messageValue.trim().length ? (
                            <IconButton onClick={handeSubmit} size='small'><Send style={{ fontSize: '1.7rem' }} /> </IconButton>
                        ) : (
                            <IconButton  size='small'><Mic style={{ fontSize: '1.7rem' }} /> </IconButton>
                        )
                    }
                </Grid>
            </Grid>
        </footer>
    );
};

const mapReplyToProps = state=> ({
    replyMessage : state.messages[state.reply],
    selfId: state.user.id
})

export default connect(mapReplyToProps, { cancelReply } )(ChatSendSection);