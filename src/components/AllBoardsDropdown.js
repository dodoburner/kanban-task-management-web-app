import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import modalsSlice from "../redux/modalsSlice";

export default function AllBoardsDropdown({ setOpenDropdown }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  return (
    <div className="dropdown-modal">
      <h3>ALL BOARDS (3)</h3>
      <div className="dropdown-boards">
        {boards.map((board, index) => {
          return (
            <div className="dropdown-board board-active" key={index}>
              <img className="filter-white" src={boardIcon} /> {board.name}
            </div>
          );
        })}
        <div
          className="dropdown-board dropdown-create-board-btn"
          onClick={() => {
            dispatch(modalsSlice.actions.toggleBoardModal());
            setOpenDropdown((state) => !state)
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
