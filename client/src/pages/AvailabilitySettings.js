import React, { useContext } from "react";
import history from "../history";
import AvailabilityWidget from "../component/AvailabilityWidget";
import Context from "../contexts/CalendStore";

const AvailabilitySettings = () => {
  const { uniqueUrl, userId } = useContext(Context);
  const convertToUtc = (time) => {
    const now = new Date();
    let d = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time.slice(0, 2),
      time.slice(3),
      0
    );
    let hours = d.getUTCHours();
    let minute = d.getUTCMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return `${hours}:${minute}`;
  };
  const handleFinish = (start, end, daysSelected) => {
    const availability = {
      start_time: convertToUtc(start),
      end_time: convertToUtc(end),
      days: daysSelected,
    };
    const token = localStorage.getItem("jwt_token");
    const saveUserSetting = async () => {
      if (userId && uniqueUrl) {
        const data = await fetch(`http://localhost:5000/user/${userId}`, {
          method: "POST",
          body: JSON.stringify({
            data: { availability, uniqueUrl },
            token,
          }),
        });
        const result = await data.json();
        if (result.success) {
          history.push("/dashboard");
        }
      }
    };
    saveUserSetting();
  };
  return (
    <React.Fragment>
      <AvailabilityWidget
        heading={"Set your availability"}
        handleFinish={handleFinish}
      />
    </React.Fragment>
  );
};

export default AvailabilitySettings;
