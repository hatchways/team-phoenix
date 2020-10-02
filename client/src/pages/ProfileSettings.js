import React, { useEffect, useState, useContext } from "react";
import ProfileWidget from "../component/ProfileWidget";
import history from "../history";
import { saveUserDataInLocalStorage } from "../utilities/SaveTokens";
import Context from "../contexts/CalendStore";
const ProfileSettings = () => {
  const heading = "Welcome to CalendApp!";
  const url_prompt = "Create your CalendApp URL:";
  const url_prefix = "calendapp.com/";
  const timezone_prompt = "Select your Time zone:";
  const timezone_default = "UTC Time";
  const [term, set_url] = useState("");
  const [result_for_url, set_result_for_url] = useState("Unavailable");
  const userdata = saveUserDataInLocalStorage();
  const { setUniqueUrl, setUserId, setEmail } = useContext(Context);

  const handleSkipbtn = () => {
    history.push("/confirm");
  };

  const handleContinue = () => {
    if (result_for_url === "available") {
      setUniqueUrl(`calendapp.com/${term}`);
      history.push("/confirm");
    }
  };
  useEffect(() => {
    setUserId(userdata.user_id);
    setEmail(userdata.email);
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
  }, [term, setUserId, setEmail, userdata]);
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
