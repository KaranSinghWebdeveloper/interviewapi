const { body, validationResult } = require('express-validator');

// Validation middleware
const validateCategory = [
    body('category').notEmpty().withMessage('Category is required'),
    // body('tags').notEmpty().withMessage('Tags are required'),
    // body('category_id').isInt().withMessage('Category ID must be an integer'),
    // body('user_id').isInt().withMessage('User ID must be an integer'),
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateCategory;
