import React from "react";
import Task from "./Task";
import "../styles/Column&Task.css";

export default function Column({ col, colIndex }) {
  return (
    <div className="column">
      <p className="col-name heading-S">
        {col.name} ({col.tasks.length})
      </p>
      {col.tasks.map((task, index) => {
        return (
          <Task task={task} key={index} index={index} colIndex={colIndex} />
        );
      })}
    </div>
  );
}
