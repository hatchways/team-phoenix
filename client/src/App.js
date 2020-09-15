import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { orange, green } from "@material-ui/core/colors";
import SignUp from "./pages/SignUp";

import "./App.css";

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
      <BrowserRouter>
        <Route path="/" component={SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
