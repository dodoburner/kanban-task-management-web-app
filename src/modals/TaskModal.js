import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TaskModals.css";
import Subtask from "../components/Subtask";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import modalsSlice from "../redux/modalsSlice";
import boardsSlice from "../redux/boardsSlice";

export default function TaskModal() {
  const dispatch = useDispatch();

  const modalsState = useSelector((state) => state.openModals);
  const payload = modalsState.openTaskModal;
  const taskIndex = payload.taskIndex;
  const colIndex = payload.colIndex;
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

  let completed = 0;
  const subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const onChange = (e) => {
    setStatus(e.target.value);
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        status: e.target.value,
      })
    );
  };
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        dispatch(modalsSlice.actions.closeTaskModal());
      }}
    >
      <div className="task-modal">
        <div className="task-modal-title-container">
          <p className="heading-L">{task.title}</p>
          <img
            className="task-modal-elipsis"
            src={elipsis}
            alt="task options btn"
          />
        </div>
        <p className="task-description text-L">{task.description}</p>
        <p className="subtasks-completed heading-S">
          Subtasks ({completed} of {subtasks.length})
        </p>
        {subtasks.map((subtask, index) => {
          return (
            <Subtask
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
              key={index}
            />
          );
        })}
        <div className="select-column-container">
          <p className="current-status-text text-M">Current Status</p>
          <select
            className="select-column text-L"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option key={index}>{col.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
