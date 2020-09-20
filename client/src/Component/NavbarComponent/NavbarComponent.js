// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import '../NavbarComponent/NavbarComponent.css';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
// import orange from '@material-ui/core/colors/orange';
// import Button from '@material-ui/core/Button';
// import {ThemeProvider} from '@material-ui/styles';

// const theme = createMuiTheme({
//   palette: {
//     // primary: {
//     //   main: purple[500],
//     // },
//     // secondary: {
//     //  main: orange[500]
//     // },
//   },
// });

// const Navbar = (props)=>{
  
//   return (
//     <ThemeProvider theme={theme}>
//     <div >
//       <Grid container>
//       <Box className="navbar" boxShadow={5} pl={8}>
//         <div className="logo">
//         <img className="logo" src="/images/logo.png" alt="" />
//       </div>

//       <div className="nav_menu">
//         <ul className="">
//         <li><a href="home">Home</a></li>
//         <li><a href="intergration">integration</a></li>
//         <li><a href="upgrade" className="active">Upgrade account</a></li>
       
//           </ul>
  
//             </div>
          
//             <div className="user_image">
//               <Box className="user_image_box">
//             <Avatar  alt="user 1" src="/images/user.png" />
//             </Box>

//             <Box className="user_name_box" >
            
//         <a  href="profile">  
//        John Doe</a>
//        </Box>

//         </div>
//          </Box>
//          </Grid>
//       </div>
//       </ThemeProvider>
//   )
// }

// export default Navbar

              // ----------------------------------------------------
              // --------------- Responsive Navbar ------------------
              // ----------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GettingStartedButton from '../GettingStartedButton/GettingStartedButton';
import AppBarCollapse from "./AppBarCollapse";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navigation: {
    background: 'white',
    color:'black'
  },
  toggleDrawer: {},
  appTitle: {}
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.navigation}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          className={classes.toggleDrawer}
        >
         <img className="logo" src="/images/logo.png" alt="" />
        </IconButton>
        <Typography
          variant="title"
          color="inherit"
          className={classes.appTitle}
        >
          
        </Typography>
        <AppBarCollapse />
      
      </Toolbar>
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
