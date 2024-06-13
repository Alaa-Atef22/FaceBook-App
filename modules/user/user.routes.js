import express from'express'
import { register,login,logout} from './user.controller.js'
import isAuthenticated from '../../middleware/authMiddleware.js'


const UserRouter= express.Router()

UserRouter.post('/register',register)
UserRouter.post('/login',login)
UserRouter.post('/logout',isAuthenticated,logout)





export default UserRouter