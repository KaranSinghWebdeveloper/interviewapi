const { body, validationResult } = require('express-validator');

// Validation middleware
const validateCategory = [
    body('category').notEmpty().withMessage('Category is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateCategory;
