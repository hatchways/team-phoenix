import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import clock from "../assets/clock.png";
import { Paper, Box, Typography, Button } from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  forPaper: {
    width: "80%",
    height: "80%",
  },
  forContainerBox: {
    width: "100%",
    height: "100%",
  },
  forInnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  forName: {
    color: "#9e9e9e",
  },
  forImg: { width: "1.5rem" },
  forDatePicker: { width: "20%" },
}));
const SchedularWidget = (props) => {
  const classes = useStyles();
  const [value] = useState(new Date());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <Box className={classes.forContainerBox}>
      <Box className={classes.forInnerContainer}>
        <Paper className={classes.forPaper} elevation={3}>
          <Box display="flex" flexDirection="row" height="100%">
            <Box
              color="grey.300"
              borderColor="common.borderColor"
              borderRight={1}
              width="30%"
            >
              <Box ml={3} mt={4} color="black">
                <Typography
                  variant="body2"
                  className={classes.forName}
                  gutterBottom
                >
                  {props.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {props.meetingType}
                </Typography>
                <Typography variant="h6">
                  <img src={clock} alt="clock" className={classes.forImg} />
                  {props.time}
                </Typography>
              </Box>
            </Box>
            <Box ml={4}>
              <Box mt={4}>
                <Typography variant="h6">Select a date and time</Typography>
              </Box>
              <Box>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Calendar date={value} />
                  <Button>Coordinated Universal Time 00:00</Button>
                </MuiPickersUtilsProvider>
              </Box>
            </Box>
            <Box
              mt={4}
              ml={3}
              width="30%"
              display="flex"
              justifyContent="center"
            >
              <Box>
                <Typography>{`${days[value.getDay()]}, ${
                  monthNames[value.getMonth()]
                } ${value.getDate()}`}</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SchedularWidget;
