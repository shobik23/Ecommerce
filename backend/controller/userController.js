const User = require("../models/userModel");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    profile_pic: {
      public_id: "default",
      url: "default",
    },
  });
  return res.status(200).json({
    message: "User Registered",
    user,
  });
};
