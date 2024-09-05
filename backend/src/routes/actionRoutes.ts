import express from "express";

import {
  getActionsByUserId,
  setAction,
  updateAction,
  deleteAction,
} from "../controllers/actionController";

const router = express.Router();

router.route("/:userId").get(getActionsByUserId).post(setAction);
router.route("/:id").put(updateAction).delete(deleteAction);

export default router;
