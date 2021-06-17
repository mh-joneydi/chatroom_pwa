import {
    FETCH_MEMBERS,
} from '../actions/types';

const chatMembersReducer = (state = [], action)=> {
    switch(action.type) {
        case FETCH_MEMBERS:
            return action.payload;
        default: return state;
    }
}

export default chatMembersReducer;