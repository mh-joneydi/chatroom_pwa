import {
    SOCKET_CONNECT,
    SOCKET_DISCONNECT
} from '../actions/types';
import SocketIOClient from 'socket.io-client';

export default (state = {}, action)=> {
    switch(action.type){
        case SOCKET_CONNECT:
            return SocketIOClient.connect("http://localhost:3010/socket");
        case SOCKET_DISCONNECT:
            return {}
        default: return state
    }
}

