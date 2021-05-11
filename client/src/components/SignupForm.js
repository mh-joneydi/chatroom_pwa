import { Avatar, Button, CircularProgress, Container, Grid, InputAdornment, Link, TextField, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import {Link as routerLink} from 'react-router-dom';
import { Field , reduxForm } from 'redux-form';
import ShowAlerts from './ShowAlerts';
import { users } from '../apis/index'
import { addAlert } from '../redux/actions';

const styles = {
    gridContainer: {
        minHeight : '100vh'
    },
    header: {
        marginBottom: '0.75rem'
    },
    helperText: {
        '& p':{
            textAlign: 'center'
        }
    },
    signupLink: {
        textAlign: 'right',
        marginTop: '0.75rem'
    },
    avater: {
        color: '#fff',
        backgroundColor: 'rgb(220, 0, 78)',
    },
    alert: {
        padding: '0.75rem',
        '& div.MuiAlert-icon': {
            marginRight: 0,
            marginLeft: '12px'
        }
    },
    submitButton: {
        padding: '0.5rem',
        marginTop: '0.75rem'
    }
}

class SignupForm extends Component {
    renderError = ({touched , error , submitFailed})=> {
        if( submitFailed && touched && error ){
            return error;
        }
    }
    renderUserNameField = ({input , type , label , meta , ...props})=> {
        const error = this.renderError(meta);
        return(
            <TextField
                fullWidth
                label={label}
                variant='outlined'
                type={type}
                color='primary'
                required
                {...input}
                {...props}
                error={!!(error)}
                helperText={error}
                className={this.props.classes.helperText}
                InputProps={{
                    endAdornment: ( 
                    <InputAdornment position="end">{ 
                        meta.asyncValidating && <CircularProgress size={25}/>
                    }</InputAdornment>
                    ),
                }}
            />
        )
    }
    renderField = ({input , type , label , meta , ...props})=> {
        const error = this.renderError(meta);
        return(
            <TextField
                fullWidth
                label={label}
                variant='outlined'
                type={type}
                color='primary'
                required
                {...input}
                {...props}
                error={!!(error)}
                helperText={error}
                className={this.props.classes.helperText}
            />
        )
    }

    onSubmit = async formValues=> {
        await this.props.onSubmit(formValues);
    }
    render() {
        const { handleSubmit, submitting, classes } = this.props;
        return (
            <Container maxWidth='xs' dir="ltr" >
                <Grid 
                    container 
                    direction='column' 
                    alignItems='stretch' 
                    justify='center' 
                    spacing={2} 
                    className={classes.gridContainer}
                    component='form' 
                    onSubmit={handleSubmit(this.onSubmit)} 
                    noValidate
                    autoComplete="off"
                >
                    <Grid item>
                        <ShowAlerts/>
                    </Grid>
                    <Grid item xs={12} container direction='column' alignItems='center' spacing={1} className={classes.header}>
                        <Grid item >
                            <Avatar className={classes.avater}>
                                <LockOutlined />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant='h4' color='textPrimary' component='h1'>
                                عضویت در چت روم
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                            <Field 
                                type="text"
                                label="نام کاربری" 
                                name="username" 
                                placeholder='like hossein'
                                component={this.renderUserNameField} 
                            />
                    </Grid>
                    <Grid item>
                            <Field 
                                type="password"
                                label="گذرواژه" 
                                name="password" 
                                component={this.renderField} 
                            />
                    </Grid>
                    <Grid item>
                            <Field 
                                type="password"
                                label="تکرار گذرواژه" 
                                name="repeatPassword" 
                                component={this.renderField} 
                            />
                    </Grid>
                    <Grid item>
                            <Field 
                                type="text"
                                label="نام ( و نام خانوادگی )" 
                                name="name" 
                                component={this.renderField} 
                            />
                    </Grid>
                    <Grid item >
                            <Button
                                fullWidth
                                className={classes.submitButton}
                                type="submit"
                                variant='contained'
                                color='primary'
                                disabled={submitting}
                            >
                                {submitting ? <CircularProgress size={25}/> : 'درخواست عضویت'}
                            </Button>
                    </Grid>
                    <Grid item className={classes.signupLink}>
                        <Link component={routerLink} to='/login' >حساب کاربری دارید؟ ورود به چت روم</Link>
                    </Grid>
                    <Grid item className={classes.signupLink}>
                        <Typography variant='body2' color='textSecondary' align='center'>
                            Copyright © <Link component={routerLink} to='/' color='inherit'>Chatroom.ir</Link> {new Date().getFullYear()}</Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const validate = formValues => {
    const errors = {},
    { name, password, repeatPassword, username } = formValues;
    if(!username){
        errors.username = 'نام کاربری خود را وارد کنید'
    }
    if(username && username.length < 3){
        errors.username = 'حداقل تعداد کاراکتر مورد قبول 3 کاراکتر میباشد'
    }
    if(username && username.includes(' ')){
        errors.username = 'استفاده از فاصله در نام کاربری مجاز نیست'
    }
    if(!password){
        errors.password = 'گذرواژه خود را وارد کنید'
    }
    if(password && password.length < 4){
        errors.password = 'حداقل تعداد کاراکتر مورد قبول 4 کاراکتر میباشد'
    }
    if(password && password.includes(' ')){
        errors.password = 'استفاده از فاصله در گذرواژه مجاز نیست'
    }
    if(!repeatPassword){
        errors.repeatPassword = 'تکرار گذرواژه خود را وارد کنید'
    }
    if(repeatPassword!==password){
        errors.repeatPassword = 'تکرار گذرواژه با گذرواژه برابر نیست'
    }
    if(!name){
        errors.name = 'نام خود را وارد کنید'
    }
    return errors;
}

const asyncValidate = ({ username }) => {
    return users.get('/users')
      .then( res=> {
        const usernames = res.data.map( user => user.username );
        if ( usernames.includes(username) ) {
          throw { username: 'این نام کاربری قبلا ثبت شده است' }
        }
      })
}

export default reduxForm({
    form : 'signup',
    validate,
    asyncValidate
})(withStyles(styles)(SignupForm));