import asyncHandler from "express-async-handler";
import actionModel from "@/backend/models/actionModel";

/**
 * @desc get Actions by user id
 * @route GET /api/actions
 * @access Private
 */
const getActionsByUserId = asyncHandler(async (req: any, res: any) => {
  const actions = await actionModel.find({ user: req.params.userId });
  res.status(200).json(actions);
});

/**
 * @desc set Action
 * @route POST /api/actions/:userId
 * @access Private
 */
const setAction = asyncHandler(async (req: any, res: any) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please enter a title");
  }

  const action = await actionModel.create({
    user: req.params.userId,
    title: req.body.title,
    note: req.body.note,
    date: req.body.date,
    transactionAmount: req.body.transactionAmount,
    recurring: req.body.recurring,
    interval: req.body.interval,
    actionType: req.body.actionType,
    balanceAfterTransaction: req.body.balanceAfterTransaction,
    completed: req.body.completed,
  });

  res.status(200).json(action);
});

/**
 * @desc Update Action
 * @route PUT /api/actions/:id
 * @access Private
 */
const updateAction = asyncHandler(async (req: any, res: any) => {
  const action = await actionModel.findById(req.params.id); //Find action by id
  if (!action) {
    res.status(400);
    throw new Error("Action not found");
  }

  const updatedAction = await actionModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ); //Update action

  res.status(200).json(updatedAction);
});

/**
 * @desc Delete Action
 * @route DELETE /api/actions/:id
 * @access Private
 */
const deleteAction = asyncHandler(async (req: any, res: any) => {
  const action = await actionModel.findById(req.params.id); // Find action by id
  if (!action) {
    res.status(400);
    throw new Error("Action not found");
  }

  await actionModel.findByIdAndDelete(req.params.id); // Delete action

  res.status(200).json({ id: req.params.id });
});

export { getActionsByUserId, setAction, updateAction, deleteAction };
