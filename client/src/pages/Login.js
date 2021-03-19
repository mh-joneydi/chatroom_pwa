import React from 'react';
import withSignStyle from '../components/HOC/withSignStyle'
import { setLogIn } from '../redux/actions/index';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';

const Login = ({location, setLogIn}) => {
    const onSubmit = async (values) => {
        const path = location.state && location.state.from.pathname || '/' ;
        await setLogIn(values, path);
    }
    return <LoginForm onSubmit={onSubmit} initialValues={{remember : true}}/>
};


export default connect(null, {setLogIn})(withSignStyle(Login));