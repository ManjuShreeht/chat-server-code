const errorHandler = require("../middleware/errorMiddleware.js");
const userModel = require("../models/userModel.js");
const errorResponse = require("../utils/errorResponse.js");

// JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
  const token = user.createJwt(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};



const Register=async(req,res,next)=>{
    try {
        const { username, email, password } = req.body;
        //exisitng user
        const exisitingEmail = await userModel.findOne({ email });
        if (exisitingEmail) {
          return next(new errorResponse("Email is already register", 500));
        }
        const user = await userModel.create({ username, email, password });
        this.sendToken(user, 201, res);
      } catch (error) {
        console.log(error);
        next(error);
      }
}
const Login=async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
          return next(new errorResponse("Please provide email or password"));
        }
        const user = await userModel.findOne({ email });
        if (!user) {
          return next(new errorResponse("Invalid Creditial", 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return next(new errorResponse("Invalid Creditial", 401));
        }
        //res
        this.sendToken(user, 200, res);
      } catch (error) {
        console.log(error);
        next(error);
      }
}
const Logout=async(req,res,next)=>{
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logout Succesfully",
    });
}


module.exports={Register,Login,Logout}