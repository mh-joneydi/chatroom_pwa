import { Avatar, fade, Grid, IconButton, makeStyles, lighten } from '@material-ui/core';
import React from 'react';
import format from 'date-fns/format'
import { Done, DoneAll, Reply, Schedule } from '@material-ui/icons';
import { connect } from 'react-redux';
import { replyMessage } from '../../redux/actions'
import $ from 'jquery';

const useStyle = makeStyles( theme => ({
    message: {
        '& .buble': {
            direction: 'rtl',
            borderRadius: '10px',
            margin: theme.spacing(0.75),
            width: 'fit-content',
            maxWidth: '70%',
            position: 'relative',
            boxShadow: theme.shadows[1],
            transition: theme.transitions.create(['background-color','color'],600),
            '& .time': {
                fontSize: '0.6rem',
                padding: theme.spacing(0.75,0,0),
                color: '#bbb',
                textAlign: 'right'
            },
            '&::before': {
                width: '12px',
                height: '12px',
                position: 'absolute',
                transition: theme.transitions.create('background-color',600),
            },
            '& pre': {
                fontFamily: 'Sahel',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
            },
            '& .reply' : {
                position: 'absolute',
                opacity: 0,
                top: 2,
                transition: 'all 0.25s cubic-bezier(0.85,.3,.0,.85)',
            },
            '&:hover .reply': {
                opacity: 1,
            },
            '& .repliedMessage': {
                cursor: 'pointer',
                padding: theme.spacing(1),
                borderRadius: '5px',
                minWidth: 0,
                width: 'auto',
                fontSize: '0.8rem',
                '& h4': {
                    marginBottom: theme.spacing(0.5),
                },
                '& pre': {
                    fontFamily: 'inherit',
                    maxHeight: '60px',
                    overflow: 'hidden',
                    lineHeight: '20px',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                }
            },
        },
        '&.selected .buble': {
            backgroundColor: theme.palette.primary.light,
            color: '#fff',
            '&:before': {
                backgroundColor: theme.palette.primary.light,
            }
        }
    },

    rightBuble: {
        color: '#fff',
        padding: theme.spacing(1,2,0.3,3.5),
        background: lighten(theme.palette.primary.light, 0.2),
        '& .reply' : {
            color: '#fff',
            left: 0,
            transform: 'translateX(-5%)',
        },
        '&:hover .reply': {
            transform: 'translateX(20%)'
        },
        '& .repliedMessage': {
            borderRight: `4px solid ${theme.palette.primary.dark}`,
            backgroundColor: fade(theme.palette.grey[200],0.3),
            margin: theme.spacing(-0.3,-1.4,1,-2.7),
            '& h4': {
                color: theme.palette.primary.dark
            },
            '& pre': {
                color: theme.palette.grey[200],
            }
        }

    },
    rightBuble1: {
        borderBottomRightRadius: '7px',
        '&::before': {
            content: "''",
            transform: 'rotate(60deg)',
            background: lighten(theme.palette.primary.light, 0.2),
            right: '-2px',
            bottom: '5px',
        },
    },
    rightBuble2: {
        marginTop: '0!important',
    },
    leftBuble: {
        padding: theme.spacing(0.75,3.5,0.75,1.5),
        textAlign: 'left',
        background: '#FFF',
        color: '#666',
        '& .time': {
            marginRight: '-1rem'
        },
        '& .reply' : {
            color: '#666',
            right: 0,
            transform: 'translateX(5%)',
        },
        '&:hover .reply': {
            transform: 'translateX(-20%)'
        },
        '& .repliedMessage': {
            borderLeft: `4px solid ${theme.palette.secondary.main}`,
            backgroundColor: fade(theme.palette.grey[200], 0.5),
            margin: theme.spacing(0,-2.7,1,-0.85),
            '& h4': {
                color: theme.palette.secondary.main
            },
            '& pre': {
                color: theme.palette.grey[600],
            }
        }
    },
    leftBuble1: {
        '&::before': {
            content: "''",
            transform: 'rotate(-60deg)',
            background: '#FFF',
            left: '-2px',
            bottom: '7px',
        },
    },
    leftBuble2: {
        marginTop: '0!important',
    },
    avatarContainer: {
        width: '55px',
    },
    avatar: {
        margin: '0.1rem',
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.secondary.main,
        fontSize: '0.9rem',
        color: '#fff',
    },
    sendStatus: {
        paddingLeft: theme.spacing(0.75),
        color: '#ddd',
        '& svg': {
            fontSize: '16px',
        }
    },
    name: {
        color: theme.palette.secondary.main,
        fontSize: '0.75rem',
        paddingBottom: theme.spacing(0.5),
    },
    
}))

