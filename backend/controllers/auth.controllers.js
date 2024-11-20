import { generateToken } from '../lib/utils.js';
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'

export const signup=async (req,res)=>{
  const {fullName,email,password}=req.body;

  try{

      if(!fullName||!email||!password) {
        return res.status(400).json({message:"Please fill in all fields"})
      }
    
      if(password.length <8){
        return res.status(400).json({error:"Password must be at least 8 characters long"});
      }

      const user = await User.findOne({email});

      if(user){
        return res.status(400).json({error:"Email already exists"});
      }

      const salt= await bcrypt.genSalt(10)
      const hashedPassword=await bcrypt.hash(password,salt);

      const newUser= new User({
        fullName,
        email,
        password:hashedPassword
      })

      if(newUser){
          generateToken(newUser._id,res);
          await newUser.save();

          res.status(201).json(
            {
              _id:newUser._id,
              fullName:newUser.fullName,
              email:newUser.email,
              profilePic:newUser.profilePic,
            }
          );
      } else{
        return res.status(400).json({error:"Failed to create user"});
      }

  } catch(error){
    console.log(error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
};

export const login=(req,res)=>{
  res.send("signup route");
}

export const logout=(req,res)=>{
  res.send("signup route");
}