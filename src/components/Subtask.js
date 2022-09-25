import React, { useState } from "react";

export default function Subtask({ subtask }) {
  const [checked, setChecked] = useState(subtask.isCompleted);
  return (
    <div className="subtask">
      <input
        className="subtask-checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
      <p className={`subtask-text text-M ${ checked ? "checked" : ""}`}>
        {subtask.title}
      </p>
    </div>
  );
}
