const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect( process.env.MONGO_URL);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas database connection established successfully');
});

// Define Mongoose schema
const userSchema = new mongoose.Schema({
  count:Number,
});

// Define Mongoose model
const User = mongoose.model('User', userSchema);

// Define routes to retrieve data
app.get('/users', async (req, res) => {
  try {
    // Query the database to retrieve all users
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.count;
  try {
    // Query the database to retrieve a specific user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
