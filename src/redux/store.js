import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import modalsSlice from "./modalsSlice";

const store = configureStore({
  reducer: {
    openModals: modalsSlice.reducer,
    boards: boardsSlice.reducer,
  }
})

export default store
