import _ from 'lodash';
import {
    FETCH_MESSAGES,
    ADD_MESSAGE,
    CLEAR_MESSAGES
} from '../actions/types';

export default (state = {}, action)=> {
    switch(action.type) {
        case FETCH_MESSAGES:
            return {..._.mapKeys(action.payload, 'id'), ...state}
        case ADD_MESSAGE:
            return {...state, [action.payload.id]: action.payload}
        case CLEAR_MESSAGES: 
            return {}
        default: return state;
    }
}