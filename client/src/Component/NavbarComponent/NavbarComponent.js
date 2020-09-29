import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import AppBarCollapse from "./AppBarCollapse";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navigation: {
    background: "white",
    color: "black",
  },
}));

const NavbarComponent = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.navigation}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          className={classes.toggleDrawer}
        >
          <img className="logo" src="/images/logo.png" alt="" />
        </IconButton>

        <AppBarCollapse />
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
