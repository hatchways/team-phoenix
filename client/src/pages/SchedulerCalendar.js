import React, { useEffect, useState } from "react";
import moment from "moment";
import SchedulerWidget from "../component/SchedularWidget";
const SchedulerCalendar = (props) => {
  const [freeSlots, setFreeSlots] = useState([]);
  const meetingTime = props.match.params.meetingTime;
  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    let email = localStorage.getItem("email");
    const getAvailableSlots = (freeSlotsArray) => {
      const availableSlots = [];
      freeSlotsArray.forEach((element) => {
        var current = moment.unix(element.start);
        var end = moment.unix(element.end);
        while (current <= end) {
          availableSlots.push(current.format("HH:mm"));
          current.add(meetingTime, "minutes");
        }
      });
      return availableSlots;
    };
    const fetchData = async () => {
      const result = await fetch(
        `http://localhost:5000/availability?day=1601460601`,
        {
          method: "POST",
          body: JSON.stringify({
            access_token,
            email,
          }),
        }
      );
      const obj = await result.json();

      if (obj.result) {
        setFreeSlots(getAvailableSlots(obj.result));
        console.log("SSSS");
      } else {
        alert(obj.error);
      }
    };
    if (access_token && email) {
      fetchData();
    }
  }, [meetingTime]);
  return (
    <React.Fragment>
      <SchedulerWidget
        name="John Doe"
        meetingType={`${60} min meeting`}
        time={`${60} min`}
        availableSlots={freeSlots}
      />
    </React.Fragment>
  );
};

export default SchedulerCalendar;
