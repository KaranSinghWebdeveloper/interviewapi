const express = require('express');
const Users = require('../Controller/userController');
const validateUser = require('../Middleware/interviewMiddleware');
const useRouters = express.Router();

useRouters.get('/', Users.userAll);
useRouters.get('/:id', Users.userId).put('/:id', validateUser, Users.userEdit);
useRouters.delete('/delete/:id', Users.userDelete);
useRouters.post('/insert/data', validateUser, Users.userInsert);

module.exports = useRouters;





