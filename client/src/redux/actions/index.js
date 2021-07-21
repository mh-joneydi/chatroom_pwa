import {
    LOG_IN,
    LOG_OUT,
    DELETE_ALERT,
    ADD_ALERT,
    DELETE_ALL_ALERT,
    FETCH_MESSAGES,
    ADD_MESSAGE,
    SOCKET_CONNECT,
    FETCH_MEMBERS,
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
import { notificationStatus } from '../../Methods';

/*********** SOCKET ACTION ***********/

    export const socketConnect = ()=> ({
        type: SOCKET_CONNECT,
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
export const logOut = ()=> ({
    type: LOG_OUT,
});
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
                dispach(addAlert({ 
                    name: 'login', 
                    text: (<> <strong>{userInfo.name}</strong> عزیز، خوش آمدید.</>)
                }));

                if( "serviceWorker" in navigator && "PushManager" in window) {

                    const getPushSubscription = async()=> {
                        const SWR = await navigator.serviceWorker.ready;
                        const currentPushSubscription = await SWR.pushManager.getSubscription();
                        if(currentPushSubscription) {
                            return currentPushSubscription;
                        }
                        const publicKey = "BIbOczyYWtYUu8-onktE2CIrEFqJbj1GrTLkLNCsZlj6px556_9Xxv05ssusox2lmUPpXIgRAmQDnNEnJQi-nsg";
                        const options = {
                            userVisibleOnly: true,
                            applicationServerKey: publicKey
                        }
                        return await SWR.pushManager.subscribe(options)
                    }   
                    const currentNotificationPermissionState = await notificationStatus();
                    if(currentNotificationPermissionState === "prompt") {

                        const requestPermission = async()=> {
                            const result = Notification.requestPermission();
                            if(result === "granted") {
                                // send push-subscription to server
                                console.log(await getPushSubscription());
                            }
                        }

                        setTimeout(function(){
                            dispach(openDialog({
                                title: "آیا مایل به فعال سازی اعلانات هستید؟",
                                content: 'برای فعال کردن نوتیفیکیشن، روی فعال سازی کلیک کنید و در مرحله بعد روی دکمه Allow کلیک کنید.',
                                onOk: requestPermission,
                                okText: "فعال سازی",
                                okColor: 'primary',
                                cancelText: "بعدا",
                                cancelColor: 'secondaryAction'
                            }))
                        }, 3000)
                    } else if(currentNotificationPermissionState === "granted") {
                        // send push-subscription to server
                        console.log(await getPushSubscription());
                    }
                }

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
    /********** CHATROOM ACTIONS ***********/


    /********** DIALOG ACTIONS ***********/

    export const openDialog = dialog => {
        return ({
            type: OPEN_DIALOG,
            payload: {dialog} 
        })
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