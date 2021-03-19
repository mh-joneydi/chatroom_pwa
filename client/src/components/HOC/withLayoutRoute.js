import React from 'react';
import { Route as DefaultRoute } from 'react-router-dom';
import SecretRoute from './secretRoute';
import Layout from '../layout'

const WithLayoutRoute = ({ component: Component, secret, ...rest }) => {
    const Route = secret ? SecretRoute : DefaultRoute;
    return (
        <Route {...rest} component={ props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />
    );
};

export default WithLayoutRoute;