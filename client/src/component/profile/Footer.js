import React from "react";
import { Button, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  forContinueButton: {
    fontWeight: "bold",
    textTransform: "none",
    fontFamily: "Verdana, Arial, Helvetica, sans-serif",
    color: "#fffbfb",
    backgroundImage: "linear-gradient(to right, #fe6b00, #fe8b00);",
  },
  forSetupLater: {
    textTransform: "none",
    color: "#a8b1c7",
  },
}));

const ProfileFooter = (props) => {
  const type = props.type;
  if (type === "A") {
    return (
      <FooterA
        handleContinue={props.handleContinue}
        handleSkipbtn={props.handleSkipbtn}
      />
    );
  }
  return <FooterB />;
};

const FooterA = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item sm>
        <Button
          className={classes.forContinueButton}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          onClick={props.handleContinue}
        >
          Continue
        </Button>
      </Grid>
      <Grid item sm>
        <Button
          className={classes.forSetupLater}
          variant="text"
          size="large"
          type="submit"
          onClick={props.handleSkipbtn}
        >
          Set up later
        </Button>
      </Grid>
    </Grid>
  );
};

const FooterB = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Button
        className={classes.forContinueButton}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        Finish
      </Button>
    </Grid>
  );
};

export default ProfileFooter;
