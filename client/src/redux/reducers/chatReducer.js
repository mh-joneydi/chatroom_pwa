import _ from 'lodash';
import {
    FETCH_MESSAGES,
    ADD_MESSAGE
} from '../actions/types';

const chatReducer = (state = {}, action)=> {
    switch(action.type) {
        case FETCH_MESSAGES:
            return {..._.mapKeys(action.payload, 'id'), ...state}
        case ADD_MESSAGE:
            return {...state, [action.payload.id]: action.payload}
        default: return state;
    }
}

export default chatReducer;