const { Product, TypeProduct } = require("../models/model");

const productController = {
  addProduct: async (req, res) => {
    try {
      const newProduct = await new Product(req.body);
      const product = await newProduct.save();
      //   console.log(product);
      if (req.body.type) {
        const type = await TypeProduct.findById(req.body.type);
        await type.updateOne({ $push: { products: product._id } });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const allProduct = await Product.find().populate("type", "typeName");
      return res.status(200).json(allProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await TypeProduct.updateMany(
        { products: req.params.id },
        { $pull: { products: req.params.id } }
      );
      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json("deleted success");
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getAnProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate(
        "type",
        "typeName"
      );
      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("updated success");
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

module.exports = productController;
