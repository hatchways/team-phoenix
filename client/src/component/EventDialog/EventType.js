import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import {grey, orange} from '@material-ui/core/colors';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  title:{
    marginTop:30,
    marginBottom: 40
  },
  
  icon_grid:{
    height:"5rem",
    width: "5rem"
  },
  options:{
    marginTop: "4rem"
  }
}));

const defaultProps = {

  style: { width: '5rem', height: '5rem' },
  border: 1,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
    main: grey[700]
    }
  
  },
});



const EventType = ()=>{
  const classes = useStyles();
  return(

    <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <Grid container justify="center" alignItems="flex-end" className={classes.title}>

        <Typography variant="h5" >
          Create New Event Type
          </Typography>
        </Grid>

        {/* ---------- Create One-on-One Event ------------------*/}
     <Grid container direction="row" alignItems="center" className={classes.options}>
    <Grid item  >
      <Box mx={3} borderColor="orange" borderRadius="50%" {...defaultProps}>
      <Grid item container  className={classes.icon_grid} justify="center" alignItems="center" >
        <Icon fontSize="large" >person</Icon>
       </Grid>
    </Box>
      </Grid>
      <Grid item className="icon_circle" sm>
    <Typography variant="h6">
    One-on-One
    </Typography>
    <Typography variant="body1" color="secondary">
    Let an invitee pick a time to meet with you.
    </Typography>
      </Grid>
      <Grid item sm>
        <Grid  container item justify="flex-end">
    <Button variant="contained" color="primary">
    Create
      </Button>
      </Grid>
</Grid>
       </Grid>

        {/* ---------- Create Group Event ------------------*/}

       <Grid container direction="row" alignItems="center" className={classes.options}>
    <Grid item  >
      <Box mx={3} borderColor="orange" borderRadius="50%" {...defaultProps}>
      <Grid item container  className={classes.icon_grid} justify="center" alignItems="center" >
        <Icon fontSize="large" >person</Icon>
       </Grid>
    </Box>
      </Grid>
      <Grid item className="icon_circle" sm>
    <Typography variant="h6">
    Group
    </Typography>
    <Typography variant="body1" color="secondary">
    Let multiple invitees meet with you at one time.
    </Typography>
      </Grid>
      <Grid item sm>
        <Grid  container item justify="flex-end">
    <Button variant="contained" color="primary">
    Create
      </Button>
      </Grid>
</Grid>
       </Grid>
      </Container>
      </ThemeProvider>
  );
};

export default EventType;