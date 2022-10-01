import Header from "./components/Header";
import Board from "./components/Board";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard) dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <div className="app">
      <Header />
      <Board />
    </div>
  );
}

export default App;
