import React, { useContext, useEffect } from "react";
import AuthWidget from "../components/AuthWidget";
import history from "../history";
import Context from "../contexts/CalendStore";
const LogIn = () => {
  const { setEmail, setPropsForAuthWidget } = useContext(Context);
  useEffect(() => {
    const handleSubmit = (e, email) => {
      e.preventDefault();
      if (email.includes("gmail")) {
        setEmail(email);
        history.push("/auth-with-google");
      } else {
        alert("Right now, We only support gmail. Please use gmail.");
      }
    };
    let propsForAuthWidget = {
      heading: "Log into your account",
      btnText: "Continue",
      onSubmitHandler: handleSubmit,
      linkText: "Sign Up",
      footerText: "Don't have an account?",
      route: "sign-up",
    };
    setPropsForAuthWidget(propsForAuthWidget);
  }, [setEmail, setPropsForAuthWidget]);

  return <AuthWidget />;
};
export default LogIn;
