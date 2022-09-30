import React from "react";

export default function DeleteModal({ type, title, onDeleteBtnClick }) {
  return (
    <div className="delete-modal">
      <h3 className="heading-L">Delete this {type}?</h3>
      <p className="text-L">
        Are you sure you want to delete the "{title}" task and its subtasks?
        This action cannot be reversed.
      </p>
      <button onClick={onDeleteBtnClick} className="btn delete-btn">Delete</button>
      <button onClick={onDeleteBtnClick} className="btn cancel-btn">Cancel</button>
    </div>
  );
}
