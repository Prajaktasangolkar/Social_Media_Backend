const express=require('express')
const router=express.Router()
const {getAllUser,getUser,updateUser, deleteUser,followUser,unfollowUser}=require('../Controller/UserController.js')
const authMiddleWare = require('../Middleware/authMiddleware.js')

router.get("/",getAllUser)
router.get('/:id',getUser)
router.put('/:id', updateUser)
router.delete("/:id",authMiddleWare,deleteUser)
router.put('/:id/follow',followUser)
router.put("/:id/unfollow",unfollowUser)


module.exports=router;