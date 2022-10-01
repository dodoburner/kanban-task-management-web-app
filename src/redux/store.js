import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import openModalsSlice from "./openModalsSlice";

const store = configureStore({
  reducer: {
    openModals: openModalsSlice.reducer,
    boards: boardsSlice.reducer,
  }
})

export default store
