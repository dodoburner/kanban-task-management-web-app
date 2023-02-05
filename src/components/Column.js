import React from "react";
import Task from "./Task";
import "../styles/Column&Task.css";
import boardsSlice from "../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Column({ colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));

    if (colIndex !== prevColIndex) {
      dispatch(boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  }

  const handleOnDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="column" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
      <p className="col-name heading-S">
        {col.name} ({col.tasks.length})
      </p>
      {col.tasks.map((task, index) => {
        return (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        );
      })}
    </div>
  );
}
