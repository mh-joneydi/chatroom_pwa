import { CircularProgress, Grid } from '@material-ui/core';
import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../redux/actions';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/styles';

const styles = ( theme => ({
    chatMain: {
        flexGrow: 1,
        flexBasis: 1,
        padding: theme.spacing(1.2),
        overflowY: 'scroll',
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
    },
    hideScrollBar: {
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    }
}))

class ChatMainSection extends React.PureComponent {
    state = {
        loading : !!(this.props.messages)
    }
    async componentDidMount() {
        const chatScroll = this.props.chatMainSection.current;
        await this.props.fetchMessages();
        chatScroll.scrollTop = chatScroll.scrollHeight;
        this.setState({ loading: false });
    }
    componentDidUpdate() {
        const chatScroll = this.props.chatMainSection.current;
        
        if ( (chatScroll.scrollTop + chatScroll.clientHeight <= chatScroll.scrollHeight) && (chatScroll.scrollHeight - 200 <= chatScroll.scrollTop + chatScroll.clientHeight) ){
            $(chatScroll).animate({
                scrollTop: chatScroll.scrollHeight
            }, 500) 
        }
    }
    render() {
        return (
            <Grid container item alignContent='flex-start' className={`${this.props.classes.chatMain} ${this.state.loading && this.props.classes.hideScrollBar}`} ref={this.props.chatMainSection}>
                {this.state.loading &&
                    <Grid xs={12} container justify='center' alignItems='center' className={this.props.classes.loading}>
                        <CircularProgress size={40} />
                    </Grid> 
                }
                { 
                    this.props.messages.map( message=> (<ChatMessage key={message.id} userId={this.props.user.id}  message={message} />))
                }
            </Grid>
        )
    }
}

const mapStateToProps = state=> ({
    messages: Object.values(state.messages),
    user: state.user
})

export default connect(mapStateToProps, {fetchMessages})(withStyles(styles)(ChatMainSection));