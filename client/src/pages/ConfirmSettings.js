import React from "react";
import ConfirmWidget from "../component/ConfirmWidget";
import history from "../history";
const ConfirmSettings = () => {
  let heading = "Your google calendar is connected!";
  let email = localStorage.getItem("email");
  const handleContinue = () => {
    history.push("/availability");
  };
  return (
    <React.Fragment>
      <ConfirmWidget
        heading={heading}
        email={email}
        handleContinue={handleContinue}
      />
    </React.Fragment>
  );
};

export default ConfirmSettings;
