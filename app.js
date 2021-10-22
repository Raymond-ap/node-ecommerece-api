const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ProductRoute = require("./Router/Product/product_router");
const CartRouter = require("./Router/Cart/cart_router");
const UserRouter = require("./Router/User/users_router");
const HttpError = require("./Models/HttpError/http-error");

const app = express();

const url = ""
 
app.use(bodyParser.json());

app.use("/products", ProductRoute);

app.use("/carts", CartRouter);

app.use("/users", UserRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occured" });
});

// CONNECTION MONGOOSE AND START SERVER
// mongoose
//   .connect(url)
//   .then(() => app.listen(5000))
//   .catch((error) => console.log(error));

app.listen(5000);
