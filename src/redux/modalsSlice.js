import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    openBoardModal: false,
    openTaskModal: {
      isOpen: false,
      task: {}
    }
  },
  reducers: {
    openBoardModal: (state) => {
      state.openBoardModal = !state.openBoardModal
    },
    openTaskModal: (state, action) => {
      state.openTaskModal.isOpen = !state.openTaskModal.isOpen
      state.openTaskModal.task = action.payload.task
    }
}
})

export default modalsSlice