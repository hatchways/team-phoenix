import React, { useEffect, useState } from "react";
import ProfileWidget from "../component/ProfileWidget";
import history from "../history";
const saveUserDataInLocalStorage = () => {
  var urlParams = new URLSearchParams(window.location.search);
  let token = "";
  let email = "";
  let user_id = "";
  if (urlParams.has("token")) {
    token = urlParams.get("token");
  }
  if (urlParams.has("email")) {
    email = urlParams.get("email");
  }
  if (urlParams.has("user_id")) {
    user_id = urlParams.get("user_id");
  }
  if (token && email && user_id) {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("user_id", user_id);
    return { user_id, token, email };
  } else {
    return null;
  }
};
const ProfileSettings = () => {
  let heading = "Welcome to CalendApp!";
  let url_prompt = "Create your CalendApp URL:";
  let url_prefix = "calendapp.com/";
  let timezone_prompt = "Select your Time zone:";
  let timezone_default = "UTC Time";
  const [term, set_url] = useState("");
  const [result_for_url, set_result_for_url] = useState("Unavailable");
  let userdata = saveUserDataInLocalStorage();

  const handleContinue = () => {
    console.log("SSSSS");
    const save_url = async () => {
      const data = await fetch(
        `http://localhost:5000/user/${userdata.user_id}`,
        {
          method: "POST",
          body: JSON.stringify({
            unique_url: `calendapp.com/${term}`,
          }),
        }
      );
      let result = await data.json();
      if (result.success) {
        history.push("/confirm");
      }
    };
    if (result_for_url === "available") {
      save_url();
    }
  };
  useEffect(() => {
    const search = async () => {
      const data = await fetch(
        `http://localhost:5000/user/123/is_unique?url=calendapp.com/${term}`
      );
      let result = await data.json();
      if (result.success) {
        set_result_for_url(result.success);
      } else {
        set_result_for_url(result.error);
      }
    };

    const timeoutId = setTimeout(() => {
      if (term) {
        search();
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);
  return (
    <React.Fragment>
      {userdata ? (
        <ProfileWidget
          heading={heading}
          url_prompt={url_prompt}
          url_prefix={url_prefix}
          timezone_prompt={timezone_prompt}
          timezone_default={timezone_default}
          check_for_unique_url={set_url}
          result_for_url={result_for_url}
          handleContinue={handleContinue}
        />
      ) : (
        history.push("/")
      )}
    </React.Fragment>
  );
};

export default ProfileSettings;
