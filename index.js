import sequelize from "./database/dbCon.js"
import express from 'express'
import UserRouter from "./modules/user/user.routes.js"
import PostRouter from "./modules/post/post.routes.js"
import CommentRouter from "./modules/comment/comment.routes.js"
import userPostCommentsRoute from "./modules/userPostComments.js"
import session  from 'express-session'
import cors  from 'cors'

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())
sequelize.sync()
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));

app.use('/user',UserRouter)
app.use('/post',PostRouter)
app.use('/comment',CommentRouter)
app.use('/userPostComments', userPostCommentsRoute);
app.listen( port, () => console.log("server is running"));