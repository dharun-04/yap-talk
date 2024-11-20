import mongoose from 'mongoose';
const userSchema=new mongoose.schema(
  {
  email:{
    type:String,
    required:true,
    unique:true,
  },
  fullName:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
    minlength:8,
  },
  profilePic:{
    type:String,
    default:"",
  },
  },
  { timestamps:true }
);

export const User=mongoose.model("User",userSchema);