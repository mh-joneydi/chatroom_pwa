import {
    DELETE_ALERT,
    ADD_ALERT,
    DELETE_ALL_ALERT
} from '../actions/types';

export default (state = [] , action) => {
    switch(action.type) {
        case DELETE_ALL_ALERT:
            return [];
        case DELETE_ALERT:
            return (
                state.filter( alert=> (alert.name !== action.payload.name) )
            )
        case ADD_ALERT:
            const {name, text, severity, closable} = action.payload;
            return ([
                ...state.filter( alert=> (alert.name !== name) ),
                {
                    name: name,
                    text: text,
                    severity: severity,
                    closable: (closable===undefined)? true : closable
                }
            ])
        default:
            return state;
    }
}