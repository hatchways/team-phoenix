import React, { useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  Avatar,
  Paper,
  Box,
  Icon,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { grey, orange } from "@material-ui/core/colors";
import shadows from "@material-ui/core/styles/shadows";
import GettingStartedButton from "../GettingStartedButton/GettingStartedButton";
import Context from "../../contexts/CalendStore";
import Alert from "@material-ui/lab/Alert";
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
  meeting_box: {
    background: theme.palette.text.default,
    boxShadow: shadows[3],
    paddingBottom: theme.spacing(3),
  },

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
  },
  meeting_footer: {
    width: "100%",
    paddingTop: "10px",
    borderTop: "1px solid rgb(236, 230, 230)",
    fontWeight: "bold",
  },
  button: {
    textAlign: "right",
  },
  profile_name: {
    lineHeight: "2px",
    verticalAlign: "bottom",
    paddingLeft: "5px",
  },
}));

const MeetingComponent = (props) => {
  const meeting = [
    { duration: 15, type: "One-on-One" },
    { duration: 30, type: "One-on-One" },
    { duration: 60, type: "One-on-One" },
  ];
  const { user, copiedText } = useContext(Context);
  const classes = useStyles();
  return (
    <ThemeProvider theme={outerTheme}>
      <Grid container m={15} className={classes.profile}>
        <Grid container item md={6} sm={6}>
          <Grid item>
            <Avatar alt="user 1" src={user.picture} />
          </Grid>

          <Grid item sm className={classes.profile_name}>
            <Typography variant="h6">
              {user.first_name + " " + user.last_name}
            </Typography>
            <Typography variant="body2" color="primary">
              {user.unique_url}
            </Typography>
          </Grid>
        </Grid>

        <Grid item md={6} sm={6}>
          <Grid className={classes.button}>
            <Button variant="outlined" color="secondary">
              <Icon>add</Icon> New event type
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.root} container spacing={4}>
        {meeting.map((meeting, index) => {
          return (
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
              className="meeting_box"
              bgcolor="background.paper"
              key={index}
            >
              <Paper className={classes.meeting_box}>
                <Grid className={classes.orange_background}></Grid>
                <Grid className={classes.content}>
                  <Grid className={classes.meeting_header}>
                    <Icon color="disabled">settings</Icon>
                  </Grid>
                  <Grid className={classes.meeting_body}>
                    <Typography variant="h6">
                      {meeting.duration} minutes meeting
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {meeting.type}
                    </Typography>
                  </Grid>
                  <Grid container className={classes.meeting_footer}>
                    <Grid item>
                      <Icon color="disabled">alarm</Icon>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        {meeting.duration} min
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid className={classes.button}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => props.handleCopy(meeting.duration)}
                        >
                          Copy link
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
        {copiedText ? <Alert>Link Copied</Alert> : null}
      </Grid>

      {/* Meeting Box End */}

      <Grid container alignItems="flex-end" justify="flex-end">
        <Box mt={2}>
          <GettingStartedButton />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default MeetingComponent;
