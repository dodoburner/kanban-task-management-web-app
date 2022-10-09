import React from "react";
import Task from "./Task";
import "../styles/Column&Task.css";
import { useSelector } from "react-redux";

export default function Column({ colIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  return (
    <div className="column">
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
