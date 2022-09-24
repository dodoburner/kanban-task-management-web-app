import { configureStore } from "@reduxjs/toolkit";
import modalsSlice from "./modalsSlice";

const store = configureStore({
  reducer: {
    openModals: modalsSlice.reducer
  }
})

export default store
