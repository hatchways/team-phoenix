import React, { useContext, useEffect } from "react";
import HomePage from "../components/EventBodyComponent/HomePage";
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
      <HomePage />
    </div>
  );
};

export default DashBoard;
