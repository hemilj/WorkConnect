const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { login } = require('../controllers/authController');

router.post(
    '/',
    [
        body('email').isEmail().withMessage('Valid email required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    login
)

module.exports = router;