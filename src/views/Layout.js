import {  makeStyles} from '@material-ui/core'
import React from 'react'
import {Drawer } from '@material-ui/core';
import Container from '@material-ui/core/container';
import LeftDrawer from './LeftDrawer';

const drawerWidth = 300;

const useStyles = makeStyles((theme)=>{
    return {
    drawer: {
        width: drawerWidth,
        zIndex: '0'
    },
    drawerPaper: {
        width: drawerWidth
    },
    page: {
        background: '#f9f9f9',
        paddingTop: theme.spacing(2),
        boxSizing: 'border-box',
        width: `calc(100% - ${drawerWidth}px)`
    },
    drawerContainer: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        boxSizing: 'border-box',
    },
    root2: {
        display: 'flex',
    },
    pageContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar
}})

function Layout({children}) {
    const classes = useStyles();
    return (
        <div className={classes.root2}>
            <Drawer 
            PaperProps={{ elevation: 3 }} 
            className = {classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerPaper}}>
                <Container className={classes.drawerContainer}>
                    <LeftDrawer/>
                </Container>
            </Drawer>
            <div className={classes.page}>
                <Container className={classes.pageContainer}>
                    {children} 
                </Container>
            </div>
        </div>
    )
}

export default Layout