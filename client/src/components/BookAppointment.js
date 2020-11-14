import React, { useState, useEffect, useContext } from "react";
import Context from "../contexts/CalendStore";
import moment from "moment";
import {
  Paper,
  Box,
  Typography,
  Icon,
  makeStyles,
  Button,
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
  bookingDetails: {
    fontSize: ".7rem",
    fontWeight: "700",
  },
  textArea: { width: "70%", height: "80%" },
  formInput: {
    width: "50%",
    padding: ".7rem",
  },
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
    ///console.log(await response.json());
    const message = await response.json();
    alert(message.result);
    window.location.reload();
  };
  return (
    <Box className={classes.containerBox}>
      <Box className={classes.innerContainer}>
        <Paper className={classes.paper} elevation={3}>
          <Box display="flex" flexDirection="row" height="100%" width="100%">
            <Box
              color="grey.300"
              borderColor="common.borderColor"
              borderRight={1}
              width="50%"
            >
              <Box ml={3} mt={4} color="black" width="100%">
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
                  <Box ml={1}>
                    <Typography variant="h6">
                      {`${props.meetingTime} min`}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" mt={1}>
                  <EventAvailableIcon color="primary" />
                  <Box ml={1}>
                    <Typography
                      variant="body1"
                      color="primary"
                    >{`${timeObj.fromTime} - ${timeObj.toTime}, ${timeObj.date}`}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body1" color="primary">
                    {}
                  </Typography>
                </Box>
                <Box mt={2} display="flex">
                  <Icon>public</Icon>
                  <Box ml={1}>
                    <Typography color="secondary" variant="body1">
                      {timeZone}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box ml={4}></Box>
            <Box className={classes.bookingDetails} mt={2} ml={4} width="80%">
              <form onSubmit={onSubmitHandler}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Enter Details
                  </Typography>
                </Box>
                <Box p={1}>
                  <label for="fname">
                    Name<sup>*</sup>
                  </label>
                  <br /> <br />
                  <input
                    className={classes.formInput}
                    name="fname"
                    type="text"
                    onChange={(e) => {
                      setFormName(e.target.value);
                    }}
                    required
                    value={formName}
                  />
                </Box>
                <Box p={1}>
                  <label for="email">
                    Email<sup>*</sup>
                  </label>
                  <br /> <br />
                  <input
                    value={formEmail}
                    className={classes.formInput}
                    type="text"
                    name="email"
                    onChange={(e) => {
                      setSetEmail(e.target.value);
                    }}
                    required
                  />
                </Box>
                <Box p={1}>
                  <label for="email">
                    Please share anything that will help prepare for our meeting
                  </label>
                  <br />
                  <br />
                  <textarea
                    className={classes.textArea}
                    value={textAreaContent}
                    rows="4"
                    onChange={(e) => {
                      setTextAreaContent(e.target.value);
                    }}
                  />
                </Box>
                <Box align="left" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
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
