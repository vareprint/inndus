import { createSlice } from "@reduxjs/toolkit";

// Safely load from localStorage
let savedProducts = [];

if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem("product");
    if (stored && stored !== "undefined") {
      savedProducts = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Invalid JSON in localStorage for 'product'", err);
  }
}

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: savedProducts,
  },
  reducers: {
    fetchProduct(state, action) {
      state.product = action.payload;

      if (typeof window !== "undefined" && action.payload) {
        try {
          localStorage.setItem("product", JSON.stringify(action.payload));
        } catch (err) {
          console.error("Failed to store product in localStorage", err);
        }
      }
    },
  },
});

export const { fetchProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
