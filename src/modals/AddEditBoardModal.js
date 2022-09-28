import React, { useState } from "react";
import { useDispatch } from "react-redux";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import modalsSlice from "../redux/modalsSlice";
import "../styles/BoardModals.css";

export default function AddEditBoardModal() {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState(["Todo", "Doing"]);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const validate = () => {
    setIsValid(false);

    if (name.trim().length === 0) {
      return false;
    }

    columns.forEach((column) => {
      if (column.trim().length === 0) {
        return false;
      }
    });

    setIsValid(true);
    return true;
  };

  const onChange = (index, newValue) => {
    setColumns((prevState) => {
      const newState = [...prevState];
      newState[index] = newValue;
      return newState;
    });
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalsSlice.actions.toggleBoardModal());
      }}
    >
      <div className="modal">
        <h3>Add New Board</h3>
        <label htmlFor="board-name-input">Board Name</label>
        <div className="input-container">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
            type="text"
            placeholder="e.g. Web Design"
            className={!isValid && !name ? "red-border" : ""}
          />
          {!isValid && !name ? (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          ) : null}
        </div>

        <label>Board Columns</label>
        <div className="modal-columns">
          {columns.map((column, index) => {
            return (
              <div className="modal-column" key={index}>
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      onChange(index, e.target.value);
                    }}
                    type="text"
                    value={column}
                    className={!isValid && !column ? "red-border" : ""}
                  />
                  {!isValid && !column ? (
                    <span className="cant-be-empty-span text-L">
                      {" "}
                      Can't be empty
                    </span>
                  ) : null}
                </div>
                <img
                  src={crossIcon}
                  alt="delete-column-icon"
                  onClick={() => {
                    setColumns((prevState) => {
                      const newState = prevState.filter((el, i) => i !== index);
                      return newState;
                    });
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setColumns((state) => [...state, ""]);
          }}
          className="add-column-btn btn-light"
        >
          + Add New Column
        </button>
        <button
          onClick={() => {
            const isValid = validate();

            if (isValid === true) {
              dispatch(boardsSlice.actions.addBoard({ name, columns }));
              dispatch(modalsSlice.actions.toggleBoardModal());
            }
          }}
          className="add-column-btn"
        >
          Create New Board
        </button>
      </div>
    </div>
  );
}
