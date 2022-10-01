import React from "react";
import { useDispatch, useSelector } from "react-redux";
import openModalsSlice from "../redux/openModalsSlice";

export default function Task({ taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

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
        dispatch(openModalsSlice.actions.openTaskModal({ taskIndex, colIndex }));
      }}
    >
      <p className="task-title heading-M">{task.title}</p>
      <p className="num-of-subtasks text-M">
        {completed} of {subtasks.length} subtasks
      </p>
    </div>
  );
}
