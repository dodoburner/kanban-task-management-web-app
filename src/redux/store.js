import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    theme: themeSlice.reducer
  }
})

export default store
