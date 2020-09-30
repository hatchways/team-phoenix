import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Paper, Box, Typography, Button, Icon } from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    height: "80%",
  },
  containerBox: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  personName: {
    color: "#9e9e9e",
  },
  forDatePicker: { width: "20%" },
  freeSlots: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
  },
  scrollView: {
    maxHeight: "70%",
    overflow: "auto",
  },
}));
const SchedularWidget = (props) => {
  const classes = useStyles();
  const value = props.dateSelected;
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
    <Box className={classes.containerBox}>
      <Box className={classes.innerContainer}>
        <Paper className={classes.paper} elevation={3}>
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
                  className={classes.personName}
                  gutterBottom
                >
                  {props.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {props.meetingType}
                </Typography>
                <Box display="flex">
                  {" "}
                  <Icon color="disabled">alarm</Icon>
                  <Typography variant="h6">{props.time}</Typography>
                </Box>
              </Box>
            </Box>
            <Box ml={4}>
              <Box mt={4}>
                <Typography variant="h6">Select a date and time</Typography>
              </Box>
              <Box>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Calendar
                    date={value}
                    onChange={props.handleOnChangeCalendar}
                  />
                  <Button>Coordinated Universal Time 00:00</Button>
                </MuiPickersUtilsProvider>
              </Box>
            </Box>
            <Box className={classes.freeSlots} mt={4} ml={4}>
              <Box display="flex" flexDirection="column">
                <Box mb={2}>
                  <Typography>{`${days[value.getDay()]}, ${
                    monthNames[value.getMonth()]
                  } ${value.getDate()}`}</Typography>
                </Box>
                <Paper className={classes.scrollView}>
                  {props.availableSlots.map((curr, index) => {
                    return (
                      <Box
                        key={index}
                        display="flex"
                        flexDirection="row"
                        mt={1}
                      >
                        <Box mr={1}>
                          <Button variant="outlined" color="primary">
                            {curr}
                          </Button>
                        </Box>
                        <Box>
                          <Button variant="outlined" color="primary">
                            Confirm
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </Paper>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SchedularWidget;
