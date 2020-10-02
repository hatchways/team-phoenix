import React from "react";
import { LinearProgress, withStyles } from "@material-ui/core/";

const LinearProgressBar = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#fe6b00",
  },
}))(LinearProgress);

const ProgressBar = (props) => {
  return <LinearProgressBar variant="determinate" value={props.value} />;
};

export default ProgressBar;
