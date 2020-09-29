import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  Typography,
  Tab,
  Tabs,
  AppBar,
  makeStyles,
} from "@material-ui/core";
import MeetingComponent from "../MeetingComponent/MeetingComponent";
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
  colorForTabs: {
    color: "primary",
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

const EventBodyComponent = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <NavbarComponent />
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
          <MeetingComponent />
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
      </Grid>
    </Grid>
  );
};

export default EventBodyComponent;