const ChatMessage = ({message, userId, prevId, replyMessage, repliedMessage}) => {
    const classes = useStyle(),
    scrollToViewRepliedMessage = (id)=>{
        const el = document.getElementById(id);
        $('#chatMainSection').animate({
            scrollTop: el.offsetTop-300
        }, 300, ()=> {
            el.classList.add('selected');
            setTimeout( ()=>{
                el.classList.remove('selected');
            }, 600 )
        });
    }
    return (
        <>
            {
                userId === message.from.id ? (
                    <Grid item container direction='row-reverse' xs={12} id={message.id} className={classes.message} onDoubleClick={(e)=>{
                        e.preventDefault()
                        replyMessage(message.id)}}>
                        <Grid 
                            item 
                            container 
                            direction='column' 
                            className={`buble ${classes.rightBuble} ${prevId === message.from.id ? classes.rightBuble2 : classes.rightBuble1}`} 
                        >
                            { repliedMessage&&
                                <Grid 
                                    item 
                                    container 
                                    direction='column' 
                                    className='repliedMessage' 
                                    onClick={()=>scrollToViewRepliedMessage(repliedMessage.id)}
                                >
                                    <Grid item component='h4'>{userId===repliedMessage.from.id?'شما':repliedMessage.from.name}</Grid>
                                    <Grid item component='pre'>{repliedMessage.message}</Grid>
                                </Grid>
                            }
                            <Grid item component='pre'>
                                {message.message}
                            </Grid>
                            <Grid item container alignItems='center' className='time'>
                                <Grid item className={classes.sendStatus}>
                                    {
                                        message.sending? (
                                            <Schedule style={{ fontSize: 12 }} />
                                        ) : (
                                            message.order? (
                                                <DoneAll />
                                            ) : (
                                                <Done />
                                            )
                                        )
                                     }
                                </Grid>
                                <Grid item >
                                    {format(message.time, 'HH:mm')}
                                </Grid>
                            </Grid>
                            <IconButton 
                                size='small' 
                                className='reply' 
                                onClick={()=>replyMessage(message.id)}
                            >
                                <Reply style={{ fontSize: 16 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item container xs={12} alignItems='flex-end' id={message.id} className={classes.message} onDoubleClick={()=>replyMessage(message.id)}>
                        <Grid item className={classes.avatarContainer}>
                            {
                                prevId !== message.from.id && <Avatar src={message.from.avatar} alt={message.from.name} className={classes.avatar} />
                            }
                        </Grid>
                        <Grid 
                            item 
                            container 
                            direction='column' 
                            className={`buble ${classes.leftBuble} ${prevId === message.from.id ? classes.leftBuble2 : classes.leftBuble1}`}
                        >
                            {
                                prevId !== message.from.id &&
                                <Grid item className={classes.name}>
                                    {message.from.name}
                                </Grid>
                            }
                            { repliedMessage&&
                                <Grid 
                                    item 
                                    container 
                                    direction='column' 
                                    className='repliedMessage'
                                    onClick={()=>scrollToViewRepliedMessage(repliedMessage.id)}
                                >
                                    <Grid item component='h4'>{userId===repliedMessage.from.id?'شما':repliedMessage.from.name}</Grid>
                                    <Grid item component='pre'>{repliedMessage.message}</Grid>
                                </Grid>
                            }
                            <Grid item component='pre'>
                                {message.message}
                            </Grid>
                            <Grid item className='time'>
                                {format(message.time, 'HH:mm')}
                            </Grid>
                            <IconButton 
                                size='small' 
                                className='reply' 
                                onClick={()=>replyMessage(message.id)}
                            >
                                <Reply style={{ fontSize: 16 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                )
            }
        </>
    );
};

export default connect( null, { replyMessage } )(ChatMessage);