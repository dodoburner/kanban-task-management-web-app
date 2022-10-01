import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Board.css";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import TaskModal from "../modals/TaskModal";
import Column from "./Column";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import openModalsSlice from "../redux/openModalsSlice";

export default function Board() {
  const dispatch = useDispatch();
  const modalsState = useSelector((state) => state.openModals);
  const toggleBoardModal = modalsState.toggleBoardModal;
  const toggleTaskModal = modalsState.toggleTaskModal;
  const toggleDeleteModal = modalsState.toggleDeleteModal;

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      dispatch(openModalsSlice.actions.toggleDeleteModal({ type: ""}));
      dispatch(openModalsSlice.actions.toggleElipsisMenu({ type: ""}));
    } else {
      dispatch(openModalsSlice.actions.toggleDeleteModal({ type: ""}));
      dispatch(openModalsSlice.actions.toggleElipsisMenu({ type: ""}));
    }
  };

  return (
    <div className={`board ${board.columns.length > 0 ? "" : "board-empty"}`}>
      {columns.length > 0 ? (
        columns.map((col, index) => {
          return <Column key={index} colIndex={index} />;
        })
      ) : (
        <>
          <h3 className="board-empty-text">
            This board is empty. Create a new column to get started.
          </h3>
          <button className="add-column-btn">+ Add New Column</button>
        </>
      )}

      {toggleBoardModal.isOpen ? (
        <AddEditBoardModal type={toggleBoardModal.type} />
      ) : null}
      {toggleTaskModal.isOpen ? <TaskModal /> : null}
      {toggleDeleteModal.isOpen && toggleDeleteModal.type === "board" ? (
        <DeleteModal
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      ) : null}
    </div>
  );
}
