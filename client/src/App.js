import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Router, Route, Switch } from "react-router-dom";
import { orange, green } from "@material-ui/core/colors";
import SignUp from "./pages/SignUp";
import history from "./history";
import "./App.css";
import LogIn from "./pages/LogIn";
import Google_Auth from "./pages/Google_Auth";
import ProfileSettings from "./pages/ProfileSettings";
import AvailabilitySettings from "./pages/AvailabilitySettings";
import ConfirmSettings from "./pages/ConfirmSettings";
import DashBoard from "./pages/DashBoard";
import SchedulerCalendar from "./pages/SchedulerCalendar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: orange[200],
      main: orange[500],
      dark: orange[900],
    },
    secondary: {
      light: green[200],
      main: green[500],
      dark: green[900],
    },
  },
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/auth-with-google" exact component={Google_Auth} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/login-in" exact component={LogIn} />
          <Route path="/profile_settings" exact component={ProfileSettings} />
          <Route path="/availability" exact component={AvailabilitySettings} />
          <Route path="/confirm" exact component={ConfirmSettings} />
          <Route
            path="/schedule-calendar/:meetingTime"
            exact
            component={SchedulerCalendar}
          />
          <Route path="/dashboard" exact component={DashBoard} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
