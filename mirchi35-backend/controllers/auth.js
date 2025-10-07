const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
	const payload = { id: user._id, role: user.role };
	return jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: process.env.JWT_EXPIRE || '30d' });
};

// POST /api/v1/auth/register
exports.register = async (req, res, next) => {
	try {
		const { name, firstName, email, password, role, phone } = req.body;
		if (!name || !email || !password || !phone) {
			return res.status(400).json({ message: 'name, email, password and phone are required' });
		}

		// check existing email or phone
		const existing = await User.findOne({ $or: [{ email }, { phone }] }).select('+password');
		if (existing) {
			return res.status(409).json({ message: 'User with this email or phone already exists' });
		}

		const user = new User({ name, firstName, email, password, role, phone });

		// set an OTP for phone verification but do not mark phoneVerified
		const otp = user.setOTP();

		await user.save();

		// TODO: replace console.log with SMS provider integration
		console.log(`Sending OTP to ${user.phone}: ${otp}`);

		const token = generateToken(user);

		res.status(201).json({
			message: 'User registered. Verify phone using OTP sent to your phone.',
			user: { id: user._id, email: user.email, phone: user.phone, phoneVerified: user.phoneVerified },
			token
		});
	} catch (err) {
		next(err);
	}
};

// POST /api/v1/auth/verify-otp
exports.verifyOtp = async (req, res, next) => {
	try {
		const { phone, otp } = req.body;
		if (!phone || !otp) return res.status(400).json({ message: 'phone and otp are required' });

		const user = await User.findOne({ phone }).select('+password +otp +otpExpires +phoneVerified');
		if (!user) return res.status(404).json({ message: 'User not found' });

		if (user.phoneVerified) return res.status(400).json({ message: 'Phone already verified' });

		if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
			return res.status(400).json({ message: 'OTP expired or not found. Request a new one.' });
		}

		if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

		user.phoneVerified = true;
		user.otp = undefined;
		user.otpExpires = undefined;
		await user.save();

		const token = generateToken(user);

		res.json({ message: 'Phone verified', token, user: { id: user._id, phoneVerified: user.phoneVerified } });
	} catch (err) {
		next(err);
	}
};

