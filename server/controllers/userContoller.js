import User from "../models/userModel.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;
  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("All feild are required", 400));
  }
  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler(`username already exist.`, 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar =
    gender === "male"
      ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`
      : `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${username}`;

  const newUser = await User.create({
    username,
    fullName,
    password: hashedPassword,
    gender,
    avatar,
  });

  const userToken = {
    _id: newUser?._id,
  };

  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        newUser,
        token
      },
    });
  //   res.send("hello regsited");
});

// LOGIN

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      new errorHandler("Pease enter valid username or password", 400)
    );
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new errorHandler(`Please enter a valid username or password`, 400)
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(
      new errorHandler(`Please enter a valid username or password`, 400)
    );
  }
  const userToken = {
    _id: user?._id,
  };
  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });


  res.status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        user,
        token
      },
    });
});


export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    responseData: user
  });
});
export const logout = asyncHandler(async (req, res, next) => {


  res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,

  }).json({
    success: true,
    responseData: "User logged out successfully"

  });
});

export const getOtherUser = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } })
  res.status(200).json({
    success: true,
    responseData: otherUsers
  });
});