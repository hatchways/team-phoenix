import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Router, Route, Switch } from "react-router-dom";
import { orange, green } from "@material-ui/core/colors";
import SignUp from "./pages/SignUp";
import history from "./history";
import "./App.css";
import LogIn from "./pages/LogIn";
import Google_Auth from "./pages/Google_Auth";
import ScreenAfterLogin from "./pages/ScreenAfterLogin";
import NavbarComponent from "./Component/NavbarComponent/NavbarComponent";
import EventBodyComponent from "./Component/EventBodyComponent/EventBodyComponent";
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
          <Route path="/after-login" exact component={ScreenAfterLogin} />
          <Route path="/skeleton" exact component={EventBodyComponent}/>

        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
