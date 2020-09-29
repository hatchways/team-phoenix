import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBarCollapse,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core/";

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
