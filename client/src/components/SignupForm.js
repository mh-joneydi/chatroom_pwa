import { Avatar, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import {Link as routerLink} from 'react-router-dom';
import { Field , reduxForm } from 'redux-form';
import ShowAlerts from './ShowAlerts';

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
                className={this.props.helperText}
            />
        )
    }
    onSubmit = (formValues)=> {
        console.log(formValues)
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
                                component={this.renderField} 
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
                                name="fullName" 
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

}

export default reduxForm({
    form : 'signup',
    validate
})(withStyles(styles)(SignupForm));