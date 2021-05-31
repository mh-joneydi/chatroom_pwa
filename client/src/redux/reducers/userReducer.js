import {
    LOG_IN,
    LOG_OUT,
    UPDATE_PROFILE
} from '../actions/types';

const initialState = {
    isLogIn: false,
    id: null,
    userInfo: null
}

export default (state = initialState , action) => {
    switch(action.type) {
        case LOG_IN:
        case UPDATE_PROFILE:
            const {id, ...userInfo} = action.payload;
            return {...state, isLogIn: true, id, userInfo };
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}