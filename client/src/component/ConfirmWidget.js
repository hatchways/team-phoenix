import React from "react";
import {
  Paper,
  Box,
  Divider,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core/";

import logo from "../assets/logo.png";
import ProfileHeader from "./profile/Header";
import ProfileFooter from "./profile/Footer";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    width: theme.spacing(75),
    height: theme.spacing(55),
  },
  outerBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  forEditButton: {
    color: "#a8b1c7",
  },
}));

const ConfirmWidget = (props) => {
  const classes = useStyles();
  const string1 = "Here is how CalendApp will work with " + props.email + ":";
  return (
    <Box className={classes.outerBox}>
      <img alt="logo" src={logo}></img>
      <Paper className={classes.paper} elevation={3}>
        <Box m={3}>
          <ProfileHeader percent={50} heading={props.heading} />
        </Box>
        <Divider />
        <Box m={3}>
          <Typography variant="body1">
            <span className={classes.bold}>{string1}</span>
          </Typography>
          <List component="ol">
            <Divider />
            <Box ml={2}>
              <Box mt={1} mb={1}>
                <ListItem>
                  <ListItemText>
                    1. We will check "
                    <span className={classes.bold}>{props.email}</span>" for
                    conflicts
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Button className={classes.forEditButton}>Edit</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
              <Divider />
              <Box mt={1} mb={1}>
                <ListItem>
                  <ListItemText>
                    2. We will add event to "
                    <span className={classes.bold}>{props.email}</span>"
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Button className={classes.forEditButton}>Edit</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
              <Divider />
            </Box>
          </List>

          <Box mt={3}>
            <ProfileFooter
              type="A"
              handleContinue={props.handleContinue}
              handleSkipbtn={props.handleSkipbtn}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConfirmWidget;
