import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { useStore } from 'react-redux';
import { Redirect } from 'react-router-dom';


const useStyle = makeStyles({
    root : {
      flexGrow : 1,
      direction: 'ltr'
    },
    container: {
          backgroundColor : '#fff',
          boxShadow : '1px 0 10px 1px rgba(20,20,20,0.5)'
    },
    imageSection: {
        backgroundSize: 'cover',
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }
  })

const withSignStyle = (Component) => {
    
    return ( ( props)=> {
            const classes = useStyle();
            const store = useStore();
            if(store.getState().user.isLogIn){
                return (
                    <Redirect to='/'/>
                )
            }
            return (
                <Grid container className={classes.root}>
                    <Grid item sm={4} md={7} className={classes.imageSection}></Grid>
                    <Grid item xs={12} sm={8} md={5} className={classes.container}>
                        <Component {...props}/>
                    </Grid>
                </Grid>
            )
        });
};

export default withSignStyle;