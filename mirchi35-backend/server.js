const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
require('dotenv').config(); 
 
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
const connectDB = require('./config/database');
connectDB();

// Routes (versioned)
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/businesses', require('./routes/businesses'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/upload', require('./routes/upload'));

// Health check route
app.get('/api/health', (req, res) =>
  res.status(200).json({ message: 'Server is running', timestamp: new Date().toISOString() })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
