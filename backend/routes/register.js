const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { register } = require('../controllers/authController');

router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    register
);

module.exports = router;