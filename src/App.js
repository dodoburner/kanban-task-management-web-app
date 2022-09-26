import './styles/App.css';
import Header from './components/Header';
import Board from './components/Board';
import { useDispatch } from 'react-redux';
import boardsSlice from './redux/boardsSlice';

function App() {
  const dispatch = useDispatch();
  dispatch(boardsSlice.actions.setBoardActive({ index: 0 }))

  return (
    <div className="App">
      <Header />
      <Board />
    </div>
  );
}

export default App;
