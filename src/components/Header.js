import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Header.css";
import mobileLogo from "../assets/logo-mobile.svg";
import addTaskMobile from "../assets/icon-add-task-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import AllBoardsDropdown from "./AllBoardsDropdown";

export default function Header() {
  let [openDropdown, setOpenDropdown] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  return (
    <header>
      <img className="logo" src={mobileLogo} />
      <div
        className="header-name-container heading-L"
        onClick={() => {
          setOpenDropdown((state) => !state);
        }}
      >
        <h3 className="header-name">{board.name}</h3>
        <img src={openDropdown ? iconUp : iconDown} />
      </div>
      <button
        className={`add-task-btn ${board.columns.length > 0 ? "" : "btn-off"}`}
      >
        <img src={addTaskMobile} />
      </button>
      <img className="elipsis" src={elipsis} />
      {openDropdown ? (
        <AllBoardsDropdown setOpenDropdown={setOpenDropdown} />
      ) : null}
    </header>
  );
}
