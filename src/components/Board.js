import React from "react";
import "../styles/Board.css";
import AddEditBoardModal from "./AddEditBoardModal";

let openBoardModal = false;

export default function Board() {
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
