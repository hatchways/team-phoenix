import React, { useContext, useEffect } from "react";
import AuthWidget from "../components/AuthWidget";
import history from "../history";
import Context from "../contexts/CalendStore";
const SignUp = (props) => {
  const { setEmail, setPropsForAuthWidget } = useContext(Context);
  useEffect(() => {
    const handleSubmit = (e, email) => {
      e.preventDefault();
      if (email.includes("gmail")) {
        setEmail(email);
        history.push("/auth-with-google/sign-up");
      } else {
        alert("Right now, We only support gmail. Please use gmail.");
      }
    };
    let propsForAuthWidget = {
      heading: "Sign up with CalendApp",
      btnText: "Get started",
      onSubmitHandler: handleSubmit,
      linkText: "Log In",
      footerText: "Already have an account?",
      route: "login-in",
    };
    setPropsForAuthWidget(propsForAuthWidget);
  }, [setEmail, setPropsForAuthWidget]);

  return (
    <div>
      <AuthWidget />
    </div>
  );
};

export default SignUp;
