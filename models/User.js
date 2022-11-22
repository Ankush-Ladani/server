import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: ["FirstName is Required"],
    },
    lastName: {
      type: String,
      required: ["lastName is Required"],
    },
    email: {
      type: String,
      required: ["Email is Required"],
    },
    password: {
      type: String,
      required: ["Password is Required"],
    },
    categories: [{ lable: String, icon: String }],
  },
  { timestamps: true }
);

export default new mongoose.model("User", userSchema);
