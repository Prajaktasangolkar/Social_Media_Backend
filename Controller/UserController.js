const User = require("../Schema/User.js");
const bcrypt = require("bcrypt");
//get user

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
      //it will not take password
    } else {
      res.status(404).json("No such user");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//update

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;
  if (id == currentUserId || currentUserAdminStatus) {
    try {
      /*
            const user=await User.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(user)
            "currentUserId":"id"
            "currentUserAdminStatus":false
            "username":"ghjj"

            but what if i want to update password
            */
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });

      //    for password
      if (password) {
        
        req.body.password = await bcrypt.hash(password, 10);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile!");
  }
};

/*
if currentUserAdminStatus =true then it can change id also of user but if false then it can't change the id 
*/ 

const deleteUser=async (req,res)=>{
      const id=req.params.id;
      const {currentUserId,currentUserAdminStatus}=req.body;

      if(currentUserId==id || currentUserAdminStatus){
        try{
            await User.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully!")
        }
        catch(error){
          res.status(500).json(error)
        }
      }
      else{
        res.status(403).json("Access Denied! you can only delete your own profile!");

      }
}

//Follow a user
const followUser=async(req,res)=>{
    const id=req.params.id;
    const {currentUserId}=req.body;

    if(currentUserId==id){
       res.status(403).json("Action forbidden") 
    }
    else{
        try{
             const followUser=User.findById(id);
             const followingUser=User.findById(currentUserId)

             if(!followUser.followers.includes(currentUserId)){ //means someone we follow have some followers
                await followUser.updateOne({$push:{followers:currentUserId}})
                await followingUser.updateOne({$push:{following:id}})
                res.status(200).json("User followed!")
             }
             else{
                res.status(403).json("User is already followed by you")
             }
        }
        catch(error){
            res.status(500).json(error)
        }
    }

}

//Unfollow a user
const unfollowUser=async(req,res)=>{
    const id=req.params.id;
    const {currentUserId}=req.body;

    if(currentUserId==id){
       res.status(403).json("Action forbidden") 
    }
    else{
        try{
             const followUser=User.findById(id);
             const followingUser=User.findById(currentUserId)

             if(followUser.followers.includes(currentUserId)){ //means someone we follow have some followers
                await followUser.updateOne({$pull:{followers:currentUserId}})
                await followingUser.updateOne({$pull:{following:id}})
                res.status(200).json("User unfollowed!")
             }
             else{
                res.status(403).json("User is not followed by you")
             }
        }
        catch(error){
            res.status(500).json(error)
        }
    }

}
module.exports = { getUser, updateUser,deleteUser ,followUser};
