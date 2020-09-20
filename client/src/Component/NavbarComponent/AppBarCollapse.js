/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import '../NavbarComponent/NavbarComponent.css';

const styles = theme => ({
  root: {
    position: "absolute",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
  
    },
    // margin: "10px",
    // paddingLeft: "16px",
    // right: 0,
    // position: "relative",
    // width: "100%",
    // background: "transparent"
  
  }
});

const AppBarCollapse = props => (
  <div className={props.classes.root}>

    <ButtonAppBarCollapse>
      <MenuItem>Login</MenuItem>
      <MenuItem>Signup</MenuItem>
    </ButtonAppBarCollapse>
    <div className={props.classes.buttonBar} id="appbar-collapse">
           <Grid container className="main_menu" md={12} >
       <a href="home">Home</a>
         <a href="intergration">integration</a>
         <a href="upgrade" className="active">Upgrade account</a>
      
      {/* <Button color="inherit">Home</Button>
      <Button color="inherit">Integration</Button>
      <Button color="inherit">Update account</Button> */}
     
             <Avatar className="avatar"  alt="user 1" src="/images/user.png" />
             <a href="home">John Doe</a>
            
            
    
     </Grid>

    </div>
  </div>
);

export default withStyles(styles)(AppBarCollapse);
