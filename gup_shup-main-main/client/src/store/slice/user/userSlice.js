import { createSlice } from "@reduxjs/toolkit";
import { LoginUserThunk, registerUserThunk, logoutUserThunk } from "./userThunk";

import { CiGlass } from "react-icons/ci";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    screenLoading: false,
    userProfile: null,
    buttonLoading: false,
    screenLoading: false,
    
  },
  reducers: {
    Login: () => {},
  },
  extraReducers: (builder) => {
    //Login
    builder
      .addCase(LoginUserThunk.pending, (state) => {
        state.buttonLoading = true;
        

      })
      .addCase(LoginUserThunk.fulfilled, (state, action) => {

        state.buttonLoading = false;
       
        state.userProfile = action.payload?.responseData?.user
      })
      .addCase(LoginUserThunk.rejected, (state, action) => {
        
        state.buttonLoading = false;
     
      });

      //Register
      builder
      .addCase(registerUserThunk.pending, (state) => {
        state.buttonLoading = true;
        
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {

        state.buttonLoading = false;
       
        state.userProfile = action.payload?.responseData?.user
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        
        state.buttonLoading = false;
     
      });
      //Logout
      builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.buttonLoading = true;
        
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {

        state.buttonLoading = false;
       state.isAuthenticated = false
        state.userProfile = null
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        
        state.buttonLoading = false;
     
      });
  },
});

// Action creators  are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
