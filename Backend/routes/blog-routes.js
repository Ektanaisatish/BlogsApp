import express from "express";
import {
  addBlog,
  getAllBlogs,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
} from "../controllers/blog-controller.js";
const blogRouter = express.Router();
blogRouter.get("/", getAllBlogs);   //http://localhost:5000/api/blog
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/getuser/:id",getByUserId);
export default blogRouter;
