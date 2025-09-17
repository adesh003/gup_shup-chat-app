import React from "react";
import { setSelectedUser } from "../../store/slice/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const User = ({userDetails}) => {



  const dispatch = useDispatch();
  const {selectedUser} = useSelector((state) => state.userReducer)
  const {socket , userOnline} = useSelector((state) => state.socketReducer)
 
const isUserOnline = userOnline?.includes(userDetails?._id)



  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails))
    
  }

  return (
    <div onClick={handleUserClick} 
    className={`flex items-center rounded-lg hover:bg-gray-700 cursor-pointer py-1 px-2 gap-2 
    ${selectedUser?._id === userDetails?._id && "bg-gray-900"}`}>
      <div className={`${isUserOnline ? "avatar avatar-online " : "avatar avatar-offline"}`}>
        <div className="w-13 rounded-full">
          <img src={userDetails?.avatar} />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1 ml-2">{userDetails?.fullName}</h2>
        <p className="text-xs ml-2 mb-1">{userDetails?.username}</p>
      </div>
    </div>
  );
};

export default User;
