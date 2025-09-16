import { createSlice } from "@reduxjs/toolkit";

import io from "socket.io-client";
export const socketSlice = createSlice({
  name: "socket",
  initialState: {
   
    socket: null,
    userOnline: null,
    
    
    
    
  },
  reducers: {
        intializeSocket: (state, action) => {
        
          const socket = io(import.meta.env.VITE_DB_ORIGIN,{
            query:{
              userId:action.payload
            }
          })
          
          state.socket = socket
         
        },
        setUserOnline: (state, action) => {
          state.userOnline = action.payload
        }

  },
});

// Action creators  are generated for each case reducer function
export const {intializeSocket,setUserOnline} = socketSlice.actions;

export default socketSlice.reducer;
