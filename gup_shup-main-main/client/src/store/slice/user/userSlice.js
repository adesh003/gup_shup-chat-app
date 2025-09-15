import { createSlice } from "@reduxjs/toolkit";
import { LoginUserThunk, registerUserThunk, logoutUserThunk ,getOtherUsersThunk, getUserProfileThunk} from "./userThunk";

import { CiGlass } from "react-icons/ci";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    screenLoading: true,
    userProfile: null,
    buttonLoading: false,
    otherUsers: null,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
    
    
    
  },
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload))
      state.selectedUser = action.payload

    }
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
        state.isAuthenticated = true
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
        state.isAuthenticated = true
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        
        state.buttonLoading = false;
     
      });
      //Logout
      builder
      .addCase(logoutUserThunk.pending, (state) => {
        
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {

        state.buttonLoading = false;
       state.isAuthenticated = false
       state.selectedUser = null
        state.userProfile = null
        state.otherUsers = null
        localStorage.removeItem("selectedUser")
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        
        state.buttonLoading = false;
     
      });


    //Get User Profile
    builder
      .addCase(getUserProfileThunk.pending, (state) => {
        state.screenLoading = true;

      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.isAuthenticated = true;
        state.userProfile = action.payload?.responseData;
      })

      .addCase(getUserProfileThunk.rejected, (state, action) => {

        state.screenLoading = false;

      });

    //Get Other Users
    builder
      .addCase(getOtherUsersThunk.pending, (state) => {
        state.screenLoading = true;

      })
      .addCase(getOtherUsersThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.otherUsers = action.payload?.responseData
        // state.userProfile = action.payload?.responseData?.user
        // console.log(action.payload)
      })
      .addCase(getOtherUsersThunk.rejected, (state, action) => {

        state.screenLoading = false;

      });



  },
});

// Action creators  are generated for each case reducer function
export const {setSelectedUser} = userSlice.actions;

export default userSlice.reducer;
