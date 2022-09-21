import React from "react";
import crossIcon from "../assets/icon-cross.svg";
import "../styles/BoardModal.css";

export default function AddEditBoardModal() {
  return (
    <div className="modal">
      <h3>Add New Board</h3>
      <label for="board-name-input">Board Name</label>
      <input id="board-name-input" type="text" placeholder="e.g. Web Design" />

      <p>Board Columns</p>
      <div className="modal-columns">
        <div className="modal-column">
          <input type="text" value="Todo" />
          <img src={crossIcon} />
        </div>
        <div className="modal-column">
          <input type="text" value="Doing" />
          <img src={crossIcon} />
        </div>
      </div>

      <button className="add-column-btn btn-light">+ Add New Column</button>
      <button className="add-column-btn">Create New Board</button>
    </div>
  )
}