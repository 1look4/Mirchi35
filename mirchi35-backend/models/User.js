const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: { type: String, required: true, unique: true, trim: true },
  phoneVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Generate a simple numeric OTP and set expiry (caller handles sending)
UserSchema.methods.setOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  // expires in 10 minutes
  this.otpExpires = Date.now() + 10 * 60 * 1000;
  return otp;
};

module.exports = mongoose.model('User', UserSchema);
