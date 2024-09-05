//We define the schema of the goal model here and export it as a model.
import mongoose from "mongoose";

const basicInfoSchema = new mongoose.Schema(
  {
    annualIncome: {
      type: Number,
      required: [true, "missing required field: annualIncome"],
    },
    payDays: {
      type: Date,
      required: [true, "missing required field: payDays"],
    },
    savingTarget: {
      type: Number,
      required: [true, "missing required field: savingTarget"],
    },
    savingTargetDate: {
      type: Date,
      required: [true, "missing required field: savingTargetDate"],
    },
    monthlySavingGoal: {
      type: Number,
      required: [true, "missing required field: monthlySavingGoal"],
    },
    monthlyOutgoings: {
      type: Number,
      required: [true, "missing required field: monthlyOutgoings"],
    },
    monthlyIncome: {
      type: Number,
      required: [true, "missing required field: monthlyIncome"],
    },
    salary: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    authTokenId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "missing required field: username"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "missing required field: name"],
    },
    surname: {
      type: String,
      required: [true, "missing required field: surname"],
    },
    email: {
      type: String,
      required: [true, "missing required field: email"],
      unique: true,
    },
    basicInfo: {
      type: basicInfoSchema,
      required: [true, "missing required field: basicInfo"],
    },
  },

  {
    timestamps: true,
    autoCreate: true,
  }
);

export default mongoose.model("User", userSchema);
