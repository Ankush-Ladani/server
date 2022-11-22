import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const categories = [
    { label: "Travel", icon: "user" },
    { label: "Shopping", icon: "user" },
    { label: "Investment", icon: "user" },
    { label: "Bills", icon: "user" },
  ];
  const userExists = await User.findOne({ email });

  // 406 not Acceptable
  if (userExists) {
    return res.status(406).json({
      message: "User is Already Registered",
    });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  // console.log(hashedPassword);

  const user = await User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    categories,
  });
  await user.save();

  res.status(201).send({ message: "User Created" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(406).json({
      message: "User Not Found in DB",
    });
    return;
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    res.status(406).json({
      message: "Password is incorrect",
    });
    return;
  }

  const payload = {
    username: email,
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  // console.log(token);
  res.json({ message: "succesfully logged in.", token, user });
};
