import React from "react";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import {
  Avatar,
  makeStyles,
  Grid,
  Box,
  Link,
  MenuItem,
} from "@material-ui/core";

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

const AppBarCollapse = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonAppBarCollapse>
        <MenuItem>Home</MenuItem>
        <MenuItem>Integration</MenuItem>
        <MenuItem>Update Account</MenuItem>
        <MenuItem>
          {" "}
          <Avatar
            className={classes.main_menu.avatar}
            alt="user 1"
            src="/images/user.png"
          />{" "}
          John Doe
        </MenuItem>
      </ButtonAppBarCollapse>
      <Grid className={classes.buttonBar} id="appbar-collapse">
        <Grid container className={classes.main_menu}>
          <Box mr={20} mt={1}>
            <Link href="home">Home</Link>
            <Link href="intergration">integration</Link>
            <Link href="upgrade" className={classes.main_menu.active}>
              Upgrade account
            </Link>
          </Box>
          <Avatar
            className={classes.main_menu.avatar}
            alt="user 1"
            src="/images/user.png"
          />

          <a href="home">John Doe</a>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppBarCollapse;
