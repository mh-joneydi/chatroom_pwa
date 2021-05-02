import {
    FETCH_MEMBERS,
    CLEAR_MEMBERS
} from '../actions/types';

const chatMembersReducer = (state = [], action)=> {
    switch(action.type) {
        case FETCH_MEMBERS:
            return action.payload;
        case CLEAR_MEMBERS:
            return [];
        default: return state;
    }
}

export default chatMembersReducer;