import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../MeetingComponent/MeetingComponent.css';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import Paper from "@material-ui/core/Paper";
import shadows from '@material-ui/core/styles/shadows';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GettingStartedButton from '../GettingStartedButton/GettingStartedButton';


const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
    primary:{
      main: grey[600]
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
   flexGrow: 1
    
  },
  paper: {
    // padding: theme.spacing(0),
    // textAlign: "center",
    // color: "red",
        background: theme.palette.text.default,
        boxShadow:shadows[3],
       paddingBottom: theme.spacing(3),  
  },
  profile: {
    padding: theme.spacing(3),
    
  }
  
}));

export default function Height() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={outerTheme}>

      <Grid container m={15} className={classes.profile}>

        <Grid container md={6} >
          <Grid item sm={1} className="profile_picture" >
        <Avatar  alt="user 1" src="/images/user.png" />
        
         </Grid>

         <Grid item sm className="profile_name">
           <Typography variant="h6">
      John Doe
      </Typography>
      <Typography variant="body2" color="primary">
      calendapp.com/john-doe
      </Typography>
         </Grid>

          </Grid>

          <Grid className="event_button" item md={6}>
          <Button
             className="footer_button"
             variant="outlined"
            
             color="secondary"
             >
            <Icon>add</Icon>  New event type
               </Button>

       
            </Grid>
        </Grid>

     <div className={classes.root}>
    <Grid container spacing={4} >
      <Grid item md={4} sm={6} xs={12}
        className="meeting_box"
        boxShadow={3}
        bgcolor="background.paper"
        style={{ width: '20rem', height: '20rem'}}
      >
          <Paper className={classes.paper} >
        <div className="meeting_blue"></div>
        <div className="content">
          <div className="meeting_header" >
          <Icon color="disabled">settings</Icon>
            </div>
            <div className="meeting_body">
         <h3 >15 munite meeting</h3>
         <span >One-on-one</span>
         </div>
           <div className="meeting_footer">
            <Icon  color="disabled">alarm</Icon> 
            <span> 15 min </span>
             <Button
             className="footer_button"
             variant="outlined"
             
             color="secondary"
             >
              Copy link
               </Button>
             </div>
          </div>
          </Paper>
      </Grid>

      {/* ------------------------------------------------------- */}
    
      <Grid item md={4} sm={6} xs={12}
        className="meeting_box"
        boxShadow={3}
        bgcolor="background.paper"
        style={{ width: '20rem', height: '20rem'}}
      >
          <Paper className={classes.paper} >
        <div className="meeting_green"></div>
        <div className="content">
          <div className="meeting_header" >
          <Icon color="disabled">settings</Icon>
            </div>
            <div className="meeting_body">
         <h3 >15 munite meeting</h3>
         <span >One-on-one</span>
         </div>
           <div className="meeting_footer">
            <Icon  color="disabled">alarm</Icon> 
            <span> 15 min </span>
             <Button
             className="footer_button"
             variant="outlined"
             
             color="secondary"
             >
              Copy link
               </Button>
             </div>
          </div>
          </Paper>
      </Grid>
    

    {/* ---------------------------- Box 2 ---------------------------------- */}


    <Grid item md={4} sm={6} xs={12}
        className="meeting_box"
        boxShadow={3}
        bgcolor="background.paper"
        style={{ width: '20rem', height: '20rem'}}
      >
          <Paper className={classes.paper} >
        <div className="meeting_orange"></div>
        <div className="content">
          <div className="meeting_header" >
          <Icon color="disabled">settings</Icon>
            </div>
            <div className="meeting_body">
         <h3 >15 munite meeting</h3>
         <span >One-on-one</span>
         </div>
           <div className="meeting_footer">
            <Icon  color="disabled">alarm</Icon> 
            <span> 15 min </span>
             <Button
             className="footer_button"
             variant="outlined"
             
             color="secondary"
             >
              Copy link
               </Button>
             </div>
          </div>
          </Paper>
      </Grid>


      {/* ----------------------------- Box 2 ------------------------------- */}

     
    </Grid>
    </div>
    <Grid container mt={2} alignItems="flex-end" justify="flex-end">
    <GettingStartedButton />
    </Grid>
    </ThemeProvider>
  );
}
