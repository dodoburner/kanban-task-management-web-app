import React from "react";

export default function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div className="elipsis-menu text-L">
      <p onClick={() => setOpenEditModal(true)}>Edit {type}</p>
      <p onClick={() => setOpenDeleteModal(true)} className="elipsis-menu-red">Delete {type}</p>
    </div>
  );
}
