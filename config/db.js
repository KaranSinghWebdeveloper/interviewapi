const mysql = require('mysql2');

const con = mysql.createConnection({
    host: '184.168.116.148',
    user: 'useradmin',
    password: 'useradmin@@12',
    database: 'interviewapi',
});

con.connect((err) => {
    if (err) throw err;
    console.log("DB Connected!");
});

module.exports = con;
