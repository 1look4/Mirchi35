const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/auth');

// POST /api/v1/auth/register
router.post('/register', [
	body('name').notEmpty().withMessage('name is required'),
	body('email').isEmail().withMessage('valid email is required'),
	body('password').isLength({ min: 4 }).withMessage('password must be at least 4 chars'),
	body('phone').notEmpty().withMessage('phone is required')
], async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	return authController.register(req, res, next);
});

// POST /api/v1/auth/verify-otp
router.post('/verify-otp', [
	body('phone').notEmpty().withMessage('phone is required'),
	body('otp').notEmpty().withMessage('otp is required')
], async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	return authController.verifyOtp(req, res, next);
});

module.exports = router;
