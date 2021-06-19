import { CircularProgress, Fab, Grid, Grow } from '@material-ui/core';
import mainBackground from '../../assets/mainBackground2.jpg'
import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../redux/actions';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/styles';
import { scrollToBottom, scrollWithCondition } from '../../Methods';
import { ExpandMore } from '@material-ui/icons';

const styles = ( theme => ({
    chatMainContainer: {
        flexGrow: 1,
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: '500px',
        position: 'relative',
    },
    chatMain: {
        position: 'absolute',
        top: 0,
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '1rem 4.5vw 1rem 3vw',
    },
    loading: {
        height: '100%',
        '&>div': {
            backgroundColor: theme.palette.primary.light,
            borderRadius: '50%',
            color: '#fff',
            padding: theme.spacing(0.3)
        }
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(1.8),
        right: theme.spacing(1.5),
        color: '#bcd',
    }
}))

class ChatMainSection extends React.PureComponent {
    state = {
        loading : true,
        fabShow: false
    }
    async componentDidMount() {
        await this.props.fetchMessages();
        this.setState({ loading: false });
        scrollWithCondition(true)
    }
    onChatContainerScroll = e=> {
        const El = e.target;
        if(El.scrollTop + El.clientHeight <= El.scrollHeight-200){
            this.setState({ fabShow: true });
            return;
        }
        this.setState({ fabShow: false });
    }
    render() {
        let prevId,
        classes = this.props.classes;
        return (
            <Grid 
                item 
                container
                className={classes.chatMainContainer} 
                component='section'
            >
                <Grid
                    item 
                    container
                    alignContent='flex-start' 
                    className={classes.chatMain} 
                    id='chatMainSection' 
                    component='section'
                    onScroll={this.onChatContainerScroll}
                >

                    { this.state.loading&& 
                        <Grid 
                            item 
                            xs={12} 
                            container 
                            justify='center' 
                            alignItems='center' 
                            className={`${classes.loading}`} 
                            style={!!this.props.messages.length? {height: '70px'} : null}
                        >
                            <CircularProgress size={40} />
                        </Grid> 
                    }{
                        this.props.messages.map( message=> {
                            const messageComponent = (
                                <ChatMessage 
                                    key={message.id} 
                                    userId={this.props.user.id} 
                                    prevId={prevId}  
                                    message={message} 
                                    repliedMessage={this.props.getReplyMessage(message.reply)}
                                />
                            );
                            prevId = message.from.id
                            return (messageComponent)
                        })
                    }
                    <div style={{ float:"left", clear: "both" }} id='endOfMessages'></div>
                </Grid>
                <Grow in={this.state.fabShow}>
                    <Fab 
                        onClick={scrollToBottom} 
                        className={classes.fab} 
                        size='small' 
                        color='primary'
                    >
                        <ExpandMore />
                    </Fab>
                </Grow>
            </Grid>
        )
    }
}

const mapStateToProps = state=> ({
    messages: Object.values(state.messages),
    user: state.user,
    getReplyMessage: (id)=>state.messages[id]
})

export default connect(mapStateToProps, {fetchMessages})(withStyles(styles)(ChatMainSection));