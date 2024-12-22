import React, { useState } from "react";
import {AppBar,Toolbar,IconButton,Typography,Drawer,List,ListItem,ListItemText,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handle = (url: string) => {
        navigate(url);
        setIsOpen(false);
      
    }
    const toggleDrawer =(open: boolean) => () => {
            setIsOpen(open);
        };

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <List>
                    <ListItem >
                        <ListItemText primary="מפה נתונים"  onClick={()=>handle("/map")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="גרף סוגי התקפות" onClick={()=>handle("/Graph-typesattack")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="גרף אירועים לפי שנים" onClick={()=>handle("/Graph-events-years")} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}