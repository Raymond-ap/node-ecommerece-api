const mongoose = require("mongoose");
const Product = require("../Models/Product/product_model");
const Cart = require("../Models/Cart/Cart");
const User = require("../Models/User/Users");

const url = "mongodb+srv://raymond:nM7i1ryhe9tBmf29@cluster0.vmmvh.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => console.log("Connection To DataBase Successfully"))
  .catch((error) => console.log("Connection Failed"));

// PRODUCT MODEL
const createProduct = async (req, res, next) => {
  const _product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    rating: req.body.image,
    rating: req.body.rating,
    colors: req.body.colors
  };
  const results = await _product.save();
  res.json(results);
};

// CART MODEL
const createCart = async (req, res, next) => {
  const _cart = {
    userId: req.body.userId,
    products: req.body.products,
    date: req.body.date,
  };
  const result = await _cart.save();
  res.json(results);
};

// UUSER MODEL
const createUsers = async (req, res, next) => {
  const _user = {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  };
  const results = await _user.save();
  res.json(results);
};

exports.createProduct = createProduct;
exports.createCart = createCart;
exports.createUsers = createUsers;
