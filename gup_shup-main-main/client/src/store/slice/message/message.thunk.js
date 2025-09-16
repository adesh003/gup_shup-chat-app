import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../componets/utilites/axiosinstance";

// LOGIN
export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ recieverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${recieverId}`, {
        message,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed!";
      return rejectWithValue(errorMessage);
    }
  }
);
export const getMessageThunk = createAsyncThunk(
  "message/getMessage",
  async ({ recieverId }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/message/getMessage/${recieverId}`);

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch messages!";
      return rejectWithValue(errorMessage);
    }
  }
);




