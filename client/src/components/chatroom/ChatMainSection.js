import { CircularProgress, fade, Grid } from '@material-ui/core';
import mainBackground from '../../assets/mainBackground2.jpg'
import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../redux/actions';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/styles';

const styles = ( theme => ({
    chatMain: {
        flexGrow: 1,
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: '500px',
        flexBasis: 1,
        padding: theme.spacing(1.2,2.5),
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: fade(theme.palette.grey[600], 0.5 )
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: fade(theme.palette.grey[700], 0.5 )
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