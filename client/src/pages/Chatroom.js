import { makeStyles } from '@material-ui/styles';
import React, { memo, useEffect } from 'react';
import ChatMainSection from '../components/chatroom/ChatMainSection';
import ChatHeader from '../components/chatroom/ChatHeader';
import ChatSendSection from '../components/chatroom/ChatSendSection';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { addMessage } from '../redux/actions';
import Layout from '../components/layout';
import { scrollWithCondition } from '../Methods';


const useStyle = makeStyles({
    chatroom: {
        flexGrow: 1,
        direction: 'ltr',
    }
})

const Chatroom = ({addMessage, user, socket, reply}) => {
    const classes = useStyle();
    socket._callbacks.$connecting[0]()
    
    useEffect(()=> {
        socket.on("newMessage", (message) => {
            addMessage(message);
            scrollWithCondition();
          })
          return ()=>{
            socket._callbacks.$newMessage = []
          }
    }, [])

    const handleSend = (message)=> {
        if (!message) return;
        const date = new Date().getTime(),id = date.toString()+user.id,
        newMessage = {
            id,
            message : message,
            reply,
            from: {
                id : user.id,
                name: user.userInfo.name,
                avatar: user.userInfo.avatar
            },
            time: date
        }
        addMessage({...newMessage, sending: true});
        socket.emit("newMessage", newMessage );
    }
    return (
        <Layout>
            <Grid container direction='column' className={classes.chatroom} >
                <ChatHeader />
                <ChatMainSection />
                <ChatSendSection submit={handleSend}/>
            </Grid>
        </Layout>
    );
};

const mapStateToProps = state=> ({
    user: state.user,
    socket: state.socket,
    reply: state.reply
})

export default connect(mapStateToProps,{ addMessage })(memo(Chatroom));