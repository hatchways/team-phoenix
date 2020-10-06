import React, { useContext } from "react";
import {
  MenuItem,
  Avatar,
  Box,
  Link,
  Grid,
  makeStyles,
} from "@material-ui/core";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import Context from "../../contexts/CalendStore";
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
  const { user } = useContext(Context);
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
            src={user.picture}
          />{" "}
          {user.first_name + " " + user.last_name}
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
            src={user.picture}
          />
          <a href="home">{user.first_name + " " + user.last_name}</a>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppBarCollapse;
