import React from "react";
// import SecondAuthWidget from "../component/SecondAuthWidget";
import SecondAuthWidget from "../component/SecondAuthWidget";
const Google_Auth = () => {
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
