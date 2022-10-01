import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import modalsSlice from "../redux/openModalsSlice";
import "../styles/BoardModals.css";
import { v4 as uuidv4 } from 'uuid';

export default function AddEditBoardModal({ type }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return {...col, id: uuidv4()}
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (name.length === 0) {
      return false;
    }
    newColumns.forEach((column) => {
      if (column.name.length === 0) {
        return false;
      }
    });
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id)
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(
        boardsSlice.actions.editBoard({ name, newColumns })
      );
    }
    dispatch(modalsSlice.actions.toggleBoardModal({ type: "" }));
  };

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
          {newColumns.map((column, index) => {
            return (
              <div className="modal-column" key={index}>
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      onChange(column.id, e.target.value.trim());
                    }}
                    type="text"
                    value={column.name}
                    className={!isValid && !column.name ? "red-border" : ""}
                  />
                  {!isValid && !column.name ? (
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
                    onDelete(column.id);
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setNewColumns((state) => [...state, {name: "", tasks:[], id: uuidv4()}]);
          }}
          className="add-column-btn btn-light"
        >
          + Add New Column
        </button>
        <button
          onClick={() => {
            const isValid = validate();
            if (isValid === true) onSubmit(type);
          }}
          className="add-column-btn"
        >
          {type === "add" ? "Create New Board" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
