import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        buttonLoading: false,
        messages: null,   
        screenLoading: false,
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        // ---------------- SEND MESSAGE ----------------
        builder
            .addCase(sendMessageThunk.pending, (state) => {
                state.buttonLoading = true;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                console.log(action.payload)
                // const newMessage = action.payload?.responseData?.newMessage;

                // if (newMessage) {
                //     // Agar pehle se array hai to push kar do
                //     state.messages.push(newMessage);
                // }
            })
            .addCase(sendMessageThunk.rejected, (state) => {
                state.buttonLoading = false;
            });

        // ---------------- GET MESSAGE ----------------
        builder
            .addCase(getMessageThunk.pending, (state) => {
                state.buttonLoading = true;
            })
            .addCase(getMessageThunk.fulfilled, (state, action) => {
                // console.log("Message payload:", action.payload.responseData.messages);
                state.buttonLoading = false;

                if (action.payload?.responseData?.messages) {
                    state.messages = action.payload.responseData.messages;
                } else if (action.payload?.responseData?.conversation?.messages) {
                    state.messages = action.payload.responseData.conversation.messages;
                } else {
                    state.messages = [];
                }

                // // Sort by createdAt (oldest first)
                // state.messages.sort(
                //     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                // );

                // console.log("Updated messages in state:", state.messages);
            })

            .addCase(getMessageThunk.rejected, (state) => {
                state.buttonLoading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const {  } = messageSlice.actions;

export default messageSlice.reducer;
