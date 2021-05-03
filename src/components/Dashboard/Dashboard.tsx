import React from 'react';
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
    Typography
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import DvrIcon from '@material-ui/icons/Dvr';
import FaceIcon from '@material-ui/icons/Face';
import HomeIcon from '@material-ui/icons/Home';
import '../../styles.css'
import { RouteComponentProps, withRouter } from "react-router-dom";
import { DataTable } from '../../components';
import { AuthCheck } from 'reactfire';


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
        marginTop: '100px',
        marginLeft: '0px',
        paddingLeft: '25px',
        paddingRight: '25px'
    },
    row_button: {
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'column wrap',
        justifyContent: 'space-between'
    }
}));

interface DashProps {
    history: RouteComponentProps['history'];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}

export const Dashboard = withRouter((props: DashProps) => {
    console.log(props);

    const { history } = props;

    const classes = useStyles();
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
            <main className={classes.content} style={{ height: 400, width: '90%' }}>
                <h1>Marvel Character Collection</h1>
                <DataTable></DataTable>
            </main>
        </div >
    )
})