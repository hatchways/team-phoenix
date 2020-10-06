import React, { useState } from "react";
import PropTypes from "prop-types";
import MeetingComponent from "../MeetingComponent/MeetingComponent";
import {
  Grid,
  Typography,
  Tab,
  Tabs,
  AppBar,
  makeStyles,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    marginTop: 150,
    maxWidth: 900,
    margin: "auto",
  },
  tab_content: {
    margin: "auto",
    maxWidth: "80%",
  },
  appbar: {
    backgroundColor: "rgb(247, 247, 247)",
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const HomePage = (props) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid>
        <Typography
          className={classes.title}
          variant="h4"
          display="block"
          gutterBottom
        >
          My CalendApp
        </Typography>

        <Grid className={classes.appbar}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              centered
            >
              <Tab label="EVENT TYPES" />
              <Tab label="SCHEDULED EVENTS" />
            </Tabs>
          </AppBar>
          <TabPanel className={classes.tab_content} value={value} index={0}>
            <MeetingComponent handleCopy={props.handleCopy} />
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
