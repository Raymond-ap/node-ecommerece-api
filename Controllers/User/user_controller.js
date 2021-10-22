const HttpError = require("../../Models/HttpError/http-error");
const UserModel = require("../../Models/User/Users");
const { validationResult } = require("express-validator");

// EXTRACT ALL USERS FROM DB
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserModel.find();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.json({ users: users }); // return response
};

// EXTRACT SINGLE USER BY ID
const getusersById = async (req, res, next) => {
  const userId = req.params.uid;
  let users;

  // Get user
  try {
    users = await UserModel.findById(userId);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  // Check if users are null
  if (!users || users.length === 0) {
    const error = new HttpError(
      "Could not find any user for the provided id",
      404
    );
    return next(error);
  }

  res.json(users); // return response
};

// DELETE USER BY ID
const deleteUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;

  try {
    user = await UserModel.findById(userId);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  try {
    await user.remove();
  } catch (err) {
    const error = new HttpError("Failed in deleting user", 500);
    return next(error);
  }

  res.status(200).json({ message: "User deleted Successfully" });
};

// CREATE NEW USER
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(errors, 422));
  }

  const { username, phone, email } = req.body;

  const _createdUser = new UserModel({
    username,
    phone,
    email,
  })

  try {
    await _createdUser.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(201).json(_createdUser);
};

exports.getUsers = getUsers;
exports.getusersById = getusersById;
exports.deleteUserById = deleteUserById;
exports.createUser = createUser;
