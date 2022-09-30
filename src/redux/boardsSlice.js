import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      const payload = action.payload;
      if (payload.type === "add") {
        const board = {
          name: payload.name,
          isActive: false,
          columns: [],
        };
        board.columns = payload.columns.map((col) => ({
          name: col,
          tasks: [],
        }));
        state.push(board);
      } else {
        const board = state.find((board) => board.isActive);
        board.name = payload.name
        board.columns = board.columns.filter((col, i) => !payload.deleteAt.includes(i))
        
      }
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (columns.indexOf(col) === payload.newColIndex) {
        return;
      }
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      state.splice(state.indexOf(board), 1);
    },
  },
});

export default boardsSlice;
