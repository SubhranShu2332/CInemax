import express from "express";
import connectDB from "./db/db.config.js";  // Import the connectDB function
// import cors from "cors";
import userRouter from "./routes/user.routes.js";  // Import the router correctly
const app = express();

// Connect to the database
connectDB();

// Middleware (if you need any in the future)
app.use(express.json()); // Parse incoming JSON requests


// Routes
app.get('/cinemax', (req, res) => {
  res.send('Hello World!');
});

// Use the router for user-related routes
app.use('/users', userRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
