const { default: mongoose } = require('mongoose');
const PostModel=require('../Schema/PostModel.js');
const User=require('../Schema/User.js')

const createPost=async(req,res)=>{
    const newPost= new PostModel(req.body)
    console.log('newpost',newPost);
    try {
        await newPost.save()
        res.status(200).json(newPost)
        // res.status(200).send('okkk')
    } catch (error) {
        res.status(500).json(error)
    }

}

//getpost 

const getPost=async(req,res)=>{
    const id=req.params.id;
    try {
        const post=await PostModel.findById(id);
        if (post){
            res.status(200).json(post)
        }
        else{
            res.status(404).json('No such user')
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
}


//updatepost


const updatePost=async(req,res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try {
       const post=await PostModel.findById(id)
       if(post.userId===userId ){
           await PostModel.updateOne({$set:req.body});
           res.status(200).json("Post Updated")
        }
        else{
           res.status(403).json('Actin forbidden')
        }
    } catch (error) {
       res.status(500).json(error)
    }
}

//deletepost
const deletePost=async(req,res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try {
        const post=await PostModel.findById(id)
        if (post.userId===userId){
            await PostModel.deleteOne()
            res.status(200).json("Post deleted")

        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//liked post
const likePost=async(req,res)=>{
     const id=req.params.id;
     const {userId}=req.body;
     try {
      const post = await PostModel.findById(id);
      if (post.likes.includes(userId)) {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post disliked");
      } else {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      }
    }
      catch (error) {
        res.status(500).json(error)
     }
}

//disliked post
const dislikePost=async(req,res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try {
        const post=await PostModel.findById(id)
        if(!post.likes.includes(userId)){
           await PostModel.updateOne({$push:{likes:userId}})
           res.status(200).json("Post likes")
        }
        else{
           await PostModel.updateOne({$pull:{likes:userId}})
           res.status(200).json("Post Unlikes")
        }
    } catch (error) {
       res.status(500).json(error)
    }
}

const getTimeLinePosts = async (req, res) => {
    const userId = req.params.id
    try {
      const currentUserPosts = await PostModel.find({ userId: userId });
  
      const followingPosts = await UserModel.aggregate([
        { 
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res.status(200).json(
        currentUserPosts
          .concat(...followingPosts[0].followingPosts)
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };


module.exports={createPost,getPost,updatePost,deletePost,likePost,dislikePost,getTimeLinePosts}
