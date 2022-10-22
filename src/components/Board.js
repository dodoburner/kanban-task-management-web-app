import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import "../styles/Board.css";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";

export default function Board() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  return (
    <div
      className={isBigScreen && isSideBarOpen ? "board open-sidebar" : "board"}
    >
      {isBigScreen && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => {
            return <Column key={index} colIndex={index} />;
          })}
          <div
            className="add-column-column heading-XL"
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
          >
            + New Column
          </div>
        </>
      ) : (
        <EmptyBoard type="edit" />
      )}
      {isBoardModalOpen && <AddEditBoardModal type="edit" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}
