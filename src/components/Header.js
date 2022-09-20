import React from "react";
import "../styles/Header.css";
import mobileLogo from "../assets/logo-mobile.svg";
import addTaskMobile from "../assets/icon-add-task-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg"

export default function Header() {
  return (
    <header>
      <img className="logo" src={mobileLogo} />
      <div className="header-name-container">
        <h3 className="header-name">Platform Launch</h3>
        <img src={iconDown} />
      </div>
      <button className="add-task-btn">
        <img src={addTaskMobile} />
      </button>
      <img className="elipsis" src={elipsis} />
    </header>
  );
}
