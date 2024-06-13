import sequelize from "../dbCon.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Post from "./post.model.js";

const Comment = sequelize.define("Comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
User.hasMany(Comment, { foreignKey: "userId" });
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });
export default Comment;
