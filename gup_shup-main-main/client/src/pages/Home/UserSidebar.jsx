import React, { use, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import User from "./User";
import { useDispatch } from "react-redux";
import { getOtherUsersThunk, logoutUserThunk } from "../../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const{otherUsers} = useSelector(state => state.userReducer)

const {userProfile} = useSelector((state) => state.userReducer)



useEffect(() => {
  dispatch(getOtherUsersThunk())
}, [])

  const handleLogoutBtn = () => {
    dispatch(logoutUserThunk())
    navigate("/login")
  }



  
  return (
    <div className="max-w-[17rem] w-full h-screen flex flex-col gap-1">
      <div>
        <h1 className="bg-black mx-3 px-8 py-1 rounded-lg text-[#5754E8] text-xl font-semibold ">
          CHATI-FY
        </h1>
      </div>

      <div className="p-3">
        <label className="input">
          <CiSearch />
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div>

      <div className="h-full overflow-y-auto">
        {otherUsers?.map((userDetails)=>{
          // console.log(userDetails)
          return(
            <User key={userDetails._id} userDetails={userDetails}/>
          )
        })}
    
      </div>
      <div className=" border-t border-gray-400 pt-1 flex items-center justify-between p-3">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
            <img src={userProfile?.avatar} />
          </div>
          <p className="ml-4 text-sm font-semibold text-white flex items-center justify-center ">
         {userProfile?.username}
         </p> 
        </div>

        <button
          onClick={handleLogoutBtn}
          className="btn btn-sm btn-outline btn-primary px-3">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSideBar;
