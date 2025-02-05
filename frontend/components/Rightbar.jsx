import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";

import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";

import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { yellow } from "@mui/material/colors";

import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient"; 

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({

  backgroundImage:
    "linear-gradient(to right, lightpink,#e6b3e0,#d1acdb,lightblue)",

  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight({ changePage, session }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, color: "purple", fontWeight: "bold" }}
            component="div"
          >
            <img
              src="caution2.webp"
              alt="Road Safety"
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
            />
            Road Safety
          </Typography>
          <IconButton
            /*  color="inherit"*/
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={open ? { display: "none" } : {}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}></Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,

            color: "white",
            backgroundImage: "linear-gradient(to right, #f4b8da, #d2afff)",

          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "black" }}>

            {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Main Navigation */}
        <List>
          {[
            { text: "Home", icon: <HomeIcon />, path: "/home" },
            { text: "Prediction", icon: <MapIcon />, path: "/prediction" },
            { text: "History", icon: <PersonIcon />, path: "/history" },
            { text: "Profile", icon: <PersonIcon />, path: "/profile" },
            { text: "Map", icon: <MapIcon />, path: "/map" },
            { text: "Contact", icon: <PersonIcon />, path: "/contact" },
          ].map(({ text, icon, path }) => (
            <Link to={path} key={text} style={{ textDecoration: "none", color: "inherit" }}>
              <ListItem disablePadding onClick={() => changePage(text)}>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />

                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        
        <Divider />

        {/* Authentication Links */}
        <List>
          {!session ? (
            <>
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon><LoginIcon /></ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon><AppRegistrationIcon /></ListItemIcon>
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </>
          ) : (
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}

        </List>
      </Drawer>
    </Box>
  );
}
