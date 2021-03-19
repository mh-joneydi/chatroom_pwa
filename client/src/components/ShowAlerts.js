import React, { Component, PureComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomAlert from './CustomAlert';
import { deleteAllAterts } from '../redux/actions';
import { Grid } from '@material-ui/core';

class ShowAlerts extends Component {
    render() {
        return (
            <Grid item>
                {
                    this.props.alerts.map( alert=> (<CustomAlert name={alert.name} severity={alert.severity} text={alert.text} closable={alert.closable}/>) )
                }
            </Grid>
        );
    }
    componentWillUnmount() {
        this.props.deleteAllAterts();
    }
}

const mapStateToProps = state=>  ({
    alerts : state.alerts
});

export default connect(mapStateToProps, { deleteAllAterts })(ShowAlerts);