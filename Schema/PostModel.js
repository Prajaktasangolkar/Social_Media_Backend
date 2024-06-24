const mongoose=require("mongoose")

const postmodel=new mongoose.Schema({
      userId:{
        type:String,
        required:true
      },
      desc:String,
      likes:[],
      image:String
},
{timestamps:true}
)

const PostModel=mongoose.model("PostModel",postmodel);

module.exports=PostModel;