import React, {Component} from 'react';

const EventModel = (props) =>{

return (
<div>
type: {props.type}
name: {props.name}
duration: {props.duration}
user_id:{props.user_id}
description: {props.description}

  </div>
);

};

export default EventModel;