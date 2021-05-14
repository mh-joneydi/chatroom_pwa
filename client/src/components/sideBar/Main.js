import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Help, Notifications, Settings, BrightnessMedium, Block, ExitToApp } from '@material-ui/icons';
import React from 'react';
import { setLogOut } from '../../redux/actions';
import { connect } from 'react-redux';

const useStyle = makeStyles(theme=> ({
    root: {
        '& .MuiListItem-button': {
            padding: theme.spacing(2,3),
            textAlign: 'right',
            color:  theme.palette.grey[800]
        },
        '& .MuiListItemIcon-root': {
            color: theme.palette.grey[500],
            minWidth: '45px'
        },
        '& .MuiDivider-inset': {
            marginRight: theme.spacing(9),
            marginLeft: 0,
            backgroundColor:  theme.palette.grey[200]
        }
    },
    header: {
        whiteSpace: 'noWrap',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor: theme.palette.secondary.main,
        color: 'rgba(255,255,255,0.9)',
        fontSize: theme.typography.h2.fontSize,
        marginLeft: theme.spacing(2)
    }

}));

const Main = ({ userInfo, setLogOut, goToProfile }) => {
    const classes= useStyle();
    return (
        <List dir='rtl' disablePadding className={classes.root}>
            <ListItem 
                button 
                className={classes.header} 
                onClick={goToProfile} 
            >
                <ListItemAvatar>
                    <Avatar src={userInfo.avatar} alt={userInfo.name} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={userInfo.name}
                    secondary={userInfo.bio||'بایوگرافی'}
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Notifications/>
                </ListItemIcon>
                <ListItemText primary="اعلانات" />
            </ListItem>
            <Divider variant='inset' />
            <ListItem button>
                <ListItemIcon>
                    <Settings/>
                </ListItemIcon>
                <ListItemText primary="تنظیمات چت" />
            </ListItem>
            <Divider variant='inset' />
            <ListItem button>
                <ListItemIcon>
                    <BrightnessMedium/>
                </ListItemIcon>
                <ListItemText primary="پوسته" />
            </ListItem>
            <Divider variant='inset' />
            <ListItem button>
                <ListItemIcon>
                    <Block/>
                </ListItemIcon>
                <ListItemText primary="مسدود ها" />
            </ListItem>
            <Divider variant='inset' />
            <ListItem button>
                <ListItemIcon>
                    <Help/>
                </ListItemIcon>
                <ListItemText primary="پشتیبانی" />
            </ListItem>
            <Divider variant='inset' />
            <ListItem button onClick={setLogOut}>
                <ListItemIcon>
                    <ExitToApp/>
                </ListItemIcon>
                <ListItemText primary="خروج" />
            </ListItem>
        </List>
    );
};

const mapUserInfoToProps = state=> ({
    userInfo: state.user.userInfo
})

export default connect( mapUserInfoToProps, { setLogOut } )(Main);