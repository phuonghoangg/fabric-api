const { TypeBlog } = require("../models/model");

const typeBlogController = {
  addType: async (req, res) => {
    try {
      const newType = await new TypeBlog(req.body);
      const type = await newType.save();

      return res.status(200).json(type);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllType: async (req, res) => {
    try {
      const allType = await TypeBlog.find();
      // .populate("author","author")
      res.status(200).json(allType);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAnType: async (req, res) => {
    try {
      const type = await TypeBlog.findById(req.params.id).populate("products");
      res.status(200).json(type);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  UpdateType: async (req, res) => {
    try {
      const type = await TypeBlog.findById(req.params.id);
      await type.updateOne({ $set: req.body });
      res.status(200).json("updated success");
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  DeleteType: async (req, res) => {
    try {
      const type = await TypeBlog.findById(req.params.id);
      if (type.blogs.length > 0) {
        console.log("ádasdasdas");
        return res.status(200).json("TYPE_HAVE_A_PRODUCT");
      } else {
        await TypeBlog.findByIdAndDelete(req.params.id);
        return res.status(200).json("TYPE_DELETED");
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

module.exports = typeBlogController;
