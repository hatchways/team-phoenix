import React from "react";
import AvailabilityWidget from "../component/AvailabilityWidget";
import history from "../history";
const AvailabilitySettings = () => {
  let heading = "Set your availability";
  return (
    <React.Fragment>
      <AvailabilityWidget
        heading={heading}
        send_to_skeleton={() => {
          history.push("/skeleton");
        }}
      />
    </React.Fragment>
  );
};

export default AvailabilitySettings;
