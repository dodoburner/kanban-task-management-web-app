import React, { useState } from "react";
import { useDispatch } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import modalsSlice from "../redux/modalsSlice";

export default function AllBoardsDropdown() {
  const dispatch = useDispatch();

  return (
    <div className="dropdown-modal">
      <h3>ALL BOARDS (3)</h3>
      <div className="dropdown-boards">
        <div className="dropdown-board board-active">
          <img className="filter-white" src={boardIcon} /> Platform Launch
        </div>
        <div className="dropdown-board">
          <img src={boardIcon} /> Marketing Plan
        </div>
        <div className="dropdown-board">
          <img src={boardIcon} /> Roadmap
        </div>
        <div
          className="dropdown-board dropdown-create-board-btn"
          onClick={() => {
            dispatch(modalsSlice.actions.openBoardModal())
          }}
        >
          <img className="filter-purple" src={boardIcon} /> + Create New Board
        </div>
      </div>

      <div className="light-toggle">
        <img src={lightIcon} />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <img src={darkIcon} />
      </div>
    </div>
  );
}
