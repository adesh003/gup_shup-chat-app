import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const {messages} = useSelector((state) => state.messageReducer)
  console.log(messages)
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser._id }));
    }
  }, [selectedUser, dispatch]);

  return (
    <>
      {!selectedUser ? (
        <div className=" text-center font-bold text-2xl h-screen w-full flex items-center justify-center">
          Select a user to start chat</div>
      ) : (
        <div className="h-screen w-full flex flex-col border-l border-l-white/10">
          {/* Top user section */}
          <div className="p-1 border-b border-b-white/10">
            <User userDetails={selectedUser} />
          </div>

          {/* Messages area - grows to fill space */}
          <div className="flex-1 overflow-y-auto mt-5 p-4">

            {messages?.map((messageDetails) => 
            {
            return  <Message key={messageDetails._id} messageDetails={messageDetails} />
            })}
          </div>

          {/* Input box fixed at bottom */}
          <div className="p-3 border-t border-t-white/10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-primary flex-1"
              />
              <button className="btn btn-primary">
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
