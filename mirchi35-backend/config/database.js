const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment');
    }

    const conn = await mongoose.connect(uri, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('Database connection error:', error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;
