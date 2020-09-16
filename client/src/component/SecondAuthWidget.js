import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  Typography,
  Link,
  Button,
  Avatar,
} from "@material-ui/core/";
import logo from "../assets/logo.png";
import signInBtn from "../assets/signInBtn.svg";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  forPaper: {
    margin: theme.spacing(2),
    width: theme.spacing(50),
    height: theme.spacing(55),
  },
  forOuterBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const SecondAuthWidget = (props) => {
  const classes = useStyles();
  let greatings = JSON.parse(localStorage.getItem("greetings"));
  const foooter = greatings.noGoogleText.split("?");
  let prompt = greatings.prompt;
  let email = greatings.email;
  return (
    <Box className={classes.forOuterBox}>
      <img alt="logo" src={logo}></img>
      <Paper className={classes.forPaper} variant="outlined" square>
        <Box my={4}>
          <Typography align="center" variant="h6">
            {greatings.headerText}! <br /> {email ? email : null}
          </Typography>
        </Box>
        <Box my={5}>
          <Typography align="center" variant="body2">
            {prompt ? prompt : <br />}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={props.onClickHandler}
            variant="contained"
            color="primary"
            startIcon={<Avatar src={signInBtn} />}
          >
            Sign up with Google
          </Button>
        </Box>
        <Box borderTop={1} borderColor="grey.300" mt={7}>
          <Box mt={2} display="flex" flexDirection="column">
            <Typography align="center" variant="body1">
              {foooter[0]}?
            </Typography>
            <Link
              component={RouterLink}
              color="primary"
              to={greatings.route}
              align="center"
            >
              {foooter[1]}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SecondAuthWidget;
