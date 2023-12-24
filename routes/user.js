const express = require("express");
const {
  registerUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
  userLogin,
} = require("../controllers/user");

const userRouter = express.Router();

// user register
userRouter.post("/register", registerUser);

// user login
userRouter.post("/login", userLogin);

// get all users
userRouter.get("/", getAllUsers);

// get user by id
userRouter.get("/:id", getUserById);

// update user
userRouter.put("/:id", updateUser);

// delete user
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
