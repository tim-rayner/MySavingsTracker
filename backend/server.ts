import express from "express";
import "colors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";

//Routes
import goalRoutes from "./routes/goalRoutes";

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

// start the Express server
app.listen(port, () => {
  console.log(`Server started on port ${port}`.blue.bold);
});
