import { Avatar, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { Check, Edit, EditOutlined, Mood, PhotoCamera } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { logIn } from '../../redux/actions';
import { connect } from 'react-redux';
import { users } from '../../apis';
import { getCookie, setCookie } from '../../Cookies';

const useStyle = makeStyles( theme=> ({
    main: {
        height: '100%',
        backgroundColor: theme.palette.grey[200],
    },
    avatarContainer: {
        margin: theme.spacing(4,0),
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
            '& #overlay': {
                opacity: 1
            }
        }
    },
    avatar: {
        width: '180px',
        height: '180px',
        backgroundColor: theme.palette.secondary.main,
        color: 'rgba(255,255,255,0.85)',
        fontSize: theme.typography.h1.fontSize,
    },
    overlay: {
        position: 'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        zIndex:'2',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'rgba(100,100,100,0.75)',
        backdropFilter: 'blur(2px)',
        color: '#eee',
        width: 'auto',
        margin: 0,
        transition: 'opacity 0.3s ease',
        opacity: 0
    },
    fieldsContainer: {
        backgroundColor: '#fff',
        padding: '0.9rem 1.2rem',
        '& p': {
            textAlign: 'right',
            marginBottom: '0.9rem',
            color: theme.palette.primary.dark
        },
        '& .MuiInput-underline:before': {
            display: 'none'
        },
        '& .MuiInput-underline:after': {
            bottom: '-3px'
        },
        '& input:disabled': {
            color: theme.palette.grey[700]
        },
        '& svg': {
            color: theme.palette.grey[500],
            fontSize: '21px'
        }
    },
    helperText: {
        color: theme.palette.grey[500],
        fontSize: '0.85rem',
        padding: '1.5rem',
        textAlign: 'justify'
    },
    validLength: {
        color: theme.palette.grey[400],
        fontSize: '0.85rem',
        paddingRight: '0.25rem',
        verticalAlight: 'middle'
    }
}));

const Profile = ({user:{userInfo,id},...props}) => {
    const classes = useStyle(),
    [userInfoFields, setUserInfoFields] = useState({...userInfo}),
    nameRef = useRef(),
    bioRef = useRef(),
    [nameEditable, setNameEditable] = useState(false),
    [bioEditable, setBioEditable] = useState(false),
    changeHandler = ({target: {name, value}})=> {
        if(name=="name"&&value.length>25){
            return;
        }
        setUserInfoFields({
            ...userInfoFields,
            [name]: value
        })
    },
    submitChanges = ()=> {
        users.put(`users/${id}`,userInfoFields)
        setCookie('user',JSON.stringify({...userInfoFields, id, password: userInfoFields.password }));
        props.logIn(JSON.parse(getCookie('user')));
    }
    return (
        <Grid container direction='column' className={classes.main}>
            <Grid item container justify='center'>
                <Grid item className={classes.avatarContainer}>
                    <Avatar src={userInfoFields.avatar} alt={userInfoFields.name} className={classes.avatar} />
                    <Grid container direction='column' spacing={1} id='overlay' className={classes.overlay} zeroMinWidth>
                        <Grid item>
                            <PhotoCamera />
                        </Grid>
                        <Grid item>
                            تغییر عکس پروفایل
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container direction='column'>
                <Grid item className={classes.fieldsContainer}>
                    <Typography>نام شما</Typography>
                    <TextField 
                        variant='standard'
                        name="name"
                        fullWidth
                        autoComplete="off"
                        inputRef={nameRef}
                        value={userInfoFields.name}
                        error={!userInfoFields.name.length}
                        onChange={changeHandler}
                        focused={nameEditable}
                        InputProps={{
                            readOnly: !nameEditable,
                            endAdornment: ( 
                            <InputAdornment position="end"> 
                                {
                                    nameEditable? (
                                        <>
                                            <div className={classes.validLength}>{25-userInfoFields.name.length}</div>
                                            <IconButton size='small'>
                                                <Mood fontSize='small' />  
                                            </IconButton> 
                                            <IconButton 
                                                size='small'
                                                disabled={!userInfoFields.name.length}
                                                onClick={()=>{
                                                    setNameEditable(false);
                                                    submitChanges();
                                                }}
                                            >
                                                <Check fontSize='small' />  
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton 
                                            size='small'
                                            onClick={()=>{
                                                setNameEditable(true);
                                                nameRef.current.focus()
                                            }}
                                        >
                                            <Edit fontSize='small' />  
                                        </IconButton> 
                                    )
                                }
                            </InputAdornment>
                            ),
                        }}
                     />
                </Grid>
                <Grid item className={classes.helperText} component={Typography} dir='rtl'>
                    این نام کاربری شما نیست، این نام در واقع قابل مشاهده برای مخاطبان چتروم میباشد.
                </Grid>
                <Grid item className={classes.fieldsContainer}>
                    <Typography>درباره شما</Typography>
                    <TextField 
                        variant='standard'
                        name="bio"
                        fullWidth
                        inputRef={bioRef}
                        autoComplete="off"
                        value={userInfoFields.bio}
                        error={!userInfoFields.bio.length}
                        onChange={changeHandler}
                        focused={bioEditable}
                        InputProps={{
                            readOnly: !bioEditable,
                            endAdornment: ( 
                            <InputAdornment position="end"> 
                                {
                                    bioEditable? (
                                        <>
                                            <IconButton size='small'>
                                                <Mood fontSize='small' />  
                                            </IconButton> 
                                            <IconButton 
                                                disabled={!userInfoFields.bio.length}
                                                size='small'
                                                onClick={()=>{
                                                    setBioEditable(false);
                                                    submitChanges();
                                                }}
                                            >
                                                <Check fontSize='small' />  
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton 
                                            size='small'
                                            onClick={()=>{
                                                setBioEditable(true);
                                                bioRef.current.focus()
                                            }}
                                        >
                                            <Edit fontSize='small' />  
                                        </IconButton> 
                                    )
                                }
                            </InputAdornment>
                            ),
                        }}
                     />
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapUserInfoToProps = state=> ({
    user: state.user
})

export default connect( mapUserInfoToProps, { logIn })(Profile);