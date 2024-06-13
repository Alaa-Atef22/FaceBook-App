import express from'express'
import {createComment,getComment,updateComment,deleteComment } from './comment.controller.js'

const CommentRouter= express.Router()


CommentRouter.post('/createComment', createComment);
CommentRouter.get('/getComment/:commentId', getComment);
CommentRouter.put('/updateComment/:commentId', updateComment);
CommentRouter.delete('/deleteComment/:commentId', deleteComment);




export default CommentRouter