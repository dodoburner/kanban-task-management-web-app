import "./styles/App.css";
import Header from "./components/Header";
import Board from "./components/Board";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard) dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openElipsisMenu, setOpenElipsisMenu] = useState(false);

  return (
    <div className="app">
      <Header
        setOpenDeleteModal={setOpenDeleteModal}
        openElipsisMenu={openElipsisMenu}
        setOpenElipsisMenu={setOpenElipsisMenu}
      />
      <Board
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setOpenElipsisMenu={setOpenElipsisMenu}
      />
    </div>
  );
}

export default App;
