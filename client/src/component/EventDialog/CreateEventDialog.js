import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    "& > *": {
      margin: 8,
      width: "80ch",
    },
  },
}));

export default function MaxWidthDialog(props) {
  const [state, setState] = useState({
    user_id: localStorage.getItem("user_id"),
    event_name: "",
    type: localStorage.getItem("type"),
    description: "",
    duration: 15,
  });

  const [selectedValue, setSelectedValue] = useState("15");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("lg");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const inputChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createEvent = (event) => {
    
    let eventobj = 
      {
        "user_id":state.user_id,
        "name":state.event_name,
        "event_type":state.type,
        "description":state.description,
        "duration":state.duration
    }
    
    console.log("SSSSS");
    fetch(
      "http://localhost:5000/meeting",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(eventobj)
      }
    )
      .then((r) => r.json())
      .then((res) => {
        if (res) {
          console.log("Not working");
        }
      });

    event.preventDefault();
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
        <DialogTitle>
          <Grid container justify="center">
            Create a {props.type} event
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form
              onSubmit={createEvent}
              className={classes.form}
              autoComplete="off"
            >
              <TextField
                name="event_name"
                onChange={(event) => inputChange(event)}
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
              <TextField
                onChange={(event) => inputChange(event)}
                name="description"
                multiline
                fullWidth
                id="outlined-basic"
                label="Description"
                variant="outlined"
              />

              <FormControl component="fieldset">
                <FormLabel component="legend">Event Duration </FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="duration"
                  onChange={(event) => inputChange(event)}
                  defaultValue="15"
                >
                  <FormControlLabel
                    value="15"
                    control={<Radio color="primary" />}
                    label="15 min"
                    labelPlacement="bottom"
                  />

                  <FormControlLabel
                    value="30"
                    control={<Radio color="primary" />}
                    label="30 min"
                    labelPlacement="bottom"
                  />

                  <FormControlLabel
                    value="45"
                    control={<Radio color="primary" />}
                    label="45 min"
                    labelPlacement="bottom"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                type="submit"
              >
                Create event
              </Button>
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
