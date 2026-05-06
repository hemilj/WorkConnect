const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { resetPassword, checkEmail } = require('../controllers/authController');

router.post(
    '/check-email',
    [
        body('email').isEmail().withMessage('Valid email required'),
    ],
    checkEmail
);

router.post(
    '/reset-password',
    [
        body('email').isEmail().withMessage('Valid email required'),
        body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    resetPassword
);

module.exports = router;
