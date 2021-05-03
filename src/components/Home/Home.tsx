import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Button,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import DvrIcon from '@material-ui/icons/Dvr';
import FaceIcon from '@material-ui/icons/Face';
import HomeIcon from '@material-ui/icons/Home';
import marvel_image from '../../assets/waldemar-brandt-marvel-comics-unsplash.jpg';
import '../../styles.css'
import { Link } from 'react-router-dom';
import { AuthCheck } from 'reactfire';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({ /* theme: Theme?*/
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
    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${marvel_image});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
    },
    main_text: {
        textAlign: 'center',
        lineHeight: '250%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-30%, -50%)',
        color: '#c11f1f',
        padding: '25px 0px',
        maxWidth: '50%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        fontSize: '30px',
        fontFamily: `'Bangers', cursive`,
    },
    menuitem: {
        textDecoration: 'none',
        color: 'black',
    }

}));

export interface BaseProps {
    title: string;
}

export const Home = (props: BaseProps) => {

    // New classes variable code
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.appBarContainer}>
                    <Typography className={classes.logo}>
                        {props.title}
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
                        <Link to="/" className={classes.menuitem}>
                            <ListItem button>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText>Home</ListItemText>
                            </ListItem>
                        </Link>
                        <Link to="/dashboard" className={classes.menuitem}>
                            <ListItem button>
                                <ListItemIcon><DvrIcon /></ListItemIcon>
                                <ListItemText>Dashboard</ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <AuthCheck fallback={
                            <Link to="/signin" className={classes.menuitem}>
                                <ListItem button>
                                    <ListItemIcon><FaceIcon /></ListItemIcon>
                                    <ListItemText>Sign In</ListItemText>
                                </ListItem>
                            </Link>
                        }>
                            <Link to="/signin" className={classes.menuitem}>
                                <ListItem button>
                                    <ListItemIcon><FaceIcon /></ListItemIcon>
                                    <ListItemText>Sign Out</ListItemText>
                                </ListItem>
                            </Link>
                        </AuthCheck>
                    </List>
                </div>
            </Drawer>
            <main className={classes.main}>
                <div className={classes.main_text}>
                    <p>Welcome to the Marvel Character Collection!</p>
                    <AuthCheck fallback={
                        <Link to="/signin" className={classes.menuitem}>
                            <Button color='primary' variant="contained">Sign In</Button>
                        </Link>
                    }>
                        <Link to="/dashboard" className={classes.menuitem}>
                            <Button color='primary' variant="contained">Dashboard</Button>
                        </Link>
                    </AuthCheck>

                </div>
            </main>
        </div >
    )
}