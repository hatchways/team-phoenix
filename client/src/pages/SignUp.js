import React from "react";
import AuthWidget from "../component/AuthWidget";
import history from "../history";
const SignUp = () => {
  let heading = "Sign up with CalendApp";
  let btnText = "Get started";
  const handleSubmit = (e, email) => {
    e.preventDefault();
    if (email.includes("gmail")) {
      history.push({
        pathname: "/auth-with-google",
        state: {
          email,
          prompt: `The easiest way for you to sign up is with Google.This will automatically 
            connect your calendar so you can start using CalendApp right away`,
          noGoogleText:
            "Prefer to create an account with a password?Click here",
        },
      });
    }
  };
  return (
    <React.Fragment>
      <AuthWidget
        heading={heading}
        btnText={btnText}
        onSubmitHandler={handleSubmit}
        linkText="Log In"
        route=""
      />
    </React.Fragment>
  );
};

export default SignUp;
