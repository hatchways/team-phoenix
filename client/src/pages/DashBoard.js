import React from "react";
import EventBodyComponent from "../components/EventBodyComponent/EventBodyComponent";
import { saveUserDataInLocalStorage } from "../utilities/SaveTokens";
const DashBoard = () => {
  saveUserDataInLocalStorage();
  return (
    <div>
      <EventBodyComponent />
    </div>
  );
};

export default DashBoard;
