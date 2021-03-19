import React, { useState } from 'react';
import { ExitToApp, Person } from '@material-ui/icons';
import { connect } from 'react-redux';
import { setLogOut } from '../../redux/actions';
import {Link} from 'react-router-dom';
import { IconButton } from '@material-ui/core';


const Auth = (props) => {
    const [loading,setLoading] = useState(false)
    const handleLogout = ()=> {
        setLoading(true);
        setTimeout( ()=> {
            props.setLogOut();
            setLoading(false);
        }, 500)
    }
    return (
        <>
            {   
                props.userStatus.isLogIn ?
                    <IconButton disabled={loading} onClick={handleLogout} color='inherit'><Person /></IconButton>
                    : <IconButton component={Link} to="/login" color="inherit"><ExitToApp /></IconButton>
            }
        </>
    );
};

const mapStatetoProps = state => ({
    userStatus: state.user
});

export default connect( mapStatetoProps, { setLogOut })(Auth);