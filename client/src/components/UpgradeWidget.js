import React from "react";
import { Button, Paper, Typography, Box, makeStyles } from "@material-ui/core/";
import CheckIcon from "@material-ui/icons/Check";
const useStyles = makeStyles((theme) => ({
  outerBox: {
    height: "100%",
  },
  paper: {
    margin: theme.spacing(2),
    width: theme.spacing(50),
    height: theme.spacing(55),
  },
  headingColor: {
    color: "#673ab7",
  },
  greenColor: {
    color: "#2e7d32",
  },
}));
const UpgradeWidget = (props) => {
  const classes = useStyles();
  const bool = props.heading === "Premium";
  return (
    <Box className={classes.outerBox}>
      <Paper className={classes.paper}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box mt={4}>
            <Typography
              className={bool ? classes.headingColor : classes.greenColor}
              variant="h5"
            >
              {props.heading}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {bool ? "$8/month" : "$12/month"}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" color="primary">
            Upgrade
          </Button>
        </Box>
        <Box mt={10} borderTop={1}>
          <Box display="flex">
            <CheckIcon color="primary" />
            <Typography variant="body1">Unlimited meetings </Typography>
          </Box>
          <Box display="flex">
            <CheckIcon color="primary" />
            <Typography variant="body1">Group meetings </Typography>
          </Box>
          {!bool ? (
            <Box display="flex">
              <CheckIcon color="primary" />
              <Typography variant="body1">Group meetings </Typography>
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Box>
  );
};

export default UpgradeWidget;
