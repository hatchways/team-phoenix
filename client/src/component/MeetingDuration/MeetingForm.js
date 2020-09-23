import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./MeetingForm.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import InputLabel from "@material-ui/core/InputLabel";
import "react-calendar/dist/Calendar.css";
import Grid from "@material-ui/core/Grid";
import MeetingModel from "./MeetingModel";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

class MeetingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 15,
      user_id: '5f6973ae887c2f4cd0d5eb70'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log(this.state.duration);
    event.preventDefault();
  }

  // Creating meeting api call

  async createMeeting(){

    try{
      let result = await fetch('http://localhost:3000/meeting/'
      +this.state.user_id+'/'
      +this.state.duration,{
        method:'GET',
        mode:'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        },
        // body:JSON.stringify({
        //     'user_id':this.state.user_id,
        //     'duration':this.state.duration
        // })
      });
    }catch(e){
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item>
        

            <Grid container>
              <form noValidate autoComplete="off"
              
               
               >
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
                  <Button onClick={this.createMeeting} variant="outlined" type="submit" color="primary">
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
