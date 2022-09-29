import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    openBoardModal: false,
    openTaskModal: {
      isOpen: false,
      task: {},
      taskIndex: null,
      colIndex: null,
    },
  },
  reducers: {
    toggleBoardModal: (state) => {
      state.openBoardModal = !state.openBoardModal;
    },
    openTaskModal: (state, action) => {
      state.openTaskModal.isOpen = !state.openTaskModal.isOpen;
      state.openTaskModal.task = action.payload.task;
      state.openTaskModal.taskIndex = action.payload.taskIndex;
      state.openTaskModal.colIndex = action.payload.colIndex;
    },
    closeTaskModal: (state) => {
      state.openTaskModal.isOpen = !state.openTaskModal.isOpen;
      state.openTaskModal.task = {};
    },
  },
});

export default modalsSlice;
