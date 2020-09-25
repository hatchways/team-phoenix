import React, { Component } from "react";

const API = "http://localhost:5000/meetings/5f69713107ad65349c8ad946";
// const USER_ID = "5f69713107ad65349c8ad946";
export default class MeetingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
    };
  }
  componentDidMount = () => {
    fetch(
      API
      // + USER_ID
    )
      .then((response) => response.json())
      .then((data) => this.setState({ meetings: data.meetings }));
  };
  render() {
    const { meetings } = this.state;
  
    return (
      <div>  
       Number of meetings: {meetings.length}
        <ul>
          {
          meetings.map((meeting) => (
            <li>Duration: {meeting.duration}</li>
  ))
}
        </ul>
      </div>
    );
  }
}
