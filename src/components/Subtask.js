import React, { useState } from "react";
import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

export default function Subtask({ subtask, index}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(subtask.isCompleted);

  const onChange = (e) => {
    setChecked(e.target.value)
    dispatch(boardsSlice.actions.setSubtaskCompleted())
  }

  return (
    <div className="subtask">
      <input
        className="subtask-checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
      />
      <p className={`subtask-text text-M ${ checked ? "checked" : ""}`}>
        {subtask.title}
      </p>
    </div>
  );
}
