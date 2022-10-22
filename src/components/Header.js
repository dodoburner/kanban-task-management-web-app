import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Header.css";
import logo from "../assets/logo-mobile.svg";
import addTaskMobile from "../assets/icon-add-task-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import ElipsisMenu from "./ElipsisMenu.js";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="header-container">
      <header>
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
          {isBigScreen && <h3 className="logo-text">kanban</h3>}{" "}
        </div>

        <div className="header-name-container heading-L">
          <h3 className="header-name">{board.name}</h3>
          {!isBigScreen && (
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown opened/closed"
              onClick={() => {
                onDropdownClick();
              }}
            />
          )}
        </div>
        <button
          className={`add-task-btn heading-M ${board.columns.length === 0 && "btn-off"}`}
          onClick={() => {
            setIsTaskModalOpen(true);
            setIsElipsisMenuOpen(false);
          }}
          disabled={board.columns.length === 0}
        >
          {isBigScreen ? (
            "+ Add New Task"
          ) : (
            <img src={addTaskMobile} alt="add task" />
          )}
        </button>
        <img
          onClick={() => {
            setIsElipsisMenuOpen((prevState) => !prevState);
            setBoardType("edit");
          }}
          className="elipsis"
          src={elipsis}
          alt="menu for deleting or editing board"
        />

        {openDropdown && !isBigScreen && (
          <HeaderDropdown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
        {isElipsisMenuOpen && (
          <ElipsisMenu
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            type="board"
          />
        )}
      </header>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
        />
      )}
    </div>
  );
}
