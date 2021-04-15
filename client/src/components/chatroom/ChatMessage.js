import { Avatar, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import format from 'date-fns/format'
import { Done, DoneAll, Schedule } from '@material-ui/icons';

const useStyle = makeStyles( theme => ({
    buble: {
        direction: 'rtl',
        borderRadius: '12px',
        margin: theme.spacing(0.75),
        width: 'fit-content',
        maxWidth: '70%',
        position: 'relative',
        wordBreak: 'break-word',
        boxShadow: theme.shadows[1],
        '&::before': {
            content: "''",
            width: '12px',
            height: '12px',
            position: 'absolute'
        }
    },
    rightBuble: {
        padding: theme.spacing(1,2,0.3),
        borderBottomRightRadius: '7px',
        background: theme.palette.primary.light,
        color: 'white',
        '&::before': {
            transform: 'rotate(60deg)',
            background: theme.palette.primary.light,
            right: '-2px',
            bottom: '5px',
        },
    },
    leftBuble: {
        padding: theme.spacing(0.75,1.5),
        textAlign: 'left',
        background: '#FFF',
        color: '#666',
        '&::before': {
            transform: 'rotate(-60deg)',
            background: '#FFF',
            left: '-2px',
            bottom: '7px',
        }
    },
    avatar: {
        margin: '0.5rem',
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.secondary.main,
        fontSize: '0.9rem',
        color: '#fff'
    },
    time: {
        fontSize: '0.6rem',
        padding: theme.spacing(0.75,0,0),
        color: '#bbb',
        textAlign: 'right'
    },
    sendStatus: {
        paddingLeft: theme.spacing(0.75),
        color: '#ddd'
    },
    name: {
        color: theme.palette.secondary.main,
        fontSize: '0.75rem',
        paddingBottom: theme.spacing(0.2),
    }
}))

const ChatMessage = ({message, userId}) => {
    const classes = useStyle();
    console.log(message)
    return (
        <>
            {
                userId === message.from.id ? (
                    <Grid item container direction='row-reverse' xs={12}>
                        <Grid item container direction='column' className={`${classes.buble} ${classes.rightBuble}`}>
                            <Grid item>
                                {message.message}
                            </Grid>
                            <Grid item container alignItems='center' className={classes.time}>
                                <Grid item className={classes.sendStatus}>
                                    {
                                        message.sending? (
                                            <Schedule style={{ fontSize: 16 }} />
                                        ) : (
                                            message.order? (
                                                <DoneAll style={{ fontSize: 18 }} />
                                            ) : (
                                                <Done style={{ fontSize: 18 }} />
                                            )
                                        )
                                     }
                                </Grid>
                                <Grid item >
                                    {format(message.time, 'HH:mm')}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item container xs={12} alignItems='flex-end'>
                        <Grid item>
                            <Avatar src={message.from.avatar} alt={message.from.name} className={classes.avatar} />
                        </Grid>
                        <Grid item container direction='column' className={`${classes.buble} ${classes.leftBuble}`}>
                            <Grid item className={classes.name}>
                                {message.from.name}
                            </Grid>
                            <Grid item>
                                {message.message}
                            </Grid>
                            <Grid item className={classes.time}  >
                                {format(message.time, 'HH:mm')}
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </>
    );
};

export default ChatMessage;