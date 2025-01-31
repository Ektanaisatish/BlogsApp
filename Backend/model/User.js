import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true}],
});
const User = mongoose.model("User", userSchema);
export default User;
