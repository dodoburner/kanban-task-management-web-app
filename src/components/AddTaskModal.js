import React from "react";
import { useSelector } from "react-redux";
import "../styles/TaskModals.css";
import Subtask from "./Subtask";

export default function AddTaskModal() {
  const modalsState = useSelector((state) => state.openModals);
  const task = modalsState.openTaskModal.task;
  let completed = 0;
  const subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  return (
    <div className="modal-container">
      <div className="add-task-modal">
        <p className="task-title-modal heading-L">{task.title}</p>
        <p className="task-description text-L">{task.description}</p>
        <p className="subtasks-completed heading-S">
          Subtasks ({completed} of {subtasks.length})
        </p>
        {subtasks.map((subtask, index) => {
          return <Subtask subtask={subtask} key={index} />;
        })}
        <div className="select-column-container">
          <p className="current-status-text text-M">Current Status</p>
          <select className="select-column text-L">
            <option>Todo</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>
      </div>
    </div>
  );
}
