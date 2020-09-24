import React from "react";
import AvailabilityWidget from "../component/AvailabilityWidget"

const AvailabilitySettings = () => {
    let heading = "Set your availability";
    return (
        <React.Fragment>
          <AvailabilityWidget
            heading={heading}
          />
        </React.Fragment>
      );
};

export default AvailabilitySettings;