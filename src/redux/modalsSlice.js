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
    toggleBoardModal: (state) => {
      state.openBoardModal = !state.openBoardModal
    },
    openTaskModal: (state, action) => {
      state.openTaskModal.isOpen = !state.openTaskModal.isOpen
      state.openTaskModal.task = action.payload.task
    },
    closeTaskModal: (state) => {
      state.openTaskModal.isOpen = !state.openTaskModal.isOpen
      state.openTaskModal.task = {}
    }
}
})

export default modalsSlice