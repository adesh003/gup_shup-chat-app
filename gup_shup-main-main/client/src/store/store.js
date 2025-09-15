import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice"
import messageReducer from "./slice/message/message.slice"
const store = configureStore({
  reducer: {
    userReducer,
    messageReducer
  },
});
export default store;
