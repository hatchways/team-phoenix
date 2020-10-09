import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import SchedulerWidget from "../components/SchedularWidget";
import BookAppointment from "../components/BookAppointment";
import Context from "../contexts/CalendStore";
const SchedulerCalendar = (props) => {
  const [freeSlots, setFreeSlots] = useState([]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [showForm, setShowForm] = useState(true);
  let paths = window.location.pathname.split("/");
  const meetingTime = paths[3];
  const unique_url = `book-appointment/${paths[2]}`;
  const { setUser, user, setUniqueUrl } = useContext(Context);
  const [slectedTime, setSelectedTime] = useState("");
  const handleConfirm = (time) => {
    setShowForm(false);
    setSelectedTime(time);
  };
  useEffect(() => {
    const getAvailableSlots = (freeSlotsArray) => {
      const availableSlots = [];
      freeSlotsArray.forEach((element, index) => {
        var current = moment.unix(element.start);
        var end = moment.unix(element.end);
        while (current <= end) {
          const testDateUtc = moment.utc(current.format("YYYY-MM-DD HH:mm:ss"));
          const localDate = moment(testDateUtc).local();
          const now = moment();
          if (now < localDate) {
            availableSlots.push(localDate.format("HH:mm"));
          }
          current.add(meetingTime, "minutes");
        }
        if (freeSlotsArray.length > 0) {
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
            unique_url,
            email: user.email,
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
    if (unique_url && user.email) {
      fetchData();
    }
  }, [meetingTime, dateSelected, user, unique_url]);
  const handleOnChangeCalendar = (date) => {
    setDateSelected(date);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch(
        `http://127.0.0.1:5000/fetch-user-by-url?unique_url=${unique_url}`
      );
      let response = await data.json();
      if (response.result) {
        setUser(response.result);
      }
    };
    if (!user && unique_url) {
      setUniqueUrl(unique_url);
      fetchUser();
    }
  });
  const disableWeekends = (dateSelected) => {
    return dateSelected.getDay() === 0 || dateSelected.getDay() === 6;
  };
  return (
    <React.Fragment>
      {showForm ? (
        <SchedulerWidget
          name={user.first_name + " " + user.last_name}
          meetingType={`${meetingTime} min meeting`}
          time={`${meetingTime} min`}
          availableSlots={freeSlots}
          handleOnChangeCalendar={handleOnChangeCalendar}
          dateSelected={dateSelected}
          handleConfirm={handleConfirm}
          disableWeekends={disableWeekends}
          currentTime={`Current time: ${moment().format(
            "YYYY-MM-DD h:mm:ss a"
          )}`}
        />
      ) : (
        <BookAppointment
          name={user.first_name + " " + user.last_name}
          meetingType={`${meetingTime} min meeting`}
          time={slectedTime}
          meetingTime={`${meetingTime}`}
          dateSelected={dateSelected}
        />
      )}
    </React.Fragment>
  );
};

export default SchedulerCalendar;
