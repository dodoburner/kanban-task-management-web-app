import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import modalsSlice from "../redux/modalsSlice";
import "../styles/BoardModals.css";

export default function AddEditBoardModal() {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([]);
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <h3>Add New Board</h3>
      <label htmlFor="board-name-input">Board Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="board-name-input"
        type="text"
        placeholder="e.g. Web Design"
      />

      <label>Board Columns</label>
      <div className="modal-columns">
        {columns.map((column, index) => {
          return (
            <div className="modal-column" key={index}>
              <input onChange={(e) => {
                setColumns(columns.map((el, i) => {
                  return i === index ? e.target.value : el;
                }))
              }} type="text" value={column} />
              <img src={crossIcon} />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          setColumns((state) => [...state, '']);
        }}
        className="add-column-btn btn-light"
      >
        + Add New Column
      </button>
      <button onClick={() => {
        dispatch(boardsSlice.actions.addBoard({ name, columns}))
        dispatch(modalsSlice.actions.openBoardModal())
      }} className="add-column-btn">Create New Board</button>
    </div>
  );
}
