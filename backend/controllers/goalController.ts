import asyncHandler from "express-async-handler";
import goalModel from "@/backend/models/goalModel";

/**
 * @desc get Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req: any, res: any) => {
  const goals = await goalModel.find();
  res.status(200).json(goals);
});

/**
 * @desc set Goals
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler(async (req: any, res: any) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a text field");
  }

  const goal = await goalModel.create({ text: req.body.text });

  res.status(200).json(goal);
});

/**
 * @desc Update Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req: any, res: any) => {
  const goal = await goalModel.findById(req.params.id); //Find goal by id
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await goalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ); //Update goal

  res.status(200).json(updatedGoal);
});

/**
 * @desc Delete Goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req: any, res: any) => {
  const goal = await goalModel.findById(req.params.id); // Find goal by id
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goalModel.findByIdAndDelete(req.params.id); // Delete goal

  res.status(200).json({ id: req.params.id });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
