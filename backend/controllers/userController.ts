import asyncHandler from "express-async-handler";
import userModel from "@/backend/models/userModel";

/**
 * @desc get User by id
 * @route GET /api/users/:id
 * @access Private
 */
const getUserById = asyncHandler(async (req: any, res: any) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

/**
 * @desc get Users
 * @route GET /api/users
 * @access Private
 */
const getUsers = asyncHandler(async (req: any, res: any) => {
  const users = await userModel.find();
  res.status(200).json(users);
});

/**
 * @desc set User
 * @route POST /api/users
 * @access Private
 */
const setUser = asyncHandler(async (req: any, res: any) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a text field");
  }

  const user = await userModel.create({ text: req.body.text });

  res.status(200).json(user);
});

/**
 * @desc Update User
 * @route PUT /api/users/:id
 * @access Private
 */
const updateUser = asyncHandler(async (req: any, res: any) => {
  const user = await userModel.findById(req.params.id); //Find user by id
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ); //Update user

  res.status(200).json(updatedUser);
});

/**
 * @desc Delete User
 * @route DELETE /api/users/:id
 * @access Private
 */
const deleteUser = asyncHandler(async (req: any, res: any) => {
  const user = await userModel.findById(req.params.id); // Find user by id
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
});

//add endpoint to create a dummy user, which will only create a new user if there are no users in the database
const CreateDummyUser = asyncHandler(async (req: any, res: any) => {
  console.log("Creating dummy user".green.bold);
  const users = await userModel.find();
  if (users.length === 0) {
    const user = await userModel.create({
      authTokenId: "123456",
      username: "john_doe",
      name: "John",
      surname: "Doe",
      email: "john@doe.com",
      basicInfo: {
        monthlySavingGoal: 1000,
        monthlyOutgoings: 500,
        monthlyIncome: 2000,
        salary: true,
      },
    });

    console.log("Dummy user 'John Doe' created".green.bold);
    res.status(200).json(user);
  }

  res.status(400).json({ message: "User already exists" });
});

export {
  getUserById,
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  CreateDummyUser,
};
