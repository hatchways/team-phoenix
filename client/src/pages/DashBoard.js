import React, { useContext, useEffect } from "react";
import HomePage from "../components/EventBodyComponent/HomePage";
import {
  saveUserDataInLocalStorage,
  getOnlyUserId,
} from "../utilities/SaveTokens";
import Context from "../contexts/CalendStore";
import copy from "copy-to-clipboard";
const DashBoard = (props) => {
  const userdata = saveUserDataInLocalStorage();
  const {
    setUserId,
    setEmail,
    setUser,
    userId,
    user,
    setCopiedText,
  } = useContext(Context);
  if (!userId) {
    setUserId(getOnlyUserId());
  }
  const handleUrlCopy = (duration) => {
    const url = `${user.unique_url}/${duration}`;
    copy("http://localhost:3000/" + url);
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 1000);
  };

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
    if (!user && userId) {
      fetchUser();
    }
  });
  return (
    <div>
      <HomePage handleCopy={handleUrlCopy} />
    </div>
  );
};

export default DashBoard;
