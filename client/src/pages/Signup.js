import React from 'react';
import withSignStyle from '../components/HOC/withSignStyle'
import { signupUser } from '../redux/actions/index';
import SignupForm from '../components/SignupForm';
import { connect } from 'react-redux';

const Signup = ({ signupUser }) => {
    const onSubmit = async (values) => {
        await signupUser(values);
    }
    return <SignupForm onSubmit={onSubmit}/>
};


export default connect(null, { signupUser })(withSignStyle(Signup));