import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer)
  
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser._id }));
    }
  }, [selectedUser, dispatch]);

  return (
    <>
      {!selectedUser ? (
        <div className=" text-center font-bold text-2xl h-screen w-full flex items-center justify-center">
          Select a user to start chat</div>) : (
        <div className="h-screen w-full flex flex-col border-l border-l-white/10">
        
          <div className="p-1 border-b border-b-white/10">
            <User userDetails={selectedUser} />
          </div>

         
          <div className="flex-1 overflow-y-auto mt-5 p-4">

            {messages?.map((messageDetails) => {
              return <Message key={messageDetails._id} messageDetails={messageDetails} />
            })}
          </div>

        
          <SendMessage />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
