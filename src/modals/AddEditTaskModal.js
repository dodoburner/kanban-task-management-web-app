import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";

export default function AddEditTaskModal({
  type,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col.tasks.find((task, index) => index === taskIndex);
  const [status, setStatus] = useState(columns[0].name);
  const [colIndex, setColIndex] = useState();
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!title.trim() || !description.trim()) {
      return false;
    }
    subtasks.forEach((subtask) => {
      if (!subtask.name.trim()) {
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
      subtask.title = newValue;
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
    dispatch(
      boardsSlice.actions.addTask({
        title,
        description,
        subtasks,
        status,
        colIndex,
      })
    );
  };

  return (
    <div
      className="modal-container dimmed"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className="modal">
        <h3>{type === "edit" ? "Edit" : "Add new"} tasks</h3>
        <label htmlFor="task-name-input">Task Name</label>
        <div className="input-container">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            placeholder="e.g. Take coffee break"
            className={!isValid && !title.trim() ? "red-border" : ""}
          />
          {!isValid && !title.trim() ? (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          ) : null}
        </div>

        <label htmlFor="task-name-input">Description</label>
        <div className="description-container">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
            className={!isValid && !description.trim() ? "red-border" : ""}
          />
          {!isValid && !description.trim() ? (
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
                      onChangeSubtasks(subtask.id, e.target.value);
                    }}
                    type="text"
                    value={subtask.title}
                    className={
                      !isValid && !subtask.title.trim() ? "red-border" : ""
                    }
                  />
                  {!isValid && !subtask.title.trim() ? (
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
            setIsAddTaskModalOpen(false);
          }}
          className="create-btn"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
