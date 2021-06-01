import { Avatar, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { Check, Edit, Mood, PhotoCamera } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { updateProfile } from '../../redux/actions';
import { connect } from 'react-redux';

const useStyle = makeStyles( theme=> ({
    main: {
        minHeight: '100%',
        backgroundColor: theme.palette.grey[200],
        paddingBottom: theme.spacing(2)
    },
    avatarContainer: {
        margin: theme.spacing(4,0),
        borderRadius: '50%',
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
        padding: '0.9rem 1.5rem',
        '& p': {
            textAlign: 'right',
            marginBottom: '1rem',
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
            fontSize: '20px'
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

const Profile = ({user:{userInfo,id}, updateProfile}) => {
    const classes = useStyle(),
    [fields, setFieldValue] = useState({...userInfo}),
    nameRef = useRef(),
    bioRef = useRef(),
    [nameEditable, setNameEditable] = useState(false),
    [bioEditable, setBioEditable] = useState(false),
    changeHandler = ({target: {name, value}})=> {
        if((name=="name"&&value.length>25)||(name=="bio"&&value.length>60)){
            return;
        }
        setFieldValue({
            ...fields,
            [name]: value
        })
    },
    saveName = ()=>{
        setNameEditable(false);
        updateProfile(id,{...userInfo, name: fields.name })
    },
    saveBio = ()=>{
        setBioEditable(false);
        updateProfile(id,{...userInfo, bio: fields.bio })
    },
    saveByEnter = (e,value,save)=>{
        if(e.which===13){
            e.preventDefault();
            if(value.length){
                save();
            }
        }
    }
    return (
        <Grid container direction='column' wrap='nowrap' className={classes.main}>
            <Grid item container justify='center'>
                <Grid item className={classes.avatarContainer}>
                    <Avatar src={fields.avatar} alt={fields.name} className={classes.avatar} />
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
                        onKeyDown={(e)=>saveByEnter(e,fields.name,saveName)}
                        value={fields.name}
                        error={!fields.name.length}
                        onChange={changeHandler}
                        focused={nameEditable}
                        InputProps={{
                            readOnly: !nameEditable,
                            endAdornment: ( 
                            <InputAdornment position="end"> 
                                {
                                    nameEditable? (
                                        <>
                                            <div className={classes.validLength}>{25-fields.name.length}</div>
                                            <IconButton size='small'>
                                                <Mood fontSize='small' />  
                                            </IconButton> 
                                            <IconButton 
                                                size='small'
                                                disabled={!fields.name.length}
                                                onClick={saveName}
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
                        multiline
                        rowsMax={3}
                        onKeyDown={(e)=>saveByEnter(e,fields.bio,saveBio)}
                        inputRef={bioRef}
                        autoComplete="off"
                        value={fields.bio}
                        error={!fields.bio.length}
                        onChange={changeHandler}
                        focused={bioEditable}
                        InputProps={{
                            readOnly: !bioEditable,
                            endAdornment: ( 
                            <InputAdornment position="end"> 
                                {
                                    bioEditable? (
                                        <>
                                        <div className={classes.validLength}>{60-fields.bio.length}</div>
                                            <IconButton size='small'>
                                                <Mood fontSize='small' />  
                                            </IconButton> 
                                            <IconButton 
                                                disabled={!fields.bio.length}
                                                size='small'
                                                onClick={saveBio}
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

export default connect( mapUserInfoToProps, { updateProfile })(Profile);