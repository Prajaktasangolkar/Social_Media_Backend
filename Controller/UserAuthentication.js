const User=require('../Schema/User.js')
const bcrypt=require('bcrypt')

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
        const saveUser=await newUser.save()
        console.log('User creatd successfully');
        res.status(201).json(saveUser)
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
                res.status(200).json({message:'user verified!'})
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