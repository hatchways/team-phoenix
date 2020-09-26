import React, { useEffect } from "react";

const ScreenAfterLogin = () => {
  useEffect(() => {
    var urlParams = new URLSearchParams(window.location.search);
    let token = "";
    let email = "";
    if (urlParams.has("token")) {
      token = urlParams.get("token");
    }
    if (urlParams.has("email")) {
      email = urlParams.get("email");
    }
    const fetchData = async () => {
      const result = await fetch(
        "http://localhost:5000/availability?day=1600882681",
        {
          method: "POST",
          body: JSON.stringify({
            token: token,
            email: email,
          }),
        }
      );
      console.log(await result.json());
    };
    if (token && email) {
      fetchData();
    }
  });
  return <h1>Screen after auth is done and profile is correctly setup. </h1>;
};

export default ScreenAfterLogin;
