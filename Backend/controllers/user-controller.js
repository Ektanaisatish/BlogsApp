import bcrypt from "bcryptjs";
import User from "../model/User.js";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exit !login instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name, 
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (error) {}
  return res.status(201).json({ user });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user by your email" });
  }
   
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  return res
    .status(200)
    .json({ message: "Login  Successfully", user: existingUser });
};