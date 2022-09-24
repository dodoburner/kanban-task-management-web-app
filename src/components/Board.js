import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/Board.css";
import AddEditBoardModal from "./AddEditBoardModal";

export default function Board() {
  const modalsState = useSelector((state) => state.openModals);
  const openBoardModal = modalsState.openBoardModal;

  useEffect(() => {
    console.log(modalsState)
  }, [modalsState])

  return (
    <div className="board board-empty">
      {openBoardModal ? <AddEditBoardModal /> : null}
      <h3 className="board-empty-text">
        This board is empty. Create a new column to get started.
      </h3>
      <button className="add-column-btn">+ Add New Column</button>
    </div>
  );
}
