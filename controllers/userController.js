const {User} = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokens = [];
const userController = {
  generateAccesToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "7d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "30d" }
    );
  },
  registerUser: async (req, res) => {
    try {
        
      const { username, password, email, ...prev } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = await new User({
        username: username,
        email: email,
        password: hashed,
        ...prev,
      });

      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("wrong email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("wrong password");
      }
      if (user && validPassword) {
        //tao Token
        const accessToken = userController.generateAccesToken(user);
        const refreshToken = userController.generateRefreshToken(user);
        //luu refresh token vao cookie
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false, //nao` deploy thi set true
          path: "/",
          sameSite: "strict",
        });
        const { password, ...other } = user._doc;
        return res.status(200).json({ ...other, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("logout success");
  },
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json("success deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json("success updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
