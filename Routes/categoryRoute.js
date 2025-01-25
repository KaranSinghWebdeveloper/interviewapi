const express = require('express');
const Categorys = require('../Controller/categoryController');
const validateCategory = require('../Middleware/categoryMiddleware');
const categoryRouters = express.Router();

categoryRouters.get('/', Categorys.categoryAll);
categoryRouters.get('/:id', Categorys.categoryId).put('/:id', validateCategory, Categorys.categoryEdit);
categoryRouters.delete('/delete/:id', Categorys.categoryDelete);
categoryRouters.post('/insert/data', validateCategory, Categorys.categoryInsert);

module.exports = categoryRouters;



