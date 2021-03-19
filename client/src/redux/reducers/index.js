import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import chatReducer from './chatReducer';
import socketReducer from './socketReducer';



export default combineReducers({
    form: formReducer,
    user: userReducer,
    alerts: alertReducer,
    messages: chatReducer,
    socket: socketReducer,
});
