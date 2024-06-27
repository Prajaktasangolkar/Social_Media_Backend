const User=require('../Schema/User.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()

const registerUser=async(req,res)=>{
   try{
    const {username,password,firstname,lastname,email}=req.body;

    const isUserExist=await User.findOne({email:email})
    if (isUserExist){
        return res.status(400).json({error:'User already exists'})
    }
    else{
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            username,
            firstname,
            lastname,
            email,
            password:hashPassword
        })
        const saveUser=await newUser.save();
        const token=jwt.sign({
            email:saveUser.email,id:saveUser._id
        },process.env.JWT_KEY,{expiresIn:'1h'})
        console.log("token",token);
        console.log('User created successfully');
        res.status(201).json({saveUser,token})
    }
   }
   catch(error){
    res.status(500).json(error)
   }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        console.log(req.body);
        const user=await User.findOne({email:email})
        if (user){
            const passwordMatch=await bcrypt.compare(password,user.password)
            if (passwordMatch){
                const token=jwt.sign({
                    email:user.email,id:user._id
                },process.env.JWT_KEY,{expiresIn:'1h'})
                // console.log("token",token);
                res.status(200).json({message:'user verified!',user,token})
            }
            else{
                res.status(401).json({message:'Invalid credentials'})  
            }
        }
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
    }
}

module.exports = {
    registerUser,
    loginUser
};