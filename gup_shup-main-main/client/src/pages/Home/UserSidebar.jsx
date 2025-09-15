import React from "react";
import { CiSearch } from "react-icons/ci";
import User from "./User";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleLogoutBtn = () => {
    dispatch(logoutUserThunk())
    navigate("/login")
  }
  return (
    <div className="max-w-[17rem] w-full h-screen flex flex-col">
      <div>
        <h1 className="bg-black mx-3 px-2 py-1 rounded-lg text-[#5754E8] text-xl font-semibold ">
          gup shap
        </h1>
      </div>

      <div className="p-3">
        <label className="input">
          <CiSearch />
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div>

      <div className="h-full overflow-y-auto">
        <User />
        <User />
        <User />
        <User />

      </div>
      <div className=" flex items-center justify-between p-3">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
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
