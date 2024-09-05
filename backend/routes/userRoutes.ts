import express from "express";

import {
  deleteUser,
  getUserById,
  getUsers,
  setUser,
  updateUser,
  CreateDummyUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(getUsers).post(setUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/generate").post(CreateDummyUser);

export default router;
