import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme: (state) => {
      return state === "light" ? "dark" : "light"
    },
  },
});

export default themeSlice;
