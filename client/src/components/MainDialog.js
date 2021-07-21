import { Button, createMuiTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, makeStyles, MuiThemeProvider, useTheme } from '@material-ui/core';
import { borderBottom } from '@material-ui/system';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { closeDialog } from '../redux/actions'

const useStyle = makeStyles( theme=> ({
    header: {
        '& h2': {
            fontSize: '1.15rem'
        }
    },
    content: {
        padding: theme.spacing(1,3)
    },
    actions: {
        '& button': {
            fontFamily: 'sahel'
        }
    }
}))

const MainDialog = ({ dialog, closeDialog }) => {
    const closeFirst = (callBack)=> ()=>{callBack(); closeDialog();},
    classes = useStyle(),
    theme = useTheme(),
    okTheme = createMuiTheme({ palette: { primary: { main: theme.palette[dialog.okColor].main } } }),
    cancelTheme = createMuiTheme({ palette: { primary: { main: theme.palette[dialog.cancelColor].main } } });
    return (
        <Dialog
            open={dialog.isOpen}
            onClose={closeDialog}
            fullWidth
            maxWidth='xs'
            dir='rtl'
      >
          {dialog.title&&<DialogTitle className={classes.header}>{dialog.title}</DialogTitle>}
          {dialog.content&&
          <DialogContent className={classes.content}>
            {typeof dialog.content === 'string' ? (
                <DialogContentText>{dialog.content}</DialogContentText>
            ):(
                dialog.content
            )}
          </DialogContent>}
          { !dialog.noAction&&
            <DialogActions className={classes.actions}>
                <MuiThemeProvider theme={cancelTheme}>
                    <Button 
                        onClick={dialog.onCancel?closeFirst(dialog.onCancel):closeDialog} 
                        color="primary" 
                    >
                        {dialog.cancelText}
                    </Button>
                </MuiThemeProvider>
                { dialog.onOk&& 
                <MuiThemeProvider theme={okTheme}>
                    <Button 
                        onClick={closeFirst(dialog.onOk)} 
                        color="primary" 
                    >
                        {dialog.okText}
                    </Button>
                </MuiThemeProvider>
                }
            </DialogActions>
          }       
      </Dialog>
    );
};

const mapDialogToProps = state=> ({
    dialog: state.dialog
})

export default connect( mapDialogToProps, { closeDialog })(MainDialog);