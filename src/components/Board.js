import React from "react";
import "../styles/Board.css";

export default function Board() {
  return (
    <div className="board board-empty">
      <h3 className="board-empty-text">
        This board is empty. Create a new column to get started.
      </h3>
      <button className="add-column-btn">+ Add New Column</button>
    </div>
  );
}
