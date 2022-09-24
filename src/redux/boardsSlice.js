import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addBoard: (state, action) => {
      const board = {
        name: action.payload.name,
        columns: []
      }
      action.payload.columns.forEach((column) => {
        const col = {
          name: column,
          tasks: []
        }
        board.columns.push(col)
      })
      state.push(board)
    }
  }
})

export default boardsSlice;