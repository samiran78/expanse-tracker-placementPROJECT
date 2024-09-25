const express = require("express");
const { loginController, registerController } = require("../controllers/Usercontroller");

//router object..
const router = express.Router();
//routes...

//POST||LOGIN
router.post(
  "/login",
  //use controller here....
  loginController
);
//POST||REGIATER..
router.post("/register", registerController)

module.exports = router;
