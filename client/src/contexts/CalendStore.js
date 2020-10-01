import { createContext, useState } from "react";
import React from "react";

const Context = createContext();

export const CalendStore = (props) => {
  const [email, setEmail] = useState("");
  const [propsForAuthWidget, setPropsForAuthWidget] = useState({});
  const [fromSignUp, setFromSignUp] = useState(true);
  let greetingsForSignUp = {
    headerText: `Hi ${email}`,
    prompt: `The easiest way for you to sign up is with Google.This will automatically 
            connect your calendar so you can start using CalendApp right away`,
    noGoogleText: "Prefer to create an account with a password?Click here",
    route: "sign-up",
  };
  let greetingsForLogIn = {
    headerText: `Welcome back`,
    email,
    noGoogleText: "Don't have an account?Sign up",
    route: "sign-up",
  };
  const intialState = {
    greetingsForLogIn,
    greetingsForSignUp,
    setEmail,
    propsForAuthWidget,
    setPropsForAuthWidget,
    email,
    fromSignUp,
    setFromSignUp,
  };
  return (
    <Context.Provider value={intialState}>{props.children}</Context.Provider>
  );
};
export default Context;
