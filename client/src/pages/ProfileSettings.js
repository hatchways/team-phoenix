import React from "react";
import ProfileWidget from "../component/ProfileWidget"

const ProfileSettings = () => {
    let heading = "Welcome to CalendApp!";
    let url_prompt = "Create your CalendApp URL:";
    let url_prefix = "calendapp.com/";
    let timezone_prompt = "Select your Time zone:";
    let timezone_default = "UTC Time";
    let btn_txt = "Continue";
    let btn2_txt = "Set up later";
    return (
        <React.Fragment>
          <ProfileWidget
            heading={heading}
            url_prompt={url_prompt}
            url_prefix={url_prefix}
            timezone_prompt={timezone_prompt}
            timezone_default={timezone_default}
            btn_txt={btn_txt}
            btn2_txt={btn2_txt}
          />
        </React.Fragment>
      );
};

export default ProfileSettings;