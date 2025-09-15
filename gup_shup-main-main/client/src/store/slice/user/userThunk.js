import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../componets/utilites/axiosinstance";

// LOGIN
export const LoginUserThunk = createAsyncThunk(
  "user/fetchUserData",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("Login successful 🎉");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // ✅ serializable
    }
  }
);

// REGISTER
export const registerUserThunk = createAsyncThunk(
  "user/register",
  async ({ username, password, fullName, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        username,
        password,
        fullName,
        gender,
      });
      toast.success("Register successful 🎉");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed!";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // ✅ serializable
    }
  }
);
//Logout
export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout successful 🎉");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Logout failed!";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

//Get User Profile
export const getUserProfileThunk = createAsyncThunk(
  "user/getUserProfile",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get("/user/profile");
   
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch profile!";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


//Get Other Users

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUser",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get("/user/getOtherUser");
   
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch other users!";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

