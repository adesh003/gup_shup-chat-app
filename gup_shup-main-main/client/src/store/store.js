import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice"
import messageReducer from "./slice/message/message.slice"
import socketReducer from "./slice/socket/socket.slice"

const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // यहाँ उन actions के नाम डालें जिनके लिए warning ignore करनी है
        ignoredActions: [
          'socket/setSocket', // Example: अगर आपके पास ऐसा कोई action है
          'message/getMessage/fulfilled'
        ],
        // या आप सीधे state के path को भी ignore कर सकते हैं
        ignoredPaths: ['socketReducer.socket'],
      },
    }),
});

export default store;
