import React, { useContext, useEffect } from "react";
import HomePage from "../components/EventBodyComponent/HomePage";
import { saveUserDataInLocalStorage } from "../utilities/SaveTokens";
import Context from "../contexts/CalendStore";
const DashBoard = () => {
  const userdata = saveUserDataInLocalStorage();
  const { setUserId, setEmail, setUser, userId, user } = useContext(Context);
  useEffect(() => {
    if (userdata) {
      setUserId(userdata.user_id);
      setEmail(userdata.email);
    }
    const fetchUser = async () => {
      const data = await fetch(`http://127.0.0.1:5000/fetch-user/${userId}`);
      let response = await data.json();
      if (response.result) {
        setUser(response.result);
      }
    };
    if (!user) {
      fetchUser();
    }
  });
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default DashBoard;
