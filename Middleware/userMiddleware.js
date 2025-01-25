const { body, validationResult } = require('express-validator');

// Validation middleware
const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').isInt().withMessage('Password is required'),
    body('phone').notEmpty().withMessage('Phone is required').isInt().withMessage('Phone must be an integer'),
    body('image').notEmpty().withMessage('Description is required'),
    body('image').custom((value, { req }) => {
        if (!req.file) {
            return true; // No file provided, considered valid
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            throw new Error('Invalid image type. Only JPEG, PNG, and GIF are allowed.');
        }
        return true;
    }),
    // body('content').notEmpty().withMessage('Content is required'),
    // body('interview_category').notEmpty().withMessage('Interview category is required'),
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
