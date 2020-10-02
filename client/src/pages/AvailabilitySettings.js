import React from "react";
import history from "../history";
import AvailabilityWidget from "../components/AvailabilityWidget";

const AvailabilitySettings = () => {
  const handleFinish = (start, end, daysSelected) => {
    const unique_url = localStorage.getItem("unique_url");
    const Availability = {
      start_time: start,
      end_time: end,
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
