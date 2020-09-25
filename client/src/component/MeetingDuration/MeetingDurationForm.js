import React, { Component } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";

class MeetingDurationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 15,
      user_id: "5f69713107ad65349c8ad946",
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

  async createMeeting() {
    try {
      let result = await fetch(
        // "http://localhost:5000/meeting/"+this.state.user_id +"/" +this.state.duration,
        "http://localhost:5000/meeting/5f69713107ad65349c8ad946/45",
        {
          method: "get",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          // body: JSON.stringify({
          //   user_id: '5f69713107ad65349c8ad946',
          //   duration: '45'
          // })
        }
      );
      console.log("Worked");
    } catch (e) {
      console.log(e);
      console.log("didnt Work sorry");
    }
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item>
            <Grid container>
              <form noValidate autoComplete="off">
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
                  <Button
                    onClick={this.createMeeting}
                    variant="outlined"
                    type="submit"
                    color="primary"
                  >
                    Submit
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

export default MeetingDurationForm;
