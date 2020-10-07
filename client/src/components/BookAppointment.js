import React, { useState, useEffect, useContext } from "react";
import Context from "../contexts/CalendStore";
import moment from "moment";
import {
  Paper,
  Box,
  Typography,
  Icon,
  makeStyles,
  TextField,
  Button,
  TextareaAutosize,
} from "@material-ui/core/";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
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
  textArea: { width: "100%" },
}));

const BookAppointment = (props) => {
  const classes = useStyles();
  const [formName, setFormName] = useState("");
  const [formEmail, setSetEmail] = useState("");
  const [textAreaContent, setTextAreaContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { user, uniqueUrl } = useContext(Context);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateProcess = () => {
    let time = props.time;
    let momentTime = moment(props.dateSelected);
    var splitTime = time.split(/:/);
    momentTime
      .hours(parseInt(splitTime[0]))
      .minutes(parseInt(splitTime[1]))
      .seconds(0)
      .milliseconds(0);

    return {
      momentTime: momentTime.clone(),
      fromTime: momentTime.format("HH:mm"),
      toTime: momentTime.add(props.meetingTime, "minutes").format("HH:mm"),
      date: momentTime.format("MMMM Do YYYY"),
    };
  };
  const timeObj = dateProcess();
  useEffect(() => {
    const meetingStart = timeObj.momentTime.add(0, "minutes").format();
    const meetingEnd = timeObj.momentTime
      .add(props.meetingTime, "minutes")
      .format();
    setStartTime(meetingStart);
    setEndTime(meetingEnd);
  }, [setStartTime, setEndTime, props.meetingTime, timeObj.momentTime]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      user_id: user._id,
      summary: user.first_name + " and " + formName,
      description: "one to one, " + props.meetingTime + " min meeting",
      start: { dateTime: startTime, timeZone },
      end: { dateTime: endTime, timeZone },
      attendees: [{ email: user.email }, { email: formEmail }],
    };
    const response = await fetch("http://localhost:5000/create-appointment", {
      method: "POST",
      body: JSON.stringify({ appointment: data, unique_url: uniqueUrl }),
    });
    console.log(await response.json());
  };
  return (
    <Box className={classes.containerBox}>
      <Box className={classes.innerContainer}>
        <Paper className={classes.paper} elevation={3}>
          <Box display="flex" flexDirection="row" height="100%">
            <Box
              color="grey.300"
              borderColor="common.borderColor"
              borderRight={1}
              width="40%"
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
                  <Icon>alarm</Icon>
                  <Typography variant="h6">
                    {`${props.meetingTime} min`}
                  </Typography>
                </Box>
                <Box display="flex" mt={2}>
                  <EventAvailableIcon color="primary" />
                  <Typography
                    variant="h5"
                    color="primary"
                  >{`${timeObj.fromTime} - ${timeObj.toTime}`}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    color="primary"
                  >{`${timeObj.date}`}</Typography>
                </Box>
                <Box mt={2}>
                  <Typography color="secondary" variant="body1">
                    {"Time-Zone: " + timeZone}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box ml={4}></Box>
            <Box className={classes.freeSlots} mt={4} ml={4} width="80%">
              <form onSubmit={onSubmitHandler}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Enter Details
                  </Typography>
                </Box>
                <Box p={2}>
                  <TextField
                    label="Name"
                    type="search"
                    variant="standard"
                    fullWidth
                    align="center"
                    name="name"
                    onChange={(e) => {
                      setFormName(e.target.value);
                    }}
                    required
                    value={formName}
                  />
                </Box>
                <Box p={2}>
                  <TextField
                    label="Email"
                    value={formEmail}
                    type="search"
                    variant="standard"
                    fullWidth
                    align="center"
                    name="email"
                    onChange={(e) => {
                      setSetEmail(e.target.value);
                    }}
                    required
                  />
                </Box>
                <Box p={2}>
                  <TextareaAutosize
                    className={classes.textArea}
                    aria-label="minimum height"
                    rowsMin={4}
                    value={textAreaContent}
                    onChange={(e) => {
                      setTextAreaContent(e.target.value);
                    }}
                    placeholder="Please share anything that will help prepare for our meeting."
                  />
                </Box>
                <Box align="center" my={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                  >
                    Schedule Event
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default BookAppointment;
