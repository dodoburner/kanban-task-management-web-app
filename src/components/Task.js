import React from "react";
import { useDispatch } from "react-redux";
import modalsSlice from "../redux/modalsSlice";

export default function Task({ task }) {
  const dispatch = useDispatch();
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  return (
    <div
      className="task"
      onClick={() => {
        dispatch(modalsSlice.actions.openTaskModal({ task }));
      }}
    >
      <p className="task-title heading-M">{task.title}</p>
      <p className="num-of-subtasks text-M">
        {completed} of {subtasks.length} subtasks
      </p>
    </div>
  );
}
