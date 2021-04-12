import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles( theme => ({
    buble: {
        direction: 'rtl',
        padding: theme.spacing(1,2),
        borderRadius: '12px',
        margin: theme.spacing(0.5),
        width: 'fit-content',
        maxWidth: '70%',
        position: 'relative',
        wordBreak: 'break-word',
        '&::before': {
            content: "''",
            width: '12px',
            height: '12px',
            position: 'absolute'
        }
    },
    rightBuble: {
        borderBottomRightRadius: '7px',
        background: 'red',
        color: 'white',
        boxShadow: '3px 1px 15px 0 rgba(0,0,0,0.5)' ,
        '&::before': {
            transform: 'rotate(60deg)',
            background: 'red',
            right: '-2px',
            bottom: '5px',
        }
    },
    leftBuble: {
        textAlign: 'left',
        background: '#eee',
        color: '#666',
        boxShadow: '-3px 1px 15px 0 rgba(0,0,0,0.5)' ,
        '&::before': {
            transform: 'rotate(-60deg)',
            background: '#eee',
            left: '-2px',
            bottom: '7px',
        }
    }
}))

const ChatMessage = ({message, userId}) => {
    const classes = useStyle()
    console.log(message)
    return (
        <>
            {
                userId === message.from.id ? (
                    <Grid item container direction='row-reverse' xs={12}>
                        <Grid item container className={`${classes.buble} ${classes.rightBuble}`}>
                            {message.message}
                        
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item container xs={12}>
                        <Grid item container className={`${classes.buble} ${classes.leftBuble}`}>
                            {message.message}
                        </Grid>
                    </Grid>
                )
            }
        </>
    );
};

export default ChatMessage;