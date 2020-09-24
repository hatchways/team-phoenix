import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import MeetingComponent from "../MeetingComponent/MeetingComponent";
import { makeStyles } from "@material-ui/core/styles";
import NavbarComponent from "../NavbarComponent/NavbarComponent";

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
          <Typography>{children}</Typography>
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
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavbarComponent />
      <Typography
        className={classes.title}
        variant="h4"
        display="block"
        gutterBottom
      >
        My CalendApp
      </Typography>

      <div className={classes.appbar}>
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
            <Tab
              style={{ color: "orange" }}
              label="EVENT TYPES"
              {...a11yProps(0)}
            />
            <Tab
              style={{ color: "orange" }}
              label="SCHEDULED EVENTS"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel className={classes.tab_content} value={value} index={0}>
          <MeetingComponent />
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
      </div>
    </div>
  );
}
