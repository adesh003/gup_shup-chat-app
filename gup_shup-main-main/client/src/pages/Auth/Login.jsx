import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlinePassword, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUserThunk } from "../../store/slice/user/userThunk";

const Login = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",   
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginBtn = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // toast.loading("Logging in...");
    const result = await dispatch(LoginUserThunk({
      username: loginData.username,
      password: loginData.password,
    }));



    if (result.meta.requestStatus === "fulfilled") {
      toast.dismiss();
      toast.success(`Login successful!, ${loginData.username} 🎉`);
      // Navigate to home page
      navigate("/");
    } else {
      toast.dismiss();
      toast.error("Invalid username or password ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="p-10 rounded-xl shadow-xl w-full max-w-md bg-gray-800">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h1>
        <p className="text-center text-gray-400 mb-8">
          Please log in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleLoginBtn} className="space-y-6">
          {/* Username */}
          <label className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
            <CiUser className="text-gray-300" />
            <input
              onChange={handleInputChange}
              type="text"
              name="username"
              placeholder="Enter your username"
              value={loginData.username}
              required
              className="flex-1 outline-none bg-transparent text-gray-100 placeholder-gray-400"
            />
          </label>

          {/* Password */}
          <label className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
            <MdOutlinePassword className="text-gray-300" />
            <input
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              name="password"   // ✅ fixed here
              placeholder="Enter your password"
              value={loginData.password}
              required
              aria-label="Password"
              className="flex-1 outline-none bg-transparent text-gray-100 placeholder-gray-400"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer text-gray-300"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </label>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm bg-gray-700 border-gray-600"
              />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
