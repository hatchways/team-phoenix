import React, { useState } from "react";
import SecondAuthWidget from "../component/SecondAuthWidget";
import history from "../history";
import { Redirect } from "react-router-dom";
const Google_Auth = () => {
  const [redirect, setRedirect] = useState(false);
  const onClickHandler = async () => {
    window.location.assign("http://127.0.0.1:5000/sign-in-with-google");
  };
  return (
    <div>
      <SecondAuthWidget onClickHandler={onClickHandler} />
    </div>
  );
};

export default Google_Auth;
