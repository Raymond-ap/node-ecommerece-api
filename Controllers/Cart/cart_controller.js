const HttpError = require("../../Models/HttpError/http-error");
const CartModel = require("../../Models/Cart/Cart");

//
const getCartItems = async (req, res, next) => {
  let cartItems;
  try {
    cartItems = await CartModel.find();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.json(cartItems);
};

// Get Cart items by user id
const getCartItemsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let cartItem;

  try {
    cartItem = await CartModel.find({ userId: userId }, { products: 1 });
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  if (!cartItem || cartItem.length === 0) {
    return next(new HttpError("Error getting cartitem", 500));
  }

  res.json({ cart: cartItem });
};

// Update a quantity for cart item
const updateCartItemQuantity = async (req, res, next) => {};

// Delete Single cart Item
const deleteCartItemById = async (req, res, next) => {
  // const cartId = req.params.cid;
  // const productId = req.params.pid;
  // let newSet, cartItem

  // try {
  //   cartItem = await CartModel.findById(cartId)
  //   cartItem = cartItem.products.filter((item) => {return item.productId !== productId})
    

  // } catch(err) {
  //   return next(new HttpError(err, 500))
  // }

  res.status(200).json({message: "Item deleted successfully"})

};

// Delete all cartItems
const deleteAllCartItemsByUserID = async (req, res, next) => {
  const cartId = req.params.cid
  let cartItem

  try {
    cartItem = await CartModel.findById(cartId)
  } catch(err) {
    return next(new HttpError(err, 500))
  }

  try {
    await cartItem.remove()
  } catch(err) {
    return next(new HttpError(err, 500))
  }

  res.status(200).json({message: "Cart items deleted successfully."})
};

// Create new cartItem
const createCartItem = async (req, res, next) => {
  const { userId, date, products, information } = req.body;

  const _createdCartItem = new CartModel({
    userId,
    date,
    products,
    information,
  });

  try {
    await _createdCartItem.save();
  } catch (err) {
    const error = new HttpError(err, next);
    return next(error);
  }

  res.status(201).json(_createdCartItem);
};

const appendCartItemById = async (res, req, next) => {
  const cartId = req.params.cartId;
  let cartItem;
  const { products } = req.body;

  // Get cartItem
  try {
    cartItem = await CartModel.findById(cartId);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  // append new cartItem
  cartItem.products.push(...products);

  try {
    await cartItem.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json(cartItem.toObject({ getters: true }));
};

exports.getCartItems = getCartItems;
exports.getCartItemsByUserId = getCartItemsByUserId;
exports.createCartItem = createCartItem;
exports.appendCartItemById = appendCartItemById;
exports.deleteAllCartItemsByUserID = deleteAllCartItemsByUserID;
exports.deleteCartItemById = deleteCartItemById;
