import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TaskModals.css";
import Subtask from "../components/Subtask";
import ElipsisMenu from "../components/ElipsisMenu";
import DeleteModal from "./DeleteModal";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import openModalsSlice from "../redux/openModalsSlice";
import boardsSlice from "../redux/boardsSlice";
import AddEditTaskModal from "./AddEditTaskModal";

export default function TaskModal() {
  const dispatch = useDispatch();
  const modalsState = useSelector((state) => state.openModals);
  const toggleElipsisMenu = modalsState.toggleElipsisMenu;
  const toggleDeleteModal = modalsState.toggleDeleteModal;
  const payload = modalsState.toggleTaskModal;
  const taskIndex = payload.taskIndex;
  const colIndex = payload.colIndex;
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    dispatch(openModalsSlice.actions.closeTaskModal());
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
      dispatch(openModalsSlice.actions.closeTaskModal());
    } else {
      dispatch(openModalsSlice.actions.toggleDeleteModal({ type: "" }));
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true)
    dispatch(openModalsSlice.actions.toggleElipsisMenu({ type: "" }));
  }

  const setOpenDeleteModal = () => {
    dispatch(openModalsSlice.actions.toggleDeleteModal({ type: "task" }));
    dispatch(openModalsSlice.actions.toggleElipsisMenu({ type: "" }));
  };

  return (
    <div
      className={`modal-container ${toggleDeleteModal.isOpen ? "" : "dimmed"}`}
      onClick={onClose}
    >
      <div className={`task-modal ${toggleDeleteModal.isOpen ? "none" : ""}`}>
        <div className="task-modal-title-container">
          <p className="heading-L">{task.title}</p>
          <img
            className="task-modal-elipsis"
            src={elipsis}
            alt="task options btn"
            onClick={() =>
              dispatch(
                openModalsSlice.actions.toggleElipsisMenu({ type: "task" })
              )
            }
          />
          {toggleElipsisMenu.isOpen ? (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          ) : null}
        </div>
        <p className="task-description text-L">{task.description}</p>

        <p className="subtasks-completed heading-S">
          Subtasks ({completed} of {subtasks.length})
        </p>
        {subtasks.map((subtask, index) => {
          return (
            <Subtask
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
              key={index}
            />
          );
        })}

        <div className="select-column-container">
          <p className="current-status-text text-M">Current Status</p>
          <select
            className="select-status text-L"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option key={index}>{col.name}</option>
            ))}
          </select>
        </div>
      </div>

      {toggleDeleteModal.isOpen ? (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      ) : null}

      {isAddTaskModalOpen ? (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      ) : null}
    </div>
  );
}
