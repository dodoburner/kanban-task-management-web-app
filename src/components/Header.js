import React, { useState } from "react";
import "../styles/Header.css";
import mobileLogo from "../assets/logo-mobile.svg";
import addTaskMobile from "../assets/icon-add-task-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import AllBoardsDropdown from "./AllBoardsDropdown";

export default function Header() {
  let [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header>
      <img className="logo" src={mobileLogo} />
      <div
        className="header-name-container heading-L"
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        <h3 className="header-name">Platform Launch</h3>
        <img src={openDropdown ? iconUp : iconDown} />
      </div>
      <button className="add-task-btn">
        <img src={addTaskMobile} />
      </button>
      <img className="elipsis" src={elipsis} />
      {openDropdown ? (
        <AllBoardsDropdown setOpenDropdown={setOpenDropdown} />
      ) : null}
    </header>
  );
}
