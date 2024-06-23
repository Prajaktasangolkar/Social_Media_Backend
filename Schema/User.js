const mongoose=require('mongoose')

const userScheme =new mongoose.Schema({

     username:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true,
     },
     firstname:{
        type:String,
        required:true,
     },
     lastname:{
        type:String,
        required:true,
     }, 
     email:{
        type:String,
        required:true,
     },
     isAdmin:{
        type:Boolean,
        default:false
     },
     profilePicture:String,
     coverPicture:String,
     about:String,
     livesin:String,
     workAt:String,
     relationship:String,
     followers:[], //save id's
     following:[],
},
{timestamps:true}
)
const User=mongoose.model("User",userScheme)

module.exports=User;