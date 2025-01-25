const { body, validationResult } = require('express-validator');

// Validation middleware
const validateInterview = [
    body('title').notEmpty().withMessage('Title is required'),
    body('tags').notEmpty().withMessage('Tags are required'),
    body('category_id').isInt().withMessage('Category ID must be an integer'),
    body('user_id').isInt().withMessage('User ID must be an integer'),
    body('description').notEmpty().withMessage('Description is required'),
    body('content').notEmpty().withMessage('Content is required'),
    // body('User_category').notEmpty().withMessage('User category is required'),
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateInterview;
