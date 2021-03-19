import { Box, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';


const styles = {
    mainHeader: {
        textAlign: 'center',
        padding: '2rem',
        borderBottom: '1px solid rgba(30,30,30,0.2)'
    },
}


const Home = ({classes, userStatus}) => {
    return (
                <>
                    <Typography variant='h3' className={classes.mainHeader}>وب اپلیکیشن چت روم</Typography>
                    <Box padding='10rem 0' textAlign='center'>
                    {
                        
                            <Button component={Link} to='/chatroom' size='large' variant='contained' color='primary'>
                                {
                                    userStatus.isLogIn ? 'ورود به چت روم'
                                    : 'برای ورود به چت روم باید وارد حساب کاربری خود شوید'
                                }   
                            </Button>
                    }
                    </Box>
                </>
    )
};

const mapStatetoProps = state => ({
    userStatus: state.user
});

export default connect( mapStatetoProps, null )(withStyles(styles)(Home));