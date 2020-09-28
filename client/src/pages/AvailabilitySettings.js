import React from "react";
import history from "../history";
import AvailabilityWidget from "../component/AvailabilityWidget";

const AvailabilitySettings = () => {
  const handleFinish = (start, end, daysSelected) => {
    let unique_url = localStorage.getItem("unique_url");
    let Availability = {
      start_time: start,
      end_time: end,
      days: daysSelected,
    };
    let token = localStorage.getItem("jwt_token");
    const saveUserSetting = async () => {
      let userId = localStorage.getItem("user_id");
      if (userId && unique_url) {
        const data = await fetch(`http://localhost:5000/user/${userId}`, {
          method: "POST",
          body: JSON.stringify({
            data: { Availability, unique_url },
            token,
          }),
        });
        let result = await data.json();
        console.log(result);
        if (result.success) {
          history.push("/after-login");
        }
      }
    };
    saveUserSetting();
  };
  let heading = "Set your availability";
  return (
    <React.Fragment>
      <AvailabilityWidget heading={heading} handleFinish={handleFinish} />
    </React.Fragment>
  );
};

export default AvailabilitySettings;
