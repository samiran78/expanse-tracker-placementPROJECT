const mongoose = require("mongoose");
//schema design...
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true, // Ensures no duplicate emails
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Regex for email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

//export..
const Usermodel = mongoose.model("users", userSchema);

module.exports = Usermodel;
