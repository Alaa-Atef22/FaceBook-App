
import Comment  from '../../database/models/comment.model.js'
import Post  from '../../database/models/post.model.js'

const createComment = async (req, res) => {
    try {
      const { content, postId,userId } = req.body;
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const comment = await Comment.create({ content, postId, userId })
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const getComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
          res.status(404).json({ error: 'Comment not found' });
        } else {
          res.json({comment});
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };
const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;
        const updatedComment = await Comment.update({ content }, { where: { id: commentId } });
        if (updatedComment[0] === 0) {
          res.status(404).json({ error: 'Comment not found' });
        } else {
          res.json({ message: 'Comment updated successfully' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const deletedComment = await Comment.destroy({ where: { id: commentId } });
        if (!deletedComment) {
          res.status(404).json({ error: 'Comment not found' });
        } else {
          res.json({ message: 'Comment deleted successfully' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };

export {
    createComment,getComment,updateComment,deleteComment
};
