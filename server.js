const express = require('express');
const useRouters = require('./Routes/userRoute');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const categoryRouters = require('./Routes/categoryRoute');
const interviewRouters = require('./Routes/interviewRoute');
app.use(express.json());

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// user crud
app.use('/users', useRouters);

// category crud
app.use('/category', categoryRouters);

// interview crud
app.use('/interview', interviewRouters);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});