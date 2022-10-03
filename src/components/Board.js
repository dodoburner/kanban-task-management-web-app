import React from "react";
import { useSelector } from "react-redux";
import "../styles/Board.css";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";

export default function Board() {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  return (
    <div className="board">
      {columns.length > 0 ? (
        columns.map((col, index) => {
          return <Column key={index} colIndex={index} />;
        })
      ) : (
        <EmptyBoard type="edit" />
      )}
    </div>
  );
}
