import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";

export default function AddEditTaskModal({ type }) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const [status, setStatus] = useState(columns[0].name);
  const [colIndex, setColIndex] = useState(0);
  const [subtasks, setSubtasks] = useState([
    { name: "", isCompleted: false, id: uuidv4() },
  ]);

  const validate = () => {
    setIsValid(false);
    if (!name.length || !description) {
      return false;
    }
    subtasks.forEach((subtask) => {
      if (!subtask.name) {
        return false;
      }
    });
    setIsValid(true);
    return true;
  };

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setColIndex(e.target.selectedIndex);
  };


  const onSubmit = (type) => {
    dispatch(boardsSlice.actions.addTask({ name, description, subtasks, status, colIndex}))
  };

  return (
    <div className="modal-container dimmed">
      <div className="modal">
        <h3>{type === "edit" ? "Edit" : "Add new"} tasks</h3>
        <label htmlFor="task-name-input">Task Name</label>
        <div className="input-container">
          <input
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            id="task-name-input"
            type="text"
            placeholder="e.g. Take coffee break"
            className={!isValid && !name ? "red-border" : ""}
          />
          {!isValid && !name ? (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          ) : null}
        </div>

        <label htmlFor="task-name-input">Description</label>
        <div className="description-container">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.trim())}
            id="task-description-input"
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
            className={!isValid && !description ? "red-border" : ""}
          />
          {!isValid && !description ? (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          ) : null}
        </div>

        <label>Subtasks</label>
        <div className="modal-columns">
          {subtasks.map((subtask, index) => {
            return (
              <div className="modal-column" key={index}>
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      onChangeSubtasks(subtask.id, e.target.value.trim());
                    }}
                    type="text"
                    value={subtask.name}
                    className={!isValid && !subtask.name ? "red-border" : ""}
                  />
                  {!isValid && !subtask.name ? (
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
                    onDelete(subtask.id);
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setSubtasks((state) => [
              ...state,
              { name: "", isCompleted: false, id: uuidv4() },
            ]);
          }}
          className="add-column-btn btn-light"
        >
          + Add New Column
        </button>

        <div className="select-column-container">
          <p className="current-status-text text-M">Current Status</p>
          <select
            className="select-status text-L"
            value={status}
            onChange={onChangeStatus}
          >
            {columns.map((col, index) => (
              <option key={index}>{col.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) onSubmit(type);
          }}
          className="add-column-btn"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
