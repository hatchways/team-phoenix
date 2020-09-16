import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../NavbarComponent/NavbarComponent.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(10),
    height: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));


const Navbar = (props)=>{
  const classes = useStyles();
  return (
    <div >
      <Grid container>
      <Box className="navbar" boxShadow={5} pl={8}>
        <div className="logo">
        <img className="logo" src="/images/logo.png" alt="" className={classes.small}/>
      </div>

      <div className="nav_menu">
        <ul className="">
        <li><a href="home">Home</a></li>
        <li><a href="intergration">integration</a></li>
        <li><a href="upgrade" className="active">Upgrade account</a></li>
       
          </ul>
  
            </div>
          
            <div className="user_image">
              <Box className="user_image_box" >
            <Avatar  alt="user 1" src="/images/user.png" />
            </Box>

            <Box className="user_name_box" >
        <a  href="profile">  
       John Doe</a>
       </Box>

        </div>
         </Box>
         </Grid>
      </div>
  )
}

export default Navbar