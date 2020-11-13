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
import { Link as RouterLink } from "react-router-dom";
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
        <MenuItem component={RouterLink} to={`/dashboard?user_id=${user._id}`}>
          Home
        </MenuItem>
        <MenuItem component={RouterLink} to={`/dashboard?user_id=${user._id}`}>
          Integration
        </MenuItem>
        <MenuItem component={RouterLink} to={`/upgrade?user_id=${user._id}`}>
          Update Account
        </MenuItem>
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
            <Link
              component={RouterLink}
              variant="body2"
              to={`/dashboard?user_id=${user._id}`}
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              variant="body2"
              to={`/dashboard?user_id=${user._id}`}
            >
              Integration
            </Link>
            <Link
              component={RouterLink}
              variant="body2"
              to={`/upgrade?user_id=${user._id}`}
            >
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
