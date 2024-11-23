import jwt from "jsonwebtoken";
import User from "../models/user.models.js"

export const protectRoute=async(req,res)=>{
  try{
    const token=req.cookies.jwt;

    if(!token){
        return res.status(401).json({message:"Unauthorized- invalid token"})
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({message:"Unauthorized- invalid token"})
    }

    const user=await User.findById(decoded.userId).select("-password");
    if(!user){
      return res.status(404).json({message:"user not found"})
    }

    req.user=user;
    next();


  }catch (error){
    console.log(error.message);
    res.status(500).json({message:"Internal server error"});
    }
};