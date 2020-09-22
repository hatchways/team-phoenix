import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../meetingModel/MeetingForm.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import InputLabel from "@material-ui/core/InputLabel";
import "react-calendar/dist/Calendar.css";
import Grid from '@material-ui/core/Grid';
import MeetingModel from './MeetingModel';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class MeetingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: null,

      duration: 15,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (date) => this.setState({ date });

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log(this.state.date.toString());
    console.log(this.state.time);

    console.log(this.state.duration);
    event.preventDefault();
  }

  submit;
  render() {
    return (
      <div>
       
      <Grid container>


        <Grid item md={6}>


        <MeetingModel date={this.state.date.toLocaleDateString()} 
        time={this.state.time} 
        duration ={this.state.duration}
        />
        </Grid>

        <Grid item md ={6}>
                 {/* User Start */}
<Grid container  >
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
{/* User end */}
      <Grid container>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </Grid>
        <Grid container>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
         <Grid container>
            <FormControl component="fieldset">
              <p>Time:</p>
              <TextField
                id="outlined-basic"
                name="time"
                label="HH:MM"
                min="00:00" max="24:00"
                onChange={(event) => this.handleChange(event)}
                value={this.state.time}
                variant="outlined"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </FormControl>
            </Grid>
         
         <Grid container>
            <FormControl component="fieldset">
              <FormLabel component="legend">Duration: </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                onChange={(event) => this.handleChange(event)}
                name="duration"
                defaultValue="15"
              >
                <FormControlLabel
                  value="15"
                  control={<Radio color="primary" />}
                  label="15min"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="30"
                  control={<Radio color="primary" />}
                  label="30min"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="45"
                  control={<Radio color="primary" />}
                  label="45min"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

       <Grid container>
            <Button variant="outlined" type="submit" color="primary">
              Create meeting
            </Button>
            </Grid>
        </form>
        </Grid>
        </Grid>
        
        </Grid>
      </div>
    );
  }
}

export default MeetingForm;
