import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Context from "../contexts/CalendStore";
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
  const { propsForAuthWidget } = useContext(Context);
  return (
    <Box className={classes.outerBox}>
      <img alt="logo" src={logo}></img>
      <Paper className={classes.paper} variant="outlined" square>
        <Box my={5}>
          <Typography align="center" variant="h6">
            {propsForAuthWidget.heading}
          </Typography>
        </Box>
        <Box mt={3}>
          <form
            onSubmit={(e) => {
              propsForAuthWidget.onSubmitHandler(e, e.target.email.value);
            }}
          >
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
                name="email"
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
                {propsForAuthWidget.btnText}
              </Button>
            </Box>
          </form>
        </Box>
        <Box borderTop={1} borderColor="grey.300" height="100%">
          <Box mt={2}>
            <Typography align="center" variant="body1">
              {propsForAuthWidget.footerText + " "}
              {propsForAuthWidget.route ? (
                <Link
                  component={RouterLink}
                  color="primary"
                  to={propsForAuthWidget.route}
                >
                  {propsForAuthWidget.linkText}
                </Link>
              ) : null}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" mt={1}>
            <Button
              align="center"
              component={RouterLink}
              to={"/dashboard?user_id=5faff71a546a252d5c0ccc30"}
              variant="contained"
              color="primary"
              size="small"
            >
              Demo User
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthHeader;
