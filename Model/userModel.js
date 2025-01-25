const con = require("../config/db");
const Users = con.query("SELECT * FROM users", (err, result, fields) => {
    if (err) throw err;
    // console.log(result);
    return result;
});

module.exports = Users;