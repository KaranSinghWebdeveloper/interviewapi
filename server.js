const express = require('express');
const useRouters = require('./Routes/userRoute');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path')
app.use(express.json());

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// user crud
app.use('/users', useRouters);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});