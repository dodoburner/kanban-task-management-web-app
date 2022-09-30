import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import modalsSlice from "../redux/modalsSlice";
import "../styles/BoardModals.css";

export default function AddEditBoardModal({ type }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setColumns(
      board.columns.map((col) => {
        return col.name;
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  } else if (isFirstLoad) {
    setColumns(["Todo", "Doing"]);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (name.length === 0) {
      return false;
    }
    columns.forEach((column) => {
      if (column.length === 0) {
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

  const [deleteAt, setDeleteAt] = useState([]);
  const onDelete = (index) => {
    setColumns((prevState) => prevState.filter((el, i) => i !== index));
  };

  const onDeleteFromStore = (index) => {
    if (deleteAt.includes(index)) {
      index = Math.max(...deleteAt) + 1
    }
    setDeleteAt((prevState) => [...prevState, index])
  }

  return (
    <div
      className="modal-container dimmed"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalsSlice.actions.toggleBoardModal({ type: "" }));
      }}
    >
      <div className="modal">
        <h3>{type === "edit" ? "Edit" : "Add new"} board</h3>
        <label htmlFor="board-name-input">Board Name</label>
        <div className="input-container">
          <input
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
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
                      onChange(index, e.target.value.trim());
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
                    onDelete(index);
                    if (type === 'edit') {
                      onDeleteFromStore(index)
                    }
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
              console.log(deleteAt);
              dispatch(
                boardsSlice.actions.addBoard({ name, columns, type, deleteAt })
              );
              dispatch(modalsSlice.actions.toggleBoardModal({ type: "" }));
            }
          }}
          className="add-column-btn"
        >
          {type === "add" ? "Create New Board" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
