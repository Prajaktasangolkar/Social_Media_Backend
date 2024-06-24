const express=require('express');
const { createPost, getPost, updatePost, deletePost, likePost,dislikePost,getTimeLinePosts } = require('../Controller/PostController.js');
const router=express.Router();

router.post('/',createPost)
router.get('/:id',getPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.put('/:id/like',likePost)
router.put('/:id/dislike',dislikePost)
router.get("/:id/timeline",getTimeLinePosts)

module.exports=router;