import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage if exists
const savedSubproducts = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("subproduct")) || []
  : [];

const SubproductSlice = createSlice({
  name: "subproduct",
  initialState: {
    subproduct: savedSubproducts,
  },
  reducers: {
    fetchSubproduct(state, action) {
      state.subproduct = action.payload;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("subproduct", JSON.stringify(action.payload));
      }
    },
  },
});

export const { fetchSubproduct } = SubproductSlice.actions;
export default SubproductSlice.reducer;
