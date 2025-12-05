const catchAsyncErrors=require("./catchAsyncErrors");
const ErrorHandler=require("../utils/errorhandler");
const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodedData._id);
    next();


})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resource `,
            403
          )
        );
      }
      next();
    };
  };
