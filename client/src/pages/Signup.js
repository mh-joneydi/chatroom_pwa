import React from 'react';
import withSignStyle from '../components/HOC/withSignStyle'
import { signupUser } from '../redux/actions/index';
import SignupForm from '../components/SignupForm';
import { connect } from 'react-redux';

const Signup = ({location, setLogIn}) => {
    const onSubmit = async (values) => {
        const path = location.state && location.state.from.pathname || '/' ;
        await setLogIn(values, path);
    }
    return <SignupForm onSubmit={onSubmit} initialValues={{}}/>
};


export default connect(null, { signupUser })(withSignStyle(Signup));