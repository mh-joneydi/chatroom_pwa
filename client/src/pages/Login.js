import React from 'react';
import withSignStyle from '../components/HOC/withSignStyle'
import { setLogIn } from '../redux/actions/index';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';

const Login = ({location, setLogIn}) => {
    const onSubmit = async (values) => {
        await setLogIn(values);
    }
    return <LoginForm onSubmit={onSubmit}/>
};


export default connect(null, {setLogIn})(withSignStyle(Login));