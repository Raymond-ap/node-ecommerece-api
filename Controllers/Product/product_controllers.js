const HttpError = require("../../Models/HttpError/http-error");

const productModel = require("../../Models/Product/product_model");


// FETCH ALL PRODUCT DATA FROM DB
const getProducts = async (req, res, next) => {
  let products;
  
  try {
    products = await productModel.find();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.json(products);
};

// GET SINGLE PRODUCT BASED ON PROVIDED ID
const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  let product;

  try {
    product = await productModel.findById(productId); // Get Product
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  // Check if product is not null
  if (!product || product.length === 0) {
    const error = new HttpError(
      "Could Not Find Any Product For The Provided Id",
      404
    );
    return next(error);
  }

  res.json(product);
};


// FILTER DATA BY CATEGORY NAME
const getProductsByCategory = async (req, res, next) => {
  const category = req.params.category;
  let product;

  try {
    product = await productModel.find({category: category})
  } catch(err) {
    const error = new HttpError(err, 500)
    return next(error)
  }
  res.json(product)
};


// FILTER DATA BY TITLE
const getProductsByTitle = async (req, res, next) => {
  const title = req.params.title;
  let product
  try {
    product = await productModel.find({title: title})
  } catch(err) {
    const error = new HttpError(err, 500)
    return next(error)
  }
  res.json(product)
};


// GET ALL DATA CATEGORIES
const getProductsCategories = async (req, res, next) => {
  let products;
  let categories;
  let unique;

  try {
    products = await productModel.find()
    categories = products.map((item) => {return item.category;})
    unique = [...new Set(categories)]
  } catch(err) {
    const error = new HttpError(err, 500)
    return next(error)
  }
  res.json(unique)
};


// FILTER PRODUCT BY LIMITED COUNT
const getProductByLimit = async (req, res, next) => {
  let limitNumber = req.params.num;
  let products;

  try {
    products = await productModel.find();
    products = products.slice(0, limitNumber).filter((item) => {
      return item;
    });
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.json({ products: products });
};


// CREATE NEW DATA TO DB
const createProduct = async (req, res, next) => {
  const { title, price, description, category, image, rating, colors, brand } =
    req.body;

  const _createdProduct = new productModel({
    title,
    price,
    description,
    category,
    image,
    rating,
    brand,
    colors,
  });

  try {
    await _createdProduct.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(201).json(_createdProduct);
};


// UPDATE DATA BY ID
const updateProuctById = async (req, res, next) => {
  const productId = req.params.id;
  const { title, price, description, category, image, colors, rating } =
    req.body;

  let product;

  // Get product based on provided id
  try {
    product = await productModel.findById(productId);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  // Update properties
  product.title = title;
  product.price = price;
  product.description = description;
  product.category = category;
  product.image = image;
  product.rating = rating;
  product.colors.push(...colors);

  // Save Update fields to DB
  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json(product.toObject({ getters: true }));
};


// DELETE PRODUCT BY ID
const deleteProductById = async (req, res, next) => {
  const productId = req.params.pid;
  let product;

  try {
    product = await productModel.findById(productId);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError("Failed in deleting product", 500);
    return next(error);
  }

  res.status(200).json({ message: "Product deleted Successfully" });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.getProductsByCategory = getProductsByCategory;
exports.createProduct = createProduct;
exports.updateProuctById = updateProuctById;
exports.deleteProductById = deleteProductById;
exports.getProductsByTitle = getProductsByTitle;
exports.getProductsCategories = getProductsCategories;
exports.getProductByLimit = getProductByLimit;
