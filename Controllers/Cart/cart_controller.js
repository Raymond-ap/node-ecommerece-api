const HttpError = require("../../Models/HttpError/http-error");

let DummyCart = [
  {
    id: "1",
    userId: "u1",
    products: [
      {
        id: "p1",
        title: "Cart Item one",
        price: 339,
      },
      {
        id: "p12",
        title: "Cart Item one",
        price: 339,
      },
    ],
  },
  {
    id: "2",
    userId: "u2",
    products: [
      {
        id: "p2",
        title: "Cart Item two",
        price: 339,
      },
    ],
  },
  {
    id: "3",
    userId: "u3",
    products: [
      {
        id: "p3",
        title: "Cart Item three",
        price: 339,
      },
    ],
  },
];

const getCartItems = (req, res, next) => {
  res.json({ cartItems: DummyCart });
};

// Get Cart items by user id
const getCartItemsByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const cartItem = DummyCart.find((item) => {
    return item.userId === userId;
  });

  res.json({ cart: cartItem });
};


exports.getCartItems = getCartItems;
exports.getCartItemsByUserId = getCartItemsByUserId;
