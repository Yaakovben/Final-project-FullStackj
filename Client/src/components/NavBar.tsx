import { useState } from "react";
import {AppBar,Toolbar,IconButton,Typography,Drawer,List,ListItem,ListItemText, Avatar, Container,} from "@mui/material";
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
            <Container maxWidth="xl" sx={{ backgroundColor: "#7f6d41" }}>
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
                    <Typography variant="h5" color="#white" sx={{
                            flexGrow: 1,
                            textAlign: "center",
                             fontWeight: "bold"
                            
                        }}>
                    INTEL INFORMATION
                    </Typography>
                   
                    <IconButton  sx={{
                                        marginLeft: "auto",
                                    }}>
                                <Avatar alt="Remy Sharp" src="https://www.idf.il/media/ysmdfak3/badge_of_the_israeli_defense_forces_2022_version.svg" />
                    </IconButton>
                </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <List>
                    <ListItem className="listItem" >
                        <ListItemText primary="מפת נתונים" onClick={()=>handle("/map-data")}/>
                    </ListItem>
                    <ListItem className="listItem" >
                        <ListItemText primary="גרף סוגי התקפות" onClick={()=>handle("/Graph-typesattack")}/>
                    </ListItem>
                    <ListItem  className="listItem">
                        <ListItemText primary="גרף אירועים לפי שנים"onClick={()=>handle("/Graph-events-years")} />
                    </ListItem>
                    <ListItem  className="listItem">
                        <ListItemText primary="גרף 5 אירגונים משמועתיים "onClick={()=>handle("/Graph-five-top-oraganization")} />
                    </ListItem>
                    <ListItem  className="listItem">
                        <ListItemText primary="גרף נתוני ארגונים לפי שנים"onClick={()=>handle("/Graph-organization-by-years")} />
                    </ListItem>
                    <ListItem  className="listItem">
                        <ListItemText primary="מפת עדכון"onClick={()=>handle("/Updates-map")} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}