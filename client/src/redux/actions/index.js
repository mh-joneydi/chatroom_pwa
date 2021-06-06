import {
    LOG_IN,
    LOG_OUT,
    DELETE_ALERT,
    ADD_ALERT,
    DELETE_ALL_ALERT,
    FETCH_MESSAGES,
    ADD_MESSAGE,
    CLEAR_MESSAGES,
    SOCKET_CONNECT,
    SOCKET_DISCONNECT,
    FETCH_MEMBERS,
    CLEAR_MEMBERS,
    UPDATE_PROFILE,
    OPEN_DIALOG,
    CLOSE_DIALOG,
    DESTROY_DIALOG,
    REPLY_MESSAGE,
    CANCEL_REPLY_MESSAGE
} from './types';
import {
    users,
    messages
} from '../../apis';
import history from '../../history';
import { setCookie , deleteCookie } from '../../Cookies';

/*********** SOCKET ACTION ***********/

    export const socketConnect = ()=> ({
        type: SOCKET_CONNECT,
    })

    export const socketDisonnect = ()=> ({
        type: SOCKET_DISCONNECT,
    })

/*********** SOCKET ACTION ***********/

/**********ALERT ACTIONS **********/
export const deleteAlert = name => ({
    type: DELETE_ALERT,
    payload: {
        name
    } 
});

export const addAlert = ({...props}) => ({
    type: ADD_ALERT,
    payload: props
})

export const deleteAllAterts = ()=> ({
    type: DELETE_ALL_ALERT,
})

/**********ALERT ACTION **********/


/******* USER ACTIONS***********/
export const logIn = userInfo=> dispach=> {
    dispach({
        type: LOG_IN,
        payload: userInfo
    });
    dispach(socketConnect());
}
export const logOut = ()=> dispach=> {
    dispach({
        type: LOG_OUT,
    });
    dispach(socketDisonnect());
    dispach(clearMessages());
    dispach(clearMembers());
}
export const setLogIn = (loginFormValues) => async dispach => {
    const data = await users.get(`/users/?username=${loginFormValues.username}&password=${loginFormValues.password}`).then( res=> res.data)
    .catch( err=> {
        dispach(addAlert({name: 'serverError', text: 'خطا در برقراری ارتباط با سرور', severity: 'error', closable: false}))
    })
    
    if(data){
            if(data.length){
                const userInfo = data.pop();
                
                const c_expires = loginFormValues.remember ? 10 : 0.18;
                const c_value = JSON.stringify(userInfo);
                setCookie('user',c_value,c_expires);
                
                dispach(logIn(userInfo));
                
                history.push('/');
                dispach(addAlert({ name: 'login', text: (
                                        <>
                                            <strong>{userInfo.name}</strong> عزیز، خوش آمدید.
                                        </>
                                    )
                                }   
                    ));
                    
            }else {
                dispach(addAlert({name: 'userInvalid',text: 'نام کاربری یا رمز عبور اشتباه است',severity: 'error', closable: false}));
                
            }
        }
    }
    export const setLogOut = () => dispach => {
        deleteCookie('user');
        dispach(logOut());
        history.push('/login');
        dispach(addAlert({name: 'logout', text: `شما با موفقیت خارج شدید.`}));
    } 
    
    export const signupUser = signupFormValues => async dispach => {
        const { repeatPassword, ...neadedValues } = signupFormValues;
        await users.post('/users',{...neadedValues, avatar:'/', bio:'Hey there! I am usung Chatroom'})
        .then( res=> {
            history.push('/login');
            dispach(addAlert({name: 'signup', text: `ثبت نام با موفقیت انجام شد، وارد شوید`}));
        })
        .catch( err=> {
            dispach(addAlert({name: 'serverError', text: 'خطا در برقراری ارتباط با سرور', severity: 'error', closable: false}))
        })
    }

    export const updateProfile = (id, userInfo)=> async dispach=> {
        await users.put(`users/${id}`,userInfo)
        .then( res=> {
            setCookie('user',JSON.stringify(res.data));
            dispach({
                type: UPDATE_PROFILE,
                payload: res.data
            })
        })
        .catch( err=> {
            dispach(addAlert({name: 'serverError', text: 'خطا در برقراری ارتباط با سرور', severity: 'error', closable: true}))
        })
    }
    
    /******* USER ACTIONS***********/

    
    /********** CHATROOM ACTIONS ***********/
    export const fetchMessages = ()=> async(dispach)=> {
        const data = await messages.get()
        .then(res=> {
            dispach({
                type: FETCH_MESSAGES,
                payload: res.data
            });
        })
        .catch(err=> {
            dispach(addAlert({name: 'serverError', text: 'خطا در برقراری ارتباط با سرور', severity: 'error'}))
        })
    }
    export const addMessage = (message)=> ({
        type: ADD_MESSAGE,
        payload: message
    });
    export const clearMessages = ()=> ({
        type: CLEAR_MESSAGES
    })

    export const fetch_members = (currentUserId)=> async(dispach)=> {
        users.get("/users")
        .then( res => {
            dispach({
                type: FETCH_MEMBERS,
                payload: Object.fromEntries([...res.data.filter( user => user.id !== currentUserId )
                    .map( member => {
                    delete member.password;
                    return [member.id,member]
                })])
            })
        })
        .catch( err=> {
            dispach(addAlert({name: 'serverError', text: 'خطا در برقراری ارتباط با سرور', severity: 'error'}))
        })
        
    }
    export const clearMembers = ()=> ({
        type: CLEAR_MEMBERS
    })
    /********** CHATROOM ACTIONS ***********/


    /********** DIALOG ACTIONS ***********/

    export const openDialog = dialog => {
        console.log(dialog)
    return {type: OPEN_DIALOG,
        payload: {
            dialog
        } }
    };
    
    export const closeDialog = ()=> dispatch=> {
        dispatch({type: CLOSE_DIALOG});
        setTimeout(() => {
            dispatch({type: DESTROY_DIALOG});
        }, 500);
        
    }
      

    /********** DIALOG ACTIONS ***********/


    /********** REPLY MESSAGE ACTIONS ***********/

    export const replyMessage = (id)=> ({
        type: REPLY_MESSAGE,
        payload: id
    });
    
    export const cancelReply = ()=> ({ type: CANCEL_REPLY_MESSAGE });
      

    /********** REPLY MESSAGE ACTIONS ***********/