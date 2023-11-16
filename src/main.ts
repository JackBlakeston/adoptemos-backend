import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { mongoUrl } from './config/db.config';
import { config } from 'dotenv';

// Import your API routes and controllers here
// Example:
// import { dogsRoutes } from './routes/dogs';

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB ');
});

// Define your API routes and attach them to the Express app
// Example:
// app.use('/dogs', dogsRoutes);

// Define a default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Dog Adoption API!' });
});

// Start the Express server
const port = process.env.NODE_DOCKER_PORT || 8080;
app.listen(port, () => {
  console.log('WE FLYIN');
  console.log('mongo url is ', mongoUrl);
  console.log(`Server is running on port ${port}`);
});
