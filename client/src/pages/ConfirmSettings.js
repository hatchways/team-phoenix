import React from "react";
import ConfirmWidget from "../component/ConfirmWidget"

const ConfirmSettings = () => {
    let heading = "Your google calendar is connected!";
    let email = "john.doe@gmail.com"
    return (
        <React.Fragment>
          <ConfirmWidget
            heading={heading}
            email={email}
          />
        </React.Fragment>
      );
};

export default ConfirmSettings;