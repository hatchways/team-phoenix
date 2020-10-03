import React, { useContext, useEffect } from "react";
import EventBodyComponent from "../components/EventBodyComponent/EventBodyComponent";
import { saveUserDataInLocalStorage } from "../utilities/SaveTokens";
import Context from "../contexts/CalendStore";
const DashBoard = () => {
  const userdata = saveUserDataInLocalStorage();
  const { setUserId, setEmail } = useContext(Context);
  useEffect(() => {
    if (userdata) {
      setUserId(userdata.user_id);
      setEmail(userdata.email);
    }
  });
  return (
    <div>
      <EventBodyComponent />
    </div>
  );
};

export default DashBoard;
