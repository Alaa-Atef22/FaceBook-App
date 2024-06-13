import express from'express'
import {createPost,getPost,getAllPosts,updatePost,deletePost } from './post.controller.js'
import isAuthenticated from '../../middleware/authMiddleware.js'
const PostRouter= express.Router()


PostRouter.post('/createPost', createPost);
PostRouter.get('/getPost/:postId', getPost);
PostRouter.get('/getAllPosts', getAllPosts);
PostRouter.put('/updatePost/:postId',isAuthenticated,updatePost);
PostRouter.delete('/deletePost/:postId',isAuthenticated, deletePost);




export default PostRouter