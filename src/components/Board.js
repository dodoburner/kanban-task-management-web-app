import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Board.css";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import TaskModal from "../modals/TaskModal";
import Column from "./Column";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

export default function Board({ openDeleteModal, setOpenDeleteModal, setOpenElipsisMenu }) {
  const dispatch = useDispatch();
  const modalsState = useSelector((state) => state.openModals);
  const openBoardModal = modalsState.openBoardModal;
  const openTaskModal = modalsState.openTaskModal;

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard())
      setOpenDeleteModal(false)
      setOpenElipsisMenu(false)
    } else {
      setOpenDeleteModal(false)
      setOpenElipsisMenu(false)
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

      {openBoardModal.isOpen ? <AddEditBoardModal type={openBoardModal.type}/> : null}
      {openTaskModal.isOpen ? <TaskModal /> : null}
      {openDeleteModal ? (
        <DeleteModal
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      ) : null}
    </div>
  );
}
