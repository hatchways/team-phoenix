import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  
  form: {
  
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '& > *':{
      margin: 8,
      width: "80ch"
    }

  },
}));
export default function MaxWidthDialog(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('lg');

  const handleClickOpen = () => {
    setOpen(true);
 
  };

  const handleClose = () => {
    setOpen(false);
    
  };



  return (
  <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create
      </Button>
     
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle >
          <Grid container justify="center">
          Create a {props.type} event
          </Grid>
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          <form className={classes.form} autoComplete="off">
      <TextField  fullWidth id="outlined-basic" label="Name" variant="outlined" />
      <TextField multiline fullWidth id="outlined-basic" label="Description" variant="outlined" />
      
    </form>
        
          </DialogContentText>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
