import Header from "./components/Header";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";
import { useMediaQuery } from "react-responsive";

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const theme = useSelector((state) => state.theme);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className={`app ${theme}`}>
      {isBigScreen && <Sidebar />}
      {boards.length > 0 ? (
        <div className="main">
          <Header />
          <Board />
        </div>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default App;
