import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TaskModals.css";
import Subtask from "../components/Subtask";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import modalsSlice from "../redux/modalsSlice";

export default function TaskModal() {
  const dispatch = useDispatch();

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
    <div className="modal-container" onClick={(e) => {
      if (e.target !== e.currentTarget) {
        return
      }
      dispatch(modalsSlice.actions.closeTaskModal())
    }}>
      <div className="task-modal">
        <div className="task-modal-title-container">
          <p className="heading-L">{task.title}</p>
          <img className="task-modal-elipsis" src={elipsis} />
        </div>
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
