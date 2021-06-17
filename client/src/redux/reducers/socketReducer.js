import {
    SOCKET_CONNECT,
} from '../actions/types';
import SocketIOClient from 'socket.io-client';

const socketReducer = (state = {}, action)=> {
    switch(action.type){
        case SOCKET_CONNECT:
            return SocketIOClient.connect("http://localhost:3010/socket");
        default: return state
    }
}

export default socketReducer;
