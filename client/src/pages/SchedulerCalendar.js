import React from "react";
import SchedulerWidget from "../component/SchedularWidget";
const SchedulerCalendar = () => {
  return (
    <React.Fragment>
      <SchedulerWidget
        name="John Doe"
        meetingType="60 min meeting"
        time="60min"
      />
    </React.Fragment>
  );
};

export default SchedulerCalendar;
