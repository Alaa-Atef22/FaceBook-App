import sequelize from "../dbCon.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";


const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  }
  }
);

User.hasMany( Post , { foreignKey: "authorId" });
Post.belongsTo( User , { foreignKey: "authorId" ,as: 'author' });




export default Post;
