import React from "react";
import { MenuItem } from "@material-ui/core";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    right: 0,
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  main_menu: {
    backgroundColor: "white",
    "& a .active": {
      color: "orange",
    },
    "& a": {
      textDecoration: "none",
      fontWeight: "bold",
      color: "black",
      fontSize: "12px",
      marginTop: "15px",
      padding: "0px 10px 0px",
    },
    "& a:hover": {
      color: "orange",
    },
    "& .avatar": {
      marginLeft: "60px",
    },
  },
}));

const AppBarCollapse = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonAppBarCollapse>
        <MenuItem>Login</MenuItem>
        <MenuItem>Signup</MenuItem>
      </ButtonAppBarCollapse>
      <div className={classes.buttonBar} id="appbar-collapse">
        <Grid container className={classes.main_menu} md={12}>
          <a href="home">Home</a>
          <a href="intergration">integration</a>
          <a href="upgrade" className={classes.main_menu.active}>
            Upgrade account
          </a>

          <Avatar
            className={classes.main_menu.avatar}
            alt="user 1"
            src="/images/user.png"
          />
          <a href="home">John Doe</a>
        </Grid>
      </div>
    </div>
  );
};

export default AppBarCollapse;
