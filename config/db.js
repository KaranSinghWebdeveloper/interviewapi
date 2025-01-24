const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapi',
});

con.connect((err) => {
    if (err) throw err;
    console.log("DB Connected!");
});

module.exports = con;