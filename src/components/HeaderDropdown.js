import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice from "../redux/boardsSlice";
import themeSlice from "../redux/themeSlice";

export default function HeaderDropdown({
  setOpenDropdown,
  setIsBoardModalOpen,
}) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="dropdown-container"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
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
              setIsBoardModalOpen(true);
              setOpenDropdown && setOpenDropdown((state) => !state);
            }}
          >
            <img className="filter-purple" alt="board" src={boardIcon} /> +
            Create New Board
          </div>
        </div>

        <div className="theme-toggle">
          <img src={lightIcon} alt="sun indicating light mode" />
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => dispatch(themeSlice.actions.toggleTheme())}
            />
            <span className="slider round"></span>
          </label>
          <img src={darkIcon} alt="moon indicating dark mode" />
        </div>
      </div>
    </div>
  );
}
