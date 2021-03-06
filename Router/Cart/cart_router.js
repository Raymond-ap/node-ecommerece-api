const express = require("express");
const cartController = require("../../Controllers/Cart/cart_controller");

const router = express.Router();

// GET ALL CAART ITEMS ROUTE
router.get("/", cartController.getCartItems);

// GET CART ITEM BY USER ID ROUTE
router.get("/:uid", cartController.getCartItemsByUserId);

// CREATE NEW CART ITEM ROUTE
router.post("/", cartController.createCartItem);

// DELETE ALL CART ITEM FOR A USER ROUTE
router.delete("/:cid", cartController.deleteAllCartItemsByUserID);

// DELETE SINGLE CART ITEM
// router.delete('/:cid/:pid', cartController.deleteCartItemById)

// APPEND NEW CARTITEM ROUTE
router.patch("/:cartId", cartController.appendCartItemById);

module.exports = router;
