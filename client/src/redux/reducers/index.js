import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import chatReducer from './chatReducer';
import socketReducer from './socketReducer';
import chatMembersReducer from './chatMembersReducer';
import dialogReducer from './dialogReducer';
import chatReplyReducer from './chatReplyReducer';
import { LOG_OUT } from '../actions/types'



const appReducer = combineReducers ({
    form: formReducer,
    user: userReducer,
    alerts: alertReducer,
    messages: chatReducer,
    socket: socketReducer,
    members: chatMembersReducer,
    dialog: dialogReducer,
    reply: chatReplyReducer
});

const rootReducer = (state, action) => {   
    if(action.type === LOG_OUT) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

export default rootReducer;