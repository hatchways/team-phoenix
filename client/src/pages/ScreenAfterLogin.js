import React from "react";

var getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
const ScreenAfterLogin = () => {
  return (
    <h1>
      This comes after login <br /> your jwt token: {getCookie("token")}
    </h1>
  );
};

export default ScreenAfterLogin;
