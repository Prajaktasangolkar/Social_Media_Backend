const express=require('express')
const router=express.Router()
const {getUser,updateUser, deleteUser,followUser}=require('../Controller/UserController.js')


router.get('/:id',getUser)
router.put('/:id',updateUser)
router.delete("/:id",deleteUser)
router.put('/:id/follow',followUser)


module.exports=router;