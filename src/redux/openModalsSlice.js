import { createSlice } from "@reduxjs/toolkit";

const openModalsSlice = createSlice({
  name: "modals",
  initialState: {
    toggleBoardModal: {
      isOpen: false,
      type: "",
    },
    toggleTaskModal: {
      isOpen: false,
      taskIndex: null,
      colIndex: null,
    },
    toggleElipsisMenu: {
      isOpen: false,
      type: "",
    },
    toggleDeleteModal: {
      isOpen: false,
      type: "",
    },
  },
  reducers: {
    toggleBoardModal: (state, action) => {
      state.toggleBoardModal.isOpen = !state.toggleBoardModal.isOpen;
      state.toggleBoardModal.type = action.payload.type;
    },
    openTaskModal: (state, action) => {
      state.toggleTaskModal.isOpen = true;
      state.toggleTaskModal.taskIndex = action.payload.taskIndex;
      state.toggleTaskModal.colIndex = action.payload.colIndex;
    },
    closeTaskModal: (state) => {
      state.toggleTaskModal.isOpen = false;
    },
    toggleElipsisMenu: (state, action) => {
      state.toggleElipsisMenu.isOpen = !state.toggleElipsisMenu.isOpen;
      state.toggleElipsisMenu.type = action.payload.type;
    },
    toggleDeleteModal: (state, action) => {
      state.toggleDeleteModal.isOpen = !state.toggleDeleteModal.isOpen;
      state.toggleDeleteModal.type = action.payload.type;
    },
  },
});

export default openModalsSlice;
