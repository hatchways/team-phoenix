import React, { useEffect, useState } from "react";
import moment from "moment";
import SchedulerWidget from "../component/SchedularWidget";
const SchedulerCalendar = (props) => {
  const [freeSlots, setFreeSlots] = useState([]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const meetingTime = props.match.params.meetingTime;
  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    let email = localStorage.getItem("email");
    const getAvailableSlots = (freeSlotsArray) => {
      const availableSlots = [];
      freeSlotsArray.forEach((element, index) => {
        var current = moment.unix(element.start);
        var end = moment.unix(element.end);
        while (current <= end) {
          var testDateUtc = moment.utc(current.format("YYYY-MM-DD HH:mm:ss"));
          var localDate = moment(testDateUtc).local();
          availableSlots.push(localDate.format("HH:mm"));
          current.add(meetingTime, "minutes");
        }
        if (freeSlotsArray.length > 0 && index !== freeSlotsArray.length - 1) {
          availableSlots.pop();
        }
      });
      return availableSlots;
    };
    const fetchData = async () => {
      const result = await fetch(
        `http://localhost:5000/availability?day=${(
          dateSelected.getTime() / 1000
        ).toFixed(0)}`,
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
      } else {
        alert(obj.error);
      }
    };
    if (access_token && email) {
      fetchData();
    }
  }, [meetingTime, dateSelected]);
  const handleOnChangeCalendar = (date) => {
    setDateSelected(date);
  };
  const disableWeekends = (dateSelected) => {
    return dateSelected.getDay() === 0 || dateSelected.getDay() === 6;
  };
  return (
    <React.Fragment>
      <SchedulerWidget
        name="John Doe"
        meetingType={`${meetingTime} min meeting`}
        time={`${meetingTime} min`}
        availableSlots={freeSlots}
        handleOnChangeCalendar={handleOnChangeCalendar}
        dateSelected={dateSelected}
        disableWeekends={disableWeekends}
      />
    </React.Fragment>
  );
};

export default SchedulerCalendar;
