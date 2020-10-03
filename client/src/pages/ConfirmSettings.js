import React, { useContext } from "react";
import ConfirmWidget from "../components/ConfirmWidget";
import Context from "../contexts/CalendStore";
import history from "../history";
const ConfirmSettings = () => {
  let heading = "Your google calendar is connected!";
  const { email } = useContext(Context);
  const handleContinue = () => {
    history.push("/availability");
  };
  const handleSkipbtn = () => {
    history.push("/availability");
  };
  return (
    <React.Fragment>
      <ConfirmWidget
        heading={heading}
        email={email}
        handleContinue={handleContinue}
        handleSkipbtn={handleSkipbtn}
      />
    </React.Fragment>
  );
};

export default ConfirmSettings;
