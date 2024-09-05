import mongoose, { Schema } from "mongoose";

const basicInfoSchema = new Schema({
  monthlySavingGoal: { type: Number, required: true },
  monthlyOutgoings: { type: Number, required: true },
  monthlyIncome: { type: Number, required: true },
  salary: { type: Boolean, required: true },
});

const userSchema = new Schema(
  {
    authTokenId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    basicInfo: { type: basicInfoSchema, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
