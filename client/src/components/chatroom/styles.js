import { makeStyles } from "@material-ui/styles";

export default makeStyles( theme => ({
    chatHeader: {
        textAlign: 'center',
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        padding: '1.5rem'
    },
    chatSendSection: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        padding: '1.5rem'
    },
}));