import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import openModalsSlice from "../redux/openModalsSlice";

export default function EmptyBoard({ type }) {
  const dispatch = useDispatch();
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);

  return (
    <div className="board-empty">
      <h3 className="board-empty-text">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          type === "add"
            ? setIsAddBoardModalOpen(true)
            : dispatch(openModalsSlice.actions.toggleBoardModal({ type: "edit" }));
        }}
        className="add-column-btn"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isAddBoardModalOpen && <AddEditBoardModal type="add" />}
    </div>
  );
}
