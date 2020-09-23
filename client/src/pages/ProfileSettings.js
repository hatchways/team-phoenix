import React from "react";
import ProfileWidget from "../component/ProfileWidget"

const ProfileSettings = () => {
    let heading = "Welcome to CalendApp!";
    let url_prompt = "Create your CalendApp URL:";
    let url_prefix = "calendapp.com/";
    let timezone_prompt = "Select your Time zone:";
    let timezone_default = "UTC Time";
    return (
        <React.Fragment>
          <ProfileWidget
            heading={heading}
            url_prompt={url_prompt}
            url_prefix={url_prefix}
            timezone_prompt={timezone_prompt}
            timezone_default={timezone_default}
          />
        </React.Fragment>
      );
};

export default ProfileSettings;