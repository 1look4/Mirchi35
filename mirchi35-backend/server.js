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
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
}) 
.then(() = connected successfully')) 
.catch(err = connection error:', err)); 
 
// Routes 
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/businesses', require('./routes/businesses')); 
app.use('/api/categories', require('./routes/categories')); 
app.use('/api/reviews', require('./routes/reviews')); 
app.use('/api/users', require('./routes/users')); 
app.use('/api/upload', require('./routes/upload')); 
 
// Health check route 
app.get('/api/health', (req, res) =
  res.status(200).json({ 
    message: 'Server is running', 
    timestamp: new Date().toISOString() 
  }); 
}); 
 
// Error handling middleware 
app.use((err, req, res, next) =
  console.error(err.stack); 
  res.status(500).json({ 
    message: 'Something went wrong', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  }); 
}); 
 
// 404 handler 
app.use('*', (req, res) =
  res.status(404).json({ message: 'Route not found' }); 
}); 
 
 
app.listen(PORT, () =
  console.log(`Server running on port ${PORT}`); 
  console.log(`Environment: ${process.env.NODE_ENV}`); 
}); 
 
module.exports = app; 
