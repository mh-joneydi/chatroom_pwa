import {
    REPLY_MESSAGE,
    CANCEL_REPLY_MESSAGE,
} from '../actions/types';


const chatReplyReducer = (state = null, {type, payload})=> {
    switch(type) {
        case REPLY_MESSAGE:
            return payload;
        case CANCEL_REPLY_MESSAGE:
            return null;
        default: return state;
    }
}

export default chatReplyReducer;