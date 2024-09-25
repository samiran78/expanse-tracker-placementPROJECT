const Usermodel = require("../models/Usermodel");
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({
      email,
      password,
    });
    if (!user) {
      res.status(400).send({
        message: "Invalid Email or Password",
      });
    }
    res.status(200).send({
        user,
        message: "Login Successfull!!",
    })
  } catch (error) {
    res.status(400).json({
      message: "Invalid Credentials",
      error,
    });
  }
};

const registerController = async(req,res) => {
 try {
    const newUser = new Usermodel(req.body);
    await newUser.save();
    res.status(201).json({
        success: true,
        message: "User Created Successfully!!",
        newUser,

    })
 } catch (error) {
    res.status(400).json({
        success: false,
        error,
        });
    
 }
};

module.exports = { loginController, registerController };
