import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  Link,
} from "@material-ui/core/";
import logo from "../assets/logo.png";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    width: theme.spacing(50),
    height: theme.spacing(55),
  },
  outerBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const AuthHeader = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  return (
    <Box className={classes.outerBox}>
      <img alt="logo" src={logo}></img>
      <Paper className={classes.paper} variant="outlined" square>
        <Box my={5}>
          <Typography align="center" variant="h6">
            {props.heading}
          </Typography>
        </Box>
        <Box mt={3}>
          <form onSubmit={(e) => props.onSubmitHandler(e, email)}>
            <Box>
              <Typography align="center" variant="body1" gutterBottom>
                Enter your e-mail to get started:
              </Typography>
            </Box>
            <Box p={2}>
              <TextField
                label="E-mail address"
                type="search"
                variant="standard"
                fullWidth
                align="center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box align="center" my={5}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                {props.btnText}
              </Button>
            </Box>
          </form>
        </Box>
        <Box borderTop={1} borderColor="grey.300" height="100%">
          <Box mt={2}>
            <Typography align="center" variant="body1">
              {props.footerText + " "}
              <Link component={RouterLink} color="primary" to={props.route}>
                {props.linkText}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthHeader;
