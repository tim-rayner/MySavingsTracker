import express from "express";
import "colors";
import dotenv from "dotenv";
import { errorHandler } from "@/backend/middleware/errorMiddleware";
import connectDB from "@/backend/config/db";

//Routes
import goalRoutes from "@/backend/routes/goalRoutes";
import userRoutes from "@/backend/routes/userRoutes";
import actionRoutes from "@/backend/routes/actionRoutes";

//Config
dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

//Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//Add routes
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/actions", actionRoutes);

// start the Express server
app.listen(port, () => {
  console.log(`Server started on port ${port}`.blue.bold);
});

//Dummy user id: 66d9cdcd95f861c4f43b96c2
