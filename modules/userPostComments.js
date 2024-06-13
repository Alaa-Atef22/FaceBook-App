
import express from'express'
import Post  from '../database/models/post.model.js'
import User  from '../database/models/user.model.js'
import Comment  from '../database/models/comment.model.js'

const userPostCommentsRoute = express.Router();
userPostCommentsRoute.get('/:userId/post/:postId', async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const post = await Post.findOne({
      where: { id: postId, authorId: userId }, 
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'email'] }, 
        { model: Comment, include: [{ model: User, attributes: ['id', 'username', 'email'] }] } 
      ]
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ user, post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
);

export default userPostCommentsRoute