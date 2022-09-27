import React, { useState } from "react";
import { useDispatch } from "react-redux";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import modalsSlice from "../redux/modalsSlice";
import "../styles/BoardModals.css";

export default function AddEditBoardModal() {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState(["Todo", "Doing"]);
  const [inputEmpty, setInputEmpty] = useState([false, false, false]);
  const dispatch = useDispatch();

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
            className={inputEmpty[0] ? "red-border" : ""}
          />
          {inputEmpty[0] ? (
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
                      setColumns(
                        columns.map((el, i) => {
                          return i === index ? e.target.value : el;
                        })
                      );
                    }}
                    type="text"
                    value={column}
                    className={inputEmpty[index + 1] ? "red-border" : ""}
                  />
                  {inputEmpty[index + 1] ? (
                    <span className="cant-be-empty-span text-L">
                      {" "}
                      Can't be empty
                    </span>
                  ) : null}
                </div>
                <img src={crossIcon} />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setColumns((state) => [...state, ""]);
            setInputEmpty((state) => [...state, false]);
          }}
          className="add-column-btn btn-light"
        >
          + Add New Column
        </button>
        <button
          onClick={() => {
            let submit = true;

            if (name.trim().length === 0) {
              setInputEmpty((prevState) => {
                const state = [...prevState];
                state[0] = true;
                return state;
              });
              submit = false;
            } else {
              setInputEmpty((prevState) => {
                const state = [...prevState];
                state[0] = false;
                return state;
              });
            }

            columns.forEach((column, index) => {
              if (column.trim().length === 0) {
                setInputEmpty((prevState) => {
                  const newState = [...prevState];
                  newState[index + 1] = true;
                  return newState;
                });
                return;
              } else {
                setInputEmpty((prevState) => {
                  const newState = [...prevState];
                  newState[index + 1] = false;
                  return newState;
                });
              }
            });

            if (submit === true) {
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
