//We define the schema of the action model here and export it as a model.

import mongoose from "mongoose";

export enum ActionType {
  INCOME = "Income",
  EXPENSE = "Expense",
  TRANSFER = "Transfer",
}

const actionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    note: {
      type: String,
      required: [true, "Please enter a note"],
    },
    date: {
      type: Date,
      required: [true, "Please enter a date"],
    },
    transactionAmount: {
      type: Number,
      required: [true, "Please enter a transaction amount"],
    },
    recurring: {
      type: Boolean,
      required: true,
    },
    interval: {
      type: Number,
      required: false,
    },
    actionType: {
      type: String,
      required: true,
      enum: Object.values(ActionType), // Use the enum property to specify allowed values
    },
    balanceAfterTransaction: {
      type: Number,
      required: [true, "Please enter a balance after transaction"],
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },

  {
    timestamps: true,
    autoCreate: true,
  }
);

export default mongoose.model("Action", actionSchema);
