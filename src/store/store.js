import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./historySlice";
import thunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: {
    history: historyReducer,
  },
  middleware: [thunkMiddleware],
});
