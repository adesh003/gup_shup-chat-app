import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../store/slice/user/userThunk";
import { toast } from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSignupBtn = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Passwords do not match 😢");
      return;
    }

    try {
      const actionResult = await dispatch(registerUserThunk(signUpData));
      const payload = unwrapResult(actionResult);

      if (payload.success) {
        toast.dismiss();
        toast.success(`Signup successful! Welcome, ${payload.responseData.newUser.fullName} 🎉`);
        // Navigate to home page
        navigate("/"); 
      } else {
        toast.dismiss();
        toast.error("Signup failed 😢");
      }
    } catch (err) {
      toast.dismiss();
      const errorMessage = err || "Signup failed 😢";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSignupBtn}>
      <div className="min-h-screen flex items-center justify-center bg-base-700">
        <div className="p-8 rounded-lg shadow-md bg-gray-800 w-full max-w-sm">
          <h1 className="text-2xl font-semibold mb-8">Sign Up</h1>

          {/* Full Name */}
          <label className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg mb-4">
            <CiUser />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={signUpData.fullName}
              onChange={handleInputChange}
              required
              className="flex-1 outline-none bg-transparent text-gray-100 placeholder-gray-400"
            />
          </label>

          {/* Username */}
          <label className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg mb-4">
            <CiUser />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signUpData.username}
              onChange={handleInputChange}
              required
              className="flex-1 outline-none bg-transparent text-gray-100 placeholder-gray-400"
            />
          </label>

          {/* Password */}
          <label className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg mb-4">
            <MdOutlinePassword />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={handleInputChange}
              required
              className="flex-1 outline-none bg-transparent text-gray-100 placeholder-gray-400"
            />
          </label>

          {/* Confirm Password */}
          <label className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg mb-4">
            <MdOutlinePassword />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signUpData.confirmPassword}
              onChange={handleInputChange}
              required
              className="flex-1 outline-none bg-transparent text-gray-100 placeholder-gray-400"
            />
          </label>

          {/* Gender */}
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={signUpData.gender === "male"}
                onChange={handleInputChange}
                className="radio radio-primary"
              />
              Male
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={signUpData.gender === "female"}
                onChange={handleInputChange}
                className="radio radio-primary"
              />
              Female
            </label>
          </div>

          <button
            type="submit"
            className="btn w-full bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Signup;
