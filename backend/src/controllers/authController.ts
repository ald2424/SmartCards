import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (id: string) => {
  //console.log('JWT_SECRET: ', process.env.JWT_SECRET)
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User ({
    username,
    email,
    password,
  });

  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
