import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Header.css";
import mobileLogo from "../assets/logo-mobile.svg";
import addTaskMobile from "../assets/icon-add-task-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import ElipsisMenu from "./ElipsisMenu.js";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import openModalsSlice from "../redux/openModalsSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const openModals = useSelector((state) => state.openModals);
  const toggleElipsisMenu = openModals.toggleElipsisMenu;
  const setOpenEditModal = () => {
    dispatch(openModalsSlice.actions.toggleBoardModal({ type: "edit" }));
    dispatch(openModalsSlice.actions.toggleElipsisMenu({ type: "" }));
  };
  const setOpenDeleteModal = () => {
    dispatch(openModalsSlice.actions.toggleDeleteModal({ type: "board" }));
    dispatch(openModalsSlice.actions.toggleElipsisMenu({ type: "" }));
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="header-container">
      <header>
        <img className="logo" src={mobileLogo} alt="logo" />
        <div
          className="header-name-container heading-L"
          onClick={() => {
            setOpenDropdown((state) => !state);
          }}
        >
          <h3 className="header-name">{board.name}</h3>
          <img
            src={openDropdown ? iconUp : iconDown}
            alt="dropdown opened/closed"
          />
        </div>
        <button
          className={`add-task-btn ${board.columns.length === 0 && "btn-off"}`}
          onClick={() => setIsAddTaskModalOpen(true)}
          disabled={board.columns.length === 0}
        >
          <img src={addTaskMobile} alt="add task" />
        </button>
        <img
          onClick={() => {
            dispatch(
              openModalsSlice.actions.toggleElipsisMenu({ type: "board" })
            );
          }}
          className="elipsis"
          src={elipsis}
          alt="menu for deleting or editing board"
        />

        {toggleElipsisMenu.isOpen && toggleElipsisMenu.type === "board" && (
          <ElipsisMenu
            type="board"
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
        {openDropdown && <HeaderDropdown setOpenDropdown={setOpenDropdown} />}
      </header>
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          type="add"
        />
      )}
    </div>
  );
}
