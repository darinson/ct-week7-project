import React, { useState } from 'react';
import {
    useTheme,
    makeStyles,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Container,
    Button,
    Snackbar
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import DvrIcon from '@material-ui/icons/Dvr';
import FaceIcon from '@material-ui/icons/Face';
import HomeIcon from '@material-ui/icons/Home';
import '../../styles.css'
import signin_google from '../../assets/google_signin.png';



import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Input } from '../sharedComponents/Input';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// Will only be used to close snackbar
const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0',
        margin: '0',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: '35px',
        fontFamily: `'Bangers', cursive`,
    },
    appBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    byline: {
        display: 'block',
        padding: '1em',
        color: 'rgba(255,255,255,0.7)',
        textDecoration: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        marginTop: '300px',
        width: '100%',
        position: 'absolute',
    },
    containerStyle: {
        position: 'relative',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    googleButton: {
        backgroundColor: 'rgb(66,133,244)',
        marginTop: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo: {
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    }

}))

interface SignInProps {
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}

export const SignIn = withRouter((props: SignInProps) => {

    const auth = useAuth();
    const classes = useStyles();
    const { history } = props
    const [open, setOpen] = useState(false);

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false)
        history.push('/')
    }

    const sign_in = async () => {
        const response = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        if (response.user) {
            handleSnackOpen()
        }
    };

    const sign_out = async () => {
        await auth.signOut();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.appBarContainer}>
                    <Typography className={classes.logo}>
                        MARVEL CHARACTER DATABASE
                    </Typography>
                    <Typography className={classes.byline}>
                        Coding Temple Week 7 Project -- Darin Son
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button onClick={() => history.push('/')}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => history.push('/dashboard')}>
                            <ListItemIcon><DvrIcon /></ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <AuthCheck fallback={
                            <ListItem button onClick={() => history.push('/signin')}>
                                <ListItemIcon><FaceIcon /></ListItemIcon>
                                <ListItemText>Sign In</ListItemText>
                            </ListItem>
                        }>
                            <ListItem button onClick={() => history.push('/signin')}>
                                <ListItemIcon><FaceIcon /></ListItemIcon>
                                <ListItemText>Sign Out</ListItemText>
                            </ListItem>
                        </AuthCheck>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Container maxWidth='sm' className={classes.containerStyle}>
                    <Typography className={classes.typographyStyle}>User Verification</Typography>
                    <AuthCheck fallback={
                        <Button className={classes.googleButton} onClick={sign_in}>Sign In with Google</Button>
                    }>
                        <Button variant='contained' color='secondary' onClick={sign_out}>Sign Out</Button>
                    </AuthCheck>
                    <Snackbar message={'Success'} open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success">
                            Successful Sign In - Redirect in 6 secs
                </Alert>
                    </Snackbar>

                </Container>
            </main>
        </div>
    )
})