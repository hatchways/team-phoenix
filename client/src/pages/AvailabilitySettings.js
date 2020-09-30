import React from "react";
import history from "../history";
import AvailabilityWidget from "../component/AvailabilityWidget";

const AvailabilitySettings = () => {
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
    let mintue = d.getUTCMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mintue < 10) {
      mintue = "0" + mintue;
    }
    return `${hours}:${mintue}`;
  };
  const handleFinish = (start, end, daysSelected) => {
    const unique_url = localStorage.getItem("unique_url");
    const Availability = {
      start_time: convertToUtc(start),
      end_time: convertToUtc(end),
      days: daysSelected,
    };
    const token = localStorage.getItem("jwt_token");
    const saveUserSetting = async () => {
      const userId = localStorage.getItem("user_id");
      if (userId && unique_url) {
        const data = await fetch(`http://localhost:5000/user/${userId}`, {
          method: "POST",
          body: JSON.stringify({
            data: { Availability, unique_url },
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
