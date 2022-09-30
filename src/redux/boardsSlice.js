import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      const board = {
        name: action.payload.name,
        isActive: false,
        columns: [],
      };
      action.payload.columns.forEach((column) => {
        const col = {
          name: column,
          tasks: [],
        };
        board.columns.push(col);
      });
      state.push(board);
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
      const board = state.find((board) => board.isActive === true);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive === true);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (columns.indexOf(col) === payload.newColIndex) {
        return
      }
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex)
      const newCol = columns.find((col, i) => i === payload.newColIndex)
      newCol.tasks.push(task)
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive === true);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);

    }
  },
});

export default boardsSlice;
