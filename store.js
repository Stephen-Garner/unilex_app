import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice for the counter (a simple example state)
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

// Export the actions to use them in your components
export const { increment, decrement } = counterSlice.actions;

// Configure the Redux store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
