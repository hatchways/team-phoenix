import React from 'react';

const MeetingModel = (props)=>{

  return (
    <div >
       
       <h3>Meeting Info</h3>
      <p> <b>date</b>: {props.date}</p>
        <p><b>Start</b>: {props.time}</p>
  <p><b>Duration</b>: {props.duration} min</p>
       
      </div>
  )
}

export default MeetingModel