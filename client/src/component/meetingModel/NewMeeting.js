import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MeetingForm from './MeetingForm';
import Grid from '@material-ui/core/Grid';
import MeetingModel from './MeetingModel';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       New Meeting
      </Button>
      
      <Dialog 
       fullWidth={fullWidth}
       maxWidth={maxWidth}
      open={open} onClose={handleClose} 
      aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new meeting</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
           
           <MeetingForm />
          
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
       
        </DialogActions>
      </Dialog>
    </div>
  );
}
