
require('dotenv').config();

console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);



const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to local MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to local MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Basic Test Route
app.get('/api/status', (req, res) => {
    res.json({ message: 'AgriLink MongoDB Backend is running' });
});

// Basic Test Route
app.get('/api/status', (req, res) => {
    res.json({ message: 'AgriLink MongoDB Backend is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));