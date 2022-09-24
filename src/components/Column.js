import React from "react";
import Task from "./Task";

export default function Column({ col }) {
  return (
    <div className="column">
      <p>{col.name}</p>
      {col.tasks.map((task, index) => {
        return (
          <Task task={task} key={index} />
        );
      })}
    </div>
  );
}
