import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Router, Route, Switch } from "react-router-dom";
import { orange, green } from "@material-ui/core/colors";
import SignUp from "./pages/SignUp";
import history from "./history";
import "./App.css";
import SecondAuthWidget from "./component/SecondAuthWidget";

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
          <Route path="/auth-with-google" exact component={SecondAuthWidget} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
