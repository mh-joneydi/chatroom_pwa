import React, {useEffect, useState} from 'react';
import { Alert } from '@material-ui/lab';
import { deleteAlert } from '../redux/actions'
import { connect } from 'react-redux';
import { Collapse, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    alert: {
        direction: 'rtl',
        padding: '0.5rem 1rem',
        margin: '0.75rem',
        '& div.MuiAlert-icon': {
            marginRight: 0,
            marginLeft: '12px'
        },
        '& div.MuiAlert-action': {
            marginLeft: '-12px',
            marginRight: 'auto'
        }
    }
})

const CustomAlert = ({deleteAlert, name, severity, text, closable}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();
    const handleClose = alertName=> {
        deleteAlert(alertName)
    }
    useEffect(()=> {
        setOpen(true);
    }, []);

    return (
               <Collapse in={open} >
                    <Alert 
                        severity={severity} 
                        variant='filled' 
                        className={classes.alert} 
                        onClose={ closable? () => {
                            setOpen(false);
                            setTimeout( ()=> {
                                handleClose(name);
                            }, 350)
                        } : null
                        }
                    >
                        {text}
                    </Alert> 
               </Collapse>
    );
};


export default connect(null, { deleteAlert })(CustomAlert);