const {Blog,TypeBlog } = require("../models/model");


const blogController = {
    addBlog: async (req, res) => {
        try {
          const newBlog = await new Blog(req.body);
          const blog = await newBlog.save();
          if (req.body.type) {
            const type = await TypeBlog.findById(req.body.type);
            await type.updateOne({ $push: { blogs: blog._id } });
          }
    
          return res.status(200).json(blog);
        } catch (error) {
          return res.status(500).json(error);
        }
      },
      getAllBlog: async (req, res) => {
        try {
          const allBlog = await Blog.find().populate("type", "typeTitle").populate("author","username");
          return res.status(200).json(allBlog);
        } catch (error) {
          return res.status(500).json(error);
        }
      },
      deleteBlog: async (req, res) => {
        try {
          await TypeBlog.updateMany(
            { blogs: req.params.id },
            { $pull: { blogs: req.params.id } }
          );
          await Blog.findByIdAndDelete(req.params.id);
    
          res.status(200).json("deleted success");
        } catch (error) {
          return res.status(400).json(error);
        }
      },
      getAnBlog: async (req, res) => {
        try {
          const blog = await Blog.findById(req.params.id).populate(
            "type",
            "typeTitle"
          );
          res.status(200).json(blog);
        } catch (error) {
          return res.status(500).json(error);
        }
      },
    
      updateBlog: async (req, res) => {
        try {
          const blog = await Blog.findById(req.params.id);
          await blog.updateOne({ $set: req.body });
          res.status(200).json("updated success");
        } catch (error) {
          return res.status(400).json(error);
        }
      },
}

module.exports = blogController