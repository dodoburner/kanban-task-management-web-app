import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice from "../redux/boardsSlice";
import modalsSlice from "../redux/modalsSlice";

export default function HeaderDropdown({ setOpenDropdown }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  return (
    <div className="dropdown-container">
      <div className="dropdown-modal">
        <h3>ALL BOARDS ({boards.length})</h3>
        <div className="dropdown-boards">
          {boards.map((board, index) => {
            return (
              <div
                className={`dropdown-board ${
                  board.isActive ? "board-active" : ""
                }`}
                key={index}
                onClick={() => {
                  dispatch(boardsSlice.actions.setBoardActive({ index }));
                }}
              >
                <img className="filter-white" src={boardIcon} alt="board" />{" "}
                {board.name}
              </div>
            );
          })}
          <div
            className="dropdown-board dropdown-create-board-btn"
            onClick={() => {
              dispatch(modalsSlice.actions.toggleBoardModal());
              setOpenDropdown((state) => !state);
            }}
          >
            <img className="filter-purple" alt="board" src={boardIcon} /> +
            Create New Board
          </div>
        </div>

        <div className="light-toggle">
          <img src={lightIcon} alt="sun indicating light mode" />
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <img src={darkIcon} alt="moon indicating dark mode" />
        </div>
      </div>
    </div>
  );
}
