const { body, validationResult } = require('express-validator');
const con = require('../config/db');

// Validation middleware
const validateInterview = [
    body('title').notEmpty().withMessage('Title is required'),
    body('tags').notEmpty().withMessage('Tags are required'),
    body('category_id').isInt().withMessage('Category ID must be an integer')
        .custom(async (value) => {
            const [rows] = await con.promise().query('SELECT id FROM categorys WHERE id = ?', [value]);
            if (rows.length === 0) {
                throw new Error('Category ID does not exist in the categorys table');
            }
            return true;
        }),
    body('user_id')
        .isInt().withMessage('User ID must be an integer')
        .custom(async (value) => {
            const [rows] = await con.promise().query('SELECT id FROM users WHERE id = ?', [value]);
            if (rows.length === 0) {
                throw new Error('User ID does not exist in the user table');
            }
            return true;
        }),
    // body('user_id').isInt().withMessage('User ID must be an integer'),
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
