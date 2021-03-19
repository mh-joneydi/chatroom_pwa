import { Grid } from '@material-ui/core';
import React from 'react';
import useStyle from './styles';

const ChatMessage = ({message}) => {
    return (
        <Grid item key={message.message} xs={12}>
                <h2>{message.from.name}</h2>
                <p>{message.message}</p>
                <p>{message.sending? 'در حال ارسال' : 'ارسال شده'}</p>
                <p>{message.order? 'ثبت شده در سرور ': 'ثبت نشده'}</p>
        </Grid>
    );
};

export default ChatMessage;