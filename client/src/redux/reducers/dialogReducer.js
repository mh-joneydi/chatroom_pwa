import {
    CLOSE_DIALOG,
    OPEN_DIALOG,
    DESTROY_DIALOG
} from '../actions/types';

const initialState = {
    isOpen: false,
    title: '',
    content: '',
    noAction: false,
    okText : 'قبول',
    cancelText: 'لغو',
    onOk: null,
    onCancel:null,
    okColor: 'success',
    cancelColor: 'error'
}

const dialogReducer = (state = initialState, {type, payload})=> {
    switch(type) {
        case OPEN_DIALOG:
            return { ...initialState, ...payload.dialog, isOpen: true };
        case CLOSE_DIALOG:
            return { ...state, isOpen: false };
        case DESTROY_DIALOG:
            return initialState;
        default: return state;
    }
}

export default dialogReducer;