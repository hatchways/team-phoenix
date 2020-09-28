import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
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
  toggleDrawer: {},
  appTitle: {},
}));

const ButtonAppBar = (props) => {
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
        <Typography
          variant="title"
          color="inherit"
          className={classes.appTitle}
        ></Typography>
        <AppBarCollapse />
      </Toolbar>
    </AppBar>
  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ButtonAppBar;
