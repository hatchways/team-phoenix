import React, { useEffect, useState } from "react";
import ProfileWidget from "../components/ProfileWidget";
import history from "../history";
import { saveUserDataInLocalStorage } from "../utilities/SaveTokens";
const ProfileSettings = () => {
  let heading = "Welcome to CalendApp!";
  let url_prompt = "Create your CalendApp URL:";
  let url_prefix = "calendapp.com/";
  let timezone_prompt = "Select your Time zone:";
  let timezone_default = "UTC Time";
  const [term, set_url] = useState("");
  const [result_for_url, set_result_for_url] = useState("Unavailable");
  let userdata = saveUserDataInLocalStorage();

  const handleSkipbtn = () => {
    history.push("/confirm");
  };

  const handleContinue = () => {
    if (result_for_url === "available") {
      localStorage.setItem("unique_url", `calendapp.com/${term}`);
      history.push("/confirm");
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
          handleSkipbtn={handleSkipbtn}
        />
      ) : (
        history.push("/")
      )}
    </React.Fragment>
  );
};

export default ProfileSettings;
