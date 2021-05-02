import { makeStyles } from '@material-ui/styles';
import React, { createRef, memo, useEffect } from 'react';
import ChatMainSection from '../components/chatroom/ChatMainSection';
import ChatHeader from '../components/chatroom/ChatHeader';
import ChatSendSection from '../components/chatroom/ChatSendSection';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { addMessage } from '../redux/actions';
import $ from 'jquery';

const useStyle = makeStyles({
    chatroom: {
        flexGrow: 1,
        direction: 'ltr',
    }
})

const Chatroom = ({addMessage, user,socket}) => {
    const classes = useStyle();
    const chatMainSection = createRef();
    socket._callbacks.$connecting[0]()
    useEffect(()=> {
        socket.on("newMessage", (message) => {
            addMessage(message);
            const chatScroll = chatMainSection.current;
            if ( chatScroll.scrollHeight - 100 <= chatScroll.scrollTop + chatScroll.clientHeight ){
                $(chatScroll).animate({
                    scrollTop: chatScroll.scrollHeight
                }, 200);
            }
          })
          return ()=>{
            socket._callbacks.$newMessage = []
          }
    }, [])

    const handleSend = (message)=> {
        if (!message)
        return;
        const date = new Date().getTime(),id = date.toString()+user.id,
        newMessage = {
            id,
            message : message,
            from: {
                id : user.id,
                name: user.userInfo.name,
                avatar: user.userInfo.avatar
            },
            time: date
        }
        addMessage({...newMessage, sending: true});
        const chatScroll = chatMainSection.current;
        if ( chatScroll.scrollHeight - 100 >= chatScroll.scrollTop + chatScroll.clientHeight ){
            $(chatScroll).animate({
                scrollTop: chatScroll.scrollHeight
            }, 200);
        }
        socket.emit("newMessage", newMessage );
    }
    console.log(chatMainSection.current)
    return (
        <Grid container direction='column' className={classes.chatroom} >
            <ChatHeader />
            <ChatMainSection chatMainSection={chatMainSection} />
            <ChatSendSection submit={handleSend}/>
        </Grid>
    );
};

const mapStateToProps = state=> ({
    user: state.user,
    socket: state.socket
})

export default connect(mapStateToProps,{ addMessage })(memo(Chatroom));