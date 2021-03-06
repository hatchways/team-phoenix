import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import history from "../../history";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #f57c00 30%, #ff9800 90%)",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
});

const GettingStartedButton = () => {
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }}
      onClick={() => {
        history.push("/schedule-calendar/60");
      }}
    >
      Getting started guide
    </Button>
  );
};

export default GettingStartedButton;
