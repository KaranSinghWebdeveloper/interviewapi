const express = require('express');
const Users = require('../Controller/userController');
const useRouters = express.Router();

useRouters.get('/', Users.userAll);
useRouters.get('/:id', Users.userId).put('/:id', Users.userEdit);
useRouters.delete('/delete/:id', Users.userDelete);
useRouters.post('/insert/data', Users.userInsert);

module.exports = useRouters;





