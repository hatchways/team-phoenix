import React from "react";
import HomePage from "../components/EventBodyComponent/HomePage";
import { saveUserDataInLocalStorage } from "../utilities/SaveTokens";
const DashBoard = () => {
  saveUserDataInLocalStorage();
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default DashBoard;
