import React from "react";
// import AuthWidget from "../component/AuthWidget";
import AuthWidget from "../component/AuthWidget";
import history from "../history";

const LogIn = () => {
  let heading = "Log into your account";
  let btnText = "Continue";
  const handleSubmit = (e, email) => {
    e.preventDefault();
    if (email.includes("gmail")) {
      let greetings = {
        headerText: `Welcome back`,
        email,
        noGoogleText: "Don't have an account?Sign up",
        route: "sign-up",
      };
      localStorage.setItem("greetings", JSON.stringify(greetings));
      history.push("/auth-with-google");
    } else {
      alert("Right now, We only support gmail. Please use gmail.");
    }
  };
  return (
    <React.Fragment>
      <AuthWidget
        heading={heading}
        btnText={btnText}
        onSubmitHandler={handleSubmit}
        linkText="Sign Up"
        footerText="Don't have an account?"
        route="sign-up"
      />
    </React.Fragment>
  );
};
export default LogIn;
