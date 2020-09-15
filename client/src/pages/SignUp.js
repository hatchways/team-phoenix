import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Typography, TextField, Button } from "@material-ui/core/";
import logo from "../assets/logo.png";
import FooterForAuth from "../compoment/FooterForAuth";
const useStyles = makeStyles((theme) => ({
  forPaper: {
    margin: theme.spacing(2),
    width: theme.spacing(50),
    height: theme.spacing(60),
  },
  forOuterBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const SignUp = () => {
  const classes = useStyles();

  return (
    <Box className={classes.forOuterBox} border={1}>
      <img alt="logo" src={logo}></img>
      <Paper className={classes.forPaper} variant="outlined" square>
        <Box my={5}>
          <Typography align="center" variant="h5">
            Sign up with CalendApp
          </Typography>
        </Box>
        <Box mt={3}>
          <form>
            <Box>
              <Typography align="center" variant="body1" gutterBottom>
                Enter your e-mail to get started:
              </Typography>
            </Box>
            <Box p={2}>
              <TextField
                label="E-mail address"
                type="search"
                variant="outlined"
                fullWidth
                align="center"
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
                Get Started
              </Button>
            </Box>
          </form>
        </Box>
        <Box borderTop={1} borderColor="grey.300">
          <FooterForAuth />
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
