import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    openBoardModal: false
  },
  reducers: {
    openBoardModal: (state) => {
      state.openBoardModal = !state.openBoardModal
  }}
})

export default modalsSlice