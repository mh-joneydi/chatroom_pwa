import { Avatar, Grid, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import format from 'date-fns/format'
import { Done, DoneAll, Reply, Schedule } from '@material-ui/icons';
import { connect } from 'react-redux';
import { replyMessage } from '../../redux/actions'

const useStyle = makeStyles( theme => ({
    buble: {
        direction: 'rtl',
        borderRadius: '12px',
        margin: theme.spacing(0.75),
        width: 'fit-content',
        maxWidth: '70%',
        position: 'relative',
        boxShadow: theme.shadows[1],
        '& .time': {
            fontSize: '0.6rem',
            padding: theme.spacing(0.75,0,0),
            color: '#bbb',
            textAlign: 'right'
        },
        '&::before': {
            content: "''",
            width: '12px',
            height: '12px',
            position: 'absolute',
            zIndex: 45542515
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
        }
    },
    rightBuble: {
        color: '#fff',
        padding: theme.spacing(1,2,0.3,3.5),
        background: theme.palette.primary.light,
        '& .reply' : {
            color: '#fff',
            left: 0,
            transform: 'translateX(-5%)',
        },
        '&:hover .reply': {
            transform: 'translateX(20%)'
        }

    },
    rightBuble1: {
        borderBottomRightRadius: '7px',
        '&::before': {
            transform: 'rotate(60deg)',
            background: theme.palette.primary.light,
            right: '-2px',
            bottom: '5px',
        },
    },
    rightBuble2: {
        marginTop: 0,
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
        }
    },
    leftBuble1: {
        '&::before': {
            transform: 'rotate(-60deg)',
            background: '#FFF',
            left: '-2px',
            bottom: '7px',
        },
    },
    leftBuble2: {
        marginTop: 0,
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
        paddingBottom: theme.spacing(0.2),
    },
    
}))

const ChatMessage = ({message, userId, prevId, replyMessage, repliedMessage}) => {
    const classes = useStyle();
    return (
        <>
            {
                userId === message.from.id ? (
                    <Grid item container direction='row-reverse' xs={12}>
                        <Grid 
                            item 
                            container 
                            direction='column' 
                            id={message.id}
                            className={`${classes.buble} ${classes.rightBuble} ${prevId === message.from.id ? classes.rightBuble2 : classes.rightBuble1}`} 
                        >
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
                    <Grid item container xs={12} alignItems='flex-end' >
                        <Grid item className={classes.avatarContainer}>
                            {
                                prevId !== message.from.id && <Avatar src={message.from.avatar} alt={message.from.name} className={classes.avatar} />
                            }
                        </Grid>
                        <Grid 
                            item 
                            container 
                            direction='column' 
                            id={message.id}
                            className={`${classes.buble} ${classes.leftBuble} ${prevId === message.from.id ? classes.leftBuble2 : classes.leftBuble1}`}
                        >
                            {
                                prevId !== message.from.id &&
                                <Grid item className={classes.name}>
                                    {message.from.name}
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