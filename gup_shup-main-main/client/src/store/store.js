import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice"
const store = configureStore({
  reducer: {
    userReducer
  },
});
export default store;
