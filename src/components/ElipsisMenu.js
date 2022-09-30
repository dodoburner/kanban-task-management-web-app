import React from "react";

export default function ElipsisMenu({ type, onEditClick, onDeleteClick }) {
  return (
    <div className="elipsis-menu text-L">
      <p onClick={onEditClick}>Edit {type}</p>
      <p onClick={onDeleteClick} className="elipsis-menu-red">Delete {type}</p>
    </div>
  );
}
