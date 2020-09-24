import React, { useState, Component } from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { grey, orange } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import shadows from "@material-ui/core/styles/shadows";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import GettingStartedButton from "../GettingStartedButton/GettingStartedButton";


// import classNames from 'classnames/bind';
// import styles from './submit-button.css';


// let cx = classNames.bind(styles);


const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
    primary: {
      main: grey[600],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: theme.palette.text.default,
    boxShadow: shadows[3],
    paddingBottom: theme.spacing(3),
  },
  // tagBar:{
  //   width: "100%",
  //   height: "5px",
  //   margin: "0px",
  // },
  orange_background: {
    background: "orange",
    width: "100%",
    height: "5px",
    margin: "0px",
  },

  blue_background: {
    background: "blue",
  },

  green_background: {
    background: "green",
  },
  meeting_header: {
    width: "100%",
    height: "30%",
    textAlign: "end",
  },

  profile: {
    padding: theme.spacing(3),
  },
  content: {
    margin: "10px",
  },
  meeting_body: {
    margin: "20px 30px 50px",
    "& span": {
      color: "gray",
    },
  },
  meeting_footer: {
    width: "100%",
    paddingTop: "10px",
    borderTop: "1px solid rgb(236, 230, 230)",
    fontWeight: "bold",
  },
  meeting_button: {
    float: "right",
    textAlign: "right",
  },
  profile_name: {
    lineHeight: "2px",
    verticalAlign: "bottom",
    paddingLeft: "5px",
  },
}));

const MeetingComponent = () => {
  const [state, setState] = useState({
    meeting: [
      { duration: 15, type: "One-on-One" },
      { duration: 30, type: "One-on-One" },
      { duration: 45, type: "One-on-One" },
    ],
  });

  const classes = useStyles();
  return (
    <ThemeProvider theme={outerTheme}>
      <Grid container m={15} className={classes.profile}>
        <Grid container md={6}>
          <Grid item sm={1}>
            <Avatar alt="user 1" src="/images/user.png" />
          </Grid>

          <Grid item sm className={classes.profile_name}>
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body2" color="primary">
              calendapp.com/john-doe
            </Typography>
          </Grid>
        </Grid>

        <Grid className={classes.meeting_button} item md={6}>
          <Button
            className="footer_button"
            variant="outlined"
            color="secondary"
          >
            <Icon>add</Icon> New event type
          </Button>
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid container spacing={4}>
          {state.meeting.map((meeting) => {})}
          {/* Meeting Box Start */}

          {state.meeting.map((meeting) => {
            return (
              <Grid
                item
                md={4}
                sm={6}
                xs={12}
                className="meeting_box"
                boxShadow={3}
                bgcolor="background.paper"
                style={{ width: "20rem", height: "20rem" }}
              >
                <Paper className={classes.paper}>
                  <div className={classes.orange_background}></div>
                  <div className={classes.content}>
                    <div className={classes.meeting_header}>
                      <Icon color="disabled">settings</Icon>
                    </div>
                    <div className={classes.meeting_body}>
                      <h3>{meeting.duration} munites meeting </h3>
                      <span>{meeting.type} </span>
                    </div>
                    <div className={classes.meeting_footer}>
                      <Icon color="disabled">alarm</Icon>
                      <span> {meeting.duration} min </span>
                      <Button
                        className={classes.meeting_button}
                        variant="outlined"
                        color="secondary"
                      >
                        Copy link
                      </Button>
                    </div>
                  </div>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
      {/* Meeting Box End */}

      <Grid container mt={2} alignItems="flex-end" justify="flex-end">
        <GettingStartedButton />
      </Grid>
    </ThemeProvider>
  );
};

export default MeetingComponent;
