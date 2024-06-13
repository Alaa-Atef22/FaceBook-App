
import Post  from '../../database/models/post.model.js'
import User  from '../../database/models/user.model.js'
const createPost = async (req, res) => {
    try {
      const { title, content, authorId } = req.body;
      const post = await Post.create({ title, content, authorId });
      res.status(201).json(post)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
   
  }
const getPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findByPk(postId,{ attributes: { exclude: ['authorId','createdAt', 'updatedAt'] },
          include: [{ model: User, as: 'author', attributes: ['id', 'username', 'email']  }]});
        if (!post) {
          res.status(404).json({ error: 'Post not found' });
        } else {
           res.status(200).json(post);
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };

const updatePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { title, content } = req.body;
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (post.authorId === req.session.userId) {
        return res.status(403).json({ error: 'You are not authorized to edit this post' });
      }
      post.title = title;
      post.content = content;
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (post.authorId === req.session.userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this post' });
      }
      await post.update({ deleted: true });
      await post.save();
  
      res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export {
    createPost,getPost,updatePost,deletePost,getAllPosts
};
