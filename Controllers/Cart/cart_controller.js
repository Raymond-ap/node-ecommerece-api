const HttpError = require("../../Models/HttpError/http-error");

let DummyCart = 
[
  {
    "id": 1,
    "userId": "1",
    "date": "2020-03-02T00:00:02.000Z",
    "products": [
      {
        "productId": 1,
        "quantity": 4
      },
      {
        "productId": 2,
        "quantity": 1
      },
      {
        "productId": 3,
        "quantity": 6
      }
    ],
  },
  {
    "id": "2",
    "userId": "7",
    "date": "2020-01-02T00:00:02.000Z",
    "products": [
      {
        "productId": 2,
        "quantity": 4
      },
      {
        "productId": 1,
        "quantity": 10
      },
      {
        "productId": 5,
        "quantity": 2
      }
    ],
  },
  {
    "id": "3",
    "userId": "2",
    "date": "2020-03-01T00:00:02.000Z",
    "products": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 9,
        "quantity": 1
      }
    ],
  },
  {
    "id": "4",
    "userId": "3",
    "date": "2020-01-01T00:00:02.000Z",
    "products": [
      {
        "productId": 1,
        "quantity": 4
      }
    ],
  },
  {
    "id": "5",
    "userId": "11",
    "date": "2020-03-01T00:00:02.000Z",
    "products": [
      {
        "productId": 7,
        "quantity": 1
      },
      {
        "productId": 8,
        "quantity": 1
      }
    ],
  },
]

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


// Update a quantity for cart item
const updateCartItemQuantity = (req, res, next) => {}

// Delete Single cart Item
const deleteCartItemById = (req, res, next) => {}


// Delete all cartItems
const deleteAllCartItemsByUserID = (req, res, next) => {
  const userId = req.params.uid;
  const cartItem = DummyCart.find((item) => item.userId === userId)
  cartItem.products = []
  res.json(cartItem)
}


// Create new cartItem
const createCartItem = (req, res, next) => {
  const {
    userId,
    date,
    products
  } = req.body

  const _createdCartItem = {
    id: new Date().getMilliseconds(),
    userId,
    date,
    products
  }

  DummyCart.push(_createdCartItem)
  res.json({cartItems: _createdCartItem})
}


exports.getCartItems = getCartItems;
exports.getCartItemsByUserId = getCartItemsByUserId;
exports.createCartItem = createCartItem;
exports.deleteAllCartItemsByUserID = deleteAllCartItemsByUserID;
