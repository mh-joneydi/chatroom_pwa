import { Avatar, Button, Checkbox, CircularProgress, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link,TextField, Typography } from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React , {PureComponent} from 'react';
import { Field , reduxForm } from 'redux-form';
import {Link as routerLink} from 'react-router-dom';
import ShowAlerts from './ShowAlerts';
 
const styles = {
    gridContainer: {
        minHeight : '100vh'
    },
    header: {
        marginBottom: '0.65rem'
    },
    avater: {
        color: '#fff',
        backgroundColor: 'rgb(220, 0, 78)',
    },
    alert: {
        padding: '0.5rem 1rem',
        '& div.MuiAlert-icon': {
            marginRight: 0,
            marginLeft: '12px'
        }
    },
    signupLink: {
        textAlign: 'right'
    },
    checkbox: {
        direction: 'rtl',
        '& label':{
            margin:'-5px 7px 10px'
        }
    },
    helperText: {
        '& p':{
            textAlign: 'center'
        }
    },
    submitButton: {
        padding: '0.5rem'
    }  
}

class LoginForm extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            showPass : false,
        }
    }
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

    renderCheckbox = ({input , label}) => {
        return(
            <FormControlLabel 
                control={<Checkbox{...input} />}
                label={label}
            />
        )
    }

    onSubmit = async(formValues) => {
            await this.props.onSubmit(formValues);
    }
    render() {
        const { handleSubmit, submitting, classes } = this.props;
            return (
                <Container maxWidth='xs' dir="ltr" component='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>
                    <Grid container direction='column' alignItems='stretch' justify='center' spacing={3} className={classes.gridContainer}>
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
                                    ???????? ???? ???? ??????
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Field 
                                type="text"
                                label="?????? ????????????" 
                                name="username" 
                                placeholder='like hossein'
                                component={this.renderField} 
                            />
                        </Grid>
                        <Grid item >
                            <Field 
                                type={this.state.showPass ? 'text' : 'password'} 
                                label="??????????????" 
                                name="password" 
                                InputProps={{
                                    endAdornment: ( 
                                    <InputAdornment position="end"> 
                                        <IconButton onClick={
                                            () => this.setState({
                                                showPass : !this.state.showPass
                                            })
                                        }>
                                            {this.state.showPass ? <Visibility /> : <VisibilityOff />}  
                                        </IconButton> 
                                    </InputAdornment>
                                    ),
                                }}
                                component={this.renderField} 
                            />
                        </Grid>
                        <Grid className={classes.checkbox}>
                            <Field 
                                type="checkbox" 
                                label="?????? ???? ???????? ??????????" 
                                name="remember" 
                                component={this.renderCheckbox} 
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
                                {submitting ? <CircularProgress size={25}/> : '????????'}
                            </Button>
                        </Grid>
                        <Grid item className={classes.signupLink}>
                                <Link component={routerLink} to='/signup' >???????? ???????????? ?????????????? ?????? ????????</Link>
                        </Grid>
                        <Grid item >
                            <Typography variant='body2' color='textSecondary' align='center'>
                                Copyright ?? <Link component={routerLink} to='/' color='inherit'>Chatroom.ir</Link> {new Date().getFullYear()}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            );
        }
    }

    

const validate = formValues => {
    const errors = {};
    if(!formValues.username){
        errors.username = '?????? ???????????? ?????? ???? ???????? ????????'
    }
    if(formValues.username && formValues.username.length < 3){
        errors.username = '?????????? ?????????? ?????????????? ???????? ???????? 3 ?????????????? ????????????'
    }
    if(formValues.username && formValues.username.includes(' ')){
        errors.username = '?????????????? ???? ?????????? ???? ?????? ???????????? ???????? ????????'
    }
    if(!formValues.password){
        errors.password = '?????????????? ?????? ???? ???????? ????????'
    }
    if(formValues.password && formValues.password.length < 4){
        errors.password = '?????????? ?????????? ?????????????? ???????? ???????? 4 ?????????????? ????????????'
    }
    if(formValues.password && formValues.password.includes(' ')){
        errors.password = '?????????????? ???? ?????????? ???? ?????????????? ???????? ????????'
    }
    return errors;
}


export default reduxForm({
    form : 'login',
    validate
})(withStyles(styles)(LoginForm));