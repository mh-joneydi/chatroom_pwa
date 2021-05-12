import { CircularProgress, Grid } from '@material-ui/core';
import back1 from '../../assets/1.jpg'
import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../redux/actions';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/styles';

const styles = ( theme => ({
    chatMain: {
        flexGrow: 1,
        backgroundImage: `url(${back1})`,
        backgroundSize: '650px',
        flexBasis: 1,
        padding: theme.spacing(1.2),
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            backgroundColor: theme.palette.primary.light,
            width: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            backgroundColor: theme.palette.primary.dark
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    loading: {
        height: '100%',
        '&>div': {
            backgroundColor: theme.palette.primary.light,
            borderRadius: '50%',
            color: '#fff',
            padding: theme.spacing(0.3)
        }
    }
}))

class ChatMainSection extends React.PureComponent {
    state = {
        loading : true
    }
    async componentDidMount() {
        this.scrollToBottom();
        await this.props.fetchMessages();
        this.scrollToBottom();
        this.setState({ loading: false });
    }
    scrollToBottom = () => {
        const chatSection = this.props.chatMainSection.current;
        this.messagesEnd.scrollIntoView();
        chatSection.scrollTop = chatSection.scrollHeight
    }
    render() {
        let prevId;
        return (
            <Grid container item alignContent='flex-start' className={this.props.classes.chatMain} ref={this.props.chatMainSection} component='section'>
                {this.state.loading && 
                    <Grid item xs={12} container justify='center' alignItems='center' className={`${this.props.classes.loading}`} style={!!this.props.messages.length? {height: '70px'} : null}>
                        <CircularProgress size={40} />
                    </Grid> 
                }{
                    this.props.messages.map( message=> {
                        const messageComponent = <ChatMessage key={message.id} userId={this.props.user.id} prevId={prevId}  message={message} />;
                        prevId = message.from.id
                        return (messageComponent)
                    })
                }
                <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
            </Grid>
        )
    }
}

const mapStateToProps = state=> ({
    messages: Object.values(state.messages),
    user: state.user
})

export default connect(mapStateToProps, {fetchMessages})(withStyles(styles)(ChatMainSection));